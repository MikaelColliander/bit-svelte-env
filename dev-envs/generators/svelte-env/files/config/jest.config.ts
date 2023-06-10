export const jestConfigFile = () => {
  return {
    relativePath: './config/jest.config.js',
    content: `// Override the Jest config to ignore transpiling from specific folders
// See the base Jest config: https://bit.cloud/teambit/react/react/~code/jest/jest.config.js

const { generateNodeModulesPattern } = require('@teambit/dependencies.modules.packages-excluder');
const { stencilJestConfig } = require('@teambit/web-components.stencil');

const packagesToTransform = [
  "testing-library__dom",
  "@open-wc"
  // add your packages here, e.g. @my-org (no need to list specific components, anything under @my-org will be captured)
];

const transformIgnorePatterns = generateNodeModulesPattern({ packages: packagesToTransform, excludeComponents: true });

module.exports = {
  ...stencilJestConfig,
  transformIgnorePatterns: [
    '^.+.module.(css|sass|scss)$',
    transformIgnorePatterns
  ]
};`,
  };
};
