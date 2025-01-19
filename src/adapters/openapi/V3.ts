import { OpenAPIV3 } from "openapi-types";
import {
  addSyntheticLeadingComment,
  Block,
  ExpressionStatement,
  factory as ts,
  FunctionDeclaration,
  Node,
  ParameterDeclaration,
  SyntaxKind,
  TypeAliasDeclaration,
} from "typescript";

import Adaptor from "@/providers/Adaptor";
import { isV3ReferenceObject } from "@/types/openapi";
import normalizeName from "@/utils/normalizeName";
import pathToName, { capitalize, upperCamelCase } from "@/utils/pathToName";
import reference2name from "@/utils/reference2name";

export class V3 extends Adaptor<OpenAPIV3.Document> implements Adaptor<OpenAPIV3.Document> {
  private requestBodies: OpenAPIV3.ComponentsObject["requestBodies"] = {};
  private responses: OpenAPIV3.ComponentsObject["responses"] = {};
  private parameters: OpenAPIV3.ComponentsObject["parameters"] = {};
  private schemas: OpenAPIV3.ComponentsObject["schemas"] = {};

  private requestBodyToTsNode(mediaType: string, mediaSchema: OpenAPIV3.MediaTypeObject): ParameterDeclaration {
    const { schema } = mediaSchema;
    if (!schema) {
      // unknown
      return ts.createParameterDeclaration(
        undefined,
        undefined,
        ts.createIdentifier("req"),
        undefined,
        ts.createToken(SyntaxKind.UnknownKeyword),
      );
    }
    if (isV3ReferenceObject(schema)) {
      // Type reference
      return ts.createParameterDeclaration(
        undefined,
        undefined,
        ts.createIdentifier("req"),
        undefined,
        ts.createTypeReferenceNode(upperCamelCase(normalizeName(reference2name(schema.$ref))), undefined),
      );
    } else {
      // Literal expression
      return ts.createParameterDeclaration(
        undefined,
        undefined,
        ts.createIdentifier("req"),
        undefined,
        this.client.schemaToTypeNode(schema),
      );
    }
  }

