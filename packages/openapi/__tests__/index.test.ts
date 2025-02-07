/**
 * Test case for openapi code generator
 *
 */

import { expect, it } from "vitest";

import { codeGen } from "../src";

const apiDoc = "http://127.0.0.1:5500/3.0/json/complex-nesting.json";

it("Should parse schema properly", () => {
  expect(async () => {
    await codeGen({ docURL: apiDoc });
  }).not.toThrow();
});
