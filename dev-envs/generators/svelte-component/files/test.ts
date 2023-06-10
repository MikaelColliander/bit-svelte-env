import { ComponentContext } from '@teambit/generator';

export const testFile = (context: ComponentContext) => {
  const { name, namePascalCase: Name } = context;

  return {
    relativePath: `${name}.spec.ts`,
    content: `import { h } from '@stencil/core';
    import { newSpecPage } from '@stencil/core/testing';
    import { ${Name} } from './${name}';
    
    it('should render my component', async () => {
      const page = await newSpecPage({
        components: [${Name}],
        template: () => (<${name} first="Stencil" last="'Don't call me a framework' JS"></${name}>),
      });
      expect(page.root).toEqualHtml(\`
        <${name}>Hello World! I'm Stencil 'Don't call me a framework' JS</${name}>
      \`);
    });
    `,
  };
};

