/**
 *
 * Provider 主要功能:
 *
 *  1. 获取远程文件内容。JSON/yaml
 *  2. 提供对 schema 的查询操作。
 *  3. 解析成中间数据结构。
 *  4. 通过 Adaptor 来生成代码。
 *
 */

import { Adapter } from "~/base/Adaptor";
import type {
  JSONValue,
  ParameterObject,
  PathsObject,
  ReferenceObject,
  RequestBodyObject,
  ResponsesObject,
  SchemaObject,
} from "~/base/Base";
import { Base } from "~/base/Base";

export type ProviderInitOptions = {
  docURL: string;
};

export type ProviderInitResult = {
  schemas: Record<string, SchemaObject>;
  parameters: Record<string, ParameterObject>;
  responses: Record<string, ResponsesObject>;
  requestBodies: Record<string, RequestBodyObject>;
  apis: Record<string, PathsObject[]>;
};

export class Provider extends Base {
  public readonly name!: string;

  /**
   * Holds acollection of named schema object
   */
  protected schemas: Record<string, SchemaObject | ReferenceObject> = {};

  /**
   * Holds acollection of named parameter object
   */
  protected parameters: Record<string, ParameterObject | ReferenceObject> = {};

  /**
   * Holds acollection of named response object
   */
  protected responses: Record<string, ResponsesObject | ReferenceObject> = {};

  /**
   * Holds acollection of named requestBody object
   */
  protected requestBodies: Record<string, RequestBodyObject | ReferenceObject> =
    {};

  /**
   * Holds a collection of named api call
   */
  protected apis: Record<string, PathsObject[]> = {};

  public isRef(schema: any): schema is ReferenceObject {
    return "$ref" in schema && typeof schema.$ref === "string";
  }

  protected async init(
    options: ProviderInitOptions,
  ): Promise<ProviderInitResult> {
    throw new Error(`Please overwrite init method`);
  }
}
