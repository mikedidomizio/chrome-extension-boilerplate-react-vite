/**
 * @description
 * Chrome extensions don't support modules in content scripts.
 */
import("./components/Demo");

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import("./read-inbox");
