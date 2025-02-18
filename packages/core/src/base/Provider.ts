/**
 * @file Provider abstract class.
 * This file defines the `Provider` abstract class, which serves as a base for providers responsible for parsing
 * and processing API documentation.
 */

import type {
  EnumSchemaObject,
  OperationObject,
  ParameterObject,
  RequestBodyObject,
  ResponsesObject,
  SchemaObject,
  FetchDocRequestInit,
  ProviderInitOptions,
  ProviderInitResult,
} from "~/interface";

/**
 * Abstract Provider Class.
 * 
 * The Provider class is designed to be extended by specific implementations (e.g., OpenAPI 2 provider, OpenAPI 3 provider).
 * It handles the initialization of the provider and the parsing of documentation into structured data.
 * 
 * @example 
 * 
 * ```ts
 * /// Example of how this class might be used by a subclass:
 * class OpenAPIProvider extends Provider {
 *   /// Implement the parse method to handle OpenAPI-specific documentation parsing.
 *   parse(doc: unknown): ProviderInitResult {
 *     /// Implementation details...
 *   }
 * }
 * 
 * /// Initializing a provider with configuration and documentation data:
 * const initOptions: ProviderInitOptions = {
 *   docURL: "https://example.com/api/swagger.json",
 *   baseURL: "https://api.example.com",
 *   output: "./generated",
 *   requestOptions: {
 *     headers: { "Content-Type": "application/json" },
 *   },
 *   importClientSource: "generated/client",
 * };
 * 
 * const docData = fetchSwaggerDoc();
 * const provider = new OpenAPIProvider(initOptions, docData);
 * ```
 */
export abstract class Provider
  implements ProviderInitResult, ProviderInitOptions
{
  /** collection of enum schemas */
  readonly enums: EnumSchemaObject[] = [];
  /** collection of schemas indexed by name */
  readonly schemas: Record<string, SchemaObject> = {};
  /** collection of parameters indexed by name */
  readonly parameters: Record<string, ParameterObject> = {};
  /** collection of API responses indexed by name */
  readonly responses: Record<string, ResponsesObject> = {};
  /** collection of request bodies indexed by name */
  readonly requestBodies: Record<string, RequestBodyObject> = {};
  /** collection of API endpoints (operations) indexed by path */
  readonly apis: Record<string, OperationObject[]> = {};

  /** URL for fetching API documentation */
  readonly docURL: string;
  /** base URL for API endpoints */
  readonly baseURL: string;
  /** output directory for generated code */
  readonly output: string;
  /** request options for API documentation fetch */
  readonly requestOptions: FetchDocRequestInit;
  /** source path for imported client */
  readonly importClientSource: string;

  /**
   * Provider Constructor.
   * @param {ProviderInitOptions} initOptions - Initial configuration for the provider.
   * @param {unknown} doc - Raw API documentation data to be parsed.
   */
  constructor(initOptions: ProviderInitOptions, doc: unknown) {
    this.docURL = initOptions.docURL;
    this.baseURL = initOptions.baseURL ?? "";
    this.output = initOptions.output ?? ".";
    this.requestOptions = initOptions.requestOptions ?? {};
    this.importClientSource = initOptions.importClientSource ?? "";

    const { enums, schemas, requestBodies, responses, parameters, apis } =
      this.parse(doc);

    this.enums = enums;
    this.schemas = schemas;
    this.responses = responses;
    this.parameters = parameters;
    this.requestBodies = requestBodies;
    this.apis = apis;
  }

  /**
   * Abstract Parse Method.
   * @abstract
   * @param {unknown} doc - Raw API documentation data.
   * @returns {ProviderInitResult} - Parsed documentation data.
   * 
   * This method must be implemented by subclasses to parse the raw documentation into structured data.
   */
  abstract parse(doc: unknown): ProviderInitResult;
}