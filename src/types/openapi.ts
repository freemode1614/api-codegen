/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { OpenAPIV2, OpenAPIV3, OpenAPIV3_1 } from "openapi-types";

export enum OpenApiVersion {
  "v2",
  "v3",
  "v3_1",
}
export const isV2ReferenceObject = (schema: any): schema is OpenAPIV2.ReferenceObject => !!schema.$ref;

export const isV3ReferenceObject = (schema: any): schema is OpenAPIV3.ReferenceObject => !!schema.$ref;

export const isV3_1ReferenceObject = (schema: any): schema is OpenAPIV3_1.ReferenceObject => !!schema.$ref;

export const isV3ArrySchemaObject = (schema: any): schema is OpenAPIV3.ArraySchemaObject => !!schema.items;
