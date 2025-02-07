
/**
 *
 * Base adapter for tool
 *
 */
export abstract class Adapter {
  abstract readonly name: string;
  abstract readonly methodFieldName: string;
  abstract readonly bodyFieldName: string;
  abstract readonly headersFieldName: string;
  abstract readonly queryFieldName: string;
}
