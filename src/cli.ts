#!/bin/env node

import { Generator, ProviderInitOptions } from "@apicodegen/core";
import { codeGen } from "@apicodegen/openapi";
import { createCommand } from "commander";

import { version } from "../package.json";

const cli = createCommand("apicodegen");

cli
  .version(version)
  .argument("<docURL>", "URL of the OpenAPI documentation")
  .option("-o, --output <path>", "Output file path", "./output.ts")
  .option("-a, --adaptor <type>", "HTTP client adaptor (fetch|axios)", "fetch")
  .option("-b, --baseURL <url>", "Base URL for API endpoints")
  .option("-v, --verbose", "Enable verbose logging", false)
  .option("--importClientSource <path>", "Custom client import source path")
  .action(
    async (
      docURL: string,
      options: Pick<
        ProviderInitOptions,
        "output" | "adaptor" | "baseURL" | "verbose" | "importClientSource"
      >,
    ) => {
      // Generate code based on the provided OpenAPI documentation
      // This action will create a new file at output.ts containing the generated TypeScript code
      try {
        const code = await codeGen({
          docURL,
          baseURL: options.baseURL,
          output: options.output,
          verbose: options.verbose,
          adaptor: options.adaptor,
          importClientSource: options.importClientSource,
        });
        await Generator.write(code, options.output);
      } catch (err: unknown) {
        cli.error((err as Error).message);
      }
    },
  );

cli.parse();
