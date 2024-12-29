import { OpenAPI } from "openapi-types";
import { test } from "vitest";

import { codeGenByConfig } from "@/index";

import doc1 from "../examples/3.0/json/parameters-extreme.json";

test("codegen", async () => {
  await codeGenByConfig(doc1 as OpenAPI.Document);
});
