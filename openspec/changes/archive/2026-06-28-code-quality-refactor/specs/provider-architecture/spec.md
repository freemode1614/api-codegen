## ADDED Requirements

### Requirement: Shared VersionedProvider Abstract Base Class
The system SHALL provide a `VersionedProvider` abstract class in `src/openapi/VersionedProvider.ts` that contains the schema / parameter / response / requestBody parsing logic shared across OpenAPI v2, v3, and v3.1.

#### Scenario: Base class exposes protected container accessors
- **WHEN** a subclass extends `VersionedProvider`
- **THEN** it MUST be able to override `getSchemaContainer`, `getParameterContainer`, `getResponseContainer`, and `getRequestBodyContainer` to return the version-specific record (e.g. `definitions` for v2, `components.schemas` for v3 / v3.1)
- **AND** the base class MUST use these accessors when iterating

#### Scenario: Base class contains single implementations of conversion methods
- **WHEN** the conversion methods `toBaseSchema`, `getSchemaByRef`, `getParameterByRef`, `getResponseByRef`, `getRequestBodyRef`, and `init` are inspected
- **THEN** they MUST exist exactly once in `VersionedProvider`
- **AND** the v2, v3, v3.1 subclasses MUST NOT contain their own copies of these methods

#### Scenario: Subclass only declares version-specific behavior
- **WHEN** `V3` and `V3_1` source files are read
- **THEN** each MUST be no more than 80 lines
- **AND** MUST only contain: constructor, version identifier, the four container accessors, and any version-specific override hooks
- **AND** `V2` MAY be larger than 80 lines because it overrides `getParameterByRef`, `getResponseByRef`, and `init` due to genuinely different data shapes (V2 parameters have top-level `items`/`properties`/`enum`, no `requestBody` concept, and no `content` wrapper in responses)

#### Scenario: Ref resolution remains consistent
- **WHEN** a `$ref` is encountered during conversion
- **THEN** the base class MUST use `Base.ref2name` and `Base.isRef` to resolve it
- **AND** MUST NOT silently swallow resolution failures (the existing `unknown` fallback behavior is preserved for backward compatibility, but a single code path is used for all three versions)

#### Scenario: Generated output is identical to pre-refactor output
- **WHEN** the same OpenAPI spec is processed by the refactored provider
- **THEN** the resulting `ProviderInitResult` MUST be deeply equal to the pre-refactor result for v2, v3, and v3.1 specs

### Requirement: Version Detection Stays in One Place
The system SHALL keep OpenAPI version detection logic (`getDocVersion`) inside `VersionedProvider` and NOT duplicate it across subclasses.

#### Scenario: Subclass declares version once
- **WHEN** a subclass extends `VersionedProvider`
- **THEN** it MUST declare its version via a single constant (e.g. `protected readonly version = OpenAPIVersion.v3`)
- **AND** the base class MUST use this constant to drive the version-specific `init` flow

### Requirement: `OpenAPIProvider` Continues to Be the Public Entry Point
The system SHALL keep `OpenAPIProvider` (in `src/openapi/index.ts`) as the externally exported entry point for OpenAPI parsing, and it MUST dispatch to the appropriate `VersionedProvider` subclass based on the detected OpenAPI version.

#### Scenario: Public API surface is unchanged
- **WHEN** a consumer imports `codeGen` or `OpenAPIProvider` from `@moccona/apicodegen`
- **THEN** the same exports MUST be available after the refactor
- **AND** no breaking changes are introduced
