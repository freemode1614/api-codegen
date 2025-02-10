import {} from "@moccona/api-codegen-openapi";
import { Plugin } from "vite";

const PLUGIN_NAME = "apiCodeGen";

export default function apiCodeGenPlugin(): Plugin {
  return {
    name: PLUGIN_NAME,
  };
}
