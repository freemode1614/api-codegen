---
"@moccona/apicodegen": minor
---

Light up the `provider` capability on the `Plugin` interface (PR2).
Plugins can now register a custom spec-format provider (e.g. AsyncAPI)
and `codeGen()` will route to it when `specFormat` is set.

- **New public API**
  - `ProviderPluginSpec` / `ProviderFactory` types in `src/core/plugin.ts`.
  - `registerProvider` / `resolveProvider` / `hasProvider` / `listProviders`
    / `clearUserProviders` for advanced use.
  - Built-in `openapi` provider is registered lazily and is reserved
    (cannot be replaced by a user plugin).

- **New config field**
  - `ApicodegenConfig.specFormat` (and the corresponding
    `ProviderInitOptions.specFormat`). Default: `'openapi'`.
  - `specFormat: '<name>'` is resolved through the provider registry
    AFTER `applyPlugins()` runs, so a plugin can register a provider
    in the same run.

- **Behavior changes**
  - Unknown `specFormat` now errors with the list of registered providers
    (e.g. `Unknown spec format "asyncapi". Registered providers: openapi, asyncapi`).
  - `applyPlugins()` now also clears user providers between runs.

- **Documentation**
  - `docs/plugins.md` updated with a "Custom spec providers" section.
  - New runnable example at `example/plugins/asyncapi-provider/`.
  - `README.md` updated with a custom-providers section and a
    project-structure entry for `src/core/provider-registry.ts`.

- **Compatibility**
  - No breaking changes. Existing configs that omit `specFormat` route
    to the built-in `openapi` provider — behavior is identical to v0.0.9.
  - Generator hooks (`beforeEmit`, `afterFormat`, `writeFile`) remain
    reserved on the `Plugin` interface and will ship in a follow-up
    release.
