import {
  BindingElement,
  factory as ts,
  NodeFlags,
  ParameterDeclaration,
  PropertySignature,
  Statement,
  SyntaxKind,
  TypeNode,
} from "typescript";

import { formatMapping } from "@/utils/format2type";
import reference2name from "@/utils/reference2name";

export type ClientReferenceObject = { $ref: string };
export type ClientNonArraySchemaObjectType = "boolean" | "object" | "number" | "string" | "integer";
export type ClientArraySchemaObjectType = "array";
export type ClientSchemaObject = ClientArraySchemaObject | ClientNonArraySchemaObject;

export interface ClientArraySchemaObject extends ClientBaseSchemaObject {
  type: ClientArraySchemaObjectType;
  items: ClientReferenceObject | ClientSchemaObject;
}

export interface ClientNonArraySchemaObject extends ClientBaseSchemaObject {
  type?: ClientNonArraySchemaObjectType;
}

export interface ClientBaseSchemaObject {
  title?: string;
  description?: string;
  format?: string;
  additionalProperties?: boolean | ClientReferenceObject | ClientSchemaObject;
  required?: string[];
  enum?: (string | number)[];
  properties?: Record<string, ClientReferenceObject | ClientSchemaObject>;
  allOf?: (ClientReferenceObject | ClientSchemaObject)[];
  oneOf?: (ClientReferenceObject | ClientSchemaObject)[];
  anyOf?: (ClientReferenceObject | ClientSchemaObject)[];
  not?: ClientReferenceObject | ClientSchemaObject;
  nullable?: boolean;
  readOnly?: boolean;
  deprecated?: boolean;
}

