/* eslint-disable unicorn/filename-case */
import fs from "node:fs/promises";
import path from "node:path";

import { OpenAPIV3 } from "openapi-types";
import { beforeAll, expect, test } from "vitest";

import { codeGenByConfigForTesting } from "@/index";

let files = [] as string[];

const base = path.resolve(process.cwd(), "examples/3.1/json");

beforeAll(async () => {
  const files_ = await fs.readdir(base);
  files = files_;
});

test("codegen", async () => {
  for (const file of files) {
    const file_path = path.resolve(base, file);

    if ((await fs.stat(file_path)).isFile()) {
      const buf = await fs.readFile(path.resolve(base, file));
      const decoder = new TextDecoder("utf-8");
      const rawString = decoder.decode(buf);
      const doc = JSON.parse(rawString) as OpenAPIV3.Document;
      console.log("file path ~>", file_path);
      await expect(codeGenByConfigForTesting(doc, "")).resolves.not.toThrow();
    } else {
      console.log(`Folder escaped`);
    }
  }
});
