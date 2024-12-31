import Generator from "@/generators/Generator";
import Client from "@/providers/Client";
import type { ClientInfo } from "@/types/client";
import { isTypeLiteral, PropertySignature, TypeLiteral } from "@/types/type";
export default class FetchClient extends Generator implements Client {
  code = "";
  clientName = "fetch";
  clientInfos: ClientInfo[] = [];

  fnBody(api: ClientInfo): string {
    const { parameters, method, body, metadata } = api;

    const args = () => {
      if (!parameters && !body) return "";
      const objectLiterals = {
        members: [
          {
            name: "method",
            initializer: `"${method.toUpperCase()}"`,
          },
        ],
      } as TypeLiteral;

      if (body) {
        objectLiterals.members.push({
          name: "body",
          initializer: metadata.useFormData
            ? isTypeLiteral(body)
              ? "fd"
              : this.toCode(body)
            : `JSON.stringify(${this.toCode(body)})`,
        } as PropertySignature);
      }

      if (isTypeLiteral(parameters)) {
        const headers = parameters.members.filter((p) => p.in === "header");
        const bodies = parameters.members.filter((p) => p.in === "body" || !p.in);
        if (headers.length > 0) {
          objectLiterals.members.push({
            name: "headers",
            initializer: {
              members: headers.map(
                (h) =>
                  ({
                    name: h.name,
                    initializer:
                      h.format !== "string"
                        ? `encodeURIComponent(JSON.stringify(${h.name}))`
                        : `encodeURIComponent(${h.name})`,
                  }) as PropertySignature,
              ),
            },
          } as PropertySignature);
        }

        if (!body && bodies.length > 0) {
          objectLiterals.members.push({
            name: "body",
            initializer: metadata.useFormData
              ? "fd"
              : `JSON.stringify(${this.toCode({
                  members: bodies.map(
                    (b) =>
                      ({
                        name: b.name,
                      }) as PropertySignature,
                  ),
                })})`,
          } as PropertySignature);
        }
      }

      return this.toCode(objectLiterals);
    };

    const code = [
      this.toFormData(api), //
      "\n",
      "return",
      `${this.clientName}(`,
      `\`${this.toURL(api)}\`,`,
      args(),
      ")",
    ];
    return code.join(" ");
  }

  template(api: ClientInfo): string {
    return this.toFunction(api, this);
  }

  templates(apis: ClientInfo[]): string {
    const code = apis.map((api) => this.template(api)).join("\n\n");
    return code;
  }
}
