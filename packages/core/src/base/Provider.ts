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

import type {
  OperationObject,
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
  apis: PathsObject;
};

export class Provider {
  /**
   * Holds acollection of named schema object
   */
  schemas!: Record<string, SchemaObject>;

  /**
   * Holds acollection of named parameter object
   */
  parameters!: Record<string, ParameterObject>;

  /**
   * Holds acollection of named response object
   */
  responses!: Record<string, ResponsesObject>;

  /**
   * Holds acollection of named requestBody object
   */
  requestBodies!: Record<string, RequestBodyObject>;

  /**
   * Holds a collection of named api call
   */
  apis!: Record<string, OperationObject[]>;

  public isRef(schema: any): schema is ReferenceObject {
    return "$ref" in schema && typeof schema.$ref === "string";
  }

  /**
   * Override this method.
   */
  async init(): Promise<ProviderInitResult> {
    throw new Error(`Please overwrite init method`);
  }
}
