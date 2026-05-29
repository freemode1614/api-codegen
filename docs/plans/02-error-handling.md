# Error Handling Improvement Plan

## Goals
1. Actionable error messages with context
2. Clear error categorization
3. Helpful suggestions for fixes
4. Consistent error format across CLI and Vite plugin

---

## Design

### 1. Error Categories

| Category | Code | Description |
|----------|------|-------------|
| `E_SPEC_NOT_FOUND` | 1 | Spec file doesn't exist |
| `E_SPEC_FETCH_FAILED` | 2 | Failed to fetch spec from URL |
| `E_SPEC_PARSE_FAILED` | 3 | Invalid JSON/YAML in spec |
| `E_OUTPUT_DIR_MISSING` | 4 | Output directory doesn't exist |
| `E_CONFIG_INVALID` | 5 | Invalid config file |
| `E_VALIDATION_FAILED` | 6 | Validation errors in spec |
| `E_GENERATION_FAILED` | 7 | Code generation error |
| `E_TYPE_CHECK_FAILED` | 8 | TypeScript check failed |

### 2. Error Class Structure

```typescript
export interface ApicodegenErrorContext {
  /** Error code */
  code: string;
  /** Human readable message */
  message: string;
  /** File/URL related to error */
  location?: string;
  /** Line number if applicable */
  line?: number;
  /** Related schema/path if applicable */
  path?: string;
  /** Suggested fixes */
  suggestions?: string[];
  /** Original error */
  cause?: Error;
}

export class ApicodegenError extends Error {
  code: string;
  location?: string;
  line?: number;
  path?: string;
  suggestions: string[];
  
  constructor(context: ApicodegenErrorContext);
  
  toString(verbose?: boolean): string;
  toJSON(): object;
}
```

### 3. Validation Pipeline

```
1. Check spec file exists (E_SPEC_NOT_FOUND)
2. Fetch spec (E_SPEC_FETCH_FAILED)
3. Validate JSON/YAML (E_SPEC_PARSE_FAILED)
4. Validate OpenAPI structure (E_VALIDATION_FAILED)
5. Generate code (E_GENERATION_FAILED)
6. Type check (E_TYPE_CHECK_FAILED)
```

### 4. Error Output Format

**Default mode:**
```
Error [E_SPEC_NOT_FOUND]: OpenAPI spec file not found
  → Location: ./openapi.json
  → Suggestion: Check if the file exists or provide correct path
```

**Verbose mode:**
```
Error [E_SPEC_NOT_FOUND]: OpenAPI spec file not found
  → Location: ./openapi.json
  → Suggestion: Check if the file exists or provide correct path
  → Stack: ...
  → Original: file not found at path.resolve()
```

### 5. ANSI Color Coding

| Element | Color | Usage |
|---------|-------|-------|
| Error code | red bold | `[E_CODE]` |
| Message | red | main description |
| Location | cyan | file paths, URLs |
| Suggestion | green | fix suggestions |
| Debug info | gray | stack traces |

---

## File Changes

### New Files
- `src/core/errors.ts` - Error class and utilities

### Modified Files
- `src/core/config.ts` - Use ApicodegenError
- `src/core/base/Base.ts` - Better fetch errors
- `src/openapi/index.ts` - Wrap generation errors
- `src/cli.ts` - Format and display errors
- `src/vite-plugin/index.ts` - Use ApicodegenError

---

## Implementation Steps

1. Create `src/core/errors.ts` with:
   - `ApicodegenErrorContext` interface
   - `ApicodegenError` class with formatting
   - `formatError()` helper for CLI output
   - `E_*` error code constants

2. Update config loading to throw `ApicodegenError`

3. Update CLI to use `formatError()` for output

4. Add early validation for spec file existence

5. Add validation for OpenAPI structure

---

## Example Error Messages

### Spec file not found
```
Error [E_SPEC_NOT_FOUND]: OpenAPI spec file not found
  → Location: ./openapi.json
  → Suggestion: Run 'ls -la' to check file exists, or use --spec to specify correct path
```

### Invalid JSON
```
Error [E_SPEC_PARSE_FAILED]: Failed to parse OpenAPI spec
  → Location: ./openapi.json
  → Line: 42, Column: 15
  → Suggestion: Validate JSON syntax at line 42
```

### Fetch failed
```
Error [E_SPEC_FETCH_FAILED]: Failed to fetch OpenAPI spec from URL
  → Location: https://api.example.com/openapi.json
  → Suggestion: Check URL is accessible, or download spec locally
```

### Validation error
```
Error [E_VALIDATION_FAILED]: OpenAPI spec validation failed
  → Path: paths./users.get
  → Suggestion: Add missing 'responses' field or check OpenAPI 3.0 spec structure
```