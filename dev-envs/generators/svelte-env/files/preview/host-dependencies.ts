export const hostDependenciesFile = () => {
  return {
    relativePath: './preview/host-dependencies.ts',
    content: `/**
 * dependencies to be bundled only once, in the env preview template, and not in each component preview.
 * most of your peer dependencies should be listed here to avoid duplications in the preview.
 * (the react dependencies here are for bit's rendering of docs, which are rendered using an mdx react application)
 */
export default [
  // mdx and react hostDeps are required for bit's rendering of docs and previews
  '@teambit/mdx.ui.mdx-scope-context',
  '@mdx-js/react',
  'react',
  'react-dom'
  // add any components containing your docs/mounter providers here
];`,
  };
};
