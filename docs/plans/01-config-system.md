# Config System Design Plan

## Goals
1. Unified config schema for both CLI and Vite plugin
2. Single source of truth - config file works for both entry points
3. Support multiple config file formats and locations
4. Environment variable overrides
5. Clear merge strategy: defaults < config file < CLI/Vite args

---

## Design

### 1. Shared Config Interface (`src/core/config.ts`)

```typescript
export interface ApicodegenConfig {
  // Required
  spec: string;  // OpenAPI spec URL or path
  
  // Output
  output: string;
  
  // Client options
  adaptor?: 'fetch' | 'axios';
  baseURL?: string;
  importClientSource?: string;
  
  // Generation options
  verbose?: boolean;
  typeCheck?: boolean;
  watch?: boolean;
  
  // Request options for fetching spec
  requestOptions?: {
    headers?: Record<string, string>;
    timeout?: number;
  };
}

export interface ApicodegenOptions extends ApicodegenConfig {
  // For CLI
  configFile?: string;
  // For Vite
  name?: string;
}
```

### 2. Config File Locations (priority order)

1. `--config <path>` CLI option
2. Environment: `APICODEGEN_CONFIG`
3. Project root:
   - `apicodegen.config.json`
   - `apicodegen.config.js`
   - `.apicodegenrc.json`
   - `.apicodegenrc.js`
4. `package.json` `apicodegen` field

### 3. Environment Variable Mapping

| Env Var | Config Field |
|---------|--------------|
| `APICODEGEN_SPEC` | spec |
| `APICODEGEN_OUTPUT` | output |
| `APICODEGEN_BASE_URL` | baseURL |
| `APICODEGEN_ADAPTOR` | adaptor |
| `APICODEGEN_VERBOSE` | verbose |

### 4. Merge Strategy

```
defaults < env vars < config file < CLI args / Vite options
```

### 5. Multi-spec Support

Config file can define multiple specs:

```json
{
  "specs": [
    { "name": "api1", "spec": "./openapi1.json", "output": "./src/api1.ts" },
    { "name": "api2", "spec": "./openapi2.json", "output": "./src/api2.ts" }
  ]
}
```

Or CLI can be called multiple times.

---

## File Changes

### New Files
- `src/core/config.ts` - Unified config interface and loader

### Modified Files
- `src/core/interface.ts` - Re-export config from config.ts
- `src/cli.ts` - Use unified config loader
- `src/vite-plugin/index.ts` - Use unified config loader

---

## Implementation Steps

1. Create `src/core/config.ts` with:
   - `ApicodegenConfig` interface
   - `loadConfig(options)` function
   - `mergeConfigs()` function
   - `resolveConfigPath()` function

2. Update `src/core/interface.ts` to re-export config types

3. Update CLI to use config loader

4. Update Vite plugin to use config loader

5. Add tests for config loading

---

## API Examples

### Config File (JSON)
```json
{
  "spec": "./openapi.json",
  "output": "./src/api/generated.ts",
  "adaptor": "fetch",
  "baseURL": "https://api.example.com",
  "verbose": false
}
```

### Config File (JS)
```javascript
// apicodegen.config.js
export default {
  spec: './openapi.json',
  output: './src/api/generated.ts',
  watch: process.env.NODE_ENV === 'development'
};
```

### CLI Usage
```bash
# From config file
apicodegen

# With overrides
apicodegen --spec ./v2.json --output ./api-v2.ts

# With env var
APICODEGEN_SPEC=http://localhost:3000/openapi.json apicodegen
```

### Vite Plugin Usage
```typescript
// vite.config.ts
import { apiCodeGenPlugin } from '@moccona/apicodegen/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    apiCodeGenPlugin([
      // From config file
      { name: 'my-api' },
      // With overrides
      { name: 'v2-api', spec: './openapi-v2.json', output: './src/api/v2.ts' }
    ])
  ]
});
```