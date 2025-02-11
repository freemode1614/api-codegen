/* eslint-disable no-case-declarations */

import type {
  BindingElement,
  Block,
  Node,
  ParameterDeclaration,
  PropertySignature,
  Statement,
  TypeNode,
} from "typescript";
import {
  addSyntheticLeadingComment,
  createPrinter,
  factory as t,
  NodeFlags,
  SyntaxKind,
} from "typescript";
import { Adapter } from "~/base/Adaptor";
import { Base } from "~/base/Base";
import { writeFile } from "fs/promises";
import type {
  ParameterObject,
  SchemaObject,
  ArrayTypeSchemaObject,
  SingleTypeSchemaObject,
  MediaTypeObject,
  ProviderInitResult,
  ProviderInitOptions,
} from "~/interface";
import {
  MediaTypes,
  ArraySchemaType,
  NonArraySchemaType,
  ParameterIn,
  SchemaFormatType,
} from "~/interface";

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
      return "// No api declaration found.";
    }

    const sourceFile = t.createSourceFile(
      statements,
      t.createToken(SyntaxKind.EndOfFileToken),
      NodeFlags.None,
    );

    return createPrinter().printFile(sourceFile);
  }

  static async write(code: string, filepath: string) {
    try {
      await writeFile(filepath, code);
    } catch (error) {
      console.error(error);
    }
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
    const queryParameters = parameters.filter(
      (p) => p.in === ParameterIn.query,
    );

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
  static addComments(node: Node, comments: Comments) {
    if (!Array.isArray(comments)) return;

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
      const arraySchema = schema as ArrayTypeSchemaObject;
      return this.isBinarySchema(arraySchema.items!);
    }

    const nonArraySchema = schema as SingleTypeSchemaObject;
    return (
      nonArraySchema.format === SchemaFormatType.blob ||
      nonArraySchema.format === SchemaFormatType.binary ||
      nonArraySchema.type === SchemaFormatType.file
    );
  }

  static toRequestBodyTypeNode(schema: SchemaObject) {
    return t.createParameterDeclaration(
      undefined,
      undefined,
      t.createIdentifier("req"),
      undefined,
      this.toTypeNode(schema),
    );
  }

  static toTypeNode(schema: SchemaObject): TypeNode {
    const { type, ref } = schema;

    if (ref) {
      const identify = Base.ref2name(ref);
      return t.createTypeReferenceNode(
        t.createIdentifier(
          identify === "unknown" ? identify : Base.upperCamelCase(identify),
        ),
      );
    }

    switch (type) {
      case ArraySchemaType.array:
        const { items } = schema as ArrayTypeSchemaObject;
        return t.createArrayTypeNode(this.toTypeNode(items!));
      case NonArraySchemaType.object:
        const propsCount = Object.keys(schema.properties ?? {}).length;
        if (!schema.properties || propsCount === 0) {
          // Record<string, unknown>
          return t.createTypeReferenceNode(t.createIdentifier("Record"), [
            t.createToken(SyntaxKind.StringKeyword),
            t.createToken(SyntaxKind.UnknownKeyword),
          ]);
        }

        const props = Object.keys(schema.properties);

        return t.createTypeLiteralNode(
          props.map((propKey) => {
            const propSchema = schema.properties![propKey];
            return t.createPropertySignature(
              undefined,
              t.createStringLiteral(propKey),
              // When field is required, a refrence or binary value, don't add question mark.
              schema.required || schema.ref || this.isBinarySchema(schema)
                ? undefined
                : t.createToken(SyntaxKind.QuestionToken),
              this.toTypeNode(propSchema),
            );
          }),
        );
      case NonArraySchemaType.integer:
      case NonArraySchemaType.number:
        if (schema.enum) {
          return t.createUnionTypeNode(
            schema.enum.map((e) =>
              t.createLiteralTypeNode(t.createNumericLiteral(e)),
            ),
          );
        }
        return t.createToken(SyntaxKind.NumberKeyword);
      // case NonArraySchemaType.string:
      case NonArraySchemaType.boolean:
        return t.createToken(SyntaxKind.BooleanKeyword);
      case NonArraySchemaType.file:
        return t.createTypeReferenceNode(t.createIdentifier("File"));
      default:
        const {
          format,
          oneOf,
          allOf,
          anyOf,
          type,
          enum: enum_,
        } = schema as SingleTypeSchemaObject;

        switch (format) {
          case SchemaFormatType.number:
            return t.createToken(SyntaxKind.NumberKeyword);
          case SchemaFormatType.string:
            return t.createToken(SyntaxKind.StringKeyword);
          case SchemaFormatType.boolean:
            return t.createToken(SyntaxKind.BooleanKeyword);
          case SchemaFormatType.blob:
          case SchemaFormatType.binary:
            return t.createTypeReferenceNode(t.createIdentifier("File"));
          default:
        }

        if (enum_) {
          return t.createUnionTypeNode(
            enum_.map((e) =>
              t.createLiteralTypeNode(t.createStringLiteral(e as string)),
            ),
          );
        }

        if (type === NonArraySchemaType.string) {
          return t.createToken(SyntaxKind.StringKeyword);
        }

        if (oneOf) {
          return t.createUnionTypeNode(
            oneOf.map((schema) => this.toTypeNode(schema)),
          );
        }

        if (anyOf) {
          return t.createUnionTypeNode(
            anyOf.map((schema) => this.toTypeNode(schema)),
          );
        }

        if (allOf) {
          return t.createUnionTypeNode(
            allOf.map((schema) => this.toTypeNode(schema)),
          );
        }

        if (type && typeof type === "string") {
          return t.createTypeReferenceNode(t.createIdentifier(type));
          // t.createTypeOperatorNode(
          //   SyntaxKind.KeyOfKeyword,
          //   t.createTypeQueryNode(t.createIdentifier(type)),
          // );
          // t.createTypeReferenceNode(t.createIdentifier(type));
        }
    }

    return t.createToken(SyntaxKind.UnknownKeyword);
  }

  static toDeclarationNode(
    parameters: ParameterObject[],
  ): ParameterDeclaration {
    const objectElements: BindingElement[] = [];
    const typeObjectElements: PropertySignature[] = [];

    for (const parameter of parameters) {
      if (parameter.ref) {
        t.createParameterDeclaration(
          undefined,
          undefined,
          t.createIdentifier(
            Base.camelCase(Base.normalize(Base.ref2name(parameter.ref))),
          ),
          undefined,
          t.createTypeReferenceNode(
            t.createIdentifier(
              Base.upperCamelCase(Base.normalize(Base.ref2name(parameter.ref))),
            ),
          ),
          undefined,
        );
      } else {
        const { name, schema, required } = parameter;
        objectElements.push(
          t.createBindingElement(
            undefined,
            undefined,
            t.createIdentifier(Base.camelCase(Base.normalize(name))),
          ),
        );

        typeObjectElements.push(
          t.createPropertySignature(
            [],
            t.createIdentifier(Base.camelCase(Base.normalize(name))),
            required ? undefined : t.createToken(SyntaxKind.QuestionToken),
            !schema
              ? t.createToken(SyntaxKind.UnknownKeyword)
              : this.toTypeNode(schema),
          ),
        );
      }
    }

    return t.createParameterDeclaration(
      undefined,
      undefined,
      t.createObjectBindingPattern(objectElements),
      undefined,
      t.createTypeLiteralNode(typeObjectElements),
      undefined,
    );
  }

  static toFormDataStatement(
    parameters: ParameterObject[],
    requestBody?: SchemaObject,
  ): Statement[] {
    const statements: Statement[] = [];
    const fdDeclaration = t.createVariableStatement(
      undefined,
      t.createVariableDeclarationList(
        [
          t.createVariableDeclaration(
            t.createIdentifier("fd"),
            undefined,
            undefined,
            t.createNewExpression(
              t.createIdentifier("FormData"),
              undefined,
              [],
            ),
          ),
        ],
        NodeFlags.Const,
      ),
    );

    statements.push(fdDeclaration);

    parameters
      .filter(
        (parameter) =>
          parameter.ref !== undefined &&
          (parameter.in === ParameterIn.formData ||
            (parameter.schema && this.isBinarySchema(parameter.schema))),
      )
      .forEach((parameter) => {
        statements.push(
          t.createExpressionStatement(
            t.createBinaryExpression(
              t.createPropertyAccessExpression(
                t.createIdentifier("req"),
                t.createIdentifier(parameter.name),
              ),
              t.createToken(SyntaxKind.AmpersandAmpersandToken),
              t.createCallExpression(
                t.createPropertyAccessExpression(
                  t.createIdentifier("fd"),
                  t.createIdentifier("append"),
                ),
                undefined,
                [
                  t.createStringLiteral(parameter.name),
                  t.createIdentifier(parameter.name),
                ],
              ),
            ),
          ),
        );
      });

    if (
      requestBody &&
      requestBody.type === "object" &&
      requestBody.properties &&
      Object.keys(requestBody.properties).length !== 0
    ) {
      Object.keys(requestBody.properties).forEach((key) => {
        const schemaByKey = requestBody.properties![key];
        if (
          schemaByKey.type === ArraySchemaType.array &&
          this.isBinarySchema(schemaByKey)
        ) {
          statements.push(
            t.createForOfStatement(
              undefined,
              t.createVariableDeclarationList([
                t.createVariableDeclaration("file"),
              ]),
              t.createPropertyAccessExpression(
                t.createIdentifier("req"),
                t.createIdentifier(key),
              ),
              t.createBlock([
                t.createExpressionStatement(
                  t.createCallExpression(
                    t.createPropertyAccessExpression(
                      t.createIdentifier("fd"),
                      t.createIdentifier("append"),
                    ),
                    [],
                    [
                      t.createStringLiteral(key),
                      t.createIdentifier("file"),
                      t.createPropertyAccessExpression(
                        t.createIdentifier("file"),
                        t.createIdentifier("name"),
                      ),
                    ],
                  ),
                ),
              ]),
            ),
          );
        } else {
          if (schemaByKey.required) {
            statements.push(
              t.createExpressionStatement(
                t.createCallExpression(
                  t.createPropertyAccessExpression(
                    t.createIdentifier("fd"),
                    t.createIdentifier("append"),
                  ),
                  undefined,
                  [
                    t.createStringLiteral(key),
                    schemaByKey.type === "string"
                      ? t.createPropertyAccessExpression(
                          t.createIdentifier("req"),
                          t.createIdentifier(key),
                        )
                      : t.createCallExpression(
                          t.createIdentifier("String"),
                          undefined,
                          [
                            t.createPropertyAccessExpression(
                              t.createIdentifier("req"),
                              t.createIdentifier(key),
                            ),
                          ],
                        ),
                  ],
                ),
              ),
            );
          } else {
            statements.push(
              t.createExpressionStatement(
                t.createBinaryExpression(
                  t.createPropertyAccessExpression(
                    t.createIdentifier("req"),
                    t.createIdentifier(key),
                  ),
                  t.createToken(SyntaxKind.AmpersandAmpersandToken),
                  t.createCallExpression(
                    t.createPropertyAccessExpression(
                      t.createIdentifier("fd"),
                      t.createIdentifier("append"),
                    ),
                    undefined,
                    [
                      t.createStringLiteral(key),
                      schemaByKey.type === "string"
                        ? t.createPropertyAccessExpression(
                            t.createIdentifier("req"),
                            t.createIdentifier(key),
                          )
                        : t.createCallExpression(
                            t.createIdentifier("String"),
                            undefined,
                            [
                              t.createPropertyAccessExpression(
                                t.createIdentifier("req"),
                                t.createIdentifier(key),
                              ),
                            ],
                          ),
                    ],
                  ),
                ),
              ),
            );
          }
        }
      });
    }

    return statements;
  }

  static bodyBlock(
    uri: string,
    method: string,
    parameters: ParameterObject[],
    requestBody: MediaTypeObject | undefined,
    response: MediaTypeObject | undefined,
    adapter: Adapter,
  ): Block {
    const isFormDataRequest =
      requestBody &&
      ["multipart/form-data", "application/x-www-form-urlencoded"].includes(
        requestBody.type,
      );

    const shouldParseResponseToJSON = "application/json" === response?.type;

    // Ignore one and only blob parameter.
    const isRequestBodyBinary =
      requestBody &&
      requestBody.schema &&
      requestBody.schema.type === ArraySchemaType.array &&
      this.isBinarySchema(requestBody.schema);

    const inFormDataParameters = parameters.filter(
      (p) => p.in === ParameterIn.formData,
    );

    const notInFormDataParameters = parameters.filter(
      (p) => p.in !== ParameterIn.formData,
    );

    //  TODO: Need to support binary/blob format properties in requestBody
    const isRequestBodyContainsBinary =
      requestBody &&
      requestBody.schema &&
      "properties" in requestBody.schema &&
      Object.values(requestBody!.schema!.properties!).some((p) =>
        this.isBinarySchema(p as SchemaObject),
      );

    const hasBinaryInParameters = parameters.some(
      (p) => p && p.schema && this.isBinarySchema(p.schema),
    );

    const shouldPutParametersOrBodyInFormData =
      isFormDataRequest ||
      isRequestBodyBinary ||
      hasBinaryInParameters ||
      isRequestBodyContainsBinary ||
      inFormDataParameters.length > 0;

    return t.createBlock([
      ...(shouldPutParametersOrBodyInFormData
        ? this.toFormDataStatement(inFormDataParameters, requestBody?.schema)
        : []),
      ...adapter.client(
        uri,
        method,
        notInFormDataParameters,
        requestBody,
        response,
        adapter,
        shouldPutParametersOrBodyInFormData,
        shouldParseResponseToJSON,
      ),
    ]);
  }

  static schemaToStatemets(
    parsedDoc: ProviderInitResult,
    adaptor: Adapter,
    options: Omit<ProviderInitOptions, "docURL" | "output" | "requestOptions">,
  ): Statement[] {
    const statements = [] as Statement[];
    const { apis, schemas = {}, enums } = parsedDoc;

    const enumNames: string[] = [];

    for (const enumObject of enums) {
      enumNames.push(Base.capitalize(enumObject.name));
      statements.push(
        t.createEnumDeclaration(
          [t.createToken(SyntaxKind.ExportKeyword)],
          t.createIdentifier(Base.upperCamelCase(enumObject.name)),
          enumObject.enum.map((member) => {
            return t.createEnumMember(
              t.createStringLiteral(
                typeof member === "string" ? member : member + "_",
              ),
              typeof member === "string"
                ? t.createStringLiteral(member)
                : t.createNumericLiteral(member),
            );
          }),
        ),
      );
    }

    for (const schemaKey in schemas) {
      if (
        Object.hasOwnProperty.call(schemas, schemaKey) &&
        !enumNames.includes(Base.upperCamelCase(schemaKey))
      ) {
        const schema = schemas[schemaKey];
        statements.push(
          t.createTypeAliasDeclaration(
            [t.createModifier(SyntaxKind.ExportKeyword)],
            t.createIdentifier(Base.upperCamelCase(schemaKey)),
            undefined,
            this.toTypeNode(schema),
          ),
        );
      }
    }

    for (const uri in apis) {
      const operations = apis[uri];
      for (const operation of operations) {
        const {
          method,
          operationId,
          requestBody = [],
          responses = [],
          summary,
          deprecated,
          description,
        } = operation;

        let { parameters = [] } = operation;

        parameters = parameters.filter((p) => p.in !== "cookie");

        // Add a default request, with no schema.
        if (requestBody.length === 0) {
          requestBody.push({ type: MediaTypes.JSON });
        }

        const shouldAddExtraMethodNameSuffix = requestBody.length > 1;

        for (const req of requestBody) {
          const statement = t.createFunctionDeclaration(
            [
              t.createModifier(SyntaxKind.ExportKeyword),
              t.createModifier(SyntaxKind.AsyncKeyword),
            ],
            undefined,
            Base.pathToFnName(uri, method, operationId) +
              (shouldAddExtraMethodNameSuffix
                ? Base.capitalize(req.type.split("/")[1])
                : ""),
            undefined,
            [
              parameters.length > 0
                ? Generator.toDeclarationNode(parameters)
                : undefined,
              req && req.schema
                ? Generator.toRequestBodyTypeNode(req.schema)
                : undefined,
            ].filter(Boolean) as ParameterDeclaration[],
            undefined,
            this.bodyBlock(
              options.baseURL + uri,
              method,
              parameters,
              req,
              responses[0],
              adaptor,
            ),
          );

          // this.addComments(
          //   statement,
          //   [
          //     description && {
          //       comment: description,
          //     },
          //     summary && {
          //       comment: summary,
          //     },
          //     deprecated && {
          //       tag: "deprecated",
          //     },
          //   ].filter(Boolean) as CommentObject[],
          // );
          statements.push(statement);
        }
      }
    }

    return statements;
  }

  static genCode(
    schema: ProviderInitResult,
    initOptions: ProviderInitOptions,
    adaptor: Adapter,
  ) {
    const { importClientSource } = initOptions;
    const statements = this.schemaToStatemets(schema, adaptor, {
      baseURL: initOptions.baseURL ?? "",
    });
    let code = this.toCode(statements);

    if (importClientSource) {
      code = importClientSource + "\n\n" + code;
    }

    return code;
  }
}
