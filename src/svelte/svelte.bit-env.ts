import { ReactEnv } from '@teambit/react.react-env';
import { Compiler } from '@teambit/compiler';
import { TemplateList, StarterList } from "@teambit/generator";
import { SvelteComponentTemplate, SvelteEnvTemplate } from "@feux/components.svelte.generators.svelte-templates";
// import { StencilWorkspaceStarter } from "@teambit/web-components.stencil.generators.stencil-starters";
import { TypeScriptExtractor } from "@teambit/typescript";
import { ReactPreview } from '@teambit/preview.react-preview';
import { EnvHandler } from '@teambit/envs';
import {
  SvelteTypescriptMultiCompiler,
  SvelteTypescriptCompilationTask,
} from '@feux/components.svelte.compiler.svelte-typescript-multi-compiler';
import { ESLintLinter, EslintTask } from '@teambit/defender.eslint-linter';
import { JestTask, JestTester } from "@teambit/defender.jest-tester";
import { PrettierFormatter } from '@teambit/defender.prettier-formatter';
import { Tester } from '@teambit/tester';
import { Pipeline } from "@teambit/builder";
import { Preview } from '@teambit/preview';
import { SchemaExtractor } from "@teambit/schema";
import { SvelteEnvInterface } from './svelte-env-interface';
const tsconfig = require('./config/tsconfig.json');
// import { babelCommonTransformation } from "./config/webpack.config";
// import { PackageGenerator } from "@teambit/pkg";

export class SvelteEnv extends ReactEnv implements SvelteEnvInterface {
  /**
   * name of the environment. used for friendly mentions across bit.
   */
  name = 'svelte';

  /**
   * icon for the env. use this to build a more friendly env.
   * uses react by default.
   */
  icon = '"https://static.bit.dev/brands/logo-svelte.svg"';

  /**
   * return an instance of a Compiler. use components like typescript-compiler (teambit.typescript/typescript-compiler)
   * or our babel-compiler (teambit.compilation/babel-compiler).
   */
  compiler(): EnvHandler<Compiler> {
    return SvelteTypescriptMultiCompiler.from({
      svelteCompilerOptions: {},
      typescriptCompilerOptions: {
        tsconfig: require.resolve('./config/tsconfig.json'),
      },
    });
  }

  /**
   * returns an instance of a Bit tester implementation. use components like mocha-tester or
   * jest-tester or [build your own](https://bit.dev/docs/tester/implement-tester).
   */
  tester(): EnvHandler<Tester> {
    return JestTester.from({
      jest: require.resolve('jest'),
      config: require.resolve('./config/jest.config'),
    });
  }

  /**
   * return an instance of a Bit preview instance. used for preview purposes.
   * base preview is a general purpose webpack preview.
   */
  preview(): EnvHandler<Preview> {
    // TODO use HtmlPreview when module issue is sorted
    return ReactPreview.from({
      docsTemplate: require.resolve('./preview/docs'),
      mounter: require.resolve('./preview/mounter'),
      // transformers: [ babelCommonTransformation ]
    });
  }

  /**
   * returns an instance of the default ESLint.
   * config files would be used to validate coding standards in components.
   * bit will write the minimum required files in any workspace to optimize
   * for dev experience.
   */
  linter() {
    return ESLintLinter.from({
      tsconfig: require.resolve('./config/tsconfig.json'),
      configPath: require.resolve('./config/eslintrc.js'),
      // resolve all plugins from the current environment.
      pluginsPath: __dirname,
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs'],
    });
  }

  /**
   * used by bit's formatter. helps to standardize and automate
   * code styling. can be used a build task or using bit lint and common
   * ides.
   */
  formatter() {
    return PrettierFormatter.from({
      configPath: require.resolve('./config/prettier.config.js'),
    });
  }

  /**
   * a list of starters for new projects. this helps create a quick and
   * standardized
   */
  // starters() {
  //   return StarterList.from([StencilWorkspaceStarter.from()]);
  // }

  // /**
  //  * set a list of component templates to use across your
  //  * workspaces. new workspaces would be set to include
  //  * your envs by default.
  //  */
  generators() {
    return TemplateList.from([
      SvelteComponentTemplate.from(),
      SvelteEnvTemplate.from()
    ]);
  }

  /**
   * define the build pipeline for a component.
   * pipelines are optimized for performance and consistency,
   * making sure every component is independently built and tested.
   */
  build() {
    // :TODO fix build task
    return Pipeline.from([
      SvelteTypescriptCompilationTask.from({
        svelteCompilerOptions: {},
        typescriptCompilerOptions: {
          tsconfig: require.resolve('./config/tsconfig.json'),
        }
      }),
      EslintTask.from({
        tsconfig: require.resolve("./config/tsconfig.json"),
        configPath: require.resolve("./config/eslintrc.js"),
        // resolve all plugins from the react environment.
        pluginsPath: __dirname,
        extensions: [".ts", ".tsx", ".js", ".jsx", ".mjs"],
      }),
      JestTask.from({
        config: require.resolve("./config/jest.config"),
        jest: require.resolve("jest"),
      }),
    ]);
  }

  /**
   * returns an instance of the default TypeScript extractor.
   * used by default for type inference for both JS and TS.
   */
  schemaExtractor(): EnvHandler<SchemaExtractor> {
    return TypeScriptExtractor.from({
      tsconfig: require.resolve("./config/tsconfig.json"),
    });
  }
}

export default new SvelteEnv();
