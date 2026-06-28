import { describe, expect, it, vi } from 'vitest';
import { banner } from '../src/cli/banner.js';
import { logger } from '../src/core/logger.js';

describe('logger', () => {
	describe('banner', () => {
		it('should output banner with version', () => {
			const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
			banner.print('1.0.0');

			expect(logSpy).toHaveBeenCalledTimes(1);
			expect(logSpy.mock.calls[0][0]).toContain('API Code Generator v1.0.0');
			logSpy.mockRestore();
		});
	});

	describe('success', () => {
		it('should output success message with checkmark', () => {
			const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
			logger.success('Generated api.ts');

			expect(logSpy).toHaveBeenCalledTimes(1);
			expect(logSpy.mock.calls[0][0]).toContain('✓');
			expect(logSpy.mock.calls[0][0]).toContain('Generated api.ts');
			logSpy.mockRestore();
		});
	});

	describe('error', () => {
		it('should output error with ApicodegenError', () => {
			const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
			const error = {
				code: 'E_SPEC_NOT_FOUND',
				message: 'Spec not found',
				toString: () => 'Error [E_SPEC_NOT_FOUND] Spec not found',
			};

			logger.error(error);

			expect(errorSpy).toHaveBeenCalledTimes(1);
			expect(errorSpy.mock.calls[0][0]).toContain('✗');
			errorSpy.mockRestore();
		});

		it('should output error with regular Error', () => {
			const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
			const error = new Error('Something went wrong');

			logger.error(error);

			expect(errorSpy).toHaveBeenCalledTimes(1);
			expect(errorSpy.mock.calls[0][0]).toContain('✗');
			expect(errorSpy.mock.calls[0][0]).toContain('Something went wrong');
			errorSpy.mockRestore();
		});

		it('should output error with primitive value', () => {
			const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
			logger.error('Unknown error');

			expect(errorSpy).toHaveBeenCalledTimes(1);
			expect(errorSpy.mock.calls[0][0]).toContain('Unknown error');
			errorSpy.mockRestore();
		});
	});

	describe('info', () => {
		it('should output info message', () => {
			const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
			logger.info('Usage: apicodegen [spec]');

			expect(logSpy).toHaveBeenCalledTimes(1);
			expect(logSpy.mock.calls[0][0]).toContain('ℹ');
			expect(logSpy.mock.calls[0][0]).toContain('Usage: apicodegen [spec]');
			logSpy.mockRestore();
		});
	});

	describe('warn', () => {
		it('should output warning message', () => {
			const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
			logger.warn('No API configurations provided');

			expect(logSpy).toHaveBeenCalledTimes(1);
			expect(logSpy.mock.calls[0][0]).toContain('⚠');
			expect(logSpy.mock.calls[0][0]).toContain('No API configurations provided');
			logSpy.mockRestore();
		});
	});

	describe('loading', () => {
		it('should output loading message', () => {
			const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
			logger.loading('Fetching spec...');

			expect(logSpy).toHaveBeenCalledTimes(1);
			expect(logSpy.mock.calls[0][0]).toContain('🔄');
			expect(logSpy.mock.calls[0][0]).toContain('Fetching spec...');
			logSpy.mockRestore();
		});
	});

	describe('watching', () => {
		it('should output watching message', () => {
			const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
			logger.watching('Watching for changes...');

			expect(logSpy).toHaveBeenCalledTimes(1);
			expect(logSpy.mock.calls[0][0]).toContain('⟳');
			expect(logSpy.mock.calls[0][0]).toContain('Watching for changes...');
			logSpy.mockRestore();
		});
	});

	describe('fileChange', () => {
		it('should output file change message', () => {
			const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
			logger.fileChange('/path/to/spec.json');

			expect(logSpy).toHaveBeenCalledTimes(1);
			expect(logSpy.mock.calls[0][0]).toContain('↓');
			expect(logSpy.mock.calls[0][0]).toContain('/path/to/spec.json');
			logSpy.mockRestore();
		});
	});

	describe('fileAdd', () => {
		it('should output file add message', () => {
			const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
			logger.fileAdd('/path/to/spec.json');

			expect(logSpy).toHaveBeenCalledTimes(1);
			expect(logSpy.mock.calls[0][0]).toContain('+');
			expect(logSpy.mock.calls[0][0]).toContain('/path/to/spec.json');
			logSpy.mockRestore();
		});
	});

	describe('shutdown', () => {
		it('should output shutdown message', () => {
			const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
			logger.shutdown();

			expect(logSpy).toHaveBeenCalledTimes(1);
			expect(logSpy.mock.calls[0][0]).toContain('👋');
			expect(logSpy.mock.calls[0][0]).toContain('Shutting down');
			logSpy.mockRestore();
		});
	});
});