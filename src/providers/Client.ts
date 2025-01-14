import { factory as ts, NodeFlags, Statement } from "typescript";

import { isV3ReferenceObject } from "@/types/openapi";

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
}
