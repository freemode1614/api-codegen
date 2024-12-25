import * as prettier from "prettier";

interface FormatOptions {
  parser?: prettier.BuiltInParserName;
  semi?: boolean;
  tabWidth?: number;
  printWidth?: number;
}

export async function formatCode(code: string, options: FormatOptions = {}): Promise<string> {
  try {
    const defaultOptions: prettier.Options = {
      parser: "typescript",
      semi: true,
      tabWidth: 2,
      printWidth: 80,
      ...options,
    };

    const formattedCode = await prettier.format(code, defaultOptions);
    return formattedCode;
  } catch (error) {
    console.error("Error formatting code:", error);
    return code; // Return original code if formatting fails
  }
}

// Usage example:
// const code = `function hello(){return"world"}`;
// const formatted = await formatCode(code, { parser: 'typescript' });
