# @moccona/apicodegen

A powerful OpenAPI code generator that automatically generates TypeScript API client code from OpenAPI specifications.

[![npm version](https://badge.fury.io/js/@moccona%2Fapicodegen.svg)](https://www.npmjs.com/package/@moccona/apicodegen)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🚀 **Multi-version Support** - Full support for OpenAPI 2.0, 3.0, and 3.1
- 📝 **TypeScript First** - Generates complete type definitions and type-safe API functions
- 🔌 **Multiple Adaptors** - Built-in `fetch` and `axios` HTTP client support
- 🛠️ **CLI Tool** - Simple and user-friendly command-line interface with retro ASCII banner
- ⚡ **Vite Plugin** - Seamless integration into Vite build workflow
- 📦 **File Upload** - Native support for multipart/form-data file uploads
- 🎯 **Complete Types** - Supports enums, union types, intersection types, complex nested objects, and more

## 📦 Installation

```bash
# Global installation (recommended for CLI usage)
npm install -g @moccona/apicodegen

# Local installation
npm install -D @moccona/apicodegen

# Using pnpm
pnpm add -D @moccona/apicodegen
```

## 🚀 Quick Start

### CLI Usage

```bash
# Basic usage
apicodegen <OpenAPI文档URL> -o ./src/api.ts

# Full example
apicodegen https://api.example.com/openapi.json \
  -o ./src/api.ts \
  -a fetch \
  -b https://api.example.com \
  -v
```

### Options

| Option | Short | Description | Default |
|--------|-------|-------------|---------|
| `--output` | `-o` | Output file path | `./output.ts` |
| `--spec` | `-s` | OpenAPI spec file path or URL | - |
| `--adaptor` | `-a` | HTTP client adaptor (`fetch` or `axios`) | `fetch` |
| `--baseURL` | `-b` | API base URL | - |
| `--config` | `-c` | Path to config file | - |
| `--watch` | `-w` | Watch for file changes | - |
| `--verbose` | `-v` | Enable verbose logging | `false` |

## 📖 Usage Examples

### 1. Basic Code Generation

```bash
# From remote OpenAPI document
apicodegen https://petstore3.swagger.io/api/v3/openapi.json -o ./api/petstore.ts

# From local file
apicodegen ./docs/openapi.json -o ./src/generated/api.ts
```

### 2. Using Axios Adaptor

```bash
apicodegen https://api.example.com/openapi.json \
  -o ./src/api.ts \
  -a axios \
  -b https://api.example.com
```

### 3. Watch Mode

```bash
# Watch for file changes and regenerate
apicodegen ./openapi.yaml -w -o ./src/api.ts
```

## 🔌 Vite Plugin

Automatically integrate code generation into your Vite project:

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import { apiCodeGenPlugin } from '@moccona/apicodegen/vite-plugin';

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

### Vite Plugin Options

| Option | Type | Description |
|--------|------|-------------|
| `name` | `string` | Human-readable API name (required) |
| `spec` | `string` | OpenAPI spec file path or URL |
| `output` | `string` | Output file path (required) |
| `adaptor` | `'fetch' \| 'axios'` | HTTP client adaptor |
| `baseURL` | `string` | API base URL |
| `verbose` | `boolean` | Enable verbose logging |
| `typeCheck` | `boolean` | Run type check after generation (default: true) |

## 📝 Generated Code Example

Given the following OpenAPI definition:

```yaml
paths:
  /pets/{petId}:
    get:
      operationId: getPetById
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
 * Pet object
 */
export type Pet = {
  id?: number;
  name?: string;
  status?: 'available' | 'pending' | 'sold';
};

/**
 * Get a pet by ID
 */
export async function getPetById({ petId }: { petId: number }) {
  return fetch(`/pets/${petId}`, {
    method: 'GET',
  }).then(async (response) => (await response.json()) as Pet);
}
```

## 🎯 Supported OpenAPI Features

### Schema Types
- ✅ Basic types: `string`, `number`, `integer`, `boolean`
- ✅ Complex objects: `object` and property definitions
- ✅ Array types: `array` and nested arrays
- ✅ Enum types: Automatically generate TypeScript enums
- ✅ Union types: `oneOf`, `anyOf`
- ✅ Intersection types: `allOf`
- ✅ Reference types: `$ref` with circular reference handling
- ✅ File types: `binary`, `blob`, `file` formats

### Parameter Locations
- ✅ Path parameters: `/users/{id}`
- ✅ Query parameters: `?page=1&limit=10`
- ✅ Header parameters: Custom request headers
- ✅ Cookie parameters: Request cookies
- ✅ Body parameters: JSON and FormData

### Request Body Formats
- ✅ `application/json` - JSON data
- ✅ `multipart/form-data` - File uploads
- ✅ `application/x-www-form-urlencoded` - Form data
- ✅ `text/plain`, `image/*` - Binary data

## 🔧 Development

```bash
# Install dependencies
pnpm install

# Development mode
pnpm dev

# Build
pnpm build

# Run tests
pnpm test

# Lint
pnpm lint

# Format
pnpm format
```

## 📄 License

[MIT](LICENSE) © freemode

## 🤝 Contributing

Issues and Pull Requests are welcome!

---

Questions or suggestions? Visit [GitHub Issues](https://github.com/freemode1614/api-codegen/issues).