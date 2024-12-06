import { expect, test } from "vitest";

import codegen from "@/index";

test("code-gen", async () => {
  await expect(codegen({ doc: "https://172.31.2.165:8002/static/openapi.json" })).resolves.not.toThrow();
});
