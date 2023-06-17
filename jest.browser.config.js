/* eslint-disable max-len */
const nextJest = require("next/jest");

// Providing the path to your Next.js app which will enable loading
// next.config.js and .env files
const createJestConfig = nextJest({ dir: "./" });

// This is an example of jsdoc typing for non-ts files
// https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html#other-supported-patterns
/** @type {import('jest').Config} Config */
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  // Note that tests in jsdom are opt-in, while tests in node are opt-out
  testMatch: [
    "**/__tests__/jsdom/**/*.[jt]s?(x)",
    "<rootDir>/components/**/*.[jt]s?(x)",
  ],
};

// createJestConfig is exported in this way to ensure that next/jest can
// load the Next.js configuration, which is async
module.exports = createJestConfig(customJestConfig);
