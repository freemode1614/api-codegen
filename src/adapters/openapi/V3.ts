import { OpenAPIV3 } from "openapi-types";
import {
  Block,
  ExpressionStatement,
  factory as ts,
  FunctionDeclaration,
  ParameterDeclaration,
  SyntaxKind,
  TypeAliasDeclaration,
} from "typescript";

import Adaptor from "@/providers/Adaptor";
import { ClientSchemaObject } from "@/providers/Client";
import { isV3ReferenceObject } from "@/types/openapi";
import normalizeName from "@/utils/normalizeName";
import pathToName, { upperCamelCase } from "@/utils/pathToName";
import reference2name from "@/utils/reference2name";

export class V3 extends Adaptor<OpenAPIV3.Document> implements Adaptor<OpenAPIV3.Document> {
  assemble() {
    throw new Error("Method not implemented.");
  }

  private refToTypeNode(schema: OpenAPIV3.ReferenceObject) {
    //
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
      undefined,
      undefined,
      ts.createObjectBindingPattern(objectElements),
      undefined,
    );
  }

  private requestBodyToTsNode(
    requestBody: OpenAPIV3.ReferenceObject | OpenAPIV3.RequestBodyObject,
  ): ParameterDeclaration {
    if (isV3ReferenceObject(requestBody)) {
      return ts.createParameterDeclaration(
        undefined,
        undefined,
        ts.createIdentifier("req"),
        undefined,
        ts.createTypeReferenceNode(upperCamelCase(normalizeName(reference2name(requestBody.$ref))), undefined),
      );
    } else {
      const { content } = requestBody; // description, required,

      if (Object.values(content).length > 0) {
        const mediaSchema = Object.values(requestBody.content)[0].schema;
        if (mediaSchema) {
          if (isV3ReferenceObject(mediaSchema)) {
            return ts.createParameterDeclaration(
              undefined,
              undefined,
              ts.createIdentifier("req"),
              undefined,
              ts.createTypeReferenceNode(reference2name(mediaSchema.$ref)),
            );
          } else {
            return ts.createParameterDeclaration(
              undefined,
              undefined,
              ts.createIdentifier("req"),
              undefined,
              this.client.schemaToTypeNode(mediaSchema),
            );
          }
        }
      }

      return ts.createParameterDeclaration(
        undefined,
        undefined,
        ts.createIdentifier("req"),
        undefined,
        ts.createToken(SyntaxKind.UnknownKeyword),
      );
    }
  }

  private bodyBlock(
    path: string,
    method: keyof typeof OpenAPIV3.HttpMethods,
    parameters: OpenAPIV3.OperationObject["parameters"] = [],
    requestBody: OpenAPIV3.OperationObject["requestBody"] = { content: {} },
    responses: OpenAPIV3.OperationObject["responses"] = {},
  ): Block {
    if (isV3ReferenceObject(requestBody)) {
      requestBody = this.requestBodies![reference2name(requestBody.$ref)];
    }

    requestBody = requestBody as OpenAPIV3.RequestBodyObject;

    const isFormDataContentType =
      "multipart/form-data" in requestBody.content || "application/x-www-form-urlencoded" in requestBody.content;

    let contentSchema = Object.values(requestBody.content)[0]?.schema;

    if (isV3ReferenceObject(contentSchema)) {
      contentSchema = this.schemas![reference2name(contentSchema.$ref)] as OpenAPIV3.SchemaObject;
    }

    const requestBodyIsBinarySchema = (() => {
      const isNonArrayBinaryFormat = contentSchema?.format === "binary";
      let isArrayBinaryFormat = false;

      if (contentSchema?.type === "array") {
        isArrayBinaryFormat = isV3ReferenceObject(contentSchema.items)
          ? (this.schemas![reference2name(contentSchema.items.$ref)] as OpenAPIV3.SchemaObject).format === "binary"
          : contentSchema.items.format === "binary";
      }

      return isNonArrayBinaryFormat || isArrayBinaryFormat;
    })();

    const hasBinaryInParameter = parameters.some(
      (s) =>
        !isV3ReferenceObject(s) &&
        (s.in === "formData" || (!isV3ReferenceObject(s.schema) && s.schema?.format === "binary")),
    );

    const shouldPutRequestBodyInFormData =
      (isFormDataContentType || hasBinaryInParameter) && !requestBodyIsBinarySchema;

    if (isV3ReferenceObject(requestBody)) {
      requestBody = this.requestBodies![reference2name(requestBody.$ref)] as OpenAPIV3.RequestBodyObject;
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    let response = responses[200] || responses[201] || { content: { description: "OK" } };

    if (isV3ReferenceObject(response)) {
      response = this.responses![reference2name(response.$ref)] as OpenAPIV3.ResponseObject;
    }

    const shouldUseJSONResponse = response.content && "application/json" in response.content;

    parameters = parameters.map((p) =>
      isV3ReferenceObject(p) ? (this.parameters![reference2name(p.$ref)] as OpenAPIV3.ParameterObject) : p,
    );

    return ts.createBlock(
      [
        //
        ...(shouldPutRequestBodyInFormData
          ? this.client.formDataStatement(parameters as OpenAPIV3.ParameterObject[], contentSchema)
          : []),
        ...this.client.httpClient(
          path,
          method,
          parameters as OpenAPIV3.ParameterObject[],
          contentSchema ? contentSchema : undefined,
          response.content ? (Object.values(response.content)[0].schema as ClientSchemaObject) : undefined,
          !!shouldPutRequestBodyInFormData,
          !!shouldUseJSONResponse,
        ),
      ],
      true,
    );
  }

  apis() {
    const apiDeclarations: (FunctionDeclaration | ExpressionStatement | TypeAliasDeclaration)[] = [];

    const { components = {}, paths = {} } = this.doc;
    const { requestBodies, responses, parameters, schemas } = components;

    this.requestBodies = requestBodies;
    this.responses = responses;
    this.parameters = parameters;
    this.schemas = schemas;

    if (Object.values(paths).length === 0) {
      return apiDeclarations;
    }

    if (this.schemas) {
      Object.keys(this.schemas).forEach((key) => {
        const schema = this.schemas![key];
        apiDeclarations.push(
          ts.createTypeAliasDeclaration(
            [ts.createModifier(SyntaxKind.ExportKeyword)],
            ts.createIdentifier(upperCamelCase(key)),
            undefined,
            this.client.schemaToTypeNode(schema),
          ),
        );
      });
    }

    if (this.requestBodies) {
      Object.keys(this.requestBodies).forEach((key) => {
        const requestBody = this.requestBodies![key] as OpenAPIV3.RequestBodyObject;
        let schema = Object.values(requestBody.content)[0].schema;

        if (isV3ReferenceObject(schema)) {
          schema = this.schemas![reference2name(schema.$ref)] as OpenAPIV3.SchemaObject;
        }

        if (!(key in this.schemas!)) {
          apiDeclarations.push(
            ts.createTypeAliasDeclaration(
              [ts.createModifier(SyntaxKind.ExportKeyword)],
              ts.createIdentifier(upperCamelCase(key)),
              undefined,
              this.client.schemaToTypeNode(schema!),
            ),
          );
        }
      });
    }

    for (const path in paths) {
      if (Object.prototype.hasOwnProperty.call(paths, path)) {
        const pathObject = paths[path];

        if (pathObject) {
          const { parameters: p_parameters } = pathObject;

          for (let httpMethod of Object.keys(OpenAPIV3.HttpMethods)) {
            httpMethod = httpMethod.toLowerCase();
            const operationByMethod = pathObject[httpMethod as OpenAPIV3.HttpMethods];
            if (operationByMethod) {
              const { operationId, requestBody, responses } = operationByMethod;
              let { parameters = [] } = operationByMethod;

              if (p_parameters) {
                const names = new Set(p_parameters.map((p) => (isV3ReferenceObject(p) ? p.$ref : p.name)));
                parameters = [
                  ...p_parameters,
                  ...parameters.filter((parameter) => {
                    if (isV3ReferenceObject(parameter)) {
                      const schema = this.parameters![reference2name(parameter.$ref)] as OpenAPIV3.ParameterObject;
                      return !names.has(schema.name);
                    } else {
                      return !names.has(parameter.name);
                    }
                  }),
                ].map((s) =>
                  isV3ReferenceObject(s) ? this.parameters![reference2name(s.$ref)] : s,
                ) as OpenAPIV3.ParameterObject[];
              }

              parameters = (parameters as OpenAPIV3.ParameterObject[]).filter((s) => s.in !== "cookie");

              const hasParameters = parameters.length > 0;

              const fnDeclararion = ts.createFunctionDeclaration(
                [
                  //
                  ts.createModifier(SyntaxKind.ExportKeyword),
                  ts.createModifier(SyntaxKind.AsyncKeyword),
                ],
                undefined,
                pathToName(path, httpMethod, operationId),
                undefined,
                hasParameters || requestBody
                  ? ([
                      hasParameters ? this.client.parametersToTsNode(parameters) : undefined,
                      requestBody ? this.requestBodyToTsNode(requestBody) : undefined,
                    ].filter(Boolean) as ParameterDeclaration[])
                  : [],
                undefined,
                this.bodyBlock(
                  path,
                  httpMethod as keyof typeof OpenAPIV3.HttpMethods,
                  parameters,
                  requestBody,
                  responses,
                ),
              );

              apiDeclarations.push(fnDeclararion);
            }
          }
        }
      }
    }

    return apiDeclarations;
  }

  assemble() {
    throw new Error("Method not implemented.");
  }
}
