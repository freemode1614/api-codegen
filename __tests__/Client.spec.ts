import { describe, expect, test } from "vitest";

import Client from "@/client/Client";

describe("Comment", () => {
  test("Comment.to() sucessfully", () => {
    expect(() => {
      const result = Client.of({
        name: "axios",
        url: "/a/b/c",
        method: "POST",
      }).to();

      console.log(result);
    }).not.throw();
  });
});
