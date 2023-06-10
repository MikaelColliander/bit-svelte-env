import {
  WebpackConfigTransformer,
  WebpackConfigMutator,
  // WebpackConfigTransformContext,
} from "@teambit/webpack";
// ensure bit auto-detects dependency and installs
import '@babel/plugin-proposal-decorators'; 

function findOneOfRuleInPreviewConfig(rules: Array<any> = []): Array<any> {
  const ruleWithOneOf = rules.find((rule) => !!rule.oneOf);
  return ruleWithOneOf.oneOf;
}

function findBabelLoaderRule(rules: Array<any> = []): any {
  const babelLoaderRule = findOneOfRuleInPreviewConfig(rules).find(r => r.loader?.includes('babel-loader'))
  return babelLoaderRule;
}

/**
 * Transformation to apply for both preview and dev server
 * @param config
 * @param context
 */
export function babelCommonTransformation(
  config: WebpackConfigMutator,
  // context: WebpackConfigTransformContext
): WebpackConfigMutator {
  const babelLoaderRule = findBabelLoaderRule(config?.raw?.module?.rules)
  babelLoaderRule.options.plugins ||= [];
  babelLoaderRule?.options.plugins.push(require.resolve('@babel/plugin-proposal-decorators'));
  return config;
}

/**
 * Transformation for the preview only
 * @param config
 * @param context
 * @returns
 */
export const previewConfigTransformer: WebpackConfigTransformer = (
  config: WebpackConfigMutator,
  // context: WebpackConfigTransformContext
) => {
  const newConfig = babelCommonTransformation(config);

  return newConfig;
};

/**
 * Transformation for the dev server only
 * @param config
 * @param context
 * @returns
 */
export const devServerConfigTransformer: WebpackConfigTransformer = (
  config: WebpackConfigMutator,
  // context: WebpackConfigTransformContext
) => {
  const newConfig = babelCommonTransformation(config);

  return newConfig;
};

