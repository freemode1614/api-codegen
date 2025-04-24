import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: ["./src/index.ts"],
    outDir: "./npm",
    format: ["esm", "cjs"],
    shims: true,
    dts: true,
    clean: true,
    sourcemap: true,
  },
  {
    entry: ["./src/cli.ts"],
    outDir: "./bin",
    format: "esm",
    shims: true,
    clean: true,
    sourcemap: false,
  },
]);
