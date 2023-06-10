export const envJson = {
    relativePath: `env.jsonc`,
    content: `{
  /**
   * standardize your component dependencies.
   * @see https://bit.dev/docs/react-env/dependencies
   **/
  "policy": {
    /**
     * peer dependencies for components using that env.
     */
    "peers": [
      // react packages are required for the env's rendering of component docs, and are not related to 
      // how the env processes your lit component code
      {
        "name": "react",
        "version": "^18.0.0",
        "supportedRange": "^17.0.0 || ^18.0.0",
        "hidden": true
      },
      {
        "name": "react-dom",
        "version": "^18.0.0",
        "supportedRange": "^17.0.0 || ^18.0.0",
        "hidden": true
      },
      {
        "name": "jest",
        "version": "29.3.1",
        "supportedRange": "29.3.1"
      },
      {
        "name": "@mdx-js/react",
        "version": "1.6.22",
        "supportedRange": "^1.6.22"
      },
      {
        "name": "@teambit/mdx.ui.mdx-scope-context",
        "version": "0.0.496",
        "supportedRange": "^0.0.496"
      }
    ],
    /**
     * dev dependencies for components using that env
     */
    "dev": [
      {
        "name": "@types/jest",
        "version": "^29.2.2",
        "hidden": true,
        "force": true
      }
    ]
  },

  /**
   * associate files with a specific dev service.
   * associated files are considered as dev files.
   * @see https://bit.dev/docs/react-env/dependencies#configure-files-as-dev-files
   **/
  "patterns": {
    /**
     * files to be loaded and displayed in the 'preview' tab.
     * @see https://bit.dev/docs/react-env/component-previews
     */
    "compositions": ["**/*.composition.*", "**/*.preview.*"],
    /**
     * files to be loaded and displayed in the 'overview' tab.
     * @see https://bit.dev/docs/react-env/component-docs
     */
    "docs": ["**/*.docs.*"],
    /* files to be included in the component testing */
    "tests": ["**/*.spec.*", "**/*.test.*"]
  }
}
`,
};
