import { expect, test } from "vitest";

import getApiDoc from "@/utils/getApiDoc";

test("get HTTPs doc", async () => {
  const doc = await getApiDoc("https://172.31.2.165:8002/static/openapi.json");
  expect(doc).toBeTruthy();
});

test("get HTTP doc", async () => {
  const doc = await getApiDoc("http://0.0.0.0:8848/openapi.json");
  expect(doc).toBeTruthy();
});
