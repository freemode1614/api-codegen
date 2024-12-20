import { expect, test } from "vitest";

import codegen from "@/index";

test("codegen", async () => {
  await codegen({ doc: "https://172.31.2.165:8002/static/openapi.json" });
  exp;
});
