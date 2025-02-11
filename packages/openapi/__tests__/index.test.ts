/**
 * Test case for openapi code generator
 *
 */

import { expect, it } from "vitest";

import { codeGen } from "../src";

const apiDoc = "http://127.0.0.1:5500/2.0/json/petstore.json";

it("Should parse schema properly", () => {
  expect(async () => {
    await codeGen({
      docURL: apiDoc,
      baseURL: "/api",
      output: "output.ts",
    });
  }).not.toThrow();
});
