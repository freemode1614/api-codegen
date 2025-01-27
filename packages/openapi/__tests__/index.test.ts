import { expect, it } from "vitest";

import { OpenAPIProvider } from "../src";

const apiDoc = "http://127.0.0.1:5500/3.0/json/circular-paths.json";

it("Should parse schema properly", () => {
  expect(async () => {
    try {
      const p = new OpenAPIProvider({
        docURL: apiDoc,
      });
      const schemas = await p.init();
      console.log("schemas ->", schemas);
    } catch (error) {
      console.log(error);
    }
  }).not.toThrow();
});
