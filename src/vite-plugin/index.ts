import { codeGen, type ProviderInitOptions } from "@apicodegen/openapi";
import { createScopedLogger } from "@moccona/logger";
import { execa } from "execa";
import fs from "fs-extra";
import type { PluginOption, ServerOptions } from "vite";

const PLUGIN_NAME = "apiCodeGen";
const logger = createScopedLogger("api-codegen-vite-plugin");

export type ApiCodeGenPluginOptions = ProviderInitOptions & {
  name: string;
  proxy?: ServerOptions["proxy"];
};

export const runTypeCheck = async (path: string) => {
  await execa("npx", ["tsc", path, "--noEmit"]);
};

export function apiCodeGenPlugin(options: ApiCodeGenPluginOptions[]): PluginOption {
  let firstRun = true;
  return {
    name: PLUGIN_NAME,
    async config(config) {
      if (!firstRun) return;
      firstRun = false;
      logger.info("-------> api codegen start <--------");

      const proxies = await options.reduce(
        async (proxiesPromise_, option) => {
          const proxies_ = await proxiesPromise_;
          const { proxy = {}, name, ...codeGenInitOptions } = option;

          try {
            const code = await codeGen(codeGenInitOptions);
            await fs.writeFile(codeGenInitOptions.output, code);
            try {
              await runTypeCheck(codeGenInitOptions.output);
            } catch (error) {
              logger.error(error);
            }
          } catch (error) {
            logger.error(`Failed to generate api ${name}: ${error}`);
          }

          return {
            ...proxies_,
            ...proxy,
          };
        },
        Promise.resolve({} as ServerOptions["proxy"]),
      );

      logger.info("-------> api codegen finished <--------");

      return {
        ...config,
        server: {
          ...(config.server ?? {}),
          proxy: Object.assign({}, config.server?.proxy ?? {}, proxies),
        },
      };
    },
  };
}