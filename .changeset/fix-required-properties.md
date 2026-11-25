---
"@moccona/apicodegen": patch
---

Fix generated object types ignoring the schema `required` array. A property is
now emitted as optional (`?`) unless it is listed in the parent schema's
`required` array; previously every property of an object schema was emitted as
required, so request bodies of specs that mark optional fields (e.g.
FastAPI/Pydantic models, where `Optional[...] = None` fields are simply absent
from `required`) failed to type-check at the call site. (#44)
