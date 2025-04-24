#!/bin/env node

// src/core/base/Adaptor.ts
var Adapter = class {
};

// src/core/constants/keywords.ts
var typescriptKeywords = /* @__PURE__ */ new Set([
  "break",
  "case",
  "catch",
  "class",
  "const",
  "continue",
  "debugger",
  "default",
  "delete",
  "do",
  "else",
  "enum",
  "export",
  "extends",
  "false",
  "finally",
  "for",
  "function",
  "if",
  "import",
  "in",
  "instanceof",
  "new",
  "null",
  "return",
  "super",
  "switch",
  "this",
  "throw",
  "true",
  "try",
  "typeof",
  "var",
  "void",
  "while",
  "with",
  "as",
  "implements",
  "interface",
  "let",
  "package",
  "private",
  "protected",
  "public",
  "static",
  "yield",
  "abstract",
  "any",
  "async",
  "await",
  "constructor",
  "declare",
  "from",
  "get",
  "is",
  "module",
  "namespace",
  "never",
  "require",
  "set",
  "type",
  "unknown",
  "readonly",
  "of",
  "asserts",
  "infer",
  "keyof",
  "boolean",
  "number",
  "string",
  "symbol",
  "object",
  "undefined",
  "bigint"
]);

// src/core/interface.ts
var MediaTypes = /* @__PURE__ */ ((MediaTypes2) => {
  MediaTypes2["JSON"] = "application/json";
  MediaTypes2["TEXT"] = "text";
  MediaTypes2["IMAGE"] = "image";
  MediaTypes2["AUDIO"] = "audio";
  MediaTypes2["VIDEO"] = "video";
  return MediaTypes2;
})(MediaTypes || {});
var HttpMethods = /* @__PURE__ */ ((HttpMethods2) => {
  HttpMethods2["GET"] = "get";
  HttpMethods2["PUT"] = "put";
  HttpMethods2["POST"] = "post";
  HttpMethods2["DELETE"] = "delete";
  HttpMethods2["OPTIONS"] = "options";
  HttpMethods2["HEAD"] = "head";
  HttpMethods2["PATCH"] = "patch";
  HttpMethods2["TRACE"] = "trace";
  return HttpMethods2;
})(HttpMethods || {});

