import { OpenAPI } from "openapi-types";
import { test } from "vitest";

import { codeGenByConfigForTesting } from "@/index";

import doc1 from "../examples/3.0/json/schema-enums.json";

test("codegen", () => {
  codeGenByConfigForTesting(doc1 as unknown as OpenAPI.Document);
});
