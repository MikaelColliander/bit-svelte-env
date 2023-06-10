import {
    ComponentConfig,
    ComponentContext,
    ComponentFile,
    ComponentTemplate,
  } from '@teambit/generator';
  import { indexFile } from './files/index-file';
  import { SvelteEnv } from './files/svelte-env-bit-env';
  import { envJson } from './files/env-jsonc';
  import { eslintConfigFile } from './files/config/eslintrc';
  import { tsConfigFile } from './files/config/tsconfig.json';
  import { jestConfigFile } from './files/config/jest.config';
  import { prettierConfigFile } from './files/config/prettier.config';
  import { webpackTransformerFile } from './files/config/webpack-transformer';
  import { docsFile } from './files/preview/docs';
  import { mounterFile } from './files/preview/mounter';
  import { hostDependenciesFile } from './files/preview/host-dependencies';
  import { assetsFile } from './files/types/asset';
  import { styleFile } from './files/types/style';
  
  export type SvelteEnvTemplateOptions = {
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
  
  export class SvelteEnvTemplate implements ComponentTemplate {
    constructor(
      readonly name = 'svelte-env',
      readonly description = 'set up your own custom svelte env using this template',
      readonly hidden = false
    ) {}
  
    generateFiles(context: ComponentContext): ComponentFile[] {
      return [
        indexFile(context),
        docsFile(),
        mounterFile(),
        hostDependenciesFile(),
        SvelteEnv(context),
        envJson,
        eslintConfigFile(),
        tsConfigFile(),
        jestConfigFile(),
        prettierConfigFile(),
        webpackTransformerFile(),
        assetsFile(),
        styleFile(),
      ];
    }
  
    config(): ComponentConfig {
      return {
        'teambit.envs/envs': {
          env: 'teambit.envs/env',
        },
      };
    }
  
    static from(options: SvelteEnvTemplateOptions = {}) {
      return () =>
        new SvelteEnvTemplate(options.name, options.description, options.hidden);
    }
  }