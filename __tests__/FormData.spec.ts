import { describe, expect, test } from "vitest";

import Interface from "../src/base/FormData";

describe("Comment", () => {
  test("Comment.to() sucessfully", () => {
    expect(() => {
      const t = new Interface();
      const result = t.from(["file", "avatar", "image"]).to();
      console.log(result);
    }).not.throw();
  });
});
