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
          ? "?" + inQueryParameters.map((m) => `${m.name}={encodeURIComponent(String(${camelCase(m.name)}))}`).join("&")
          : "")
      : url;

    return /**typescript */ `fetch(\`${patchURL.replaceAll("{", "${")}\`, {
  method: "${method}",${body ? "body: " + body + ",\n" : ""}${inHeaderParameters && inHeaderParameters.length > 0 ? "headers: {" + inHeaderParameters.map((m) => `"${m.name}": JSON.stringify(${camelCase(m.name)})`).join(",") + "},\n" : ""}
}).then((res) => res.json() as Promise<${response ? this.toTypeDeclaration(response) : "unknown"}>);`;
  }

  template(api: ClientInfo): string {
    const { name, parameters } = api;

    // Remove params in cookies, cookies should be set by browser when same origin.
    if (isTypeLiteral(parameters)) {
      parameters.members = parameters.members.filter((p) => p.in !== "cookie");
    }

    const parameters_ = parameters && this.toCode(parameters);

    const hasBinaryMembersInBody = isTypeLiteral(parameters)
      ? parameters.members.some((m) => m.in === "body" && m.format === "binary")
      : false;

    return `
export async function ${name}(${parameters_ ? parameters_ : ""}${parameters_ ? ": " + this.toTypeDeclaration(parameters) : ""}) {
  ${hasBinaryMembersInBody ? "const fd = new FormData();" : ""}
  ${
    hasBinaryMembersInBody
      ? (parameters as TypeLiteral).members
          .filter((m) => m.in === "body" && m.format === "binary")
          .map(
            (member) =>
              `${camelCase(member.name)} && fd.append("${member.name}", ${member.format !== "binary" ? `String(${camelCase(member.name)})` : member.name});`,
          )
          .join("\n")
      : ""
  }
  return ${this.#clientTemplate(api, hasBinaryMembersInBody ? "fd" : typeof parameters === "string" ? `JSON.stringify(${parameters ? parameters.toLowerCase() : "{}"})` : parameters ? `JSON.stringify(${this.toCode(parameters)})` : "")};
}
`;
  }

  templates(apis: ClientInfo[]): string {
    const code = apis.map((api) => this.template(api)).join("\n\n");
    return code;
  }
}
