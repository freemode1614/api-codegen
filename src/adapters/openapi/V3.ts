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
import pathToName from "@/utils/pathToName";
import reference2name from "@/utils/reference2name";

export class V3 extends Adaptor<OpenAPIV3.Document> implements Adaptor<OpenAPIV3.Document> {
  private requestBodies: OpenAPIV3.ComponentsObject["requestBodies"] = {};
  private responses: OpenAPIV3.ComponentsObject["responses"] = {};
  private parameters: OpenAPIV3.ComponentsObject["parameters"] = {};
  private schemas: OpenAPIV3.ComponentsObject["schemas"] = {};

  private requestBodyToTsNode(
    requestBody: OpenAPIV3.ReferenceObject | OpenAPIV3.RequestBodyObject,
  ): ParameterDeclaration {
    if (isV3ReferenceObject(requestBody)) {
      return ts.createParameterDeclaration(
        undefined,
        undefined,
        ts.createIdentifier("req"),
        undefined,
        ts.createTypeReferenceNode(reference2name(requestBody.$ref), undefined),
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
    requestBody?: OpenAPIV3.OperationObject["requestBody"],
    responses?: OpenAPIV3.OperationObject["responses"],
  ): Block {
    const shouldPutRequestBodyInFormData =
      (!isV3ReferenceObject(requestBody) &&
        requestBody?.content &&
        ("multipart/form-data" in requestBody.content || "application/x-www-form-urlencoded" in requestBody.content)) ??
      parameters.some(
        (s) =>
          !isV3ReferenceObject(s) &&
          (s.in === "formData" || (!isV3ReferenceObject(s.schema) && s.schema?.format && s.schema.format === "binary")),
      );

    if (requestBody && isV3ReferenceObject(requestBody)) {
      requestBody = this.requestBodies![reference2name(requestBody.$ref)] as OpenAPIV3.RequestBodyObject;
    }

    let response = responses ? responses[200] : undefined;

    if (response && isV3ReferenceObject(response)) {
      response = this.responses![reference2name(response.$ref)] as OpenAPIV3.ResponseObject;
    }

    const shouldUseJSONResponse = response?.content && "application/json" in response.content;

    return ts.createBlock(
      [
        //
        ...(shouldPutRequestBodyInFormData
          ? this.client.formDataStatement(
              parameters,
              requestBody?.content
                ? //
                  (Object.values(requestBody.content)[0].schema as ClientSchemaObject)
                : undefined,
            )
          : []),
        ...this.client.httpClient(
          path,
          method,
          parameters,
          requestBody?.content ? (Object.values(requestBody.content)[0].schema as ClientSchemaObject) : undefined,
          response?.content ? (Object.values(response.content)[0].schema as ClientSchemaObject) : undefined,
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
            ts.createIdentifier(key),
            undefined,
            this.client.schemaToTypeNode(schema),
          ),
        );
      });
    }

    // Global schema definitions
    const { parameters: g_parameters } = components;

    for (const path in paths) {
      if (Object.prototype.hasOwnProperty.call(paths, path)) {
        const pathObject = paths[path];

        if (pathObject) {
          const { parameters: p_parameters } = pathObject;

          for (let httpMethod of Object.keys(OpenAPIV3.HttpMethods)) {
            httpMethod = httpMethod.toLowerCase();
            const operationByMethod = pathObject[httpMethod as OpenAPIV3.HttpMethods];
            if (operationByMethod) {
              const { operationId, requestBody, responses, deprecated, summary } = operationByMethod;
              let { parameters = [] } = operationByMethod;

              if (p_parameters) {
                const names = new Set(p_parameters.map((p) => (isV3ReferenceObject(p) ? p.$ref : p.name)));
                parameters = [
                  ...p_parameters,
                  ...parameters.filter((parameter) => {
                    if (isV3ReferenceObject(parameter)) {
                      return !names.has(parameter.$ref);
                    } else {
                      return !names.has(parameter.name);
                    }
                  }),
                ];
              }

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
