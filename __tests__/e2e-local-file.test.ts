// End-to-end smoke test of the file:// fix, exercising the
// exact same dispatch path the CLI / Vite plugin use.
import fs from 'node:fs/promises';
import path from 'node:path';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

// Stub undici — the local-file branch must never reach it.
vi.mock('undici', async () => {
	const actual = await vi.importActual<typeof import('undici')>('undici');
	return {
		...actual,
		request: vi.fn(),
	};
});

import { codeGen } from '../src/openapi/index.js';
import { request } from 'undici';

const mockedRequest = vi.mocked(request);

describe('end-to-end local-file generation', () => {
	const tmpRoot = path.join(
		process.cwd(),
		`__tests__/__tmp_e2e_local_${process.pid}`
	);

	beforeEach(async () => {
		await fs.mkdir(tmpRoot, { recursive: true });
		mockedRequest.mockReset();
	});

	afterEach(async () => {
		await fs.rm(tmpRoot, { recursive: true, force: true });
	});

	it('generates code from a file:// URL', async () => {
		const specPath = path.join(tmpRoot, 'petstore.json');
		await fs.writeFile(
			specPath,
			JSON.stringify({
				openapi: '3.0.0',
				info: { title: 'Petstore', version: '1.0.0' },
				paths: {
					'/pets/{petId}': {
						get: {
							operationId: 'getPetById',
							summary: 'Get a pet by ID',
							parameters: [
								{
									name: 'petId',
									in: 'path',
									required: true,
									schema: { type: 'integer' },
								},
							],
							responses: {
								'200': {
									content: {
										'application/json': {
											schema: {
												type: 'object',
												properties: { id: { type: 'integer' } },
											},
										},
									},
								},
							},
						},
					},
				},
			})
		);

		const outputPath = path.join(tmpRoot, 'api.ts');
		const result = await codeGen({
			docURL: `file://${specPath}`,
			output: outputPath,
			baseURL: 'https://api.example.com',
		});

		expect(result.stats.endpoints).toBe(1);
		expect(result.stats.schemas).toBe(0);
		expect(mockedRequest).not.toHaveBeenCalled();

		const written = await fs.readFile(outputPath, 'utf8');
		expect(written).toContain('export async function getPetById');
		expect(written).toContain('fetch');
	});

	it('generates code from an absolute filesystem path', async () => {
		const specPath = path.join(tmpRoot, 'spec.json');
		await fs.writeFile(
			specPath,
			JSON.stringify({
				openapi: '3.0.0',
				info: { title: 'X', version: '1' },
				paths: {
					'/ping': {
						get: {
							operationId: 'ping',
							responses: {
								'200': {
									content: {
										'application/json': {
											schema: { type: 'string' },
										},
									},
								},
							},
						},
					},
				},
			})
		);

		const result = await codeGen({
			docURL: specPath, // plain absolute path
			output: '',
		});

		expect(result.stats.endpoints).toBe(1);
		expect(result.code).toContain('export async function ping');
		expect(mockedRequest).not.toHaveBeenCalled();
	});

	it('surfaces ApicodegenError for missing local files', async () => {
		const { ApicodegenError } = await import('../src/core/errors.js');

		await expect(
			codeGen({
				docURL: `file://${path.join(tmpRoot, 'missing.json')}`,
				output: '',
			})
		).rejects.toBeInstanceOf(ApicodegenError);
	});

	it('surfaces ApicodegenError for invalid JSON local files', async () => {
		const specPath = path.join(tmpRoot, 'broken.json');
		await fs.writeFile(specPath, '{ this is not json');
		const { ApicodegenError } = await import('../src/core/errors.js');

		await expect(
			codeGen({ docURL: specPath, output: '' })
		).rejects.toBeInstanceOf(ApicodegenError);
	});

	it('still works for http URLs (regression check)', async () => {
		mockedRequest.mockResolvedValue({
			statusCode: 200,
			body: {
				json: vi.fn().mockResolvedValue({
					openapi: '3.0.0',
					info: { title: 'Remote', version: '1' },
					paths: {},
				}),
			},
		} as never);

		const result = await codeGen({
			docURL: 'https://example.com/spec.json',
			output: '',
		});

		expect(result.code).toContain('// No api declaration found.');
		expect(mockedRequest).toHaveBeenCalledTimes(1);
	});

	it('CLI-style relative path resolution: anchor to cwd, then read locally', async () => {
		// Mirrors the CLI's resolveDocURL() behaviour: relative paths are
		// resolved against cwd before being passed to codeGen. The generator
		// must never reach undici for these.
		const specPath = path.join(tmpRoot, 'rel-petstore.json');
		await fs.writeFile(
			specPath,
			JSON.stringify({
				openapi: '3.0.0',
				info: { title: 'Rel', version: '1' },
				paths: {
					'/rel': {
						get: {
							operationId: 'relOp',
							responses: {
								'200': {
									content: { 'application/json': { schema: { type: 'string' } } },
								},
							},
						},
					},
				},
			})
		);

		const originalCwd = process.cwd();
		process.chdir(tmpRoot);
		try {
			const cliResolved = path.resolve(process.cwd(), './rel-petstore.json');
			expect(cliResolved).toBe(specPath);

			const result = await codeGen({
				docURL: cliResolved,
				output: '',
			});

			expect(result.code).toContain('export async function relOp');
			expect(mockedRequest).not.toHaveBeenCalled();
		} finally {
			process.chdir(originalCwd);
		}
	});
});