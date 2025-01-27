import { Provider } from "~/base/Provider";
import { Generator } from "~/generator";

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

  public async gen(provider: Provider): Promise<string> {
    const schema = await provider.init();
    const statements = Generator.schemaToStatemets(schema, this);
    const code = Generator.toCode(statements);
    // await Generator.write(code, "output.ts");
    return code;
  }
}
