import type {
  EnumSchemaObject,
  OperationObject,
  ParameterObject,
  PathsObject,
  RequestBodyObject,
  ResponsesObject,
  SchemaObject,
  FetchDocRequestInit,
} from "~/base/Base";

export type ProviderInitOptions = {
  docURL: string;
  output?: string;
  baseURL?: string;
  importClientSource?: string;
  requestOptions?: FetchDocRequestInit;
};

export interface ProviderInitResult {
  readonly enums: EnumSchemaObject[];
  readonly schemas: Record<string, SchemaObject>;
  readonly parameters: Record<string, ParameterObject>;
  readonly responses: Record<string, ResponsesObject>;
  readonly requestBodies: Record<string, RequestBodyObject>;
  readonly apis: PathsObject;
}

export abstract class Provider
  implements ProviderInitResult, ProviderInitOptions
{
  // Result
  readonly enums: EnumSchemaObject[] = [];
  readonly schemas: Record<string, SchemaObject> = {};
  readonly parameters: Record<string, ParameterObject> = {};
  readonly responses: Record<string, ResponsesObject> = {};
  readonly requestBodies: Record<string, RequestBodyObject> = {};
  readonly apis: Record<string, OperationObject[]> = {};

  // Init options
  readonly docURL: string;
  readonly baseURL: string;
  readonly output: string;
  readonly requestOptions: FetchDocRequestInit;
  readonly importClientSource: string;

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

  abstract parse(doc: unknown): ProviderInitResult;
}