// src/core/base/Base.ts
import { Agent, request } from "undici";
var Base = class _Base {
  constructor() {
    if (new.target === _Base) {
      throw new Error("Cannot instantiate abstract class");
    }
  }
  /**
   * Converts a reference string to a meaningful name.
   * @param ref - The reference string to process.
   * @param [doc] - Optional document reference for context.
   * @returns - The processed name.
   */
  static ref2name(ref, doc) {
    const paths = ref.replace(/^#/, "").split("/").filter(Boolean);
    if (!doc) {
      return paths.slice(-1)[0];
    }
    let temporary = doc;
    let lastPath = "";
    for (const path of paths) {
      const adjustedPath = path.replaceAll("~1", "/");
      temporary = temporary[adjustedPath];
      lastPath = adjustedPath;
    }
    if (!temporary) {
      return "unknown";
    }
    return temporary.$ref ? this.ref2name(temporary.$ref, doc) : lastPath;
  }
  /**
   * Converts an API path to a function name.
   * @param path - The API endpoint path.
   * @param [method] - The HTTP method (e.g., GET, POST).
   * @param [operationId] - Unique identifier for the operation.
   * @returns - The generated function name.
   */
  static pathToFnName(path, method, _operationId = "") {
    const name = this.normalize(this.camelCase(this.normalize(path)));
    const suffix = method ? this.capitalize(this.upperCamelCase(`using_${method}`)) : "";
    return name + suffix;
  }
  /**
   * Normalizes a string by replacing special characters and avoiding TypeScript keywords.
   * @param text - Input text to normalize.
   * @returns - The normalized string.
   */
  static normalize(text) {
    if (typescriptKeywords.has(text)) {
      text += "_";
    }
    return text.replace(/[/\-_{}():\s`,*<>$#.]/gm, "_").replace(/^\d./gm, "").replaceAll("...", "");
  }
  /**
   * Capitalizes the first character of a string.
   * @param text - Input string.
   * @returns - Capitalized string.
   */
  static capitalize(text) {
    text = text.trim();
    return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
  }
  /**
   * Converts a string to camelCase.
   * @param text - Input string.
   * @returns - CamelCase string.
   */
  static camelCase(text) {
    text = text.trim();
    return text.split("_").filter(Boolean).map((t4, index) => index === 0 ? t4 : this.capitalize(t4)).join("");
  }
  /**
   * Converts a string to UpperCamelCase.
   * @param text - Input string.
   * @returns - UpperCamelCase string.
   */
  static upperCamelCase(text) {
    return this.normalize(text).replaceAll("...", "").split("_").filter(Boolean).map(this.capitalize).join("");
  }
  /**
   * Fetches documentation from a given URL.
   * @param url - The URL to fetch the documentation from.
   * @param requestInit - Additional request parameters.
   * @returns - A promise resolving to the fetched documentation data.
   */
  static async fetchDoc(url, requestInit = {}) {
    const agent = new Agent({
      connect: {
        rejectUnauthorized: false
      }
    });
    try {
      const { body } = await request(url, {
        method: "GET",
        dispatcher: agent,
        ...requestInit
      });
      return body.json();
    } catch (error) {
      throw error;
    }
  }
  /**
   * Determines the media type from a given media type string.
   * @param mediaType - The media type string to evaluate.
   * @returns - The matched MediaTypes or null.
   */
  static getMediaType(mediaType) {
    for (const type in Object.values(MediaTypes)) {
      if (new RegExp(type).test(mediaType)) {
        return type;
      }
    }
    return;
  }
  /**
   * Checks if a schema is a valid enum type that isn't boolean.
   * @param a - The schema object to evaluate.
   * @returns - True if the schema is a valid non-boolean enum.
   */
  static isValidEnumType(a) {
    return a.type !== "boolean" && !this.isBooleanEnum(a);
  }
  /**
   * Checks if a schema represents a boolean enum.
   * @param a - The schema object to evaluate.
   * @returns - True if the schema is a boolean enum.
   */
  static isBooleanEnum(a) {
    return a.type === "boolean" || !!a.enum?.some(
      (member) => typeof member === "boolean"
    );
  }
  /**
   * Checks if two enum schemas are identical.
   * @param a - First enum schema to compare.
   * @param b - Second enum schema to compare.
   * @returns - True if the enums are identical.
   */
  static isSameEnum(a, b) {
    return a.enum.length === b.enum.length && a.enum.sort().every((v, index) => v === b.enum.sort()[index]);
  }
  /**
   * Filters out duplicate enum schemas from an array.
   * @param enums - Array of enum schemas to process.
   * @returns - Array of unique enum schemas.
   */
  static uniqueEnums(enums) {
    const uniqueEnums_ = [];
    for (const enumObject of enums) {
      if (uniqueEnums_.length === 0) {
        uniqueEnums_.push(enumObject);
      } else {
        if (!uniqueEnums_.some((a) => this.isSameEnum(a, enumObject))) {
          uniqueEnums_.push(enumObject);
        }
      }
    }
    return uniqueEnums_;
  }
  /**
   * Finds the first occurrence of a matching enum schema in an array.
   * @param a - The enum schema to find.
   * @param enums - Array of enum schemas to search.
   * @returns - The found schema or undefined.
   */
  static findSameSchema(a, enums) {
    return enums.find((b) => this.isSameEnum(b, a));
  }
  /**
   * Checks if an object is a reference object.
   * @param schema - The object to check.
   * @returns - True if the object is a reference.
   */
  static isRef(schema) {
    return "$ref" in schema && typeof schema.$ref === "string";
  }
};

// src/core/base/Provider.ts
var Provider = class {
  /** collection of enum schemas */
  enums = [];
  /** collection of schemas indexed by name */
  schemas = {};
  /** collection of parameters indexed by name */
  parameters = {};
  /** collection of API responses indexed by name */
  responses = {};
  /** collection of request bodies indexed by name */
  requestBodies = {};
  /** collection of API endpoints (operations) indexed by path */
  apis = {};
  /** URL for fetching API documentation */
  docURL;
  /** base URL for API endpoints */
  baseURL;
  /** output directory for generated code */
  output;
  /** request options for API documentation fetch */
  requestOptions;
  /** source path for imported client */
  importClientSource;
  /**
   * Provider Constructor.
   * @param {ProviderInitOptions} initOptions - Initial configuration for the provider.
   * @param {unknown} doc - Raw API documentation data to be parsed.
   */
  constructor(initOptions, doc) {
    this.docURL = initOptions.docURL;
    this.baseURL = initOptions.baseURL ?? "";
    this.output = initOptions.output ?? ".";
    this.requestOptions = initOptions.requestOptions ?? {};
    this.importClientSource = initOptions.importClientSource ?? "";
    const { enums, schemas, requestBodies, responses, parameters, apis } = this.parse(doc);
    this.enums = enums;
    this.schemas = schemas;
    this.responses = responses;
    this.parameters = parameters;
    this.requestBodies = requestBodies;
    this.apis = apis;
  }
};

// src/core/generator/index.ts
import { writeFile } from "fs/promises";
import { format } from "prettier";
import {
  addSyntheticLeadingComment,
  createPrinter,
  factory as t,
  NodeFlags,
  SyntaxKind
} from "typescript";
var Generator = class _Generator {
  /**
   * Converts an array of TypeScript statements into a formatted string of code.
   *
   * @param statements - The array of TypeScript statement nodes.
   * @returns Formatted code as a string.
   * @throws {Error} If no valid statements are provided.
   */
  static toCode(statements) {
    if (statements.length === 0) {
      return "// No api declaration found.";
    }
    const sourceFile = t.createSourceFile(
      statements,
      t.createToken(SyntaxKind.EndOfFileToken),
      NodeFlags.None
    );
    return createPrinter().printFile(sourceFile);
  }
  static async write(code, filepath) {
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
   * @returns A TypeScript template expressi
   */
  static toUrlTemplate(path, parameters, basePath = "") {
    const queryParameters = parameters.filter(
      (p) => p.in === "query" /* query */
    );
    if (queryParameters.length > 0) {
      const queryString = queryParameters.map(
        (qp, index) => `${index === 0 ? "?" : "&"}${encodeURIComponent(qp.name)}={${Base.camelCase(Base.normalize(qp.name))}}`
      ).join("");
      path += queryString;
    }
    const pathSegments = path.replaceAll("{", "${").split("$").filter(Boolean);
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
          !isLastSegment ? t.createTemplateMiddle(match[2]) : t.createTemplateTail(match[2] || "")
        );
      })
    );
  }
  /**
   * Adds synthetic comments to a TypeScript AST node.
   *
   * @param node - The target AST node.
   * @param comments - Array of comment objects to add.
   */
  static addComments(node, comments) {
    if (!Array.isArray(comments) || comments.filter(Boolean).length === 0)
      return;
    const formatComment = (comment) => {
      return comment.tag ? ` @${comment.tag} ${comment.comment ?? ""}` : ` ${comment.comment}`;
    };
    const formattedComments = "*\n" + comments.map(formatComment).join("\n").trim() + "\n";
    addSyntheticLeadingComment(
      node,
      SyntaxKind.MultiLineCommentTrivia,
      formattedComments,
      true
    );
  }
  /**
   * Checks if a schema represents a binary type.
   *
   * @param schema - The schema object to check.
   * @returns true if the schema is a binary type, false otherwise.
   */
  static isBinarySchema(schema) {
    if (schema.type === "array") {
      const arraySchema = schema;
      return this.isBinarySchema(arraySchema.items);
    }
    const nonArraySchema = schema;
    return nonArraySchema.format === "blob" /* blob */ || nonArraySchema.format === "binary" /* binary */ || nonArraySchema.type === "file" /* file */;
  }
  static toRequestBodyTypeNode(schema) {
    return t.createParameterDeclaration(
      void 0,
      void 0,
      t.createIdentifier("req"),
      void 0,
      this.toTypeNode(schema)
    );
  }
  static toTypeNode(schema) {
    const { type, ref } = schema;
    if (ref) {
      const identify = Base.ref2name(ref);
      return t.createTypeReferenceNode(
        t.createIdentifier(
          identify === "unknown" ? identify : Base.upperCamelCase(identify)
        )
      );
    }
    switch (type) {
      case "array" /* array */:
        const { items } = schema;
        return t.createArrayTypeNode(this.toTypeNode(items));
      case "object" /* object */:
        const propsCount = Object.keys(schema.properties ?? {}).length;
        if (!schema.properties || propsCount === 0) {
          return t.createTypeReferenceNode(t.createIdentifier("Record"), [
            t.createToken(SyntaxKind.StringKeyword),
            t.createToken(SyntaxKind.UnknownKeyword)
          ]);
        }
        const props = Object.keys(schema.properties);
        return t.createTypeLiteralNode(
          props.map((propKey) => {
            const propSchema = schema.properties[propKey];
            return t.createPropertySignature(
              void 0,
              t.createStringLiteral(propKey),
              // When field is required, a refrence or binary value, don't add question mark.
              schema.required || schema.ref || this.isBinarySchema(schema) ? void 0 : t.createToken(SyntaxKind.QuestionToken),
              this.toTypeNode(propSchema)
            );
          })
        );
      case "integer" /* integer */:
      case "number" /* number */:
        if (schema.enum) {
          return t.createUnionTypeNode(
            schema.enum.map(
              (e) => t.createLiteralTypeNode(t.createNumericLiteral(e))
            )
          );
        }
        return t.createToken(SyntaxKind.NumberKeyword);
      // case NonArraySchemaType.string:
      case "boolean" /* boolean */:
        return t.createToken(SyntaxKind.BooleanKeyword);
      case "file" /* file */:
        return t.createTypeReferenceNode(t.createIdentifier("Blob"));
      default:
        const {
          format: format2,
          oneOf,
          allOf,
          anyOf,
          type: type2,
          enum: enum_
        } = schema;
        switch (format2) {
          case "number" /* number */:
            return t.createToken(SyntaxKind.NumberKeyword);
          case "string" /* string */:
            return t.createToken(SyntaxKind.StringKeyword);
          case "boolean" /* boolean */:
            return t.createToken(SyntaxKind.BooleanKeyword);
          case "blob" /* blob */:
          case "binary" /* binary */:
            return t.createTypeReferenceNode(t.createIdentifier("Blob"));
          default:
        }
        if (enum_) {
          return t.createUnionTypeNode(
            enum_.map(
              (e) => t.createLiteralTypeNode(t.createStringLiteral(e))
            )
          );
        }
        if (type2 === "string" /* string */) {
          return t.createToken(SyntaxKind.StringKeyword);
        }
        if (oneOf) {
          return t.createUnionTypeNode(
            oneOf.map((schema2) => this.toTypeNode(schema2))
          );
        }
        if (anyOf) {
          return t.createUnionTypeNode(
            anyOf.map((schema2) => this.toTypeNode(schema2))
          );
        }
        if (allOf) {
          return t.createIntersectionTypeNode(
            allOf.map((schema2) => this.toTypeNode(schema2))
          );
        }
        if (type2 && typeof type2 === "string") {
          return t.createTypeReferenceNode(
            type2 !== "unknown" && type2 !== "null" ? t.createIdentifier(Base.upperCamelCase(type2)) : type2
          );
        }
    }
    return t.createToken(SyntaxKind.UnknownKeyword);
  }
  static toDeclarationNode(parameters) {
    const objectElements = [];
    const typeObjectElements = [];
    for (const parameter of parameters) {
      if (parameter.ref) {
        t.createParameterDeclaration(
          void 0,
          void 0,
          t.createIdentifier(
            Base.camelCase(Base.normalize(Base.ref2name(parameter.ref)))
          ),
          void 0,
          t.createTypeReferenceNode(
            t.createIdentifier(
              Base.upperCamelCase(Base.normalize(Base.ref2name(parameter.ref)))
            )
          ),
          void 0
        );
      } else {
        const { name, schema, required } = parameter;
        objectElements.push(
          t.createBindingElement(
            void 0,
            void 0,
            t.createIdentifier(Base.camelCase(Base.normalize(name)))
          )
        );
        typeObjectElements.push(
          t.createPropertySignature(
            [],
            t.createIdentifier(Base.camelCase(Base.normalize(name))),
            required ? void 0 : t.createToken(SyntaxKind.QuestionToken),
            !schema ? t.createToken(SyntaxKind.UnknownKeyword) : this.toTypeNode(schema)
          )
        );
      }
    }
    return t.createParameterDeclaration(
      void 0,
      void 0,
      t.createObjectBindingPattern(objectElements),
      void 0,
      t.createTypeLiteralNode(typeObjectElements),
      void 0
    );
  }
  static toFormDataStatement(parameters, requestBody) {
    const statements = [];
    const fdDeclaration = t.createVariableStatement(
      void 0,
      t.createVariableDeclarationList(
        [
          t.createVariableDeclaration(
            t.createIdentifier("fd"),
            void 0,
            void 0,
            t.createNewExpression(
              t.createIdentifier("FormData"),
              void 0,
              []
            )
          )
        ],
        NodeFlags.Const
      )
    );
    statements.push(fdDeclaration);
    parameters.forEach((parameter) => {
      statements.push(
        t.createExpressionStatement(
          t.createBinaryExpression(
            t.createIdentifier(parameter.name),
            t.createToken(SyntaxKind.AmpersandAmpersandToken),
            t.createCallExpression(
              t.createPropertyAccessExpression(
                t.createIdentifier("fd"),
                t.createIdentifier("append")
              ),
              void 0,
              [
                t.createStringLiteral(parameter.name),
                t.createIdentifier(parameter.name)
              ]
            )
          )
        )
      );
    });
    if (requestBody && requestBody.type === "object" && requestBody.properties && Object.keys(requestBody.properties).length !== 0) {
      Object.keys(requestBody.properties).forEach((key) => {
        const schemaByKey = requestBody.properties[key];
        if (schemaByKey.type === "array" /* array */ && this.isBinarySchema(schemaByKey)) {
          statements.push(
            t.createForOfStatement(
              void 0,
              t.createVariableDeclarationList(
                [t.createVariableDeclaration("file")],
                NodeFlags.Const
              ),
              t.createElementAccessExpression(
                t.createIdentifier("req"),
                t.createStringLiteral(key)
              ),
              t.createBlock([
                t.createExpressionStatement(
                  t.createCallExpression(
                    t.createPropertyAccessExpression(
                      t.createIdentifier("fd"),
                      t.createIdentifier("append")
                    ),
                    [],
                    [
                      t.createStringLiteral(key),
                      t.createIdentifier("file"),
                      t.createPropertyAccessExpression(
                        t.createIdentifier("file"),
                        t.createIdentifier("name")
                      )
                    ]
                  )
                )
              ])
            )
          );
        } else {
          if (schemaByKey.required) {
            statements.push(
              t.createExpressionStatement(
                t.createCallExpression(
                  t.createPropertyAccessExpression(
                    t.createIdentifier("fd"),
                    t.createIdentifier("append")
                  ),
                  void 0,
                  [
                    t.createStringLiteral(key),
                    schemaByKey.type === "string" ? t.createElementAccessExpression(
                      t.createIdentifier("req"),
                      t.createStringLiteral(key)
                    ) : t.createCallExpression(
                      t.createIdentifier("String"),
                      void 0,
                      [
                        t.createElementAccessExpression(
                          t.createIdentifier("req"),
                          t.createStringLiteral(key)
                        )
                      ]
                    )
                  ]
                )
              )
            );
          } else {
            statements.push(
              t.createExpressionStatement(
                t.createBinaryExpression(
                  t.createElementAccessExpression(
                    t.createIdentifier("req"),
                    t.createStringLiteral(key)
                  ),
                  t.createToken(SyntaxKind.AmpersandAmpersandToken),
                  t.createCallExpression(
                    t.createPropertyAccessExpression(
                      t.createIdentifier("fd"),
                      t.createIdentifier("append")
                    ),
                    void 0,
                    [
                      t.createStringLiteral(key),
                      schemaByKey.type === "string" ? t.createElementAccessExpression(
                        t.createIdentifier("req"),
                        t.createStringLiteral(key)
                      ) : t.createCallExpression(
                        t.createIdentifier("String"),
                        void 0,
                        [
                          t.createElementAccessExpression(
                            t.createIdentifier("req"),
                            t.createStringLiteral(key)
                          )
                        ]
                      )
                    ]
                  )
                )
              )
            );
          }
        }
      });
    }
    return statements;
  }
  static bodyBlock(uri, method, parameters, requestBody, response, adapter) {
    const isFormDataRequest = requestBody && ["multipart/form-data", "application/x-www-form-urlencoded"].includes(
      requestBody.type
    );
    const shouldParseResponseToJSON = "application/json" === response?.type;
    const isRequestBodyBinary = requestBody?.schema && requestBody.schema.type === "array" /* array */ && this.isBinarySchema(requestBody.schema);
    const parametersShouldPutInFormData = parameters.filter(
      (p) => p.in === "formData" /* formData */ || p.schema && this.isBinarySchema(p.schema)
    );
    const parametersShouldNotPutInFormData = parameters.filter(
      (p) => !parametersShouldPutInFormData.includes(p)
    );
    const isRequestBodyContainsBinary = requestBody?.schema && "properties" in requestBody.schema && Object.values(requestBody.schema?.properties ?? {}).some(
      (p) => this.isBinarySchema(p)
    );
    const hasBinaryInParameters = parameters.some(
      (p) => p?.schema && this.isBinarySchema(p.schema)
    );
    const shouldPutParametersOrBodyInFormData = isFormDataRequest || isRequestBodyBinary || hasBinaryInParameters || isRequestBodyContainsBinary || parametersShouldPutInFormData.length > 0;
    return t.createBlock([
      ...shouldPutParametersOrBodyInFormData ? this.toFormDataStatement(
        parametersShouldPutInFormData,
        requestBody?.schema
      ) : [],
      ...adapter.client(
        uri,
        method,
        parametersShouldNotPutInFormData,
        requestBody,
        response,
        adapter,
        shouldPutParametersOrBodyInFormData,
        shouldParseResponseToJSON
      )
    ]);
  }
  static schemaToStatemets(parsedDoc, adaptor, options) {
    const statements = [];
    const { apis, schemas = {}, enums } = parsedDoc;
    const enumNames = [];
    for (const enumObject of enums) {
      enumNames.push(Base.capitalize(enumObject.name));
      statements.push(
        t.createEnumDeclaration(
          [t.createToken(SyntaxKind.ExportKeyword)],
          t.createIdentifier(Base.upperCamelCase(enumObject.name)),
          enumObject.enum.map((member) => {
            return t.createEnumMember(
              t.createStringLiteral(
                typeof member === "string" ? member : `${member}_`
              ),
              typeof member === "string" ? t.createStringLiteral(member) : t.createNumericLiteral(member)
            );
          })
        )
      );
    }
    for (const schemaKey in schemas) {
      if (Object.hasOwnProperty.call(schemas, schemaKey) && !enumNames.includes(Base.upperCamelCase(schemaKey))) {
        const schema = schemas[schemaKey];
        statements.push(
          t.createTypeAliasDeclaration(
            [t.createModifier(SyntaxKind.ExportKeyword)],
            t.createIdentifier(Base.upperCamelCase(schemaKey)),
            void 0,
            this.toTypeNode(schema)
          )
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
          description
        } = operation;
        let { parameters = [] } = operation;
        parameters = parameters.filter((p) => p.in !== "cookie");
        if (requestBody.length === 0) {
          requestBody.push({ type: "application/json" /* JSON */ });
        }
        const shouldAddExtraMethodNameSuffix = requestBody.length > 1;
        for (const req of requestBody) {
          const statement = t.createFunctionDeclaration(
            [
              t.createModifier(SyntaxKind.ExportKeyword),
              t.createModifier(SyntaxKind.AsyncKeyword)
            ],
            void 0,
            Base.pathToFnName(uri, method, operationId) + (shouldAddExtraMethodNameSuffix ? Base.capitalize(req.type.split("/")[1]) : ""),
            void 0,
            [
              parameters.length > 0 ? _Generator.toDeclarationNode(parameters) : void 0,
              req?.schema ? _Generator.toRequestBodyTypeNode(req.schema) : void 0
            ].filter(Boolean),
            void 0,
            this.bodyBlock(
              options.baseURL + uri,
              method,
              parameters,
              req,
              responses[0],
              adaptor
            )
          );
          this.addComments(
            statement,
            [
              description && {
                comment: description
              },
              summary && {
                comment: summary
              },
              deprecated && {
                tag: "deprecated"
              }
            ].filter(Boolean)
          );
          statements.push(statement);
        }
      }
    }
    return statements;
  }
  static async prettier(code) {
    return await format(code, {
      parser: "typescript"
    });
  }
  static async genCode(schema, initOptions, adaptor) {
    const { importClientSource } = initOptions;
    const statements = this.schemaToStatemets(schema, adaptor, {
      baseURL: initOptions.baseURL ?? ""
    });
    let code = this.toCode(statements);
    if (importClientSource) {
      code = importClientSource + "\n\n" + code;
    }
    return await this.prettier(code);
  }
};

// src/core/client/axios.ts
import { factory as t2 } from "typescript";
var AxiosAdapter = class extends Adapter {
  /**
   * Name of the field used to specify the HTTP method in the request configuration.
   */
  methodFieldName = "method";
  /**
   * Name of the field used to specify the request body (data) in the request configuration.
   */
  bodyFieldName = "data";
  /**
   * Name of the field used to specify the request headers in the request configuration.
   */
  headersFieldName = "headers";
  /**
   * Name of the field used to specify the query parameters in the request configuration.
   */
  queryFieldName = "params";
  /**
   * The name of the client this adapter is configured for, which is 'axios' in this case.
   */
  name = "axios";
  /**
   * Method that should generate and return the client-specific configuration statements.
   *
   * @returns {Statement[]} An array of TypeScript statements that define the client configuration.
   *
   * @throws {Error} Indicates that the method is not yet implemented and needs to be filled in.
   */
  client(uri, method, parameters, requestBody, response, adapter, shouldUseFormData) {
    const statements = [];
    const inBody = parameters.filter((p) => !p.in || p.in === "body");
    const inHeader = parameters.filter((p) => p.in === "header");
    const toLiterlExpression = () => {
      return t2.createObjectLiteralExpression(
        [
          // Set the HTTP method
          t2.createPropertyAssignment(
            t2.createIdentifier(adapter.methodFieldName),
            t2.createStringLiteral(method.toUpperCase())
          )
        ].concat(
          // Add headers if there are any
          inHeader.length > 0 ? t2.createPropertyAssignment(
            t2.createIdentifier(adapter.headersFieldName),
            t2.createObjectLiteralExpression(
              inHeader.map(
                (p) => t2.createPropertyAssignment(
                  t2.createStringLiteral(p.name),
                  t2.createCallExpression(
                    t2.createIdentifier("encodeURIComponent"),
                    void 0,
                    [
                      t2.createCallExpression(
                        t2.createIdentifier("String"),
                        void 0,
                        [
                          t2.createIdentifier(
                            Base.camelCase(Base.normalize(p.name))
                          )
                        ]
                      )
                    ]
                  )
                )
              )
            )
          ) : []
        ).concat(
          // Add body if needed
          shouldUseFormData || inBody.length > 0 || requestBody?.schema ? t2.createPropertyAssignment(
            t2.createIdentifier(adapter.bodyFieldName),
            shouldUseFormData ? t2.createIdentifier("fd") : inBody.length > 0 || requestBody?.schema && !Generator.isBinarySchema(requestBody.schema) ? t2.createIdentifier("req") : t2.createIdentifier("req")
          ) : []
        ),
        true
      );
    };
    statements.push(
      t2.createReturnStatement(
        t2.createCallExpression(
          t2.createIdentifier(adapter.name),
          response?.schema ? [
            Generator.toTypeNode(
              response.schema
            )
          ] : void 0,
          [Generator.toUrlTemplate(uri, parameters), toLiterlExpression()]
        )
      )
    );
    return statements;
  }
};

// src/core/client/fetch.ts
import { factory as t3, SyntaxKind as SyntaxKind2 } from "typescript";
var FetchAdapter = class extends Adapter {
  methodFieldName = "method";
  bodyFieldName = "body";
  headersFieldName = "headers";
  queryFieldName = "";
  name = "fetch";
  /**
   * Generates client code for making API requests using the Fetch API.
   * @param uri - The API endpoint URI
   * @param method - The HTTP method (GET, POST, etc.)
   * @param parameters - Array of parameters to include in the request
   * @param requestBody - The request body media type definition
   * @param response - The response media type definition
   * @param adapter - The adapter instance
   * @param shouldUseFormData - Flag to use FormData for the request body
   * @param shouldUseJSONResponse - Flag to use JSON parsing for the response
   * @return - An array of generated TypeScript statements
   */
  client(uri, method, parameters, requestBody, response, adapter, shouldUseFormData, shouldUseJSONResponse) {
    const statements = [];
    const inBody = parameters.filter((p) => !p.in || p.in === "body");
    const inHeader = parameters.filter((p) => p.in === "header");
    const toLiterlExpression = () => {
      return t3.createObjectLiteralExpression(
        [
          // Set the HTTP method
          t3.createPropertyAssignment(
            t3.createIdentifier(adapter.methodFieldName),
            t3.createStringLiteral(method.toUpperCase())
          )
        ].concat(
          // Add headers if there are any
          inHeader.length > 0 ? t3.createPropertyAssignment(
            t3.createIdentifier(adapter.headersFieldName),
            t3.createObjectLiteralExpression(
              inHeader.map(
                (p) => t3.createPropertyAssignment(
                  t3.createStringLiteral(p.name),
                  t3.createCallExpression(
                    t3.createIdentifier("encodeURIComponent"),
                    void 0,
                    [
                      t3.createCallExpression(
                        t3.createIdentifier("String"),
                        void 0,
                        [
                          t3.createIdentifier(
                            Base.camelCase(Base.normalize(p.name))
                          )
                        ]
                      )
                    ]
                  )
                )
              )
            )
          ) : []
        ).concat(
          // Add body if needed
          shouldUseFormData || inBody.length > 0 || requestBody?.schema ? t3.createPropertyAssignment(
            t3.createIdentifier(adapter.bodyFieldName),
            shouldUseFormData ? t3.createIdentifier("fd") : inBody.length > 0 || requestBody?.schema && !Generator.isBinarySchema(requestBody.schema) ? t3.createCallExpression(
              t3.createPropertyAccessExpression(
                t3.createIdentifier("JSON"),
                t3.createIdentifier("stringify")
              ),
              [],
              [
                requestBody ? t3.createIdentifier("req") : t3.createObjectLiteralExpression(
                  inBody.map(
                    (b) => t3.createShorthandPropertyAssignment(
                      t3.createIdentifier(b.name)
                    )
                  ),
                  true
                )
              ]
            ) : (
              // One File parameter
              t3.createIdentifier("req")
            )
          ) : []
        ),
        true
      );
    };
    statements.push(
      t3.createReturnStatement(
        shouldUseJSONResponse ? (
          // Handle JSON response with proper type checking
          t3.createCallExpression(
            t3.createPropertyAccessExpression(
              t3.createCallExpression(
                t3.createIdentifier(adapter.name),
                void 0,
                [
                  Generator.toUrlTemplate(uri, parameters),
                  toLiterlExpression()
                ]
              ),
              t3.createIdentifier("then")
            ),
            void 0,
            [
              t3.createArrowFunction(
                [t3.createModifier(SyntaxKind2.AsyncKeyword)],
                [],
                [
                  t3.createParameterDeclaration(
                    void 0,
                    void 0,
                    t3.createIdentifier("response")
                  )
                ],
                void 0,
                t3.createToken(SyntaxKind2.EqualsGreaterThanToken),
                response?.schema ? t3.createAsExpression(
                  t3.createParenthesizedExpression(
                    t3.createAwaitExpression(
                      t3.createCallExpression(
                        t3.createPropertyAccessExpression(
                          t3.createIdentifier("response"),
                          t3.createIdentifier("json")
                        ),
                        void 0,
                        []
                      )
                    )
                  ),
                  response?.schema ? Generator.toTypeNode(response.schema) : t3.createToken(SyntaxKind2.UnknownKeyword)
                ) : t3.createParenthesizedExpression(
                  t3.createAwaitExpression(
                    t3.createCallExpression(
                      t3.createPropertyAccessExpression(
                        t3.createIdentifier("response"),
                        t3.createIdentifier("json")
                      ),
                      void 0,
                      []
                    )
                  )
                )
              )
            ]
          )
        ) : (
          // Simple fetch call without JSON parsing
          t3.createCallExpression(
            t3.createIdentifier(adapter.name),
            void 0,
            [Generator.toUrlTemplate(uri, parameters), toLiterlExpression()]
          )
        )
      )
    );
    return statements;
  }
};

// src/openapi/index.ts
import { createScopedLogger } from "@moccona/logger";

// src/openapi/V2.ts
var V2 = class {
  doc;
  constructor(doc) {
    this.doc = doc;
  }
  /**
   * Is array schema.
   */
  isOpenAPIArraySchema(schema) {
    return typeof schema === "object" && schema.type === "array";
  }
  /**
   * OpenAPI schema to base schema.
   */
  getSchemaByRef(schema, reserveRef = false, enums = [], upLevelSchemaKey = "") {
    let refName = "";
    if (Base.isRef(schema)) {
      refName = Base.upperCamelCase(Base.ref2name(schema.$ref));
      if (reserveRef) {
        return {
          type: upLevelSchemaKey + refName
        };
      }
      if (!this.doc.definitions) {
        this.doc.definitions = {};
      }
      schema = this.doc.definitions[Base.ref2name(schema.$ref, this.doc)];
    }
    return this.toBaseSchema(schema, enums, "", upLevelSchemaKey + refName);
  }
  /**
   * Transform all OpenAPI schema to Base Schema
   */
  toBaseSchema(schema, enums = [], schemaKey = "", upLevelSchemaKey = "") {
    if (!schema) {
      return {
        type: "unknown"
      };
    }
    if (Base.isRef(schema)) {
      return this.getSchemaByRef(schema, true);
    }
    if (this.isOpenAPIArraySchema(schema)) {
      const { type, description, items, required } = schema;
      return {
        type,
        required: !!required,
        description,
        items: this.toBaseSchema(items, enums, schemaKey, upLevelSchemaKey)
      };
    } else {
      const {
        required = [],
        allOf,
        anyOf,
        description,
        enum: enum_,
        format: format2,
        oneOf,
        properties = {}
      } = schema;
      let { type } = schema;
      if (enum_ && type !== "boolean") {
        const name = Base.upperCamelCase(upLevelSchemaKey) + Base.upperCamelCase(schemaKey);
        const enumObject = {
          name,
          enum: [...new Set(enum_)]
        };
        const sameObject = Base.findSameSchema(enumObject, enums);
        if (!sameObject && Base.isValidEnumType(schema)) {
          enums.push(enumObject);
        }
        return {
          type: sameObject ? sameObject.name : Base.isBooleanEnum(schema) ? "boolean" : enumObject.name,
          required,
          description
        };
      }
      if (type === void 0 && Object.keys(properties).length > 0) {
        type = "object" /* object */;
      }
      return {
        type,
        required,
        description,
        enum: enum_,
        format: format2,
        allOf: allOf?.map(
          (s) => Base.isRef(s) ? {
            ...s,
            ref: s.$ref,
            type: Base.upperCamelCase(Base.ref2name(s.$ref, this.doc))
          } : this.toBaseSchema(s, enums)
        ),
        anyOf: anyOf?.map(
          (s) => Base.isRef(s) ? {
            ...s,
            ref: s.$ref,
            type: Base.upperCamelCase(Base.ref2name(s.$ref, this.doc))
          } : this.toBaseSchema(s, enums)
        ),
        oneOf: oneOf?.map(
          (s) => Base.isRef(s) ? {
            ...s,
            ref: s.$ref,
            type: Base.upperCamelCase(Base.ref2name(s.$ref, this.doc))
          } : this.toBaseSchema(s, enums)
        ),
        properties: Object.keys(properties).reduce((acc, p) => {
          const propSchema = properties[p];
          return {
            ...acc,
            [p]: Base.isRef(propSchema) ? {
              type: Base.upperCamelCase(
                Base.ref2name(propSchema.$ref, this.doc)
              )
            } : this.toBaseSchema(propSchema, enums, p, upLevelSchemaKey)
          };
        }, {})
      };
    }
  }
  /**
   * OpenAPI parameter to base parameter.
   */
  getParameterByRef(parameter, enums = [], upLevelSchemaKey = "") {
    if (Base.isRef(parameter)) {
      parameter = this.doc.parameters[Base.ref2name(parameter.$ref, this.doc)];
    }
    const {
      name,
      required,
      description,
      type,
      items,
      enum: enum_,
      properties,
      schema
    } = parameter;
    if (enum_) {
      const type2 = Base.upperCamelCase(upLevelSchemaKey) + Base.upperCamelCase(name);
      const enumSchema = {
        name: type2,
        enum: [...new Set(enum_)]
      };
      const sameEnum = Base.findSameSchema(enumSchema, enums);
      if (!sameEnum && Base.isValidEnumType({ type: type2, enum: enums })) {
        enums.push(enumSchema);
      }
      return {
        name,
        required,
        description,
        in: parameter.in,
        schema: {
          type: sameEnum?.name ?? type2
        }
      };
    }
    if (items) {
      return {
        name,
        required,
        description,
        in: parameter.in,
        schema: {
          type,
          items
        }
      };
    }
    if (schema && Base.isRef(schema)) {
      return {
        name,
        required,
        description,
        in: parameter.in,
        schema: {
          type: Base.upperCamelCase(Base.ref2name(schema.$ref))
        }
      };
    }
    return {
      name,
      required,
      description,
      in: parameter.in,
      schema: {
        type,
        properties
      }
    };
  }
  /**
   * OpenAPI schema to base response
   */
  getResponseByRef(schema) {
    if (Base.isRef(schema)) {
      schema = this.doc.responses[Base.ref2name(schema.$ref, this.doc)];
    }
    const { schema: responseSchema } = schema;
    return [
      {
        type: "application/json" /* JSON */,
        schema: responseSchema && this.getSchemaByRef(responseSchema, true)
      }
    ];
  }
  init() {
    const { definitions = {}, responses = {}, paths = {} } = this.doc;
    const enums = [];
    const definitions_ = Object.keys(definitions).reduce((acc, key) => {
      const schema = definitions[key];
      return {
        ...acc,
        [key]: this.getSchemaByRef(schema, false, enums, key)
      };
    }, {});
    const responses_ = Object.keys(responses).reduce((acc, key) => {
      const response = responses[key];
      return {
        ...acc,
        [key]: this.getResponseByRef(response)
      };
    }, {});
    const apis = Object.keys(paths).reduce((acc, path) => {
      const pathObject = paths[path] ?? {};
      const { $ref } = pathObject;
      const methodApis = [];
      if ($ref) {
      } else {
        const { parameters = [] } = pathObject;
        Object.values(HttpMethods).forEach((method) => {
          const methodObject = pathObject[method];
          if (methodObject) {
            const {
              deprecated,
              operationId,
              summary: summary_,
              description: description_,
              responses: responses2 = {}
            } = methodObject;
            const { parameters: parameters_ = [] } = methodObject;
            const baseParameters = [...parameters, ...parameters_].map(
              (parameter) => this.getParameterByRef(parameter, enums)
            );
            const uniqueParameterName = [
              ...new Set(baseParameters.map((p) => p.name))
            ];
            if (Object.keys(responses2).length === 0) {
              Object.assign(responses2, {
                200: {
                  description: "Successful response"
                }
              });
            }
            const inBody = baseParameters.filter(
              (p) => p.in === "body" || p.in === "formData"
            );
            const notInBody = baseParameters.filter(
              (p) => p.in !== "body" && p.in !== "formData"
            );
            const httpCodes = Object.keys(responses2);
            for (const code of httpCodes) {
              if (code in responses2) {
                const response = responses2[code];
                const responseSchema = this.getResponseByRef(response);
                const inBodyOnlyHasBody = inBody && inBody.length === 1 && inBody[0].in === "body" && inBody[0].name === "body";
                methodApis.push({
                  method,
                  operationId,
                  summary: summary_,
                  deprecated,
                  description: description_,
                  parameters: uniqueParameterName.map((name) => notInBody.find((p) => p.name === name)).filter(Boolean),
                  responses: responseSchema,
                  requestBody: inBody.length > 0 ? inBodyOnlyHasBody ? [
                    {
                      type: "application/json" /* JSON */,
                      schema: inBody[0].schema
                    }
                  ] : [
                    {
                      type: "application/json" /* JSON */,
                      schema: {
                        type: "object" /* object */,
                        properties: inBody.reduce((a, p) => {
                          return {
                            ...a,
                            [p.name]: {
                              type: p.schema?.type ?? "unknown",
                              required: p.schema?.required,
                              // @ts-expect-error items can be undefined
                              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                              items: p.schema?.items,
                              description: p.schema?.description
                            }
                          };
                        }, {})
                      }
                    }
                  ] : void 0
                });
                break;
              }
            }
          }
        });
      }
      return {
        ...acc,
        [path]: methodApis
      };
    }, {});
    return {
      enums: Base.uniqueEnums(enums),
      schemas: definitions_,
      responses: responses_,
      parameters: {},
      requestBodies: {},
      apis
    };
  }
};

// src/openapi/V3.ts
var V3 = class {
  doc;
  constructor(doc) {
    this.doc = doc;
  }
  /**
   * Is array schema.
   */
  isOpenAPIArraySchema(schema) {
    return typeof schema === "object" && schema.type === "array";
  }
  /**
   * OpenAPI schema to base schema.
   */
  getSchemaByRef(schema, reserveRef = false, enums = [], upLevelSchemaKey = "") {
    let refName = "";
    if (Base.isRef(schema)) {
      refName = Base.capitalize(Base.ref2name(schema.$ref));
      if (reserveRef) {
        return {
          type: upLevelSchemaKey + refName
        };
      }
      schema = this.doc.components?.schemas?.[Base.ref2name(schema.$ref, this.doc)];
    }
    return this.toBaseSchema(schema, enums, "", upLevelSchemaKey + refName);
  }
  /**
   * OpenAPI parameter to base parameter.
   */
  getParameterByRef(schema, enums = [], upLevelSchemaKey = "") {
    if (Base.isRef(schema)) {
      schema = this.doc.components?.parameters?.[Base.ref2name(schema.$ref, this.doc)];
    }
    const {
      name,
      required,
      deprecated,
      description,
      schema: parameterSchema
    } = schema;
    if (parameterSchema && !Base.isRef(parameterSchema) && parameterSchema.enum) {
      const type = Base.upperCamelCase(Base.normalize(upLevelSchemaKey)) + Base.upperCamelCase(Base.normalize(name));
      const enumSchema = {
        name: type,
        enum: [...new Set(parameterSchema.enum)]
      };
      const sameEnum = Base.findSameSchema(enumSchema, enums);
      if (!sameEnum && Base.isValidEnumType(parameterSchema)) {
        enums.push(enumSchema);
      }
      return {
        name,
        required,
        description,
        deprecated,
        in: schema.in,
        schema: {
          type: sameEnum?.name ?? type
        }
      };
    }
    return {
      name,
      required,
      description,
      deprecated,
      in: schema.in,
      schema: schema.schema && this.getSchemaByRef(
        schema.schema,
        false,
        enums,
        upLevelSchemaKey + Base.capitalize(name)
      )
    };
  }
  /**
   * OpenAPI schema to base response
   */
  getResponseByRef(schema) {
    if (Base.isRef(schema)) {
      schema = this.doc.components?.responses?.[Base.ref2name(schema.$ref, this.doc)];
    }
    const { content = {} } = schema;
    return Object.keys(content).map((c) => ({
      type: c,
      schema: content[c].schema && this.getSchemaByRef(content[c].schema, true)
    }));
  }
  /**
   * OpenAPI schema to requestBody.
   */
  getRequestBodyByRef(schema, enums = []) {
    if (Base.isRef(schema)) {
      schema = this.doc.components?.requestBodies?.[Base.ref2name(schema.$ref, this.doc)];
    }
    const { content = {} } = schema;
    return Object.keys(content).map((c) => ({
      type: c,
      schema: content[c].schema && this.getSchemaByRef(content[c].schema, false, enums)
    }));
  }
  /**
   * Transform all OpenAPI schema to Base Schema
   */
  toBaseSchema(schema, enums = [], schemaKey = "", upLevelSchemaKey = "") {
    if (!schema) {
      return {
        type: "unknown"
      };
    }
    if (Base.isRef(schema)) {
      return this.getSchemaByRef(schema, true);
    }
    if (this.isOpenAPIArraySchema(schema)) {
      const { type, description, items, required } = schema;
      return {
        type,
        required: !!required,
        description,
        items: this.toBaseSchema(items, enums, schemaKey, upLevelSchemaKey)
      };
    } else {
      const {
        required = [],
        allOf,
        anyOf,
        description,
        deprecated,
        enum: enum_,
        format: format2,
        oneOf,
        properties = {}
      } = schema;
      let { type } = schema;
      if (enum_ && type !== "boolean") {
        const name = Base.upperCamelCase(Base.normalize(upLevelSchemaKey)) + Base.upperCamelCase(Base.normalize(schemaKey));
        const enumObject = {
          name,
          enum: [...new Set(enum_)]
        };
        const sameObject = Base.findSameSchema(enumObject, enums);
        if (!sameObject && Base.isValidEnumType(schema)) {
          enums.push(enumObject);
        }
        return {
          type: sameObject ? sameObject.name : Base.isBooleanEnum(schema) ? "boolean" : enumObject.name,
          required,
          description,
          deprecated
        };
      }
      if (type === void 0 && Object.keys(properties).length > 0) {
        type = "object" /* object */;
      }
      return {
        type,
        required,
        description,
        deprecated,
        enum: enum_,
        format: format2,
        allOf: allOf?.map(
          (s) => Base.isRef(s) ? {
            ...s,
            ref: s.$ref,
            type: Base.capitalize(Base.ref2name(s.$ref, this.doc))
          } : this.toBaseSchema(s, enums)
        ),
        anyOf: anyOf?.map(
          (s) => Base.isRef(s) ? {
            ...s,
            ref: s.$ref,
            type: Base.capitalize(Base.ref2name(s.$ref, this.doc))
          } : this.toBaseSchema(s, enums)
        ),
        oneOf: oneOf?.map(
          (s) => Base.isRef(s) ? {
            ...s,
            ref: s.$ref,
            type: Base.capitalize(Base.ref2name(s.$ref, this.doc))
          } : this.toBaseSchema(s, enums)
        ),
        properties: Object.keys(properties).reduce((acc, p) => {
          const propSchema = properties[p];
          return {
            ...acc,
            [p]: Base.isRef(propSchema) ? {
              type: Base.capitalize(
                Base.ref2name(propSchema.$ref, this.doc)
              )
            } : this.toBaseSchema(propSchema, enums, p, upLevelSchemaKey)
          };
        }, {})
      };
    }
  }
  init() {
    const { components = {}, paths = {} } = this.doc;
    const enums = [];
    const {
      requestBodies = {},
      responses = {},
      parameters = {},
      schemas = {}
    } = components;
    const schemas_ = Object.keys(schemas).reduce((acc, key) => {
      const schema = schemas[key];
      return {
        ...acc,
        [key]: this.getSchemaByRef(schema, false, enums, key)
      };
    }, {});
    const parameters_ = Object.keys(parameters).reduce((acc, key) => {
      const parameter = parameters[key];
      return {
        ...acc,
        [key]: this.getParameterByRef(parameter, enums, key)
      };
    }, {});
    const responses_ = Object.keys(responses).reduce((acc, key) => {
      const response = responses[key];
      return {
        ...acc,
        [key]: this.getResponseByRef(response)
      };
    }, {});
    const requestBodies_ = Object.keys(requestBodies).reduce((acc, key) => {
      const requestBody = requestBodies[key];
      return {
        ...acc,
        [key]: this.getRequestBodyByRef(requestBody, enums)
      };
    }, {});
    const apis = Object.keys(paths).reduce((acc, path) => {
      const pathObject = paths[path] ?? {};
      const { $ref } = pathObject;
      const methodApis = [];
      if ($ref) {
      } else {
        const { parameters: parameters2 = [], description, summary } = pathObject;
        Object.values(HttpMethods).forEach((method) => {
          const methodObject = pathObject[method];
          if (methodObject) {
            const {
              deprecated,
              operationId,
              responses: responses2 = {},
              summary: summary_,
              description: description_,
              requestBody = { content: {} }
            } = methodObject;
            const { parameters: parameters_2 = [] } = methodObject;
            const baseParameters = [...parameters2, ...parameters_2].map(
              (parameter) => this.getParameterByRef(parameter, enums)
            );
            const baseRequestBody = this.getRequestBodyByRef(
              requestBody,
              enums
            );
            const uniqueParameterName = [
              ...new Set(baseParameters.map((p) => p.name))
            ];
            if (Object.keys(responses2).length === 0) {
              Object.assign(responses2, {
                200: {
                  description: "Successful response"
                }
              });
            }
            const httpCodes = Object.keys(responses2);
            for (const code of httpCodes) {
              if (code in responses2) {
                const response = responses2[code];
                const responseSchema = this.getResponseByRef(response);
                methodApis.push({
                  method,
                  operationId,
                  summary: summary_ ?? summary,
                  description: description_ ?? description,
                  deprecated,
                  parameters: uniqueParameterName.map(
                    (name) => baseParameters.find((p) => p.name === name)
                  ),
                  responses: responseSchema,
                  requestBody: baseRequestBody
                });
                break;
              }
            }
          }
        });
      }
      return {
        ...acc,
        [path]: methodApis
      };
    }, {});
    return {
      enums: Base.uniqueEnums(enums),
      schemas: schemas_,
      responses: responses_,
      parameters: parameters_,
      requestBodies: requestBodies_,
      apis
    };
  }
};

// src/openapi/V3_1.ts
var V3_1 = class {
  doc;
  constructor(doc) {
    this.doc = doc;
  }
  /**
   * Is array schema.
   */
  isOpenAPIArraySchema(schema) {
    return typeof schema === "object" && schema.type === "array";
  }
  /**
   * OpenAPI schema to base schema.
   */
  getSchemaByRef(schema, reserveRef = false, enums = [], upLevelSchemaKey = "") {
    let refName = "";
    if (Base.isRef(schema)) {
      refName = Base.upperCamelCase(Base.ref2name(schema.$ref));
      if (reserveRef) {
        return {
          type: upLevelSchemaKey + refName
        };
      }
      if (!this.doc.components) {
        this.doc.components = {
          schemas: {}
        };
      }
      schema = this.doc.components.schemas[Base.ref2name(schema.$ref, this.doc)];
    }
    return this.toBaseSchema(schema, enums, "", upLevelSchemaKey + refName);
  }
  /**
   * OpenAPI parameter to base parameter.
   */
  getParameterByRef(schema, enums = [], upLevelSchemaKey = "") {
    if (Base.isRef(schema)) {
      schema = this.doc.components?.parameters?.[Base.ref2name(schema.$ref, this.doc)];
    }
    const {
      name,
      required,
      deprecated,
      description,
      schema: parameterSchema
    } = schema;
    if (parameterSchema && !Base.isRef(parameterSchema) && parameterSchema.enum) {
      const type = Base.upperCamelCase(upLevelSchemaKey) + Base.upperCamelCase(name);
      const enumSchema = {
        name: type,
        enum: [...new Set(parameterSchema.enum)]
      };
      const sameEnum = Base.findSameSchema(enumSchema, enums);
      if (!sameEnum && Base.isValidEnumType(parameterSchema)) {
        enums.push(enumSchema);
      }
      return {
        name,
        required,
        description,
        deprecated,
        in: schema.in,
        schema: {
          type: sameEnum?.name ?? type
        }
      };
    }
    return {
      name,
      required,
      description,
      deprecated,
      in: schema.in,
      schema: schema.schema && this.getSchemaByRef(
        schema.schema,
        false,
        enums,
        upLevelSchemaKey + Base.capitalize(name)
      )
    };
  }
  /**
   * OpenAPI schema to base response
   */
  getResponseByRef(schema) {
    if (Base.isRef(schema)) {
      schema = this.doc.components?.responses?.[Base.ref2name(schema.$ref, this.doc)];
    }
    const { content = {} } = schema;
    return Object.keys(content).map((c) => ({
      type: c,
      schema: content[c].schema && this.getSchemaByRef(content[c].schema, true)
    }));
  }
  /**
   * OpenAPI schema to requestBody.
   */
  getRequestBodyByRef(schema, enums = [], reserveRef = false) {
    if (Base.isRef(schema)) {
      schema = this.doc.components?.requestBodies?.[Base.ref2name(schema.$ref, this.doc)];
    }
    const { content = {} } = schema;
    return Object.keys(content).map((c) => ({
      type: c,
      schema: content[c].schema && this.getSchemaByRef(content[c].schema, reserveRef, enums)
    }));
  }
  /**
   * Transform all OpenAPI schema to Base Schema
   */
  toBaseSchema(schema, enums = [], schemaKey = "", upLevelSchemaKey = "") {
    if (!schema) {
      return {
        type: "unknown"
      };
    }
    if (Base.isRef(schema)) {
      return this.getSchemaByRef(schema, true);
    }
    if (this.isOpenAPIArraySchema(schema)) {
      const { type, description, items, required } = schema;
      return {
        type,
        required: !!required,
        description,
        items: this.toBaseSchema(items, enums, schemaKey, upLevelSchemaKey)
      };
    } else {
      const {
        required = [],
        allOf,
        anyOf,
        description,
        deprecated,
        enum: enum_,
        format: format2,
        oneOf,
        properties = {}
      } = schema;
      let { type } = schema;
      if (enum_ && type !== "boolean") {
        const name = Base.upperCamelCase(upLevelSchemaKey) + Base.upperCamelCase(schemaKey);
        const enumObject = {
          name,
          enum: [...new Set(enum_)]
        };
        const sameObject = Base.findSameSchema(enumObject, enums);
        if (!sameObject && Base.isValidEnumType(schema)) {
          enums.push(enumObject);
        }
        return {
          type: sameObject ? sameObject.name : Base.isBooleanEnum(schema) ? "boolean" : enumObject.name,
          required,
          description,
          deprecated
        };
      }
      if (type === void 0 && Object.keys(properties).length > 0) {
        type = "object" /* object */;
      }
      return {
        type,
        required,
        description,
        deprecated,
        enum: enum_,
        format: format2,
        allOf: allOf?.map(
          (s) => Base.isRef(s) ? {
            ...s,
            ref: s.$ref,
            type: Base.upperCamelCase(Base.ref2name(s.$ref, this.doc))
          } : this.toBaseSchema(s, enums)
        ),
        anyOf: anyOf?.map(
          (s) => Base.isRef(s) ? {
            ...s,
            ref: s.$ref,
            type: Base.upperCamelCase(Base.ref2name(s.$ref, this.doc))
          } : this.toBaseSchema(s, enums)
        ),
        oneOf: oneOf?.map(
          (s) => Base.isRef(s) ? {
            ...s,
            ref: s.$ref,
            type: Base.upperCamelCase(Base.ref2name(s.$ref, this.doc))
          } : this.toBaseSchema(s, enums)
        ),
        properties: Object.keys(properties).reduce((acc, p) => {
          const propSchema = properties[p];
          return {
            ...acc,
            [p]: Base.isRef(propSchema) ? {
              type: Base.upperCamelCase(
                Base.ref2name(propSchema.$ref, this.doc)
              )
            } : this.toBaseSchema(propSchema, enums, p, upLevelSchemaKey)
          };
        }, {})
      };
    }
  }
  init() {
    const { components = {}, paths = {} } = this.doc;
    const enums = [];
    const {
      requestBodies = {},
      responses = {},
      parameters = {},
      schemas = {}
    } = components;
    const schemas_ = Object.keys(schemas).reduce((acc, key) => {
      const schema = schemas[key];
      return {
        ...acc,
        [key]: this.getSchemaByRef(schema, false, enums, key)
      };
    }, {});
    const parameters_ = Object.keys(parameters).reduce((acc, key) => {
      const parameter = parameters[key];
      return {
        ...acc,
        [key]: this.getParameterByRef(parameter, enums, key)
      };
    }, {});
    const responses_ = Object.keys(responses).reduce((acc, key) => {
      const response = responses[key];
      return {
        ...acc,
        [key]: this.getResponseByRef(response)
      };
    }, {});
    const requestBodies_ = Object.keys(requestBodies).reduce((acc, key) => {
      const requestBody = requestBodies[key];
      return {
        ...acc,
        [key]: this.getRequestBodyByRef(requestBody, enums)
      };
    }, {});
    const apis = Object.keys(paths).reduce((acc, path) => {
      const pathObject = paths[path] ?? {};
      const { $ref } = pathObject;
      const methodApis = [];
      if ($ref) {
      } else {
        const { parameters: parameters2 = [], description, summary } = pathObject;
        Object.values(HttpMethods).forEach((method) => {
          const methodObject = pathObject[method];
          if (methodObject) {
            const {
              deprecated,
              operationId,
              summary: summary_,
              description: description_,
              responses: responses2 = {},
              requestBody = { content: {} }
            } = methodObject;
            const { parameters: parameters_2 = [] } = methodObject;
            const baseParameters = [...parameters2, ...parameters_2].map(
              (parameter) => this.getParameterByRef(parameter, enums)
            );
            const baseRequestBody = this.getRequestBodyByRef(
              requestBody,
              enums,
              true
            );
            const uniqueParameterName = [
              ...new Set(baseParameters.map((p) => p.name))
            ];
            if (Object.keys(responses2).length === 0) {
              Object.assign(responses2, {
                200: {
                  description: "Successful response"
                }
              });
            }
            const httpCodes = Object.keys(responses2);
            for (const code of httpCodes) {
              if (code in responses2) {
                const response = responses2[code];
                const responseSchema = this.getResponseByRef(response);
                methodApis.push({
                  method,
                  operationId,
                  summary: summary_ ?? summary,
                  description: description_ ?? description,
                  deprecated,
                  parameters: uniqueParameterName.map(
                    (name) => baseParameters.find((p) => p.name === name)
                  ),
                  responses: responseSchema,
                  requestBody: baseRequestBody
                });
                break;
              }
            }
          }
        });
      }
      return {
        ...acc,
        [path]: methodApis
      };
    }, {});
    return {
      enums: Base.uniqueEnums(enums),
      schemas: schemas_,
      responses: responses_,
      parameters: parameters_,
      requestBodies: requestBodies_,
      apis
    };
  }
};

// src/openapi/index.ts
var logger = createScopedLogger("OpenAPI");
function getDocVersion(doc) {
  const version2 = (doc.openapi || doc.swagger).slice(0, 3);
  switch (version2) {
    case "2.0":
      return "v2" /* v2 */;
    case "3.0":
      return "v3" /* v3 */;
    case "3.1":
      return "v3_1" /* v3_1 */;
    default:
      return "unknown" /* unknown */;
  }
}
var OpenAPIProvider = class extends Provider {
  parse(doc) {
    const version2 = getDocVersion(doc);
    logger.debug(`openapi version ${version2}`);
    let returnValue;
    switch (version2) {
      case "v2" /* v2 */:
        returnValue = new V2(doc).init();
        break;
      case "v3" /* v3 */:
        returnValue = new V3(doc).init();
        break;
      case "v3_1" /* v3_1 */:
        returnValue = new V3_1(doc).init();
        break;
      default:
        logger.error(`Not a valid OpenAPI version ${version2}`);
        process.exit(1);
    }
    return returnValue;
  }
};
function getAdaptor(type) {
  switch (type) {
    case "axios" /* axios */:
      return new AxiosAdapter();
    case "fetch" /* fetch */:
      return new FetchAdapter();
    default:
      throw TypeError(`Not Supported Adaptor ${type}`);
  }
}
async function codeGen(initOptions) {
  const { verbose } = initOptions;
  if (verbose) {
    logger.setLevel("debug");
  } else {
    logger.setLevel("info");
  }
  logger.info(`Fech document from ${initOptions.docURL}`);
  const doc = await Base.fetchDoc(
    initOptions.docURL,
    initOptions.requestOptions
  );
  const provider = new OpenAPIProvider(initOptions, doc);
  const { enums, schemas, parameters, responses, requestBodies, apis } = provider;
  const adaptor = getAdaptor(initOptions.adaptor ?? "fetch" /* fetch */);
  const code = await Generator.genCode(
    {
      enums,
      schemas,
      parameters,
      responses,
      requestBodies,
      apis
    },
    initOptions,
    adaptor
  );
  if (process.env.NODE_ENV === "test") {
    await Generator.write(code, initOptions.output);
  }
  return code;
}

// src/cli.ts
import { createCommand } from "commander";

// package.json
var version = "0.0.2";

// src/cli.ts
var cli = createCommand("apicodegen");
cli.version(version).argument("<docURL>", "DOc url for tool to read").option("--output", "Where code generated", "./output.ts").option("--adaptor", "Adaptor for api call", "fetch").option("--baseURL", "Base path of the api endpoint", "").option("--verbose", "More logs", false).option("--importClientSource", "Where request tool comes from").action(
  async (docURL, options) => {
    try {
      const code = await codeGen({
        docURL,
        baseURL: options.baseURL,
        output: options.output,
        verbose: options.verbose,
        adaptor: options.adaptor,
        importClientSource: options.importClientSource
      });
      await Generator.write(code, options.output);
    } catch (err) {
      cli.error(err.message);
    }
  }
);
cli.parse();
