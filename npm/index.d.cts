import { OpenAPI } from 'openapi-types';

declare enum ClientTypes {
    Axios = 0,
    Fetch = 1
}

interface ClientGenOptions {
    doc: string;
    baseURL?: string;
    client?: ClientTypes;
    ouput?: string;
}
declare const codeGenByConfig: (doc: OpenAPI.Document, output: string) => Promise<void>;
declare function codeGen(options: ClientGenOptions, output: string): Promise<void>;

export { type ClientGenOptions, codeGenByConfig, codeGen as default };
