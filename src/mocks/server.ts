// We need to import node for node and browser for browser
import { setupServer } from "msw/node";
export * from "msw";
import { handlers } from "./handlers";

// This configures a request mocking server with the given request handlers.
export const server = setupServer(...handlers);
