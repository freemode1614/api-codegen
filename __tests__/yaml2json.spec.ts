import { describe, expect, test } from "vitest";

import yaml2json from "../src/utils/yaml2json";

describe(yaml2json.displayName, () => {
  test("Parse sucessfully", () => {
    expect(
      () => yaml2json(`
YAML:
  - A human-readable data serialization language
  - https://en.wikipedia.org/wiki/YAML
yaml:
  - A complete JavaScript implementation
  - https://www.npmjs.com/package/yaml
`)
    ).not.throw()
  })
})
