import { Base } from "~/base/Base";
import { Provider } from "~/base/Provider";

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
  protected provider: Provider;

  protected constructor(provider: Provider) {
    super();
    this.provider = provider;
  }
}
