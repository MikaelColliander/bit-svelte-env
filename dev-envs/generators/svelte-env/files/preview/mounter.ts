export const mounterFile = () => {
  return {
    relativePath: './preview/mounter.ts',
    content: `import { createMounter, HtmlProvider } from '@teambit/html.mounter';

/**
 * provide your component compositions (preview) with the vanillaJs context they need to run.
 * for example styles, or elements assumed to be on the page
 * 
 * html providers can be in the form of Html Elements or Fragments, html strings and even functions that manipulate the DOM
 * Elements, Fragments and strings can be added to either the document head or body
 * 
 * If your provider comes from a component, that component should be listed as host-dependencies in your host-dependencies.ts file.
 * @see https://bit.dev/docs/html-env/component-previews#composition-providers
 */
const providerDiv = document.createElement('div');
providerDiv.setAttribute('style', "border-color:blue; border-width:5px; border-style: solid;");
export const MyHtmlProvider: HtmlProvider = {location: "body", content: providerDiv};

/**
 * the entry for the app (preview runtime) that renders your component previews.
 * use the default template or create your own.
 * @see https://docs/html-env/component-previews#composition-mounter
 */
export default createMounter([MyHtmlProvider]) as any;
`,
  };
};
