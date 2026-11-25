import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [tsconfigPaths()],
	test: {
		testTimeout: 100000,
	},
	coverage: {
		include: ['src/**'],
		// Floors, not targets — CI runs with `--coverage`, local runs don't.
		thresholds: {
			statements: 85,
			branches: 80,
			functions: 90,
			lines: 85,
		},
	},
});