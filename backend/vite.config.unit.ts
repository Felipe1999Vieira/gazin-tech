import { UserConfig } from 'vitest';
import { defineConfig, mergeConfig } from 'vitest/config';

import defaultConfig from './vite.config';

export default mergeConfig(
  defaultConfig as UserConfig,
  defineConfig({
    test: {
      include: ['src/**/*.spec.ts'],
      threads: true,
    },
  }) as UserConfig,
);
