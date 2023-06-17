/**
 * This is a global defined in jest config that allows us to dynamically
 * import the correct MSW version depending on test environment.
 */
declare var __MSW_ENV__: string;
import type * as MSW from "msw/node";

let msw: typeof MSW;
if (__MSW_ENV__ === "node") {
  msw = require("msw/node");
} else {
  msw = require("msw/browser");
}
export * from "msw";
import { handlers } from "./handlers";
export const server = msw.setupServer(...handlers);
