#!/bin/env node

import path from "node:path";

import { formatError, isApicodegenError, wrapError, createErrors } from "@apicodegen/core/errors";
import { loadConfig, toProviderOptions } from "@apicodegen/core/config";
import { codeGen } from "@apicodegen/openapi";
import { createCommand } from "commander";
import fs from "fs-extra";
import type { Watchvest } from "vite";

import { version } from "../package.json";

interface CLIOptions {
  spec?: string;
  output?: string;
  adaptor?: string;
  baseURL?: string;
  importClientSource?: string;
  watch?: boolean;
  verbose?: boolean;
}

/**
 * Watch file changes and regenerate on change
 */
async function watchAndGenerate(options: Parameters<typeof codeGen>[0]): Promise<Watchvest> {
  const { createWatch } = await import("vite");
  let watcher: Awaited<ReturnType<typeof createWatch>> | null = null;

  const generate = async () => {
    try {
      const result = await codeGen(options);
      const { endpoints, schemas, duration } = result.stats;
      console.log(
        `\x1b[32m✓\x1b[0m Regenerated: ${options.output} (${endpoints} endpoints, ${schemas} schemas) ${duration}ms`,
      );
    } catch (error) {
      console.error(formatError(error, true));
    }
  };

  // Watch spec file
  const patterns = [options.docURL].filter(Boolean) as string[];

  // Use vite's watch for cross-platform support
  watcher = createWatch(patterns, {
    ignoreInitial: false,
    awaitWriteFinish: {
      stabilityThreshold: 500,
      pollInterval: 100,
    },
  });

  watcher.on("change", async (filePath) => {
    console.log(`\x1b[33m↓\x1b[0m File changed: ${filePath}`);
    await generate();
  });

  watcher.on("add", async (filePath) => {
    console.log(`\x1b[32m+\x1b[0m File added: ${filePath}`);
    await generate();
  });

  return watcher;
}

/**
 * Resolve document URL from various formats
 */
function resolveDocURL(docURL: string, baseURL?: string): string {
  // If already absolute URL, return as-is
  if (docURL.startsWith("http://") || docURL.startsWith("https://")) {
    return docURL;
  }

  // If file path, convert to absolute
  if (docURL.startsWith("/") || docURL.match(/^[A-Za-z]:/)) {
    return `file://${docURL}`;
  }

  // Relative path - resolve against baseURL or cwd
  if (baseURL) {
    return new URL(docURL, baseURL).href;
  }

  return path.resolve(process.cwd(), docURL);
}

/**
 * Check if spec file/directory exists
 */
async function validateSpecPath(specPath: string): Promise<void> {
  // For URLs, skip file existence check
  if (specPath.startsWith("http://") || specPath.startsWith("https://")) {
    return;
  }

  // Remove file:// prefix if present
  const filePath = specPath.replace(/^file:\/\//, "");
  const absolutePath = path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath);

  const exists = await fs.pathExists(absolutePath);
  if (!exists) {
    throw createErrors.specNotFound(absolutePath);
  }
}

/**
 * Check if URL is remote (http/https)
 */
function isRemoteURL(url: string): boolean {
  return url.startsWith("http://") || url.startsWith("https://");
}

const cli = createCommand("apicodegen");

cli
  .name("apicodegen")
  .version(version)
  .description("API code generation from OpenAPI specifications")
  .argument("[spec]", "URL or path to OpenAPI documentation")
  .option("-s, --spec <path>", "OpenAPI spec file path or URL")
  .option("-o, --output <path>", "Output file path")
  .option("-a, --adaptor <type>", "HTTP client adaptor (fetch|axios)", "fetch")
  .option("-b, --baseURL <url>", "Base URL for API endpoints")
  .option("-c, --config <path>", "Path to config file")
  .option("-w, --watch", "Watch for file changes and regenerate")
  .option("-v, --verbose", "Enable verbose logging")
  .option("--importClientSource <path>", "Custom client import source path")
  .action(async (specArg: string | undefined, options: CLIOptions) => {
    // Build CLI options from command line
    const cliOptions: Record<string, unknown> = {};
    if (options.spec) cliOptions.spec = options.spec;
    if (options.output) cliOptions.output = options.output;
    if (options.adaptor) cliOptions.adaptor = options.adaptor;
    if (options.baseURL) cliOptions.baseURL = options.baseURL;
    if (options.verbose) cliOptions.verbose = options.verbose;
    if (options.watch) cliOptions.watch = options.watch;
    if (options.importClientSource) cliOptions.importClientSource = options.importClientSource;
    if (options.config) cliOptions.configFile = options.config;

    // Override positional arg
    if (specArg) {
      cliOptions.spec = specArg;
    }

    try {
      // Load and resolve config from all sources
      const config = await loadConfig({
        cwd: process.cwd(),
        cliOptions,
      });

      // Validate spec exists
      await validateSpecPath(config.spec);

      // Resolve docURL to absolute path or URL
      const resolvedDocURL = resolveDocURL(config.spec, config.baseURL);

      // Convert to provider options
      const codeGenOptions = {
        ...toProviderOptions(config),
        docURL: resolvedDocURL,
      };

      if (config.watch) {
        console.log("\x1b[33m🔄\x1b[0m Watching for changes...");

        // Determine watch patterns based on docURL
        const watchPatterns: string[] = [];
        if (!resolvedDocURL.startsWith("http")) {
          const docPath = resolvedDocURL.replace(/^file:\/\//, "");
          const dir = path.dirname(docPath);
          watchPatterns.push(`${dir}/**/*.json`, `${dir}/**/*.yaml`, `${dir}/**/*.yml`);
        }

        const watcher = await watchAndGenerate(codeGenOptions);

        // Handle graceful shutdown
        const shutdown = async () => {
          console.log("\n\x1b[90m👋 Shutting down...\x1b[0m");
          if (watcher) {
            await watcher.close();
          }
          process.exit(0);
        };

        process.on("SIGINT", shutdown);
        process.on("SIGTERM", shutdown);
      } else {
        // Single generation
        if (isRemoteURL(resolvedDocURL)) {
          console.log(`\x1b[33m🔄\x1b[0m Fetching spec from ${resolvedDocURL}...`);
        }
        const result = await codeGen(codeGenOptions);
        const { endpoints, schemas, duration } = result.stats;
        console.log(
          `\x1b[32m✓\x1b[0m Generated: ${config.output} (${endpoints} endpoints, ${schemas} schemas) ${duration}ms`,
        );
      }
    } catch (error) {
      // Handle specific error types
      if (isApicodegenError(error)) {
        console.error(formatError(error, options.verbose));
      } else {
        // Wrap unknown errors
        const wrapped = wrapError(error, {
          code: "E_GENERATION_FAILED",
          message: "An unexpected error occurred",
        });
        console.error(formatError(wrapped, options.verbose));
      }
      process.exit(1);
    }
  });

cli.parse();
