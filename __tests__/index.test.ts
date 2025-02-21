import { codeGen } from "@apicodegen/index";
import { describe, it, beforeAll, afterAll, expect } from "vitest";
import glob from "fast-glob";
import path from "node:path";
import handler from "serve-handler";
import { createServer, type Server } from "node:http";

let server: Server;
const DOC_SERVER = "http://localhost:5500";

// Setup doc server
const initDocServer = async () => {
  server = createServer(async (req, resp) => {
    console.log("url ~>", req.url);
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
  new Promise<void>((resolve, reject) => {
    if (server) {
      server.close((err) => {
        err ? reject(err) : resolve();
      });
    }
  });
};

// Base path for fiter json doc.
const BASE = "api-docs/openapi/3.0";

const docs = glob.sync("**/*.json", {
  cwd: path.resolve(process.cwd(), BASE),
});

beforeAll(async () => {
  await initDocServer();
});

afterAll(() => {
  closeDocServer();
});

describe("Main test case for apicodegen", () => {
  it("Should not throw", async () => {
    await codeGen({
      docURL: `${DOC_SERVER}/${BASE}/json/circular-paths.json`,
      output: "output.ts",
    });
  });

  it("Should not throw for all kind of docs", async () => {
    for (const doc of docs) {
      await codeGen({
        docURL: `${DOC_SERVER}/${BASE}/${doc}`,
        output: "output.ts",
      });
    }
  });
});
