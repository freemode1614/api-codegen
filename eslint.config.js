import baseConfig from "@moccona/eslint-config";
import prettierConfig from "@moccona/eslint-config/extra/prettier";
import tsConfig from "@moccona/eslint-config/extra/typescript";

/**
 * @type {import("eslint").Linter.Config}
 */
export default [
  ...baseConfig,
  ...tsConfig,
  ...prettierConfig,
  {
    ignores: ["bin/*"],
  },
];
