import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/index.ts"],
  outDir: "./npm",
  format: ["esm"],
  shims: true,
  dts: true,
  clean: true,
});
