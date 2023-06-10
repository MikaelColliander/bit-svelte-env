export const prettierConfigFile = () => {
  return {
    relativePath: './config/prettier.config.js',
    content: `/**
 * @see https://bit.dev/reference/prettier/prettier-config
 */
const { prettierConfig } = require('@teambit/web-components.stencil');

module.exports = {
  ...prettierConfig,
};
`,
  };
};
