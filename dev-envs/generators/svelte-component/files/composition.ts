import { ComponentContext } from '@teambit/generator';

export const compositionFile = (context: ComponentContext) => {
  const { name, namePascalCase: Name } = context;

  return {
    relativePath: `${name}.composition.ts`,
    content: `import './${name}';

export const ${Name}BasicComposition = \`<${name} first="Stencil" last="'Don't call me a framework' JS"></${name}>\`;
`,
  };
};