export type ClientParameterObject = {
  in: string;
  name: string;
  description?: string;
  required?: boolean;
  deprecated?: boolean;
  schema?: ClientReferenceObject | ClientSchemaObject;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
const isClientReferenceObject = (object: any): object is ClientReferenceObject => !!object.$ref;

export default abstract class Client {
  /**
   *
   * Client statements.
   *
   */
  abstract httpClient(
    path: string,
    method: string,
    parameters: (ClientParameterObject | ClientReferenceObject)[],
    requestBody?: ClientSchemaObject,
    response?: ClientSchemaObject,
    useFormData?: boolean,
    useJSONResponse?: boolean,
  ): Statement[];

  /**
   *
   * FormData statements.
   *
   */
  public formDataStatement(
    parameters: (ClientParameterObject | ClientReferenceObject)[],
    requestBodySchema?: ClientSchemaObject,
  ): Statement[] {
    const statements: Statement[] = [];

    statements.push(
      ts.createVariableStatement(
        undefined,
        ts.createVariableDeclarationList(
          [
            ts.createVariableDeclaration(
              ts.createIdentifier("fd"),
              undefined,
              undefined,
              ts.createNewExpression(ts.createIdentifier("FormData"), undefined, []),
            ),
          ],
          NodeFlags.Const,
        ),
      ),
    );

    (
      parameters.filter(
        (p) =>
          !isClientReferenceObject(p) &&
          (p.in === "formData" || (!isClientReferenceObject(p.schema) && p.schema?.format === "binary")),
      ) as ClientParameterObject[]
    ).forEach((p) => {
      statements.push(
        ts.createExpressionStatement(
          ts.createCallExpression(
            ts.createPropertyAccessExpression(ts.createIdentifier("fd"), ts.createIdentifier("append")),
            undefined,
            [ts.createStringLiteral(p.name), ts.createIdentifier(p.name)],
          ),
        ),
      );
    });

    if (requestBodySchema?.properties && Object.values(requestBodySchema.properties).length > 0) {
      Object.keys(requestBodySchema.properties).forEach((p) => {
        const schemaByKey = requestBodySchema.properties![p];
        if (!isClientReferenceObject(schemaByKey)) {
          statements.push(
            ts.createExpressionStatement(
              ts.createCallExpression(
                ts.createPropertyAccessExpression(ts.createIdentifier("fd"), ts.createIdentifier("append")),
                undefined,
                [
                  ts.createStringLiteral(p),
                  schemaByKey.format === "string" || schemaByKey.type === "string"
                    ? ts.createPropertyAccessExpression(ts.createIdentifier("req"), ts.createIdentifier(p))
                    : ts.createCallExpression(ts.createIdentifier("String"), undefined, [
                        ts.createPropertyAccessExpression(ts.createIdentifier("req"), ts.createIdentifier(p)),
                      ]),
                ],
              ),
            ),
          );
        }
      });
    }

    return statements;
  }

  public urlTemplate(path: string, parameters: ClientParameterObject[]) {
    path = path.replaceAll("{", "${");
    const inQuery = parameters.filter((p) => p.in === "query");
    const paths = path.split("$");

    if (paths.length === 1) {
      return ts.createNoSubstitutionTemplateLiteral(paths[0]);
    }

    return ts.createTemplateExpression(
      ts.createTemplateHead(paths[0]),
      paths.slice(1).map((path, index) => {
        const result = /^{(?<span>.+)}(?<literal>.+)?/gm.exec(path);
        const isLastParameter = index === paths.slice(1).length - 1;

        return ts.createTemplateSpan(
          ts.createIdentifier(result!.groups!.span),
          !isLastParameter
            ? ts.createTemplateMiddle(result!.groups!.literal)
            : ts.createTemplateTail(
                (result!.groups!.literal || "") +
                  (inQuery.length > 0 ? `?${inQuery.map((p) => `${p.name}=${p.name}`)}` : ""),
              ),
        );
      }),
    );
  }

  public schemaToTypeNode(schema: ClientSchemaObject | ClientReferenceObject): TypeNode {
    if (isClientReferenceObject(schema)) {
      return ts.createTypeReferenceNode(ts.createIdentifier(reference2name(schema.$ref)));
    } else {
      if (schema.type === "array") {
        const { items } = schema;
        return ts.createArrayTypeNode(this.schemaToTypeNode(items));
      }

      if (schema.type === "object" && schema.properties && Object.values(schema.properties).length > 0) {
        return ts.createTypeLiteralNode(
          Object.keys(schema.properties)
            .map((propKey) => {
              const propSchema = schema.properties![propKey];
              return ts.createPropertySignature(
                undefined,
                ts.createStringLiteral(propKey),
                schema.required?.includes(propKey) ||
                  (!isClientReferenceObject(propSchema) && propSchema.format === "binary")
                  ? undefined
                  : ts.createToken(SyntaxKind.QuestionToken),
                this.schemaToTypeNode(propSchema),
              );
            })
            .filter(Boolean),
        );
      }

      if (schema.type === "object") {
        return ts.createTypeReferenceNode(ts.createIdentifier("Record"), [
          // Using string only for NOW.
          ts.createToken(SyntaxKind.StringKeyword),
          ts.createToken(SyntaxKind.UnknownKeyword),
        ]);
      }

      if (schema.format && Object.keys(formatMapping).includes(schema.format)) {
        switch (formatMapping[schema.format as keyof typeof formatMapping]) {
          case "number":
            return ts.createToken(SyntaxKind.NumberKeyword);
          case "string":
            return ts.createToken(SyntaxKind.StringKeyword);
          case "boolean":
            return ts.createToken(SyntaxKind.BooleanKeyword);
          case "File":
            return ts.createTypeReferenceNode(ts.createIdentifier("File"));
          default:
            break;
        }
      }

      // None array and object schema
      if (schema.type && ["boolean", "number", "string", "integer"].includes(schema.type)) {
        switch (schema.type) {
          case "boolean":
            return ts.createToken(SyntaxKind.BooleanKeyword);
          case "string":
            return ts.createToken(SyntaxKind.StringKeyword);
          case "number":
          case "integer":
            return ts.createToken(SyntaxKind.NumberKeyword);
          default:
            break;
        }
      }

      // Complex
      const { oneOf, allOf, anyOf } = schema;

      if (oneOf) {
        return ts.createUnionTypeNode(oneOf.map((s) => this.schemaToTypeNode(s)));
      }

      if (anyOf) {
        return ts.createUnionTypeNode(anyOf.map((s) => this.schemaToTypeNode(s)));
      }

      if (allOf) {
        return ts.createIntersectionTypeNode(allOf.map((s) => this.schemaToTypeNode(s)));
      }
    }

    return ts.createToken(SyntaxKind.UnknownKeyword);
  }

  public parametersToTsNode(parameters: (ClientParameterObject | ClientReferenceObject)[]): ParameterDeclaration {
    const objectElements: BindingElement[] = [];
    const typeObjectElements: PropertySignature[] = [];

    for (const parameter of parameters) {
      if (isClientReferenceObject(parameter)) {
        // TODO:
        continue;
      }

      const { name, deprecated, description, allowEmptyValue, schema, required } = parameter;

      objectElements.push(ts.createBindingElement(undefined, undefined, ts.createIdentifier(name)));
      typeObjectElements.push(
        ts.createPropertySignature(
          [],
          ts.createIdentifier(name),
          required ? undefined : ts.createToken(SyntaxKind.QuestionToken),
          !schema ? ts.createToken(SyntaxKind.UnknownKeyword) : this.schemaToTypeNode(schema),
        ),
      );
    }

    return ts.createParameterDeclaration(
      //
      undefined,
      undefined,
      ts.createObjectBindingPattern(objectElements),
      undefined,
      ts.createTypeLiteralNode(typeObjectElements),
      undefined,
    );
  }
}
