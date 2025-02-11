import { defineConfig, PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import apiCodeGenPlugin from "@moccona/api-codegen-vite-plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    apiCodeGenPlugin([
      {
        name: "doc-3.0",
        docURL: "http://localhost:5500/3.0/json/complex-nesting.json",
        output: "./src/client/nesting.ts",
      },
      {
        name: "doc-3.0",
        docURL: "http://localhost:5500/3.0/json/star-trek.json",
        output: "./src/client/star-trek.ts",
        verbose: true,
        baseURL: "/api",
        proxy: {
          "/api": {
            ws: true,
            target: "",
          },
        },
      },
      {
        name: "doc-3.1",
        docURL: "http://localhost:5500/3.1/json/schema-types.json",
        output: "./src/client/nesting.3_1.ts",
      },
    ]) as PluginOption,
  ],
});
