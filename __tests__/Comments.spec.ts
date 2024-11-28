import { describe, expect, test } from "vitest";

import Comment from "../src/base/Comment";

describe("Comment", () => {
  test("Comment.to() sucessfully", () => {
    expect(() => {
      const c = new Comment();
      const result = c
        .from([
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
