import {
  codeGen,
  type ProviderInitOptions,
} from "@moccona/api-codegen-openapi";
import type { ServerOptions, PluginOption } from "vite";
import fs from "fs-extra";
import { createScopedLogger } from "@moccona/logger";

const PLUGIN_NAME = "apiCodeGen";
const logger = createScopedLogger("api-codegen-vite-plugin");

export type apiCodeGenPluginOptions = ProviderInitOptions & {
  proxy?: ServerOptions["proxy"];
};

export default function apiCodeGenPlugin(
  options: apiCodeGenPluginOptions[],
): PluginOption {
  let firstRun = true;
  return {
    name: PLUGIN_NAME,
    async config(config) {
      if (!firstRun) return;
      firstRun = false;
      logger.info("-------> api code start <--------");
      const proxies = await options.reduce(
        async (proxiesPromise_, option) => {
          const proxies_ = await proxiesPromise_;
          const { proxy = {}, ...codeGenInitOptions } = option;

          try {
            const code = await codeGen(codeGenInitOptions);
            await fs.createFile(codeGenInitOptions.output!);
            await fs.writeFile(codeGenInitOptions.output!, code);
          } catch (error) {
            logger.error(`Failed to generate ${codeGenInitOptions.output!}`);
            console.error(error);
          }

          return {
            ...proxies_,
            ...proxy,
          };
        },
        Promise.resolve({} as ServerOptions["proxy"]),
      );

      logger.info("-------> api code finished <--------");

      return {
        ...config,
        server: {
          ...(config.server ?? {}),
          proxy: proxies,
        },
      };
    },
  };
}
