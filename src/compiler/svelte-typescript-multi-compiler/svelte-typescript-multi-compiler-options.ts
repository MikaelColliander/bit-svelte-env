import { SvelteCompilerOptions } from '@feux/components.svelte.compiler.svelte-compiler';
import { TypeScriptCompilerOptions } from '@teambit/typescript.typescript-compiler';
import { CompilerOptions } from '@teambit/compiler';

export type SvelteTypescriptMultiCompilerOptions = {
  /**
   * TransformOptions for Svelte compiler. @see https://svelte.dev/docs#compile-time-svelte-compile
   *
   */
  svelteCompilerOptions: SvelteCompilerOptions;

  /**
   * path to svelte config to use during compilation.
   */
  // svelteConfig?: string;

  /**
   * Determines which files should be compiled by the Svelte compiler.
   * It only works with the file types supported by Svelte (.ts, .tsx, .js, .jsx, .d.ts).
   * See https://github.com/mrmlnc/fast-glob for the supported glob patters syntax.
   */
  typescriptCompilerOptions: TypeScriptCompilerOptions;
} & Partial<CompilerOptions>;
