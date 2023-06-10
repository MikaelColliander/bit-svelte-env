import svelteJestConfig from './config/jest.config';
import sveltePrettierConfig from './config/prettier.config';

export { SvelteEnv } from './svelte.bit-env';
export { svelteJestConfig, sveltePrettierConfig }

export { babelCommonTransformation as sveltelWebpackTransformation } from './config/webpack.config';

export type { SvelteEnvInterface } from './svelte-env-interface';


