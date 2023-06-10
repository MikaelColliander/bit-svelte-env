export interface SvelteCompilerOptions {
  filename?: string | null;
  name?: string;
  format?: "esm" | "cjs";
  generate?: "dom" | "ssr" | false;
  errorMode?: "throw" | "warn";
  varsReport?: "strict" | "full" | false;
  dev?: boolean;
  immutable?: boolean;
  hydratable?: boolean;
  legacy?: boolean;
  accessors?: boolean;
  customElement?: boolean;
  tag?: string | null;
  css?: "injected" | "external" | "none";
  cssHash?: (params: {
    hash: string;
    css: string;
    name: string;
    filename: string;
  }) => string;
  loopGuardTimeout?: number;
  preserveComments?: boolean;
  preserveWhitespace?: boolean;
  sourcemap?: string | object;
  enableSourcemap?: boolean | { js?: boolean; css?: boolean };
  outputFilename?: string | null;
  cssOutputFilename?: string | null;
  sveltePath?: string;
  namespace?: string;
}
