/**
 * Test case for openapi code generator
 *
 */

import path from "node:path";

import { globSync } from "fast-glob";
import { it } from "vitest";

import { codeGen } from "../src";

const apiDocBaseUrl = "http://127.0.0.1:5500/";

const docs = globSync("3.1/json/**/*.json", {
  cwd: path.resolve("./examples"),
});

it("Should parse v3.1 schema properly", async () => {
  for (const doc of docs) {
    await codeGen({
      docURL: apiDocBaseUrl + doc,
      output: "output.3_1.ts",
      verbose: true,
    });
  }
});
