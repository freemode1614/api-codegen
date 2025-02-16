import { codeGen, type ProviderInitOptions } from "@apicodegen/openapi";
import type { ServerOptions, PluginOption } from "vite";
import fs from "fs-extra";
import { createScopedLogger } from "@moccona/logger";
import { execaCommand } from "execa";

const PLUGIN_NAME = "apiCodeGen";
const logger = createScopedLogger("api-codegen-vite-plugin");

export type apiCodeGenPluginOptions = ProviderInitOptions & {
  name: string;
  proxy?: ServerOptions["proxy"];
};

export const tsc = async () => {
  await execaCommand("npx tsc -b");
};

export default function apiCodeGenPlugin(
  options: apiCodeGenPluginOptions[]
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
          const { proxy = {}, name, ...codeGenInitOptions } = option;

          try {
            const code = await codeGen(codeGenInitOptions);
            await fs.createFile(codeGenInitOptions.output!);
            await fs.writeFile(codeGenInitOptions.output!, code);
          } catch (error) {
            logger.error(`Failed to generate api ${name}`);
            console.error(error);
          }

          return {
            ...proxies_,
            ...proxy,
          };
        },
        Promise.resolve({} as ServerOptions["proxy"])
      );

      logger.info("-------> api code finished <--------");

      try {
        await tsc();
      } catch (error) {}

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
