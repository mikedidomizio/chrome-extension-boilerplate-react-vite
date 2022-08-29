// todo improvements, this can possibly add multiple event handlers to

const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    for (const addedNode of mutation.addedNodes) {
      if (addedNode.nodeName === "SPAN") {
        searchEmailThreadsAndAddEvents();
        // we break because we just need it to fire once
        break;
      }
    }
  }
});

const searchEmailThreadsAndAddEvents = () => {
  const thread = document.querySelectorAll("span[data-thread-id]");

  for (const span of thread) {
    const dataThreadId = span.attributes["data-thread-id"];
    const matches: [string, string] | null =
      dataThreadId.textContent.match(/^#thread-f:(\d+)$/);

    if (matches) {
      addClickEvent(span.parentNode.parentNode.parentNode, matches[1]);
    } else {
      console.error("could not find thread id");
    }
  }
};

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

const addClickEvent = (elem, threadId) => {
  // simple solution to prevent adding the event multiple times to the element by applying an attribute to the table row
  const attrToCheckThatExists = "chrome-last-opened-extension";

  if (!elem.getAttribute(attrToCheckThatExists)) {
    elem.addEventListener("click", () => {
      console.log("fired!", threadId);
    });
    elem.setAttribute(attrToCheckThatExists, "true");
  }
};
