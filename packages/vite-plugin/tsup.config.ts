import { defineConfig } from "tsup";
import { dependencies } from "../../package.json";

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
    external: Object.keys(dependencies),
  },
  {
    entry: ["./src/index.ts"],
    outDir: "../../npm/vite-plugin",
    dts: true,
    format: ["esm"],
    sourcemap: true,
    clean: process.env.NODE_ENV === "production",
    treeshake: true,
    shims: true,
    external: Object.keys(dependencies),
  },
]);
