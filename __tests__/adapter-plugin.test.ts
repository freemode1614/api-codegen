// End-to-end: a custom adapter declared via `plugins` is wired into
// `codeGen()` and the generated source reflects the plugin's emission.
//
// We use a minimal in-memory adapter that emits a single `return await ky(...)`
// statement so the assertion is unambiguous.
import fs from 'node:fs/promises';
import path from 'node:path';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import type { Statement } from 'typescript';
import { factory as t } from 'typescript';
import { Adapter } from '../src/core/base/Adaptor.js';
import type {
	MediaTypeObject,
	ParameterObject,
} from '../src/core/interface.js';
import { codeGen } from '../src/openapi/index.js';
import { definePlugin } from '../src/core/plugin.js';

/**
 * Adapter that emits `return await ky(uri, { method: 'GET' });`.
 * Uses a distinctive identifier (`ky`) so the assertion is unambiguous
 * and would fail if `codeGen()` ever routed through `FetchAdapter` again.
 */
class KyLikeAdapter extends Adapter {
	readonly name = 'ky';
	readonly methodFieldName = 'method';
	readonly bodyFieldName = 'body';
	readonly headersFieldName = 'headers';
	readonly queryFieldName = 'searchParams';

	client(
		uri: string,
		method: string,
		_params: ParameterObject[],
		_body: MediaTypeObject | undefined,
		_response: MediaTypeObject | undefined,
		_adapter: Adapter,
		_bodyKind: never,
		_bodyContentType: string | undefined,
		_useJSONResponse: boolean
	): Statement[] {
		// ky(uri, { method }) is enough to prove the plugin's adapter ran.
		const call = t.createCallExpression(
			t.createIdentifier('ky'),
			[
				t.createStringLiteral(uri),
				t.createObjectLiteralExpression([
					t.createPropertyAssignment(
						'method',
						t.createStringLiteral(method.toUpperCase())
					),
				]),
			]
		);
		const stmt = t.createReturnStatement(
			t.createAwaitExpression(call)
		);
		return [stmt];
	}
}

describe('adapter plugin end-to-end', () => {
	const tmpRoot = path.join(
		process.cwd(),
		`__tests__/__tmp_adapter_plugin_${process.pid}`
	);

	beforeEach(async () => {
		await fs.mkdir(tmpRoot, { recursive: true });
	});

	afterEach(async () => {
		await fs.rm(tmpRoot, { recursive: true, force: true });
	});

	it('uses the custom adapter when selected via plugins[]', async () => {
		const specPath = path.join(tmpRoot, 'spec.json');
		await fs.writeFile(
			specPath,
			JSON.stringify({
				openapi: '3.0.0',
				info: { title: 'Plugin', version: '1.0.0' },
				paths: {
					'/plugin/ping': {
						get: {
							operationId: 'pluginPing',
							summary: 'ping via plugin',
							responses: {
								'200': {
									content: {
										'application/json': { schema: { type: 'string' } },
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
			docURL: specPath,
			output: outputPath,
			adaptor: 'ky', // unknown until the plugin below registers it
			plugins: [
				definePlugin({
					name: 'ky-adapter',
					version: '0.1.0',
					adapter: { name: 'ky', factory: () => new KyLikeAdapter() },
				}),
			],
		});

		expect(result.stats.endpoints).toBe(1);
		const written = await fs.readFile(outputPath, 'utf8');
		// Adapter contract: the plugin's adapter is what ran, not the built-in
		// `fetch` adapter. The TS printer may render the call as either
		// `ky("/plugin/ping", { method: "GET" })` or, with type-arg inference,
		// `ky<"/plugin/ping", { method: "GET" }>()`. Either way the
		// identifier is `ky`.
		expect(written).toMatch(/ky\s*[<(]\s*"/);
		expect(written).toContain('/plugin/ping');
		expect(written).toContain('method: "GET"');
		// Sanity: built-in `fetch` must NOT appear for this endpoint.
		expect(written).not.toContain('fetch(');
	});

	it('throws a helpful error for an unknown adapter (no plugin)', async () => {
		const specPath = path.join(tmpRoot, 'spec.json');
		await fs.writeFile(
			specPath,
			JSON.stringify({
				openapi: '3.0.0',
				info: { title: 'NoPlugin', version: '1.0.0' },
				paths: {},
			})
		);

		await expect(
			codeGen({
				docURL: specPath,
				output: '',
				adaptor: 'never-registered',
			})
		).rejects.toThrow(/Unknown adaptor "never-registered"/);
	});

	it('build-in "fetch" still works without any plugins', async () => {
		const specPath = path.join(tmpRoot, 'spec.json');
		await fs.writeFile(
			specPath,
			JSON.stringify({
				openapi: '3.0.0',
				info: { title: 'BuiltIn', version: '1.0.0' },
				paths: {
					'/built-in/ping': {
						get: {
							operationId: 'builtInPing',
							responses: {
								'200': {
									content: {
										'application/json': { schema: { type: 'string' } },
									},
								},
							},
						},
					},
				},
			})
		);

		const result = await codeGen({
			docURL: specPath,
			output: '',
		});

		expect(result.code).toContain('fetch(');
	});
});
