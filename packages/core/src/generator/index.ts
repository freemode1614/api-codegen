/* eslint-disable @typescript-eslint/no-extraneous-class */

import type { Node, Statement } from "typescript";
import {
  addSyntheticLeadingComment,
  createPrinter,
  factory as t,
  NodeFlags,
  SyntaxKind,
} from "typescript";

/**
 * Represents a comment object with optional tag and message.
 */
export type CommentObject = {
  tag?: string;
  comment: string;
};

/**
 * Array of comment objects to be added to the code.
 */
export type Comments = CommentObject[];

export class Generator {
  /**
   * Converts an array of TypeScript statements into a formatted string of code.
   *
   * @param {Statement[]} statements - The array of TypeScript statement nodes.
   * @returns {string} Formatted code as a string.
   * @throws {Error} If statements are invalid or empty.
   */
  static toCode(statements: Statement[]): string {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!statements || statements.length === 0) {
      throw new Error("No statements provided.");
    }

    const sourceFile = t.createSourceFile(
      statements,
      t.createToken(SyntaxKind.EndOfFileToken),
      NodeFlags.None,
    );

    return createPrinter().printFile(sourceFile);
  }

  /**
   * Adds synthetic comments to the specified node.
   *
   * @param {Node} node - The TypeScript AST node to which comments will be added.
   * @param {Comments} comments - Array of comment objects to add.
   */
  static addComments(node: Node, comments: Comments) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!comments || !Array.isArray(comments)) {
      return;
    }

    const toComment = (comment: CommentObject): string => {
      if (comment.tag) {
        return `* @${comment.tag} ${comment.comment}`;
      }
      return `* ${comment.comment}`;
    };

    const formattedComments = comments.map(toComment).join("\n").trim();

    addSyntheticLeadingComment(
      node,
      SyntaxKind.MultiLineCommentTrivia,
      formattedComments,
    );
  }
}
