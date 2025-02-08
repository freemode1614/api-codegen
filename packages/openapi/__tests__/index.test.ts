/**
 * Test case for openapi code generator
 *
 */

import { expect, it } from "vitest";

import { codeGen } from "../src";

const apiDoc = "http://127.0.0.1:5500/3.0/json/schema-types.json";

it("Should parse schema properly", () => {
  expect(async () => {
    await codeGen({
      docURL: apiDoc,
      importClientSource: `import fetch from "~/utils/fetch"`,
    });
  }).not.toThrow();
});
