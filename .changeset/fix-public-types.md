---
"@moccona/apicodegen": patch
---

Align the public types with what the generator actually supports:

- `MediaTypeObject.type` now accepts real media types
  (`multipart/form-data`, `application/x-www-form-urlencoded`, `application/xml`,
  ...) instead of only the five `MediaTypes` values. Known types keep their
  autocomplete.
- `ParameterObject.in` is optional — a parameter without `in` has always been
  treated as a body parameter by the generator and the adapters.
