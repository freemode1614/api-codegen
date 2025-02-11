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
        docURL: "http://localhost:5500/3.0/json/star-trek.json",
        output: "./src/client/openapi3.0.ts",
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
        docURL: "http://localhost:5500/3.1/json/petstore.json",
        output: "./src/client/openapi3.1.ts",
      },
      {
        name: "doc-2.0",
        docURL: "http://localhost:5500/2.0/json/petstore.json",
        output: "./src/client/openapi2.0.ts",
      },
    ]) as PluginOption,
  ],
});
