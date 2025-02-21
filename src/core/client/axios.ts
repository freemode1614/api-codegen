/**
 * File containing the implementation of the AxiosAdapter class.
 * This adapter is responsible for generating code that uses the Axios HTTP client library.
 */

import { Adapter } from "@apicodegen/core/base/Adaptor";
import { Statement } from "typescript";

/**
 * Adapter class implementing support for generating code that makes use of the Axios HTTP client library.
 * This class defines custom behavior and field mappings specific to the Axios client.
 */
export class AxiosAdapter extends Adapter {
  /**
   * Name of the field used to specify the HTTP method in the request configuration.
   */
  readonly methodFieldName = "method";
  
  /**
   * Name of the field used to specify the request body (data) in the request configuration.
   */
  readonly bodyFieldName = "data";
  
  /**
   * Name of the field used to specify the request headers in the request configuration.
   */
  readonly headersFieldName = "headers";
  
  /**
   * Name of the field used to specify the query parameters in the request configuration.
   */
  readonly queryFieldName = "params";
  
  /**
   * The name of the client this adapter is configured for, which is 'axios' in this case.
   */
  readonly name = "axios";

  /**
   * Method that should generate and return the client-specific configuration statements.
   * 
   * @returns {Statement[]} An array of TypeScript statements that define the client configuration.
   * 
   * @throws {Error} Indicates that the method is not yet implemented and needs to be filled in.
   */
  client(): Statement[] {
    throw new Error("Method not implemented.");
  }
}