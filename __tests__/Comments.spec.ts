import { describe, expect, test } from "vitest";

import Comment from "@/generators/Generator";

describe("Comment", () => {
  test("Comment.to() sucessfully", () => {
    expect(() => {
      const result = new Comment().comment([
        {
          comment: "For test purpose",
        },
        {
          tag: "param",
          name: "obj",
          comment: "Placeholder",
        },
        {
          tag: "param",
          name: "obj.name",
          comment: "Placeholder",
        },
      ]);

      console.log(result);
    }).not.throw();
  });
});
