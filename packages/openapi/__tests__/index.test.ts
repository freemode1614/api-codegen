import { expect, it } from "vitest";

import { codeGen } from "../src";

const apiDoc = "http://127.0.0.1:5500/3.0/json/circular-paths.json";

it("Should parse schema properly", () => {
  expect(async () => {
    await codeGen({ docURL: apiDoc });
  }).not.toThrow();
});
