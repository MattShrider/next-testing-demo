const nextJest = require("next/jest");

// Providing the path to your Next.js app which will enable loading
// next.config.js and .env files
const createJestConfig = nextJest({ dir: "./" });

/** @type {import('jest').Config} Config */
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.node.setup.js"],
  testEnvironment: "jest-environment-node",
  testPathIgnorePatterns: [
    "/node_modules/",
    // Do not test components, note that React Server Components can NOT
    // live in this folder. Those need to be created in this nodej environment.
    "/src/components/.*",
    // Ignore all pages routes besides for api routes
    "/src/pages/(?!api)*",
    // Ignore all tests that are explicitely browser tests
    "/src/__tests__/browser/.*",
  ],
  globals: {
    __MSW_ENV__: "node",
  },
};

// createJestConfig is exported in this way to ensure that next/jest can
// load the Next.js configuration, which is async
module.exports = createJestConfig(customJestConfig);
