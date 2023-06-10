export interface SvelteCompilerResult {
    js: {
      code: string;
      map: {
        toString(): string;
        toUrl(): string;
      };
      ast: object;
    };
    css: {
      code: string;
      map: {
        toString(): string;
        toUrl(): string;
      };
      ast: object;
    };
    warnings: {
      code: string;
      message: string;
      start?: {
        line: number;
        column: number;
        character: number;
      };
      end?: {
        line: number;
        column: number;
        character: number;
      };
      frame?: string;
    }[];
    vars: {
      name: string;
      export_name: string;
      injected: boolean;
      module: boolean;
      mutated: boolean;
      reassigned: boolean;
      referenced: boolean;
      referenced_from_script: boolean;
      writable: boolean;
    }[];
    stats: object;
  }
  