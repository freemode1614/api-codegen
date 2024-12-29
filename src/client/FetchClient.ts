import Generator from "@/generators/Generator";
import Client from "@/providers/Client";
import type { ClientInfo } from "@/types/client";
import { isTypeLiteral, TypeLiteral } from "@/types/type";
import { camelCase } from "@/utils/pathToName";

export default class FetchClient extends Generator implements Client {
  code = "";
  clientName = "fetch";
  clientInfos: ClientInfo[] = [];

  #clientTemplate(api: ClientInfo, body: string) {
    const { url, method, response, parameters } = api;

    const inQueryParameters = isTypeLiteral(parameters) && parameters.members.filter((m) => m.in === "query");
    const inHeaderParameters = isTypeLiteral(parameters) && parameters.members.filter((m) => m.in === "header");

    const patchURL = inQueryParameters
      ? url +
        (inQueryParameters.length > 0
          ? "?" +
            inQueryParameters.map((m) => `${m.name}=\${encodeURIComponent(String(${camelCase(m.name)}))}`).join("&")
          : "")
      : url;

    return /**typescript */ `fetch(\`${patchURL.replaceAll("{", "${")}\`, {
  method: "${method}",
  ${body ? "body: " + body + "," : ""}
  ${inHeaderParameters && inHeaderParameters.length > 0 ? "headers: {" + inHeaderParameters.map((m) => `"${m.name}": ${camelCase(m.name)}`).join(",") + "}" : ""}
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
          .map(
            (member) =>
              `${member.name} && fd.append("${member.name}", ${member.format !== "binary" ? `String(${member.name})` : member.name});`,
          )
          .join("\n")
      : ""
  }
  return ${this.#clientTemplate(api, hasMembersInBody ? "fd" : typeof parameters === "string" ? `JSON.stringify(${parameters.toLowerCase()})` : "")};
}
`;
  }

  templates(apis: ClientInfo[]): string {
    const code = apis.map((api) => this.template(api)).join("\n\n");
    return code;
  }
}
