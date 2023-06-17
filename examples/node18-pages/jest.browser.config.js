/* eslint-disable max-len */
const nextJest = require("next/jest");

// Providing the path to your Next.js app which will enable loading
// next.config.js and .env files
const createJestConfig = nextJest({ dir: "./" });

// This is an example of jsdoc typing for non-ts files
// https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html#other-supported-patterns
/** @type {import('jest').Config} Config */
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.browser.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  // Note that tests in jsdom are opt-in, while tests in node are opt-out
  testMatch: [
    "**/__tests__/browser/**/*.[jt]s?(x)",
    "<rootDir>/src/components/**/?(*.)+(spec|test).[jt]s?(x)",
  ],
  globals: {
    __MSW_ENV__: "browser",
  },
};

// createJestConfig is exported in this way to ensure that next/jest can
// load the Next.js configuration, which is async
module.exports = createJestConfig(customJestConfig);
