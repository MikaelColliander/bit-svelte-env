import { ComponentContext } from '@teambit/generator';

export const docsFile = (context: ComponentContext) => {
  const { name } = context;

  return {
    relativePath: `${name}.docs.mdx`,
    content: `---
description: 'A stencil component with props - created with bit.'
labels: ['stencil', 'html', 'environment', 'framework-less', 'vanillajs', 'vanilla js', 'web-components']
---
import './${name}';

## Overview
Basic Stencil component created with bit

#### Example

Usage example:

\`\`\`js
import '@teambit/web-components.stencil.${name}/${name}.tsx';

<${name} first="First" middle=", middle" last=", last"></${name}>

\`\`\`

Live example

\`\`\`js live=true
<${name} first="First" middle=", middle" last=", last"></${name}>
\`\`\`
`
    ,
  };
};
