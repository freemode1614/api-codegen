import {
  codeGen,
  type ProviderInitOptions,
} from "@moccona/api-codegen-openapi";
import { Plugin, ServerOptions } from "vite";

const PLUGIN_NAME = "apiCodeGen";

export type apiCodeGenPluginOptions = ProviderInitOptions & {
  proxy?: ServerOptions["proxy"];
};

export default function apiCodeGenPlugin(
  options: apiCodeGenPluginOptions[],
): Plugin {
  // let devServer: ViteDevServer;
  let firstRun = true;
  return {
    name: PLUGIN_NAME,
    // configureServer: {
    //   handler(server) {
    //     devServer = server;
    //   },
    // },
    // Generate api code before config resolved.
    async config(config) {
      if (!firstRun) return;
      firstRun = false;
      const proxies = await options.reduce(
        async (proxiesPromise_, option) => {
          const proxies_ = await proxiesPromise_;
          const { proxy = {}, ...codeGenInitOptions } = option;
          const code = await codeGen(codeGenInitOptions);

          return {
            ...proxies_,
            ...proxy,
          };
        },
        Promise.resolve({} as ServerOptions["proxy"]),
      );

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
