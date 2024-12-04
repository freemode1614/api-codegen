import { describe, expect, test } from "vitest";

import Interface from "@/generators/Interface";

describe("Interface", () => {
  test("Interface.to() sucessfully", () => {
    expect(() => {
      const result = Interface.of({
        name: "MyInterface",
        export: true,
        type: [
          {
            name: "myName",
            required: true,
            type: "string",
          },
          {
            name: "myAge",
            required: true,
            type: {
              type: "Omit",
              typeArgs: ["Age", 'key1', 'key2']
            },
          },
          {
            name: "myAddress",
            required: true,
            type: [
              {
                name: "address",
                required: true,
                type: "string",
              },
              {
                name: "code",
                required: true,
                type: "number",
              },
            ],
          },
        ],
      }).to();

      console.log(result);
    }).not.throw();
  });
});
