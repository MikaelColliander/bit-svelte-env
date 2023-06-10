// force bit to recgonize this as dependency
// require('@teambit/react.eslint-config-bit-react');
require('eslint-plugin-svelte');

module.exports = {
  extends: [
    // require.resolve('@teambit/react.eslint-config-bit-react'),
    "plugin:svelte/recommended"
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'svelte/rule-name': 'error'
  },
};
