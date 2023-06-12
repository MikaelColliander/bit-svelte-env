import fs from 'fs-extra';
import mapSeries from 'p-map-series';
import multimatch from 'multimatch';
import { flatten } from 'lodash';
import path from 'path';
import { BuildContext, BuiltTaskResult, ComponentResult } from '@teambit/builder';
import { Compiler, TranspileFileParams, TranspileFileOutput } from '@teambit/compiler';
import { Capsule } from '@teambit/isolator';
import { Logger } from '@teambit/logger';
import { EnvContext, EnvHandler } from '@teambit/envs';
import { TranspileContext } from '@teambit/compilation.modules.file-transpiler-common';
import { isFileSupported, transpileFileContent, transpileFilePathAsync, replaceFileExtToJs } from '@feux/components.svelte.compiler.svelte-file-transpiler';
import { SvelteCompilerOptions } from './svelte-compiler-options';
const svelte = require('svelte/compiler');

// const defaultTranspileOptions: TranspileOptions = {}

export class SvelteCompiler implements Compiler {
  distDir: string;
  distGlobPatterns: string[];
  shouldCopyNonSupportedFiles: boolean;
  artifactName: string;
  supportedFilesGlobPatterns: string[] | null;
  svelteTranspileOptions: {file: string} | null;
  constructor(
    readonly id: string,
    private logger: Logger,
    private svelteOptions: SvelteCompilerOptions,
    private svelteModule = svelte
  ) {
    this.distDir = 'dist';
    this.distGlobPatterns = [`${this.distDir}/**`, `!${this.distDir}/tsconfig.tsbuildinfo`];
    this.shouldCopyNonSupportedFiles = false;
    this.artifactName = 'dist';
    this.supportedFilesGlobPatterns = null;
    // this.stencilTranspileOptions = {...defaultTranspileOptions, ...stencilOptions?.stencilTranspileOptions}
  }

  displayName = 'Svelte';
  deleteDistDir = false;

  version() {
    return this.svelteModule.version;
  }

  getDistDir() {
    return this.distDir;
  }

  /**
   * compile one file on the workspace
   */
  transpileFile(fileContent: string, options: TranspileFileParams): TranspileFileOutput {
    if (!isFileSupported(options.filePath)) {
      return null; // file is not supported
    }

    const context: TranspileContext = {
      filePath: options.filePath,
      rootDir: options.componentDir,
    };

    const outputFiles = transpileFileContent(fileContent, context, this.svelteModule);
    return outputFiles;
  }

  /**
   * compile multiple components on the capsules
   */
  async build(context: BuildContext): Promise<BuiltTaskResult> {
    const capsules = context.capsuleNetwork.seedersCapsules;
    const componentsResults: ComponentResult[] = [];
    const longProcessLogger = this.logger.createLongProcessLogger('compile svelte components', capsules.length);
    await mapSeries(capsules, async (capsule) => {
      const currentComponentResult: ComponentResult = {
        errors: [],
        component: capsule.component,
      };
      longProcessLogger.logProgress(capsule.component.id.toString());
      await this.buildOneCapsule(capsule, currentComponentResult);
      componentsResults.push({ ...currentComponentResult });
    });

    return {
      artifacts: this.getArtifactDefinition(),
      componentsResults,
    };
  }

  private async buildOneCapsule(capsule: Capsule, componentResult: ComponentResult) {
    componentResult.startTime = Date.now();
    const sourceFiles = capsule.component.filesystem.files.map((file) => file.relative);
    await fs.ensureDir(path.join(capsule.path, this.distDir));
    await Promise.all(
      sourceFiles.map(async (filePath) => {
        if (this.isFileSupported(filePath)) {
          const absoluteFilePath = path.join(capsule.path, filePath);

          const buildOptions = this.svelteTranspileOptions || { file: "" };
          try {
            const result = await transpileFilePathAsync(
              absoluteFilePath,
              this.svelteModule
            );
            if (!result || !result.length) {
              this.logger.debug(
                `getting an empty response from Svelte for the file ${filePath}. it might be configured to be ignored`
              );
              return;
            }
            // Make sure to get only the relative path of the dist because we want to add the dist dir.
            // If we use the result outputPath we will get an absolute path here
            const distPath = this.replaceFileExtToJs(filePath);
            const distPathMap = `${distPath}.map`;
            await fs.outputFile(path.join(capsule.path, this.distDir, distPath), result[0].outputText);
            if (result.length > 1) {
              await fs.outputFile(path.join(capsule.path, this.distDir, distPathMap), result[1].outputText);
            }
          } catch (err: any) {
            componentResult.errors?.push(err);
          }
        }
      })
    );
    componentResult.endTime = Date.now();
  }

  getArtifactDefinition() {
    return [
      {
        generatedBy: this.id,
        name: this.artifactName,
        globPatterns: this.distGlobPatterns,
      },
    ];
  }

  /**
   * given a source file, return its parallel in the dists. e.g. index.ts => dist/index.js
   */
  getDistPathBySrcPath(srcPath: string) {
    const fileWithJSExtIfNeeded = this.replaceFileExtToJs(srcPath);
    return path.join(this.distDir, fileWithJSExtIfNeeded);
  }

  /**
   * whether stencil is able to compile the given path
   */
  isFileSupported(filePath: string): boolean {
    if (this.supportedFilesGlobPatterns) {
      return isFileSupported(filePath) && !!multimatch(filePath, this.supportedFilesGlobPatterns).length;
    }
    return isFileSupported(filePath);
  }

  displayConfig() {
    return JSON.stringify(this.svelteOptions || {}, null, 2);
  }

  private replaceFileExtToJs(filePath: string): string {
    if (!this.isFileSupported(filePath)) return filePath;
    return replaceFileExtToJs(filePath);
  }

  static from({}: SvelteCompilerOptions): EnvHandler<Compiler> {
    return (context: EnvContext) => {
      const name = 'svelte-compiler';
      const logger = context.createLogger(name);

      return new SvelteCompiler(
        name,
        logger,
        svelte
      );
    };
  }
}