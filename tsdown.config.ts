import { defineConfig } from "tsdown";

export default defineConfig([
  {
    entry: "./src/index.ts",
    outDir: "./npm",
    format: ["esm", "cjs"],
    shims: true,
    dts: true,
    sourcemap: true,
  },
  {
    entry: "./src/cli.ts",
    outDir: "./bin",
    format: "cjs",
    shims: true,
    clean: true,
    sourcemap: false,
  },
  {
    entry: "./src/vite-plugin/index.ts",
    outDir: "./npm/vite",
    format: "esm",
    shims: true,
    dts: true,
    sourcemap: true,
  }
]);
