## ADDED Requirements

### Requirement: Unit Tests for `Base` Static Utility Methods
The system SHALL provide unit tests in `__tests__/base.test.ts` that cover every public static method on `Base`.

#### Scenario: `normalize` handles reserved keywords
- **WHEN** `Base.normalize` is called with a TypeScript reserved keyword (e.g. `"type"`, `"class"`, `"return"`)
- **THEN** the result MUST have `_` appended (e.g. `"type_"`)

#### Scenario: `normalize` replaces special characters
- **WHEN** `Base.normalize` is called with paths or strings containing `/`, `-`, `{`, `}`, `:`, `.`, etc.
- **THEN** the result MUST replace those characters with `_`

#### Scenario: `camelCase` strips leading digits
- **WHEN** `Base.camelCase` is called with a string starting with a digit (e.g. `"1_user_name"`)
- **THEN** the result MUST NOT start with a digit (e.g. `"userName"`)

#### Scenario: `upperCamelCase` capitalizes all segments
- **WHEN** `Base.upperCamelCase` is called with a multi-segment string (e.g. `"user_profile"`)
- **THEN** each `_`-separated segment MUST have its first letter uppercased

#### Scenario: `capitalize` only touches first character
- **WHEN** `Base.capitalize` is called with `"hello"`
- **THEN** the result MUST be `"Hello"`

#### Scenario: `isRef` returns true only for ref objects
- **WHEN** `Base.isRef` is called with an object that has a string `$ref` field
- **THEN** it MUST return `true`
- **AND** when called with `null`, an array, a string, or an object without `$ref` it MUST return `false`

#### Scenario: `isValidEnumType` excludes boolean enums
- **WHEN** `Base.isValidEnumType` is called with a schema whose `type` is `"boolean"`
- **THEN** it MUST return `false`
- **AND** when called with a non-boolean schema containing enum values it MUST return `true`

#### Scenario: `isBooleanEnum` detects boolean enums
- **WHEN** `Base.isBooleanEnum` is called with a schema whose enum contains boolean members
- **THEN** it MUST return `true`

#### Scenario: `findSameSchema` returns matching enum
- **WHEN** `Base.findSameSchema` is called with an enum schema and a list of enums
- **THEN** it MUST return the first enum with the same member set (order-independent)
- **AND** MUST return `undefined` when no match exists

#### Scenario: `uniqueEnums` merges enums sharing a name
- **WHEN** `Base.uniqueEnums` is called with multiple enums sharing the same name but different values
- **THEN** the result MUST contain one entry per unique name
- **AND** the merged enum's values MUST be the union of all input enums' values

#### Scenario: `ref2name` returns last path segment when doc is omitted
- **WHEN** `Base.ref2name` is called with `"#/components/schemas/Pet"` and no `doc` argument
- **THEN** the result MUST be `"Pet"`

#### Scenario: `ref2name` returns `unknown` for unresolvable ref
- **WHEN** `Base.ref2name` is called with a ref that does not exist in the provided `doc`
- **THEN** the result MUST be `"unknown"` (preserves existing behavior)

#### Scenario: `getMediaType` matches known media types
- **WHEN** `Base.getMediaType` is called with strings like `"application/json"` or `"image/png"`
- **THEN** it MUST return the matching `MediaTypes` enum value
- **AND** MUST return `undefined` for unmatched strings

### Requirement: Unit Tests for `Generator.toUrlTemplate`
The system SHALL provide unit tests in `__tests__/generator-url.test.ts` covering `Generator.toUrlTemplate`.

#### Scenario: URL with no parameters is a plain literal
- **WHEN** `Generator.toUrlTemplate` is called with a path that contains no `{...}` placeholders and no query parameters
- **THEN** the result MUST be a `NoSubstitutionTemplateLiteral` AST node
- **AND** its `text` MUST equal `basePath + path`

#### Scenario: URL with path placeholders produces a template expression
- **WHEN** `Generator.toUrlTemplate` is called with `"/users/{userId}"` and a parameter named `"userId"`
- **THEN** the result MUST be a `TemplateExpression` AST node
- **AND** it MUST contain a single `TemplateSpan` referencing an identifier matching the camelCased parameter name

#### Scenario: Query parameters are appended to the URL
- **WHEN** `Generator.toUrlTemplate` is called with parameters including a query parameter
- **THEN** the rendered path MUST contain `?{param}=` (or `&{param}=` for subsequent query params)
- **AND** the value MUST be wrapped in `encodeURIComponent` indirectly via the surrounding AST

#### Scenario: `basePath` is prepended
- **WHEN** `Generator.toUrlTemplate` is called with a non-empty `basePath`
- **THEN** the rendered URL template MUST start with `basePath`

#### Scenario: Invalid path segment throws
- **WHEN** `Generator.toUrlTemplate` is called with a path that contains a `$` not followed by a valid `{param}` segment
- **THEN** it MUST throw an `Error` with a message containing `"Invalid path segment"`

### Requirement: Integration Tests Pass on Real OpenAPI Specs
The system SHALL keep `__tests__/index.test.ts` and ensure all 149 integration tests (running against bundled real OpenAPI specs in `api-docs/`) pass after the refactor.

#### Scenario: All OpenAPI 2.0 specs generate type-correct TypeScript
- **WHEN** each JSON file under `api-docs/openapi/2.0/json/` is processed via `codeGen`
- **THEN** the generated `.ts` file MUST pass `tsc --noEmit` with zero errors

#### Scenario: All OpenAPI 3.0 specs generate type-correct TypeScript
- **WHEN** each JSON file under `api-docs/openapi/3.0/json/` is processed via `codeGen`
- **THEN** the generated `.ts` file MUST pass `tsc --noEmit` with zero errors

#### Scenario: All OpenAPI 3.1 specs generate type-correct TypeScript
- **WHEN** each JSON file under `api-docs/openapi/3.1/json/` is processed via `codeGen`
- **THEN** the generated `.ts` file MUST pass `tsc --noEmit` with zero errors
