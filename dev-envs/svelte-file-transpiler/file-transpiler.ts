import svelte from 'svelte/compiler';
// import type { SvelteCompilerResult } from '@feux/components.svelte.compiler.svelte-compiler';
import path from 'path';
import fs from 'fs-extra';
import { TranspileContext, TranspileOutput } from '@teambit/compilation.modules.file-transpiler-common';

const supportedExtensions = ['.js', '.ts', '.svelte'];
const extentionsToPreserve = ['.css'];

/**
 * compile one file on the workspace
 */
export function transpileFileContent(
  fileContent: string,
  context: TranspileContext,
  // options?: TranspileOptions,
  svelteModule = svelte
): TranspileOutput {
  if (!isFileSupported(context.filePath)) {
    return null; // file is not supported
  }
  let transpileOptions: { file?: string } = {};
  // the `sourceRoot` and `sourceFileName` are manually set because the dists are written into the
  // node_modules dir, so the debugger needs to know where to find the source.
//   transpileOptions.sourceRoot = context.rootDir;
  transpileOptions.file = path.basename(context.filePath);
  // transpileOptions.componentExport = options?.componentExport ?? 'module';
  const result = svelteModule.compile(fileContent);
  if (!result) {
    return null;
  }
  
  const outputFiles = processTranspilationOutput(context.filePath, result.js);
  return outputFiles;
}

export async function transpileFilePathAsync(
  filePath: string,
  // options: TranspileOptions,
  svelteModule = svelte
): Promise<TranspileOutput> {
  if (!isFileSupported(filePath)) {
    return null;
  }
  // const transpileOptions = options;
  // transpileOptions.file = path.basename(filePath);
  // transpileOptions.componentExport = options.componentExport || 'module';
  const fileContent: string = await fs.readFile(filePath, 'utf8');
  const result = await svelteModule.compile(fileContent);
  if (!result) {
    return null;
  }

  const outputFiles = processTranspilationOutput(filePath, result.js);
  return outputFiles;
}

/**
 * whether svelte is able to compile the given path
 */
export function isFileSupported(filePath: string): boolean {
  return (
    supportedExtensions.includes(path.extname(filePath)) && !filePath.endsWith('.d.ts')
  );
}

export function shouldReplaceExtension(extension: string){
  return !extentionsToPreserve.includes(extension);
}

export function replaceFileExtToJs(filePath: string): string {
  const fileExtension = path.extname(filePath);
  if (!isFileSupported(filePath)) return filePath;
  if (!shouldReplaceExtension(fileExtension)) return filePath.concat('.js');
  return filePath.replace(new RegExp(`${fileExtension}$`), '.js'); // makes sure it's the last occurrence
}

export function ensureSourceRoot(result: any, relativePath: string): void {
  if (result.map) {
    const map = JSON.parse(result.map);
    map.sourceRoot = "../"; //relativePath;
    result.map = JSON.stringify(map);
  }
}

function processTranspilationOutput(filePath: string, result): TranspileOutput {
  const code = result.code || '';
  const outputPath = replaceFileExtToJs(path.basename(filePath));
  const mapFilePath = `${outputPath}.map`;
  const outputText = result.map ? `${code}\n\n//# sourceMappingURL=${mapFilePath}` : code;
  ensureSourceRoot(result, path.relative(mapFilePath, filePath));
  const outputFiles = [{ outputText, outputPath }];
  if (result.map) {
    outputFiles.push({
      outputText: result.map.toString(),
      outputPath: mapFilePath,
    });
  }

  return outputFiles;
}