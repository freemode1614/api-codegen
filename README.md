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
| `vite` | v7 | Vite plugin only |

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

---

*Questions or suggestions? [Open an issue](https://github.com/freemode1614/api-codegen/issues)*