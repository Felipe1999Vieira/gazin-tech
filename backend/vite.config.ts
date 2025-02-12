import swc from 'unplugin-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    swc.vite({
      module: { type: 'es6' },
      jsc: {
        baseUrl: __dirname,
        paths: {
          '@/*': ['src/*'],
        },
      },
    }),
  ],
  test: {
    globals: true,
    clearMocks: true,
    passWithNoTests: true,
    threads: false,
    testTimeout: 10000,
    coverage: {
      provider: 'v8',
      reporter: [
        'json',
        ['text', { skipFull: true }],
        'lcov',
        'clover',
        'text-summary',
      ],
      exclude: [
        ...configDefaults.exclude,
        'src/*.ts',
        'src/**/*.dto.ts',
        'src/lib/**/*.ts',
        'src/adapters/**/*.ts',
        'src/**/*.mapper.ts',
        'src/**/*.entity.ts',
        'src/**/*.model.ts',
        'src/config/**/*.ts',
        'src/**/__mocks__/**/*.ts',
        'src/shared/dtos/**/*.ts',
        'src/shared/enums/**/*.ts',
      ],
    },
  },
});
