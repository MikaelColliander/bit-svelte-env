export const docsFile = () => {
  // TODO fix providers for lit env compositions and update this template when done
    return {
      relativePath: './preview/docs.ts',
      content: `import { createHtmlDocsTemplate } from '@teambit/html.docs.docs-template';
import { HtmlProvider } from '@teambit/html.mounter';

/**
 * wrap your component documentation ('overview') with the context it needs to render properly
 * for example styles, or elements assumed to be on the page
 * 
 * provide your component compositions (preview) with the vanillaJs context they need to run.
 * for example styles, or elements assumed to be on the page
 * 
 * html providers can be in the form of Html Elements or Fragments, html strings and even functions that manipulate the DOM
 * Elements, Fragments and strings can be added to either the document head or body
 * 
 * If your provider comes from a component, that component should be listed as host-dependencies in your host-dependencies.ts file.
 * @see https://bit.dev/docs/html-env/component-previews#composition-providers
 * 
 * Below are examples of providers that can be added
 */
const providerDiv = document.createElement('div');
providerDiv.setAttribute('style', "border-color:green; border-width:5px; border-style: solid;");

const boldDiv = document.createElement('div');
boldDiv.setAttribute('style', "font-weight: bold");

const DocsProvider: HtmlProvider = {location: "body", content: providerDiv};
const BoldProvider: HtmlProvider = {location: "body", content: boldDiv};

/**
 * the template that renders your component docs in the 'overview' tab.
 * use the default template or create your own.
 * @see https://bit.dev/docs/react-env/component-previews#docs-template
 */
export default createHtmlDocsTemplate([DocsProvider, BoldProvider]);
  `,
    };
  };