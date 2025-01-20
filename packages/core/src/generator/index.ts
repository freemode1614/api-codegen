/* eslint-disable @typescript-eslint/no-extraneous-class */

import type { Statement } from "typescript";
import { createPrinter, factory as t, NodeFlags, SyntaxKind } from "typescript";

export class C {
  /**
   *
   * @param statements
   * @returns {string} Code from statements
   */
  static toCode(statements: Statement[]) {
    const sourceFile = t.createSourceFile(
      statements,
      t.createToken(SyntaxKind.EndOfFileToken),
      NodeFlags.None,
    );

    return createPrinter().printFile(sourceFile);
  }
}
