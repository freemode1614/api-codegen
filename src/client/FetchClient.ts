import Generator from "@/generators/Generator";
import Client from "@/providers/Client";
import type { ClientInfo } from "@/types/client";
import { isTypeLiteral, TypeLiteral } from "@/types/type";

export default class FetchClient extends Generator implements Client {
  code = "";
  clientName = "fetch";
  clientInfos: ClientInfo[] = [];

  #clientTemplate(api: ClientInfo, body: string) {
    const { url, method, response, parameters } = api;

    const inQueryParameters = isTypeLiteral(parameters) && parameters.members.filter((m) => m.in === "query");
    // const inHeaderParameters = isTypeLiteral(parameters) && parameters.members.filter((m) => m.in === "header");

    const patchURL = inQueryParameters
      ? url + "?" + inQueryParameters.map((m) => `${m.name}=\${${m.name}}`).join("&")
      : url;

    return /**typescript */ `fetch(\`${patchURL}\`, {
  method: "${method}",
  ${body ? "body: " + body : ""}
  // headers: {
  //   {{headers}}
  // },
}).then((res) => res.json() as Promise<${response ? this.toTypeDeclaration(response) : "unknown"}>);`;
  }

  template(api: ClientInfo): string {
    const { name, parameters } = api;
    const parameters_ = parameters && this.toCode(parameters);

    const hasMembersInBody = isTypeLiteral(parameters)
      ? parameters.members.some((m) => m.in === "body" || m.in === undefined)
      : false;

    return `
export async function ${name}(${parameters_ ? parameters_ : ""}${parameters_ ? ": " + this.toTypeDeclaration(parameters) : ""}) {
  ${hasMembersInBody ? "const fd = new FormData();" : ""}
  ${
    hasMembersInBody
      ? (parameters as TypeLiteral).members
          .filter((m) => m.in === "body" || m.in === undefined)
          .map((member) => `fd.append("${member.name}", ${member.name} + "");`)
          .join("\n")
      : ""
  }
  return ${this.#clientTemplate(api, hasMembersInBody ? "fd" : "")};
}
`;
  }

  templates(apis: ClientInfo[]): string {
    const code = apis.map((api) => this.template(api)).join("\n\n");
    return code;
  }
}
