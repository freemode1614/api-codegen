---
"@moccona/apicodegen": minor
---

Introduce a plugin API for registering custom HTTP-client adapters. The
generator now resolves `adaptor: '<name>'` through a global registry
seeded with the built-in `fetch` and `axios` adapters; user-supplied
plugins extend this registry.

- **New public API**
  - `definePlugin(spec)` — type helper for authoring plugins.
  - `Plugin` interface — `{ name, adapter?, version?, provider? }`. The
    `provider` capability is reserved for a follow-up release and is
    currently inert.
  - `registerAdapter(spec)` / `resolveAdapter(name)` / `hasAdapter(name)`
    / `listAdapters()` / `clearUserAdapters()` for advanced use.
  - `applyPlugins(plugins)` (also re-exported as a public symbol).

- **New config field**
  - `ApicodegenConfig.plugins` accepts an array of `Plugin` objects or
    factory functions (sync or async). Factories are resolved in parallel
    at the start of every `codeGen()` run; user entries do not leak
    across runs.

- **Behavior changes**
  - Built-in adapter names (`fetch`, `axios`) are reserved; attempting
    to register under one of them throws.
  - Unknown adapter names now error with the list of registered adapters
    (e.g. `Unknown adaptor "ky". Registered adapters: fetch, axios`).

- **Documentation**
  - New `docs/plugins.md` — full guide with lifecycle, reserved
    capabilities, and limitations.
  - New runnable example at `example/plugins/ky-adapter/`.
  - `README.md` updated with a Plugins section and a project-structure
    entry for the new `src/core/{plugin,registry,plugin-loader}.ts`.

- **Compatibility**
  - No breaking changes. Existing configs that omit `plugins` behave
    identically; built-in `fetch`/`axios` defaults are unchanged.
  - The adapter lookup now goes through the registry, so a plugin can
    transparently shadow an unknown name without touching core code.

Provider registry and generator hooks (`beforeEmit`, `afterFormat`,
`writeFile`) are reserved on the `Plugin` interface and will ship in
upcoming releases.
