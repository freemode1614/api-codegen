import { Adapter } from "@moccona/codegen";
import { OpenAPIV3 } from "openapi-types";
import { expect, it } from "vitest";

import v3Schema from "../../../examples/3.0/json/petstore.json";
import { OpenAPIProvider } from "../src/index";

class A extends Adapter {
  methodField = "";
  bodyField = "";
  headersField = "";
  queryField = "";
  name = "";
}

const a = new A();
const p = new OpenAPIProvider(a, {
  docURL: "",
});

it("Should parse schema properly", () => {
  expect(() => {
    const schemas = p.v3(v3Schema as OpenAPIV3.Document);
    console.log("schemas ->", schemas);
  }).not.toThrow();
});
