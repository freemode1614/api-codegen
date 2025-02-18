import { defineConfig } from "tsup";
import {
  dependencies
} from "../../package.json";
import { renameInternalModule } from "../../plugins/internalModule"

export default defineConfig([
  {
    entry: ["./src/index.ts"],
    outDir: "./npm",
    dts: true,
    format: ["esm"],
    sourcemap: true,
    clean: process.env.NODE_ENV === "production",
    treeshake: true,
    shims: true,
    external: Object.keys(dependencies)
  },
  {
    entry: ["./src/index.ts"],
    outDir: "../../npm/openapi",
    dts: true,
    format: ["esm"],
    sourcemap: true,
    clean: process.env.NODE_ENV === "production",
    treeshake: true,
    shims: true,
    external: Object.keys(dependencies),
    plugins: [
      {
        name: "asd",
        esbuildOptions: (options) => {
          return {
            ...options,
            plugins: [renameInternalModule]
          }
        }
      }
    ]
  },
]);
