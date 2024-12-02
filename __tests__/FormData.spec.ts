import { describe, expect, test } from "vitest";

import Interface from "../src/generators/FormData";

describe("Comment", () => {
  test("Comment.to() sucessfully", () => {
    expect(() => {
      const result = Interface.of(["file", "avatar", "image"]).to();
      console.log(result);
    }).not.throw();
  });
});
