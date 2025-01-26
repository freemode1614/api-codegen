import { Base } from "~/base/Base";

/**
 *
 * Base adapter for tool
 *
 */
export abstract class Adapter extends Base {
  abstract methodField: string;
  abstract bodyField: string;
  abstract headersField: string;
  abstract queryField: string;
  constructor() {
    super();
  }
}
