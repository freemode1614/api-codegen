import { OpenAPIV3 } from "openapi-types";
import {
  BindingElement,
  ExpressionStatement,
  factory as ts,
  FunctionDeclaration,
  ParameterDeclaration,
  PropertySignature,
  SyntaxKind,
  TypeNode,
} from "typescript";

import Adaptor from "@/providers/Adaptor";
import { isV3ReferenceObject } from "@/types/openapi";
import { formatMapping } from "@/utils/format2type";
import pathToName from "@/utils/pathToName";

export class V3 extends Adaptor<OpenAPIV3.Document> implements Adaptor<OpenAPIV3.Document> {
  assemble() {
    throw new Error("Method not implemented.");
  }

  private schemaToTypeNode(schema: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject): TypeNode {
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

  private parametersToTsNode(
    parameters: (OpenAPIV3.ParameterObject | OpenAPIV3.ReferenceObject)[],
  ): ParameterDeclaration {
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
      [],
      undefined,
      ts.createObjectBindingPattern(objectElements),
      undefined,
    );
  }

  apis() {
    const apiDeclarations: (FunctionDeclaration | ExpressionStatement)[] = [];

    const { components = {}, paths = {} } = this.doc;

    if (Object.values(paths).length === 0) {
      return apiDeclarations;
    }

    // Global schema definitions
    const {
      schemas,
      responses,
      parameters: g_parameters,
      examples,
      requestBodies,
      headers,
      securitySchemes,
      links,
      callbacks,
    } = components;

    for (const path in paths) {
      if (Object.prototype.hasOwnProperty.call(paths, path)) {
        const pathObject = paths[path];

        if (pathObject) {
          const { parameters: p_parameters } = pathObject;

          for (let httpMethod of Object.keys(OpenAPIV3.HttpMethods)) {
            httpMethod = httpMethod.toLowerCase();
            const operationByMethod = pathObject[httpMethod as OpenAPIV3.HttpMethods];
            if (operationByMethod) {
              const { parameters, operationId, requestBody, responses, callbacks, deprecated, summary } =
                operationByMethod;

              const fnDeclararion = ts.createFunctionDeclaration(
                [ts.createModifier(SyntaxKind.ExportKeyword)],
                undefined,
                pathToName(path, httpMethod, operationId),
                undefined,
                parameters ? [this.parametersToTsNode(parameters)] : [],
                undefined,
                body,
              );

              apiDeclarations.push(fnDeclararion);
            }
          }
        }
      }
    }

    return apiDeclarations;
  }
}
