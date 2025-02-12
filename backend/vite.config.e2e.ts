import { UserConfig } from 'vitest';
import { defineConfig, mergeConfig } from 'vitest/config';

import defaultConfig from './vite.config';

export default mergeConfig(
  defaultConfig as UserConfig,
  defineConfig({
    test: {
      include: ['src/**/*.test.ts'],
      threads: false,
    },
  }) as UserConfig,
);
