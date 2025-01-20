import add from "../src";
import { describe, expect, it } from "vitest";

describe("Simple test example", () => {
  it("one plus one should equals to 2", () => {
    expect(add(1, 1)).toStrictEqual(2);
  });
});
