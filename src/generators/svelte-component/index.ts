import { ComponentTemplate, ComponentContext, ComponentFile } from '@teambit/generator';
import { componentFile } from './files/component';
import { compositionFile } from './files/composition';
import { docsFile } from './files/docs';
// import { testFile } from './files/test';
import { indexFile } from './files/index-file';

export type SvelteComponentTemplateOptions = {
  /**
   * name of the template
   */
  name?: string;

  /**
   * description of the template.
   */
  description?: string;

  /**
   * hide the template from the `bit templates` command.
   */
  hidden?: boolean;
};

export class SvelteComponentTemplate implements ComponentTemplate {
  constructor(
    readonly name = 'svelte',
    readonly description = 'a svelte component template',
    readonly hidden = false
  ) {}

  generateFiles(context: ComponentContext): ComponentFile[] {
    return [
      indexFile(context), 
      componentFile(context), 
      compositionFile(context), 
      docsFile(context), 
      // testFile(context) // TODO uncomment when sorted out support for required jest version with svelte
    ];
  }

  static from(options: SvelteComponentTemplateOptions = {}) {
    return () =>
      new SvelteComponentTemplate(
        options.name,
        options.description,
        options.hidden
      );
  }
};
