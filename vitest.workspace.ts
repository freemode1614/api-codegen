import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  "./vitest.config.ts",
  "./packages/openapi/vite.config.ts",
  "./packages/vite-plugin/vitest.config.ts",
  "./packages/core/vitest.config.ts"
]);
