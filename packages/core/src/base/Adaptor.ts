/**
 * @file Adapter abstract class definition
 * @author [Your Name]
 * @description Base adapter implementation for various code generation tools
 */

import type { Statement } from "typescript";
import type { MediaTypeObject, ParameterObject } from "~/interface";

/**
 * Base adapter for tool
 * This abstract class serves as the foundation for implementing adapters for different code generation tools
 */
export abstract class Adapter {
    /**
     * @abstract The unique name/identifier for this adapter implementation
     */
    abstract readonly name: string;

    /**
     * @abstract The name of the field used to specify the HTTP method in API calls
     */
    abstract readonly methodFieldName: string;

    /**
     * @abstract The name of the field used to specify the request body in API calls
     */
    abstract readonly bodyFieldName: string;

    /**
     * @abstract The name of the field used to specify request headers in API calls
     */
    abstract readonly headersFieldName: string;

    /**
     * @abstract The name of the field used to specify query parameters in API calls
     */
    abstract readonly queryFieldName: string;

    /**
     * @abstract
     * @param {string} uri - The API endpoint URI
     * @param {string} method - The HTTP method (e.g., GET, POST, etc.)
     * @param {ParameterObject[]} parameters - An array of parameters for the API call
     * @param {MediaTypeObject | undefined} requestBody - The request body payload (if applicable)
     * @param {MediaTypeObject | undefined} response - The expected response format (if applicable)
     * @param {Adapter} adapter - An instance of the adapter being used
     * @param {boolean} useFormData - Flag indicating whether to use FormData for the request body
     * @param {boolean} useJSONResponse - Flag indicating whether the response should be parsed as JSON
     * @returns {Statement[]} An array of TypeScript AST statements representing the generated code
     */
    abstract client(
        uri: string,
        method: string,
        parameters: ParameterObject[],
        requestBody: MediaTypeObject | undefined,
        response: MediaTypeObject | undefined,
        adapter: Adapter,
        useFormData: boolean,
        useJSONResponse: boolean,
    ): Statement[];
}