  private bodyBlock(
    path: string,
    method: keyof typeof OpenAPIV3.HttpMethods,
    parameters: OpenAPIV3.OperationObject["parameters"] = [],
    requestBody: OpenAPIV3.MediaTypeObject = {},
    response: OpenAPIV3.MediaTypeObject = {},
    mediaType: string,
  ): Block {
    let responseSchema = response.schema;

    let requestBodySchema = requestBody.schema;

    if (isV3ReferenceObject(requestBodySchema)) {
      requestBodySchema = this.schemas![reference2name(requestBodySchema.$ref)] as OpenAPIV3.SchemaObject;
    }

    if (isV3ReferenceObject(responseSchema)) {
      responseSchema = this.schemas![reference2name(responseSchema.$ref)] as OpenAPIV3.SchemaObject;
    }

    const isFormDataContentType = ["multipart/form-data", "application/x-www-form-urlencoded"].includes(mediaType);

    const requestBodyIsBinarySchema = (() => {
      const isNonArrayBinaryFormat = responseSchema?.format === "binary";
      let isArrayBinaryFormat = false;

      if (responseSchema?.type === "array") {
        isArrayBinaryFormat = isV3ReferenceObject(responseSchema.items)
          ? (this.schemas![reference2name(responseSchema.items.$ref)] as OpenAPIV3.SchemaObject).format === "binary"
          : responseSchema.items.format === "binary";
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

    const shouldUseJSONResponse = mediaType === "application/json";

    parameters = parameters.map((p) =>
      isV3ReferenceObject(p) ? (this.parameters![reference2name(p.$ref)] as OpenAPIV3.ParameterObject) : p,
    );

    return ts.createBlock(
      [
        //
        ...(shouldPutRequestBodyInFormData
          ? this.client.formDataStatement(parameters as OpenAPIV3.ParameterObject[], requestBodySchema)
          : []),
        ...this.client.httpClient(
          path,
          method,
          parameters as OpenAPIV3.ParameterObject[],
          requestBodySchema ? requestBodySchema : undefined,
          responseSchema ? responseSchema : undefined,
          !!shouldPutRequestBodyInFormData,
          shouldUseJSONResponse,
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
          const { parameters: p_parameters = [] } = pathObject;

          for (let httpMethod of Object.keys(OpenAPIV3.HttpMethods)) {
            httpMethod = httpMethod.toLowerCase();
            const operationByMethod = pathObject[httpMethod as OpenAPIV3.HttpMethods];
            if (operationByMethod) {
              const { operationId, responses } = operationByMethod;
              let { requestBody = { content: {} } } = operationByMethod;
              let { parameters = [] } = operationByMethod;
              const { description, deprecated } = operationByMethod;

              // Merge perameters
              const names = new Set(p_parameters.map((p) => (isV3ReferenceObject(p) ? p.$ref : p.name)));
              parameters = [
                ...p_parameters,
                ...parameters
                  .map((s) =>
                    isV3ReferenceObject(s)
                      ? (this.parameters![reference2name(s.$ref)] as OpenAPIV3.ParameterObject)
                      : s,
                  )
                  .filter((parameter) => !names.has(parameter.name)),
              ].map((s) =>
                isV3ReferenceObject(s) ? this.parameters![reference2name(s.$ref)] : s,
              ) as OpenAPIV3.ParameterObject[];

              // Filter out parameters in cookies.
              parameters = (parameters as OpenAPIV3.ParameterObject[]).filter((s) => s.in !== "cookie");

              const hasParameters = parameters.length > 0;

              if (isV3ReferenceObject(requestBody)) {
                requestBody = this.requestBodies![reference2name(requestBody.$ref)] as OpenAPIV3.RequestBodyObject;
              }

              const { content } = requestBody;
              const shouldAppendSuffix = Object.keys(content).length > 1;
              let response: OpenAPIV3.ResponseObject = { content: {}, description: "" };

              for (const httpCode of ["200", "201", "202", "203", "204", "205", "206", "207", "208", "226"]) {
                const _resp = responses[httpCode];
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                if (_resp) {
                  if (isV3ReferenceObject(_resp)) {
                    response = this.responses![reference2name(_resp.$ref)] as OpenAPIV3.ResponseObject;
                  } else {
                    response = _resp;
                  }
                  break;
                }
              }

              const addComments = (node: Node) => {
                addSyntheticLeadingComment(
                  node,
                  SyntaxKind.MultiLineCommentTrivia,
                  [description ? "\n * " + description : "", deprecated ? " * @deprecated \n" : ""].join("\n"), true,
                );
              };

              if (Object.keys(content).length === 0) {
                const fnDeclararion = ts.createFunctionDeclaration(
                  [
                    //
                    ts.createModifier(SyntaxKind.ExportKeyword),
                    ts.createModifier(SyntaxKind.AsyncKeyword),
                  ],
                  undefined,
                  pathToName(path, httpMethod, operationId),
                  undefined,
                  [hasParameters ? this.client.parametersToTsNode(parameters) : undefined].filter(
                    Boolean,
                  ) as ParameterDeclaration[],
                  undefined,
                  this.bodyBlock(
                    path,
                    httpMethod as keyof typeof OpenAPIV3.HttpMethods,
                    parameters,
                    undefined,
                    response.content ? Object.values(response.content)[0] : undefined,
                    Object.keys(content)[0],
                  ),
                );
                addComments(fnDeclararion);
                apiDeclarations.push(fnDeclararion);
              } else {
                Object.keys(content).forEach((requestMediaType) => {
                  // TODO: Need to handle multi type content.
                  const requestSchema = content[requestMediaType];
                  const fnDeclararion = ts.createFunctionDeclaration(
                    [
                      //
                      ts.createModifier(SyntaxKind.ExportKeyword),
                      ts.createModifier(SyntaxKind.AsyncKeyword),
                    ],
                    undefined,
                    pathToName(path, httpMethod, operationId) +
                      (shouldAppendSuffix ? capitalize(requestMediaType.split("/")[1]) : ""),
                    undefined,
                    [
                      hasParameters ? this.client.parametersToTsNode(parameters) : undefined,
                      this.requestBodyToTsNode(requestMediaType, requestSchema),
                    ].filter(Boolean) as ParameterDeclaration[],
                    undefined,
                    this.bodyBlock(
                      path,
                      httpMethod as keyof typeof OpenAPIV3.HttpMethods,
                      parameters,
                      requestSchema,
                      response.content?.[requestMediaType],
                      requestMediaType,
                    ),
                  );
                  addComments(fnDeclararion);
                  apiDeclarations.push(fnDeclararion);
                });
              }
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
