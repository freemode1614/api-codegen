import { OpenAPI } from 'openapi-types';

declare enum ClientTypes {
    Axios = 0,
    Fetch = 1
}

interface OpenapiOptions {
    doc: string;
    ouput: string;
    baseURL?: string;
    client?: ClientTypes | keyof typeof ClientTypes;
}
declare const codeGenByConfigForTesting: (doc: OpenAPI.Document) => Promise<void>;
declare function openapi(options: OpenapiOptions): Promise<string>;

export { type OpenapiOptions, codeGenByConfigForTesting, openapi as default };
