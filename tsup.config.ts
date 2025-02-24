import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/index.ts"],
  outDir: "./npm",
  format: ["esm", "cjs"],
  shims: true,
  dts: true,
  clean: true,
  sourcemap: true,
});
