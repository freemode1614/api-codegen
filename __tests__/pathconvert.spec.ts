import { expect, test } from "vitest";

import pathConvert from "@/utils/pathConvert";

test("pathConvert", () => {
  expect(pathConvert("/a/{b}/{c}")).toStrictEqual("/a/${b}/${c}");
  expect(pathConvert("/a/{b}/{-}")).toStrictEqual("/a/${b}/${-}");
  expect(pathConvert("/a/{b}/{0}")).toStrictEqual("/a/${b}/${0}");
});
