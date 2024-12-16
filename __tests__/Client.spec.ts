import { describe, expect, test } from "vitest";

import { Client } from "@/client/Client";

describe("Comment", () => {
  test("Comment.to() sucessfully", () => {
    expect(() => {
      const result = Client.toFunction({
        url: "/a/b/c",
        method: "POST",
      });

      console.log(result);
    }).not.throw();
  });
});
