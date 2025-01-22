/* eslint-disable @typescript-eslint/no-extraneous-class */

import type { Node, Statement } from "typescript";
import {
  addSyntheticLeadingComment,
  createPrinter,
  factory as t,
  NodeFlags,
  SyntaxKind,
} from "typescript";

import {
  ArraySchemaObject,
  NonArraySchemaObject,
  ParameterObject,
  SchemaObject,
} from "~/base/Base";

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
   * @param statements - The array of TypeScript statement nodes.
   * @returns Formatted code as a string.
   * @throws {Error} If no valid statements are provided.
   */
  static toCode(statements: Statement[]): string {
    if (statements.length === 0) {
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
   * Converts a path string with parameters into a TypeScript template expression.
   * Handles query parameters and path placeholders.
   *
   * @param path - The base path string containing placeholders.
   * @param parameters - Array of parameter objects defining the parameters.
   * @param basePath - Optional base path to prepend (default: "").
   * @returns A TypeScript template expression node.
   */
  static toUrlTemplate(
    path: string,
    parameters: ParameterObject[],
    basePath = "",
  ) {
    // Extract query parameters
    const queryParameters = parameters.filter((p) => p.in === "query");

    if (queryParameters.length > 0) {
      const queryString = queryParameters
        .map(
          (qp, index) =>
            `${index === 0 ? "?" : "&"}${encodeURIComponent(qp.name)}={${qp.name}}`,
        )
        .join("");
      path += queryString;
    }

    // Split the path into segments
    const pathSegments = path.replaceAll("{", "${").split("$").filter(Boolean);

    // If path segments only got one item, it means there are no parameters in path. So just return the path literal.
    if (pathSegments.length === 1) {
      return t.createNoSubstitutionTemplateLiteral(basePath + path);
    }

    return t.createTemplateExpression(
      t.createTemplateHead(basePath + pathSegments[0]),
      pathSegments.slice(1).map((segment, index) => {
        const match = /^{(.+)}(.+)?/gm.exec(segment);
        const isLastSegment = index === pathSegments.length - 2;

        if (!match) {
          throw new Error(`Invalid path segment: ${segment}`);
        }

        return t.createTemplateSpan(
          t.createIdentifier(match[1]),
          !isLastSegment
            ? t.createTemplateMiddle(match[2])
            : t.createTemplateTail(match[2] || ""),
        );
      }),
    );
  }

  /**
   * Adds synthetic comments to a TypeScript AST node.
   *
   * @param node - The target AST node.
   * @param comments - Array of comment objects to add.
   */
  static addComments(node: Node, comments: Comments): void {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!comments || !Array.isArray(comments)) {
      return;
    }

    const formatComment = (comment: CommentObject): string => {
      return comment.tag
        ? `*  @${comment.tag} ${comment.comment}`
        : `* ${comment.comment}`;
    };

    const formattedComments = comments.map(formatComment).join("\n").trim();

    addSyntheticLeadingComment(
      node,
      SyntaxKind.MultiLineCommentTrivia,
      formattedComments,
    );
  }

  /**
   * Checks if a schema represents a binary type.
   *
   * @param schema - The schema object to check.
   * @returns true if the schema is a binary type, false otherwise.
   */
  static isBinarySchema(schema: SchemaObject): boolean {
    if (schema.type === "array") {
      const arraySchema = schema as ArraySchemaObject;
      return this.isBinarySchema(arraySchema.items);
    }

    const nonArraySchema = schema as NonArraySchemaObject;
    return nonArraySchema.format === "binary";
  }
}
