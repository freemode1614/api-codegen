#!/bin/env node

import { type Adaptors, Generator } from "@apicodegen/core";
import { codeGen } from "@apicodegen/openapi";
import { createCommand } from "commander";

import { version } from "../package.json";

const cli = createCommand("apicodegen");

cli
  .version(version)
  .argument("<docURL>", "DOc url for tool to read")
  .option("--output", "Where code generated", "./output.ts")
  .option("--adaptor", "Adaptor for api call", "fetch")
  .option("--baseURL", "Base path of the api endpoint", "")
  .option("--verbose", "More logs", false)
  .option("--importClientSource", "Where request tool comes from")
  .action(
    async (
      docURL: string,
      options: {
        output: string;
        adaptor: keyof typeof Adaptors;
        baseURL: string;
        verbose: boolean;
        importClientSource: string;
      },
    ) => {
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
