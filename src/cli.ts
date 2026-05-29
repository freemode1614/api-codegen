#!/bin/env node

import { type ProviderInitOptions } from "@apicodegen/core";
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
      try {
        // codeGen writes to output when provided
        await codeGen({
          docURL,
          baseURL: options.baseURL,
          output: options.output,
          verbose: options.verbose,
          adaptor: options.adaptor,
          importClientSource: options.importClientSource,
        });
      } catch (err: unknown) {
        cli.error((err as Error).message);
      }
    },
  );

cli.parse();