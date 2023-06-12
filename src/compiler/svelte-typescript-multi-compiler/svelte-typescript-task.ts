import { TaskHandler } from '@teambit/builder';
import {
  CompilerTask,
  CompilerTaskOptions,
} from '@teambit/compilation.compiler-task';
import { SvelteTypescriptMultiCompiler } from './svelte-typescript-multi-compiler';
import { SvelteTypescriptMultiCompilerOptions } from './svelte-typescript-multi-compiler-options';

export type SvelteTypescriptCompilationTaskOptions = SvelteTypescriptMultiCompilerOptions &
  Pick<CompilerTaskOptions, 'description'>;

export const SvelteTypescriptCompilationTask = {
  from: (options: SvelteTypescriptCompilationTaskOptions = {
    svelteCompilerOptions: {},
    typescriptCompilerOptions: {}
  }): TaskHandler => {
    const name = options.name || 'SvelteTypescriptMultiCompile';
    const description =
      options.description || 'compiling components using Svelte+Typescript multi compiler';

    return CompilerTask.from({
      name,
      description,
      compiler: SvelteTypescriptMultiCompiler.from(options),
    });
  },
};
