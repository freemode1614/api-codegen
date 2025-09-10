import cp from "node:child_process";
import { createServer, type Server } from "node:http";
import path from "node:path";

import { codeGen } from "@apicodegen/index";
import glob from "fast-glob";
import handler from "serve-handler";
import { promisify } from "util";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

let server: Server;
const DOC_SERVER = "http://localhost:5500";

const exec = promisify(cp.exec);

// Setup doc server
const initDocServer = async () => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  server = createServer(async (req, resp) => {
    await handler(req, resp);
  });

  await new Promise<void>((resolve) => {
    server.listen(5500, () => {
      resolve();
    });
  });
};

// Close doc server
const closeDocServer = async () => {
  await new Promise<void>((resolve, reject) => {
    if (server) {
      server.close((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    }
  });
};

const getDocsByVersion = (version: "3.0" | "3.1" | "2.0") => {
  // Base path for fiter json doc.
  const BASE = `api-docs/openapi/${version}`;

  const docs = glob.sync("**/*.json", {
    cwd: path.resolve(process.cwd(), BASE),
  });

  return {
    BASE,
    docs,
  };
};

beforeAll(async () => {
  await initDocServer();
});

afterAll(async () => {
  await closeDocServer();
});

// describe("某个特定的 api 文档", () => {
//   const { BASE } = getDocsByVersion("3.0");
//   const docUrl = `${DOC_SERVER}/${BASE}/json/schema-enums.json`;
//   it(`${docUrl}`, async () => {
//     await codeGen({
//       docURL: docUrl,
//       output: "output.ts",
//     });
//     const { stderr } = await exec("npx tsc ./output.ts --noEmit");
//     expect(stderr).toBeFalsy();
//   });
// });

describe("OpenAPI 2.0 codegen", () => {
  const { BASE, docs } = getDocsByVersion("2.0");
  for (const doc of docs) {
    const docUrl = `${DOC_SERVER}/${BASE}/${doc}`;
    const output = `__tests__/apis/${doc.replace(".json", "").replace("json/", "")}.ts`;

    it(`${docUrl}`, async () => {
      await codeGen({
        docURL: docUrl,
        output: output,
      });
      const { stderr } = await exec(`tsc ${output} --noEmit`);
      expect(stderr).toBeFalsy();
    });
  }
});

describe("OpenAPI 3.0 codegen", () => {
  const { BASE, docs } = getDocsByVersion("3.0");
  for (const doc of docs) {
    const docUrl = `${DOC_SERVER}/${BASE}/${doc}`;
    const output = `__tests__/apis/${doc.replace(".json", "").replace("json/", "")}.ts`;

    it(`3.0 docs: ${docUrl}`, async () => {
      await codeGen({
        docURL: docUrl,
        output: output,
      });
      const { stderr } = await exec(`tsc ${output} --noEmit`);
      expect(stderr).toBeFalsy();
    });
  }
});

describe("OenAPI 3.1 codegen", () => {
  const { BASE, docs } = getDocsByVersion("3.1");
  for (const doc of docs) {
    const docUrl = `${DOC_SERVER}/${BASE}/${doc}`;
    const output = `__tests__/apis/${doc.replace(".json", "").replace("json/", "")}.ts`;

    it(`${docUrl}`, async () => {
      await codeGen({
        docURL: docUrl,
        output: "output.ts",
      });

      const { stderr } = await exec(`tsc ${output} --noEmit`);
      expect(stderr).toBeFalsy();
    });
  }
});
