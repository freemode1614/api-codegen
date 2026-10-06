// Example: multi-file output via the writeFile hook (PR4 extension).
//
// Demonstrates the new `Record<path, code>` return shape of `writeFile`:
// the plugin splits the generated source into three files
//
//   - src/api.ts        — the per-endpoint functions (default path)
//   - src/types.ts      — a marker type module
//   - src/schemas.ts    — an empty schema barrel
//
// Generator.writeMany() auto-creates any missing parent directories, so
// the plugin does not need to mkdir manually.
//
// Run from repo root:
//   pnpm exec tsdown
//   node bin/cli.cjs \
//     --config example/plugins/multi-file-output/apicodegen.config.mjs \
//     example/plugins/multi-file-output/petstore.json

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { definePlugin } from '../../../npm/index.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, 'src');

/** @type {import('../../../npm/index.mjs').Plugin} */
const multiFilePlugin = definePlugin({
	name: 'example-multi-file-output',
	version: '0.1.0',

	writeFile: ({ code }) => ({
		[path.join(outDir, 'api.ts')]: `// AUTO-GENERATED — split from a single source.\n${code}`,
		[path.join(outDir, 'types.ts')]:
			'// AUTO-GENERATED type barrel.\nexport type ApiSource = "split";\n',
		[path.join(outDir, 'schemas.ts')]:
			'// AUTO-GENERATED schema barrel.\nexport {};\n',
	}),
});

export default {
	spec: path.join(__dirname, 'petstore.json'),
	output: path.join(outDir, 'api.ts'),
	plugins: [multiFilePlugin],
};
