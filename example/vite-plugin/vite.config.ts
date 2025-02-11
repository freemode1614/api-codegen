import { defineConfig, PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import apiCodeGenPlugin from "@moccona/api-codegen-vite-plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    apiCodeGenPlugin([
      {
        docURL: "http://localhost:5500/3.0/json/complex-nesting.json",
        output: "./src/client/nesting.ts",
      },
      {
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
    ]) as PluginOption,
  ],
});
