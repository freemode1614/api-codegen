import { createPrinter, SourceFile } from "typescript";

export const sourceFileToCode = (sourceFile: SourceFile) => {
  const printer = createPrinter();
  return printer.printFile(
    //
    sourceFile,
  );
};
