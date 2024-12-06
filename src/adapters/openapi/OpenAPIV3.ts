import { OpenAPIV3 } from "openapi-types";

import Adaptor from "@/adapters/Adaptor";
import Comment from "@/generators/Comment";
import { ApiObject } from "@/types/api";
import refShorten from "@/utils/refShorten";

export default class OpenApiV3 implements Adaptor {
  static refShorten = (ref: string) => refShorten(ref);

  public get banner() {
    const { info } = this.doc;
    const { version, title, description } = info;

    return Comment.of([
      {
        comment: version,
      },
      { comment: title },
      { comment: description ?? "" },
    ]).to();
  }

  public get schemas() {
    const { components } = this.doc;
    if (components) {
      const { schemas = {}, requestBodies = {}, responses = {} } = components;

      const schemas_ = schemas as Record<string, OpenAPIV3.SchemaObject>;

      return {
        ...schemas,
        ...this.analysisMediaSchemas(schemas_, requestBodies),
        ...this.analysisMediaSchemas(schemas_, responses),
      };
    }

    return {};
  }

  public get parameters() {
    const { components } = this.doc;
    if (components) {
      const { parameters = {}, headers = {} } = components;

      return {
        ...(headers as Record<string, OpenAPIV3.ParameterObject>),
        ...(parameters as Record<string, OpenAPIV3.ParameterObject>),
      };
    }

    return {};
  }

  private analysisMediaSchemas(
    schemas: Record<string, OpenAPIV3.SchemaObject>,
    mediaSchemas: Record<string, OpenAPIV3.RequestBodyObject | OpenAPIV3.ResponseObject | OpenAPIV3.ReferenceObject>,
  ) {
    const resolveReference = (ref: string) => schemas[OpenApiV3.refShorten(ref)];

    const otherSchemasWithNoReference = {};

    return Object.entries(mediaSchemas).reduce<Record<string, OpenAPIV3.SchemaObject>>((acc, [key, schema]) => {
      if ((schema as OpenAPIV3.ReferenceObject).$ref) {
        return Object.assign(acc, {
          [key]: resolveReference((schema as OpenAPIV3.ReferenceObject).$ref),
        });
      }

      schema = schema as OpenAPIV3.RequestBodyObject | OpenAPIV3.ResponseObject;

      const { content } = schema;

      if (!content) {
        return acc;
      }

      const mediaTypeSchema = (content["application/json"] ?? content["*/*"]).schema;

      if (!mediaTypeSchema) {
        return acc;
      }

      if ((mediaTypeSchema as OpenAPIV3.ReferenceObject).$ref) {
        return Object.assign(acc, {
          [key]: resolveReference((mediaTypeSchema as OpenAPIV3.ReferenceObject).$ref),
        });
      }

      return Object.assign(acc, {
        [key]: mediaTypeSchema as OpenAPIV3.SchemaObject,
      });
    }, otherSchemasWithNoReference);
  }

  private analysisApis() {

    const { paths } = this.doc;

    if (Object.keys(paths).length === 0) {
      return []
    }

    Object.entries(paths).reduce<ApiObject[]>(
      (acc, [path, schema]) => {
        const apiObject = { url: path } as ApiObject;

        if (schema) {
          const { summary, parameters, description } = schema;
          Object.keys(OpenAPIV3.HttpMethods).forEach(
            (method) => {
              // @ts-expect-error ignore below error
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const apiMethodObject = schema[method] as OpenAPIV3.OperationObject;
            }
          )
        }


        return acc;
      }, []
    )

    return []
  }

  protected doc!: OpenAPIV3.Document;

  constructor(doc: OpenAPIV3.Document) {
    this.doc = doc;
  }

  public parse(): string {
    throw new Error("Method not implemented.");
  }
}
