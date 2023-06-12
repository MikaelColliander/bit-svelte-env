import { Compiler } from '@teambit/compiler';
import { MultiCompiler } from '@teambit/compilation.compilers.multi-compiler';
import { SvelteCompiler } from '@feux/components.svelte.compiler.svelte-compiler';
import {
  TypescriptCompiler,
} from '@teambit/typescript.typescript-compiler';
import { EnvContext, EnvHandler } from '@teambit/envs';
import { SvelteTypescriptMultiCompilerOptions } from './svelte-typescript-multi-compiler-options';

export class SvelteTypescriptMultiCompiler {
  static from(options: SvelteTypescriptMultiCompilerOptions): EnvHandler<Compiler> {
    return (context: EnvContext) => {
      const name = options.name || 'svelte-typescript-compiler';
      const logger = context.createLogger(name);

      const multiCompiler = MultiCompiler.from({
        shouldCopyNonSupportedFiles: true,
        compilers: [
          TypescriptCompiler.from(options.typescriptCompilerOptions)(context),
          SvelteCompiler.from(options.svelteCompilerOptions)(context),
        ],
      })(context)
  
      // @ts-ignore
      multiCompiler.deleteDistDir = true;
  
      return multiCompiler;
    };
  }
}
