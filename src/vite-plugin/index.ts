import { codeGen, type ProviderInitOptions } from "@apicodegen/openapi";
import { createScopedLogger } from "@moccona/logger";
import { execaCommand } from "execa";
import fs from "fs-extra";
import type { PluginOption, ServerOptions } from "vite";

const PLUGIN_NAME = "apiCodeGen";
const logger = createScopedLogger("api-codegen-vite-plugin");

export type apiCodeGenPluginOptions = ProviderInitOptions & {
  name: string;
  proxy?: ServerOptions["proxy"];
};

export const tsc = async (path: string) => {
  await execaCommand(`npx tsc ${path} --noEmit`);
};

export function apiCodeGenPlugin(
  options: apiCodeGenPluginOptions[],
): PluginOption {
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
            await fs.createFile(codeGenInitOptions.output);
            await fs.writeFile(codeGenInitOptions.output, code);
            try {
              await tsc(codeGenInitOptions.output);
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
