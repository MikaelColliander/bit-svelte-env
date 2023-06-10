import { TaskHandler } from '@teambit/builder';
import {
  CompilerTask,
  CompilerTaskOptions,
} from '@teambit/compilation.compiler-task';
import { SvelteCompiler } from './svelte-compiler';
import { SvelteCompilerOptions } from './svelte-compiler-options';

export type SvelteCompilationTaskOptions = SvelteCompilerOptions &
  Pick<CompilerTaskOptions, 'description'>;

export const SvelteCompilationTask = {
  from: (options: SvelteCompilationTaskOptions): TaskHandler => {
    const name = options.name || 'SvelteCompiler';
    const description =
      options.description || 'compiling components using Svelte compiler';

    return CompilerTask.from({
      name,
      description,
      compiler: SvelteCompiler.from(),
    });
  },
};