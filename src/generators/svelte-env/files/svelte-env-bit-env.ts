import { ComponentContext } from '@teambit/generator';

export const SvelteEnv = (context: ComponentContext) => {
  const { name, namePascalCase: Name, envId } = context;
  const envVersion = envId
    ? `/**
 * this env extends svelte-env version ${envId.version}.
 * to inspect its config @see https://bit.cloud/teambit/web-components/stencil?version=${envId.version}
 * */
`
    : '';

  return {
    relativePath: `${name}.bit-env.ts`,
    content: `${envVersion}import { SvelteEnv } from '@feux/components.svelte';
import { Compiler } from '@teambit/compiler';
import { ReactPreview } from '@teambit/preview.react-preview';
// import { HtmlPreview } from '@teambit/html.preview.html-preview';
import { EnvHandler } from '@teambit/envs';
import {
  SvelteCompiler,
} from '@feux/components.svelte.compiler.svelte-compiler';
import { ESLintLinter, EslintTask } from '@teambit/defender.eslint-linter';
import { JestTester, JestTask } from '@teambit/defender.jest-tester';
import { PrettierFormatter } from '@teambit/defender.prettier-formatter';
import { Tester } from '@teambit/tester';
import { Preview } from '@teambit/preview';
import hostDependencies from './preview/host-dependencies';
// import { webpackTransformer } from './config/webpack.config';


export class ${Name} extends SvelteEnv {

  /* a shorthand name for the env */
  name = '${name}';

  /* the compiler to use during development */
  compiler(): EnvHandler<Compiler> {
    return SvelteCompiler.from();
  }

  /* the test runner to use during development */
  tester(): EnvHandler<Tester> {
    /**
     * @see https://bit.dev/reference/jest/using-jest
     * */
    return JestTester.from({
      config: require.resolve('./config/jest.config'),
    });
  }

  /* the linter to use during development */
  linter() {
    /**
     * @see https://bit.dev/reference/eslint/using-eslint
     * */
    return ESLintLinter.from({
      tsconfig: require.resolve('./config/tsconfig.json'),
      configPath: require.resolve('./config/eslintrc.js'),
      pluginsPath: __dirname,
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs'],
    });
  }

  /**
   * the formatter to use during development
   * (source files are not formatted as part of the components' build)
   * */
  formatter() {
    /**
     * @see https://bit.dev/reference/prettier/using-prettier
     * */
    return PrettierFormatter.from({
      configPath: require.resolve('./config/prettier.config.js'),
    });
  }

  /**
   * generates the component previews during development and during build
   */
  preview(): EnvHandler<Preview> {
    /**
     * @see https://bit.dev/docs/react-env/component-previews
     */
    return ReactPreview.from({
      docsTemplate: require.resolve('./preview/docs'),
      mounter: require.resolve('./preview/mounter'),
      hostDependencies
    });
  }

  /**
   * a set of processes to be performed before a component is snapped, during its build phase
   * @see https://bit.dev/docs/react-env/build-pipelines
   */
  build() {
    return super.build().replace([
      EslintTask.from({
        tsconfig: require.resolve('./config/tsconfig.json'),
        configPath: require.resolve('./config/eslintrc.js'),
        pluginsPath: __dirname,
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs'],
      }),
      JestTask.from({
        config: require.resolve('./config/jest.config'),
      }),
    ]);
  }
}

export default new ${Name}();
    `,
  };
};
