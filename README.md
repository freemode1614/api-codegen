# @moccona/apicodegen

A powerful OpenAPI code generator that automatically generates TypeScript API client code from OpenAPI specifications.

[![npm version](https://badge.fury.io/js/@moccona%2Fapicodegen.svg)](https://www.npmjs.com/package/@moccona/apicodegen)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/node-%3E%3D24-blue.svg)](https://nodejs.org)
[![Test](https://img.shields.io/badge/tests-149%20passed-green)](https://github.com/freemode1614/api-codegen)
[![Build](https://img.shields.io/badge/build-tsdown-blue)](https://github.com/freemode1614/api-codegen)

---

## Table of Contents

- [Features](#-features)
- [Quick Start](#-quick-start)
- [Installation](#-installation)
- [CLI Usage](#-cli-usage)
- [Vite Plugin](#-vite-plugin)
- [Plugins](#-plugins)
- [Generated Code](#-generated-code)
- [Supported Features](#-supported-features)
- [Examples](#-examples)
- [Troubleshooting](#-troubleshooting)
- [Development](#-development)
- [Roadmap](#-roadmap)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **Multi-version Support** | Full support for OpenAPI 2.0, 3.0, and 3.1 |
| **TypeScript First** | Generates complete type definitions and type-safe API functions |
| **Multiple Adaptors** | Built-in `fetch` and `axios` HTTP client support |
| **Pluggable Adapters** | Register custom HTTP-client adapters (`ky`, `ofetch`, …) via the plugin API |
| **Custom Providers** | Bring your own spec format (e.g. AsyncAPI 2.x) via the plugin API |
| **Generator Hooks** | `beforeEmit`, `afterFormat`, `writeFile` — plugins intercept the generator pipeline; `writeFile` may return multiple files |
| **CLI Tool** | Simple command-line interface with retro ASCII banner |
| **Vite Plugin** | Seamless integration into Vite build workflow |
| **File Upload** | Native support for multipart/form-data file uploads |
| **Complete Types** | Enums, union types, intersection types, complex nested objects |

### Key Highlights

- **Zero Runtime Dependencies** - Lightweight generated code with no external runtime
- **Type-safe** - Full TypeScript support with strict type inference
- **Circular Reference Handling** - Properly handles `$ref` loops in OpenAPI schemas
- **JSDoc Generation** - Automatic documentation from OpenAPI descriptions
- **Watch Mode** - Auto-regenerate when OpenAPI spec changes

---

## 🚀 Quick Start

```bash
# Install globally
npm install -g @moccona/apicodegen

# Generate from URL
apicodegen https://petstore3.swagger.io/api/v3/openapi.json -o ./src/api/petstore.ts

# Or use npx (no installation)
npx @moccona/apicodegen ./openapi.json -o ./src/api.ts
```

---

## 📦 Installation

```bash
# Global installation (recommended for CLI)
npm install -g @moccona/apicodegen

# Local installation for project use
npm install -D @moccona/apicodegen

# Using pnpm
pnpm add -D @moccona/apicodegen
```

### Peer Dependencies

| Package | Version | Required For |
|---------|---------|--------------|
| `typescript` | v5 | Type checking generated code |
| `prettier` | v3 | Formatting output |
| `vite` | v7 / v8 | Vite plugin only (optional) |

---

## 📋 CLI Usage

### Basic Options

| Option | Short | Description | Default |
|--------|-------|-------------|---------|
| `--output` | `-o` | Output file path | `./output.ts` |
| `--spec` | `-s` | OpenAPI spec file path or URL | Required |
| `--adaptor` | `-a` | HTTP client (`fetch` or `axios`) | `fetch` |
| `--baseURL` | `-b` | API base URL | - |
| `--config` | `-c` | Path to config file | - |
| `--watch` | `-w` | Watch for file changes | `false` |
| `--verbose` | `-v` | Enable verbose logging | `false` |

### Examples

```bash
# From remote URL
apicodegen https://api.example.com/openapi.json -o ./src/api.ts

# From local file
apicodegen ./docs/openapi.json -o ./src/generated/api.ts

# With axios and custom baseURL
apicodegen ./openapi.json -a axios -b https://api.example.com -o ./src/api.ts

# Watch mode for development
apicodegen ./openapi.yaml -w -o ./src/api.ts -v
```

---

## 🔌 Vite Plugin

Automatically generate API clients during your Vite build:

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import { apiCodeGenPlugin } from '@moccona/apicodegen/vite';

export default defineConfig({
  plugins: [
    apiCodeGenPlugin([
      {
        name: 'petstore-api',
        docURL: 'https://petstore3.swagger.io/api/v3/openapi.json',
        output: './src/api/petstore.ts',
        adaptor: 'fetch',
        baseURL: 'https://petstore3.swagger.io/api/v3',
      },
    ]),
  ],
});
```

### Plugin Options

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `name` | `string` | Yes | Human-readable API name |
| `spec` | `string` | Yes* | OpenAPI spec file path or URL |
| `docURL` | `string` | Yes* | OpenAPI document URL (alias for `spec`) |
| `output` | `string` | Yes | Output file path |
| `adaptor` | `'fetch' \| 'axios'` | No | HTTP client (default: `fetch`) |
| `baseURL` | `string` | No | API base URL |
| `importClientSource` | `string` | No | Custom client import source |
| `verbose` | `boolean` | No | Enable verbose logging |
| `typeCheck` | `boolean` | No | Run type check after generation |

*\*Either `spec` or `docURL` is required

### Custom Axios Instance

```typescript
// src/lib/api-client.ts
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000,
});

apiClient.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${getToken()}`;
  return config;
});
```

```typescript
// vite.config.ts
import { apiCodeGenPlugin } from '@moccona/apicodegen/vite';
import { apiClient } from './src/lib/api-client';

export default defineConfig({
  plugins: [
    apiCodeGenPlugin([
      {
        name: 'my-api',
        spec: './openapi.json',
        output: './src/api/generated.ts',
        adaptor: 'axios',
        importClientSource: `import { apiClient as axios } from '@/lib/api-client';`,
      },
    ]),
  ],
});
```

Generated code will use your custom instance:

```typescript
import { apiClient as axios } from '@/lib/api-client';

export async function getPetById({ petId }: { petId: number }) {
  return apiClient(`/pets/${petId}`, { method: 'GET' });
}
```

---

## 🧩 Plugins

> Status: **adapter registry (PR1) + provider registry (PR2) + generator
> hooks (PR3) shipped**. All three plugin capabilities are wired through
> `codeGen()`.

`api-codegen` ships with two built-in HTTP-client adapters (`fetch`,
`axios`) and one built-in spec-format provider (`openapi`). The plugin
API lets you register additional adapters (e.g. `ky`, `ofetch`, a
custom in-house client), custom spec providers (e.g. AsyncAPI 2.x), and
hook into the generator pipeline at three points (`beforeEmit`,
`afterFormat`, `writeFile`) — all without forking the generator.

### Quick start

In your `apicodegen.config.mjs`:

```js
import { Adapter, definePlugin } from '@moccona/apicodegen';
import { factory as t } from 'typescript';

class KyAdapter extends Adapter {
  readonly name = 'ky';
  readonly methodFieldName = 'method';
  readonly bodyFieldName = 'body';
  readonly headersFieldName = 'headers';
  readonly queryFieldName = 'searchParams';

  client(uri, method) {
    return [
      t.createReturnStatement(
        t.createAwaitExpression(
          t.createCallExpression(t.createIdentifier('ky'), [
            t.createStringLiteral(uri),
            t.createObjectLiteralExpression([
              t.createPropertyAssignment(
                'method',
                t.createStringLiteral(method.toUpperCase())
              ),
            ]),
          ])
        )
      ),
    ];
  }
}

export default {
  spec: './openapi.json',
  output: './src/api.ts',
  adaptor: 'ky',
  plugins: [
    definePlugin({
      name: 'ky-adapter',
      version: '0.1.0',
      adapter: { name: 'ky', factory: () => new KyAdapter() },
    }),
  ],
};
```

Run `apicodegen` and the generated `api.ts` will call `ky(uri, ...)` instead of the built-in `fetch(uri, ...)`.

See [`example/plugins/ky-adapter/`](example/plugins/ky-adapter/) for the runnable source.

### Plugin shape

```ts
import type { Plugin } from '@moccona/apicodegen';

const myPlugin: Plugin = {
  name: 'my-plugin',          // required, surfaced in logs
  version: '0.1.0',           // optional

  // Optional: register a custom HTTP-client adapter
  adapter: {
    name: 'ky',               // unique; collides with built-ins throw
    factory: () => new KyAdapter(),
  },

  // Optional: register a custom spec-format provider
  provider: {
    name: 'asyncapi',
    versions: ['2.6'],
    factory: (_init, doc) => ({ /* ProviderInitResult */ }),
  },

  // Optional: hook the generator pipeline (PR3)
  beforeEmit: ({ statements }) => [...statements],
  afterFormat: ({ code }) => code,
  // writeFile: return `void` to own output, or `Record<path, code>`
  // to emit multiple files via `Generator.writeMany`.
  writeFile: async ({ code }) => ({ './api.ts': code }),
};
```

`definePlugin(spec)` is a pure type helper — it returns `spec`
unchanged. Use it for IDE completion and to keep the plugin author from
accidentally omitting `name`.

A plugin entry may also be a factory:

```ts
plugins: [
  async () => {
    const mod = await import('./my-remote-adapter.js');
    return definePlugin({
      name: 'remote',
      adapter: { name: 'remote', factory: () => new mod.RemoteAdapter() },
    });
  },
],
```

Factories can be sync or async; they're resolved in parallel at the
start of every `codeGen()` run.

### Lifecycle

For each `codeGen()` invocation:

1. Built-in adapters (`fetch`, `axios`) and the built-in `openapi`
   provider are seeded.
2. User adapters/providers from previous runs are cleared.
3. Each entry in `plugins[]` is resolved (factory awaited if async).
4. Resolved plugins register their adapters and providers.
5. The adapter lookup `resolveAdapter(adaptor)` and provider lookup
   `resolveProvider(specFormat)` pick the registered ones.

State does not leak across runs: a plugin registered in run N is gone
by run N+1 unless it's re-declared in the config.

### Built-in name protection

`fetch` and `axios` (adapters) and `openapi` (provider) are reserved.
Attempting to register under one of these names throws:

```
[apicodegen] registerAdapter: "fetch" is a built-in adapter name and cannot be replaced
[apicodegen] registerProvider: "openapi" is a built-in provider name and cannot be replaced
```

This prevents silent shadowing of documented built-ins.

### Unknown adapter / provider

If `adaptor: 'something'` does not match any registered name (built-in
or plugin), `codeGen()` throws with the list of known adapters:

```
[apicodegen] Unknown adaptor "something". Registered adapters: fetch, axios, ky
```

Same for `specFormat` with the provider registry.

### Custom spec providers

Plugins can contribute a whole new spec format — most commonly an
AsyncAPI 2.x reader. `codeGen()` looks up the provider by name
(`specFormat` field) AFTER applying the plugin list, so a plugin can
register a provider and have it used in the same run.

```js
// apicodegen.config.mjs
import { definePlugin } from '@moccona/apicodegen';

export default {
  spec: './asyncapi.json',
  output: './src/api.ts',
  specFormat: 'asyncapi', // routes to the plugin below
  plugins: [
    definePlugin({
      name: 'asyncapi-provider',
      provider: {
        name: 'asyncapi',
        versions: ['2.0', '2.1', '2.2', '2.3', '2.4', '2.5', '2.6'],
        factory: (_init, doc) => {
          // parse `doc` and return a ProviderInitResult
          return {
            enums: [],
            schemas: {},
            parameters: {},
            responses: {},
            requestBodies: {},
            apis: {
              '/user/signedup': [
                {
                  method: 'get',
                  operationId: 'onUserSignedup',
                  summary: 'channel /user/signedup',
                  responses: [],
                },
              ],
            },
          };
        },
      },
    }),
  ],
};
```

A few things to note:

- **Built-in name `openapi` is reserved** — attempting to register a
  provider under that name throws.
- **The factory receives a narrow view** of `ProviderInitOptions` (only
  `docURL`, `baseURL`, `output`). Plugins do not see internal config
  like `plugins` itself.
- **Factories may be sync or async.** They're awaited at most once per
  `codeGen()` run.

See [`example/plugins/asyncapi-provider/`](example/plugins/asyncapi-provider/) for a runnable end-to-end example.

### Generator hooks

Hooks let plugins intercept the generator pipeline at three points.
All hook slots are optional on the `Plugin` interface.

```js
import { definePlugin } from '@moccona/apicodegen';
import { factory as t } from 'typescript';

const hookPlugin = definePlugin({
  name: 'banner-and-extra-method',
  version: '0.1.0',

  // (1) Before the printer runs — append an extra statement.
  beforeEmit: ({ statements }) => [
    ...statements,
    t.createExpressionStatement(
      t.createStringLiteral('/* Generated at ' + new Date().toISOString() + ' */')
    ),
  ],

  // (2) After prettier — prepend a banner.
  afterFormat: ({ code }) => `// @generated\n${code}`,

  // (3) Replace the file writer entirely.
  writeFile: async ({ code, output }) => {
    const { writeFile } = await import('node:fs/promises');
    await writeFile(output, code);
  },
});
```

See [`example/plugins/banner-and-timestamp/`](example/plugins/banner-and-timestamp/) for a runnable end-to-end example.

#### Hook context

Every hook receives a context object:

```ts
interface GeneratorHookContext<K> {
  initOptions: ProviderInitOptions;        // frozen snapshot
  schema: ProviderInitResult;              // frozen snapshot
  adapter: Adapter;                        // shallow-frozen (methods still work)
  output: string;                          // immutable
  statements: ReadonlyArray<Statement>;    // array frozen; nodes untouched
  code: string;                            // immutable
  kind: K;                                 // 'beforeEmit' | 'afterFormat' | 'writeFile'
}
```

**Important: hooks receive a deep-frozen snapshot.** Plain-data fields
(`initOptions`, `schema`, `code`) are cloned at every level so a plugin
cannot mutate upstream state. Class-instance fields (`adapter`,
`ts.Node` statements) are shallow-frozen — new properties cannot be
added, but methods remain callable and TypeScript compiler internals
are preserved.

#### Hook ordering

- `beforeEmit` and `afterFormat` run in **plugin-list order**, and each
  hook receives the previous hook's output.
- `writeFile` is **exclusive**: the first plugin in `plugins[]` that
  declares one wins. Subsequent `writeFile` hooks are skipped. The
  hook's return value controls what gets written:
  - **Return `void`/`undefined`** → the plugin owns output. The framework
    does NOT fall through to the built-in `Generator.write` (that would
    clobber whatever the plugin already wrote). The hook may call
    `Generator.write` itself to fall back to the built-in writer.
  - **Return `Record<path, code>`** → the framework calls
    `Generator.writeMany()` to write each entry. Parent directories are
    auto-created (`mkdir -p`). This is how a plugin emits multiple
    files (e.g. `api.ts` + `types.ts` + `schemas.ts`). See
    [`example/plugins/multi-file-output/`](example/plugins/multi-file-output/).

#### Pitfalls

- **Always destructure the hook context.** Writing
  `beforeEmit: (statements) => ...` does NOT work — the hook receives
  a `ctx` object, so `statements` would be the `initOptions` field
  (the first field of `ctx`) instead of `statements`. Use
  `beforeEmit: ({ statements }) => ...`.
- **`Statement` nodes are not frozen individually.** TypeScript's
  compiler API mutates internal fields (`pos`, `end`, `flags`) during
  printing; freezing a `ts.Node` would corrupt those invariants. The
  array that holds them is frozen; node-level immutability relies on
  plugins behaving themselves.

### Limitations

- **No npm auto-discovery** — plugins are declared inline in your
  config. Package-based discovery (e.g. `apicodegen-plugin-*` in
  `node_modules`) is intentionally out of scope until there's evidence
  the ergonomics are worth it.
- **No hot reload** — `codeGen()` runs to completion per invocation.
  The Vite plugin watches and re-runs on config changes but does not
  stream partial updates.
- **No plugin ordering guarantees** — adapters/providers are looked
  up by name, so registration order does not matter (except for
  `beforeEmit`/`afterFormat` chaining and `writeFile` exclusivity, both
  described above).

### See also

- [`example/plugins/ky-adapter/`](example/plugins/ky-adapter/) — runnable custom-adapter example.
- [`example/plugins/asyncapi-provider/`](example/plugins/asyncapi-provider/) — runnable AsyncAPI provider.
- [`example/plugins/banner-and-timestamp/`](example/plugins/banner-and-timestamp/) — runnable generator-hook example.
- [`example/plugins/multi-file-output/`](example/plugins/multi-file-output/) — runnable multi-file-output example.
- [`src/core/plugin.ts`](src/core/plugin.ts) — the `Plugin` interface and `definePlugin`.
- [`src/core/registry.ts`](src/core/registry.ts) — the adapter registry.
- [`src/core/provider-registry.ts`](src/core/provider-registry.ts) — the provider registry.
- [`src/core/generator-hooks.ts`](src/core/generator-hooks.ts) — hook contracts.
- [`src/core/hook-runner.ts`](src/core/hook-runner.ts) — hook runner with frozen-context guarantees.
- [`src/core/ctx-freeze.ts`](src/core/ctx-freeze.ts) — deep-freeze helper for hook snapshots.
- [`src/core/plugin-loader.ts`](src/core/plugin-loader.ts) — `applyPlugins()`.

---

## 📝 Generated Code

Given this OpenAPI spec:

```yaml
paths:
  /pets/{petId}:
    get:
      operationId: getPetById
      summary: Get a pet by ID
      parameters:
        - name: petId
          in: path
          required: true
          schema:
            type: integer
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Pet'

components:
  schemas:
    Pet:
      type: object
      properties:
        id:
          type: integer
        name:
          type: string
        status:
          type: string
          enum: [available, pending, sold]
```

The generated TypeScript code:

```typescript
/**
 * Get a pet by ID
 */
export async function getPetById({ petId }: { petId: number }) {
  return fetch(`/pets/${petId}`, {
    method: 'GET',
  }).then(async (response) => (await response.json()) as Pet);
}

/**
 * Pet object
 */
export type Pet = {
  id?: number;
  name?: string;
  status?: 'available' | 'pending' | 'sold';
};
```

---

## 🎯 Supported Features

### Schema Types

| Type | Status | Notes |
|------|--------|-------|
| `string` | ✅ | Full support with formats |
| `number` / `integer` | ✅ | int8, uint8, int16, etc. |
| `boolean` | ✅ | Full support |
| `object` | ✅ | Complex nested objects |
| `array` | ✅ | Nested and multi-dimensional |
| `enum` | ✅ | Auto-generated TypeScript enums |
| `oneOf` / `anyOf` | ✅ | Union types with deduplication |
| `allOf` | ✅ | Intersection types |
| `$ref` | ✅ | Circular reference handling |
| `binary` / `blob` / `file` | ✅ | File upload types |

### Parameter Locations

| Location | Status | Example |
|----------|--------|---------|
| `path` | ✅ | `/users/{id}` |
| `query` | ✅ | `?page=1&limit=10` |
| `header` | ✅ | `X-API-Key: xxx` |
| `cookie` | ✅ | `session=xxx` |
| `body` | ✅ | JSON and FormData |

### Request Body Formats

| Content-Type | Status |
|--------------|--------|
| `application/json` | ✅ |
| `multipart/form-data` | ✅ |
| `application/x-www-form-urlencoded` | ✅ |
| `text/plain` | ✅ |
| `image/*` | ✅ |

### OpenAPI Versions

| Version | Status |
|---------|--------|
| OpenAPI 2.0 (Swagger) | ✅ |
| OpenAPI 3.0 | ✅ |
| OpenAPI 3.1 | ✅ |

---

## 📖 Examples

### Complete API with Authentication

```bash
apicodegen https://api.example.com/openapi.json \
  -o ./src/api.ts \
  -a fetch \
  -b https://api.example.com \
  -v
```

### Using Custom Axios with Interceptors

See [Custom Axios Instance](#custom-axios-instance) section above.

### Watch Mode for Development

```bash
apicodegen ./openapi.json \
  --watch \
  --output ./src/generated/api.ts \
  --verbose
```

---

## 🔧 Troubleshooting

### Common Issues

**"Command not found" after installation**
```bash
# Reinstall globally
npm install -g @moccona/apicodegen

# Or use npx
npx @moccona/apicodegen <url> -o ./src/api.ts
```

**Network errors when fetching OpenAPI documents**
- Verify the URL is publicly accessible
- Try downloading the document locally first
- Check firewall/proxy settings
- Use `-v` flag for verbose logging

**TypeScript errors in generated code**
- Ensure `typescript` is installed: `npm install -D typescript`
- Run `tsc --noEmit` to see specific errors
- Verify your `tsconfig.json` is properly configured

**Vite plugin not generating files**
- Ensure Node.js 24+ is installed
- Check that all required options (`name`, `output`) are provided
- Set `verbose: true` in plugin options

**Watch mode not triggering regeneration**
- Watch mode monitors the spec file, not your output file
- Ensure the spec file path is correct
- Try restarting the watch process

### Getting Help

- 📄 [CHANGELOG](CHANGELOG.md) - Recent updates
- 🐛 [GitHub Issues](https://github.com/freemode1614/api-codegen/issues) - Report bugs
- 📖 [docs/roadmap.md](docs/roadmap.md) - Future plans

---

## 🔧 Development

```bash
# Install dependencies
pnpm install

# Development mode (watch)
pnpm dev

# Build for production
pnpm build

# Run all tests
pnpm test

# Type check
pnpm typecheck

# Lint
pnpm lint

# Format code
pnpm format
```

### Project Structure

```
src/
├── cli.ts              # CLI entry point
├── cli/                # CLI modules
├── core/               # Core code generation
│   ├── generator/      # TypeScript AST generation
│   ├── client/         # fetch/axios adaptors
│   ├── base/           # Base utilities
│   ├── plugin.ts       # Plugin contract (PR1+PR2+PR3)
│   ├── registry.ts     # Adapter registry
│   ├── provider-registry.ts # Spec-format provider registry
│   ├── generator-hooks.ts # Hook contracts (PR3)
│   ├── hook-runner.ts  # Hook runner + frozen-ctx helpers
│   ├── ctx-freeze.ts   # Deep-freeze utility for hook snapshots
│   ├── plugin-loader.ts # applyPlugins()
│   └── constants/      # Constants
├── openapi/            # OpenAPI spec parsing
│   ├── V2.ts           # OpenAPI 2.0
│   ├── V3.ts           # OpenAPI 3.0
│   └── V3_1.ts         # OpenAPI 3.1
├── vite-plugin/        # Vite plugin
└── types/              # TypeScript types
```

---

## 🗺️ Roadmap

See [docs/roadmap.md](docs/roadmap.md) for detailed future plans:

- **v0.1.0** - TypeScript strict mode, config files, enhanced errors
- **v0.2.0** - Plugin system, template engine, incremental generation
- **v0.3.0** - VSCode LSP, GitHub Action, mock server
- **v0.4.0+** - Web UI, GraphQL support

---

## 📄 License

[MIT](LICENSE) © freemode

## 🤝 Contributing

Issues and Pull Requests are welcome!

- 📘 [Contributing Guide](./CONTRIBUTING.md) — dev setup, code style, PR process
- 📜 [Code of Conduct](./CODE_OF_CONDUCT.md) — community norms & engineering standards
- 🔒 [Security Policy](./SECURITY.md) — how to report vulnerabilities privately
- 💬 [GitHub Discussions](https://github.com/freemode1614/api-codegen/discussions) — questions & ideas

When opening an issue, you'll be guided through **Bug Report**, **Feature Request**,
**Documentation**, or **Question** templates so we can help you faster.

By participating in this project you agree to abide by the [Code of Conduct](./CODE_OF_CONDUCT.md).

---

*Questions or suggestions? [Start a discussion](https://github.com/freemode1614/api-codegen/discussions)
or [open an issue](https://github.com/freemode1614/api-codegen/issues).*