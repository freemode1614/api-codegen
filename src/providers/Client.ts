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

import { isV3ReferenceObject } from "@/types/openapi";
import { formatMapping } from "@/utils/format2type";

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

    (parameters.filter((p) => !isV3ReferenceObject(p) && p.in === "formData") as ClientParameterObject[]).forEach(
      (p) => {
        statements.push(
          ts.createExpressionStatement(
            ts.createCallExpression(
              ts.createPropertyAccessExpression(ts.createIdentifier("fd"), ts.createIdentifier("append")),
              undefined,
              [ts.createStringLiteral(p.name), ts.createIdentifier(p.name)],
            ),
          ),
        );
      },
    );

    if (requestBodySchema?.properties && Object.values(requestBodySchema.properties).length > 0) {
      Object.keys(requestBodySchema.properties).forEach((p) => {
        statements.push(
          ts.createExpressionStatement(
            ts.createCallExpression(
              ts.createPropertyAccessExpression(ts.createIdentifier("fd"), ts.createIdentifier("append")),
              undefined,
              [ts.createStringLiteral(p), ts.createIdentifier(p)],
            ),
          ),
        );
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
    if (isV3ReferenceObject(schema)) {
      // TODO:
    } else {
      if (schema.type === "array") {
        const { items } = schema;
        if (isV3ReferenceObject(items)) {
          // TODO:
        } else {
          return ts.createArrayTypeNode(this.schemaToTypeNode(items));
        }
      }

      if (schema.type === "object" && schema.properties && Object.values(schema.properties).length > 0) {
        return ts.createTypeLiteralNode(
          Object.keys(schema.properties)
            .map((propKey) => {
              const propSchema = schema.properties![propKey];
              if (isV3ReferenceObject(propSchema)) {
                // TODO:
              } else {
                return ts.createPropertySignature(
                  undefined,
                  ts.createIdentifier(propKey),
                  undefined,
                  this.schemaToTypeNode(propSchema),
                );
              }
            })
            .filter(Boolean) as PropertySignature[],
        );
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
    }

    return ts.createToken(SyntaxKind.UnknownKeyword);
  }

  public parametersToTsNode(parameters: (ClientParameterObject | ClientReferenceObject)[]): ParameterDeclaration {
    const objectElements: BindingElement[] = [];
    const typeObjectElements: PropertySignature[] = [];

    for (const parameter of parameters) {
      if (isV3ReferenceObject(parameter)) {
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
