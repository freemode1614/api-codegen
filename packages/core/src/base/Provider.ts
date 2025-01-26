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
  RequestBodiesObject,
  ResponsesObject,
  SchemaObject,
} from "~/base/Base";
import { Base, SchemaType } from "~/base/Base";

export type InitOptions = {
  docURL: string;
};

export abstract class Provider extends Base {
  /**
   * A property to store JSON data externally.
   * This attribute holds structured data in JSON format, allowing for flexible and dynamic data handling.
   */
  abstract schema: JSONValue;

  /**
   * Holds acollection of named schema object
   */
  protected schemas: Record<string, SchemaObject> = {};

  /**
   * Holds acollection of named parameter object
   */
  protected parameters: Record<string, ParameterObject> = {};

  /**
   * Holds acollection of named response object
   */
  protected responses: Record<string, ResponsesObject> = {};

  /**
   * Holds acollection of named requestBody object
   */
  protected requestBodies: Record<string, RequestBodiesObject> = {};

  /**
   *
   * Adaptor for client.
   *
   */
  protected adaptor: Adapter;

  protected constructor(adaptor: Adapter, options: InitOptions) {
    super();
    this.adaptor = adaptor;
    const { schemas, parameters, responses, requestBodies } =
      this.init(options);
    this.schemas = schemas;
    this.parameters = parameters;
    this.responses = responses;
    this.requestBodies = requestBodies;
  }

  protected getSchemaByType(
    schemaType: keyof typeof SchemaType | SchemaType,
    refName: string,
  ) {
    const targetSchemas = this[schemaType];
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!targetSchemas) {
      throw new Error(
        `Not a valid schema type ${schemaType}, expect ${Object.keys(SchemaType).join(", ")}`,
      );
    }

    return targetSchemas[refName];
  }

  protected async init(options: InitOptions): Promise<{
    schemas: Record<string, SchemaObject>;
    parameters: Record<string, ParameterObject>;
    responses: Record<string, ResponsesObject>;
    requestBodies: Record<string, RequestBodiesObject>;
  }> {
    throw new Error(`Please overwrite init method`);
  }
}
