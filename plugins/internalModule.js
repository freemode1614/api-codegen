import * as esbuild from "esbuild";

/**
 * @type {import("esbuild").Plugin}
 */
export const renameInternalModule = {
  name: "renameInternalModule",
  setup(build) {
    build.onResolve({ filter: /^@apicodegen/ }, (args) => {
      console.log("args =>", args);
      return {
        path: "asdasd",
        external: true,
      };
    });
  },
};
