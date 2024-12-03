import { describe, expect, test } from "vitest";

import Comment from "@/generators/Comment";

describe("Comment", () => {
  test("Comment.to() sucessfully", () => {
    expect(() => {
      const result = Comment.of([
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
      ])
        .add({
          name: "obj.age",
          tag: "param",
          comment: "Age placeholder",
        })
        .to();

      console.log(result);
    }).not.throw();
  });
});
