import { OpenAPI } from "openapi-types";
import { test } from "vitest";

import { codeGenByConfig } from "@/index";

import doc1 from "../examples/3.0/json/petstore.json";

test("codegen", () => {
  codeGenByConfig(doc1 as OpenAPI.Document);
});
