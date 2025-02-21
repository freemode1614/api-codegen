import { createServer, type Server } from "node:http";
import path from "node:path";

import { codeGen } from "@apicodegen/index";
import glob from "fast-glob";
import handler from "serve-handler";
import { afterAll, beforeAll, describe, it } from "vitest";

let server: Server;
const DOC_SERVER = "http://localhost:5500";

// Setup doc server
const initDocServer = async () => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  server = createServer(async (req, resp) => {
    await handler(req, resp);
  });

  await new Promise<void>((resolve) => {
    server.listen(5500, () => {
      console.log(`API doc server running at ${DOC_SERVER}`);
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

describe("Main test case for single doc codegen", () => {
  it("Should not throw", async () => {
    // const { BASE } = getDocsByVersion("3.0");
    await codeGen({
      docURL: `http://0.0.0.0:5500/openapi.json`,
      output: "output.ts",
      baseURL: "/v1",
    });
  });

  it("Should not throw for openapi 3.0 docs", async () => {
    const { BASE, docs } = getDocsByVersion("3.0");
    for (const doc of docs) {
      await codeGen({
        docURL: `${DOC_SERVER}/${BASE}/${doc}`,
        output: "output.ts",
      });
    }
  });

  it("Should not throw for openapi 3.1 docs", async () => {
    const { BASE, docs } = getDocsByVersion("3.1");
    for (const doc of docs) {
      await codeGen({
        docURL: `${DOC_SERVER}/${BASE}/${doc}`,
        output: "output.ts",
      });
    }
  });

  it("Should not throw for openapi 2.0 docs", async () => {
    const { BASE, docs } = getDocsByVersion("2.0");
    for (const doc of docs) {
      await codeGen({
        docURL: `${DOC_SERVER}/${BASE}/${doc}`,
        output: "output.ts",
      });
    }
  });
});
