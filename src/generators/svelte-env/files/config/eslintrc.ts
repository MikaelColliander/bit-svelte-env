export const eslintConfigFile = () => {
  return {
    relativePath: './config/eslintrc.js',
    content: `/**
 * @see https://bit.dev/reference/eslint/eslint-config
 */
module.exports = {
  extends: [require.resolve('@feux/components.svelte/config/eslintrc')],
};    
`,
  };
};
