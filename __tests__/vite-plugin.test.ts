import { describe, expect, it, vi } from 'vitest';
import { apiCodeGenPlugin } from '../src/vite-plugin/index';

vi.mock('@/openapi', () => ({
	codeGen: vi.fn(),
}));

describe('apiCodeGenPlugin', () => {
	describe('options validation', () => {
		it('should return a noop plugin when options is empty', () => {
			const plugin = apiCodeGenPlugin([]);
			expect(plugin).toEqual({ name: 'api-code-gen' });
		});

		it('should return a noop plugin when options is not an array', () => {
			const plugin = apiCodeGenPlugin(null as any);
			expect(plugin).toEqual({ name: 'api-code-gen' });
		});

		it('should return a noop plugin when options is undefined', () => {
			const plugin = apiCodeGenPlugin(undefined as any);
			expect(plugin).toEqual({ name: 'api-code-gen' });
		});
	});

	describe('plugin structure', () => {
		it('should create a plugin with correct name', () => {
			const plugin = apiCodeGenPlugin([{ name: 'test-api' }]);
			expect(plugin.name).toBe('api-code-gen');
		});

		it('should have a config hook', () => {
			const plugin = apiCodeGenPlugin([{ name: 'test-api' }]);
			expect(plugin).toHaveProperty('config');
			expect(typeof plugin.config).toBe('function');
		});
	});
});