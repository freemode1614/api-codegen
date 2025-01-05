import ClientClass from "@/providers/Client";
import Generator from "@/providers/Generator";
import { ClientInfo } from "@/types/client";
import type { MaybeTagItem } from "@/types/tag";
import {
  type ArrayType,
  type Enum,
  type IntersectionType,
  intersectionType,
  isArrayType,
  isIntersectionType,
  isTypeLiteral,
  isTypeParameter,
  isTypeReference,
  isUnionType,
  type TypeAlias,
  type TypeReference,
  type UnionType,
  unionType,
} from "@/types/type";
import normalizeName from "@/utils/normalizeName";
import { camelCase } from "@/utils/pathToName";

export default class CodeGen implements Generator {
  public toURL(client: ClientInfo) {
    let { url } = client;
    const { parameters } = client;
    const inQueryParameters = isTypeLiteral(parameters) && parameters.members.filter((m) => m.in === "query");
    // TODO: parse url
    url = url.replaceAll("{", "${");
    const patchURL = inQueryParameters
      ? url +
        (inQueryParameters.length > 0
          ? "?" +
            inQueryParameters.map((m) => `${m.name}=\${encodeURIComponent(String(${camelCase(m.name)}))}`).join("&")
          : "")
      : url;
    return patchURL;
  }

  public toFormData(api: ClientInfo): string {
    const { parameters, body, metadata } = api;
    if (!metadata.useFormData) return "";
    if (body && isTypeLiteral(body)) {
      const formDataFields = body.members.filter((p) => p.in === "form-data");
      if (formDataFields.length === 0) {
        return "";
      }

      return [
        "const fd = new FormData()",
        ...formDataFields.map((f) => {
          // Deal with the multi-files upload
          if (isArrayType(f.type) && f.type.elementType === "File") {
            return `
              for (const file of ${f.name}) {
                fd.append('${f.name}[]', file, file.name);
              }
            `;
          }

          return `fd.append("${f.name}", ${f.format === "binary" || f.format === "string" ? f.name : `String(${camelCase(f.name)})`})`;
        }),
      ].join("\n");
    }

    if (parameters && isTypeLiteral(parameters)) {
      const formDataFields = parameters.members.filter((p) => p.in === "form-data");
      if (formDataFields.length === 0) {
        return "";
      }
      return [
        "const fd = new FormData()",
        ...formDataFields.map((f) => `fd.append("${f.name}", ${camelCase(f.name)})`),
      ].join("\n");
    }

    return "";
  }

  public toFunction(api: ClientInfo, client: ClientClass): string {
    const { name, parameters, body } = api;

    const fnName = name;

    /**
     * @example
     *
     * Output example
     * 1. { name, age }: { name: string; age: number }
     * 2. req: { name: string; age: number }
     * 3: blob: Blob
     * 4: ""
     *
     * @returns
     */
    const args = (): string => {
      if (!parameters && !body) return "";

      return [
        parameters ? `${this.toCode(parameters)}: ${this.toTypeDeclaration(parameters)}` : "",
        body ? `${this.toCode(body)} : ${this.toTypeDeclaration(body)}` : "",
      ]
        .filter(Boolean)
        .join(",");
    };

    const fn = () => {
      return [`export async function ${fnName}(${args()}) {`, client.fnBody(api), `}`].join("");
    };

    const code = [
      // For debug use
      `${fnName}.displayName = "${fnName}"`,
      fn(),
    ];

    return code.join("\n");
  }

  public comment(comments: MaybeTagItem[]): string {
    const strs = ["/**"];

    const maxLength = comments
      .map(({ tag, name }) => {
        return tag && name ? `@${tag} ${name}  `.length : 0;
      })
      .sort((a, b) => (a > b ? -1 : 0))[0];

    comments.forEach(({ tag, name, comment }) => {
      if (!tag || !name) {
        strs.push(` * ${comment}`);
      } else {
        const comment_ = `@${tag} ${name}`;
        const extraSpace = maxLength - comment_.length;
        strs.push(` * @${tag} ${name + Array(extraSpace).fill("").join(" ")} - ${comment}`);
      }
    });

    strs.push(" */");

    return strs.join("\n");
  }

  public toCode(type: ArrayType["elementType"]): string {
    if (!type) return "";
    if (typeof type === "string") {
      return type.toLowerCase();
    }

    if (isTypeParameter(type)) {
      return type.name.toLowerCase();
    }

    if (isTypeReference(type)) {
      return type.typeName.toLowerCase();
    }

    if (isUnionType(type) || isIntersectionType(type) || isArrayType(type)) {
      return "req";
    }

    const { members } = type;

    if (members.length === 0) {
      return "{}";
    }

    return [
      "{",
      ...members
        .map((t) => {
          const { initializer, name } = t;
          if (t.in === "cookie") return "";
          const safeName = camelCase(normalizeName(name));
          return initializer
            ? `"${name}": ${typeof initializer === "string" ? initializer : this.toCode(initializer)},`
            : `${safeName},`;
        })
        .filter(Boolean),
      "}",
    ]
      .filter(Boolean)
      .join("");
  }

  public toTypeDeclaration(type: ArrayType["elementType"], showComments = false): string {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (type == undefined) return "unknown";
    if (typeof type === "string" || typeof type === "number") {
      return type;
    }

    if (isTypeParameter(type)) {
      return type.name;
    }

    if (isTypeReference(type)) {
      return this.toTypeReferenceDeclaration(type);
    }

    if (isUnionType(type)) {
      return this.toUnionTypeDeclaration(type);
    }

    if (isIntersectionType(type)) {
      return this.toIntersectionTypeDeclaration(type);
    }

    if (isArrayType(type)) {
      return this.toArrayTypeDeclaration(type);
    }

    const { members } = type;

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!members || members.length === 0) {
      return "{}";
    }

    return [
      "{",
      members
        .map((t) => {
          if (t.in === "cookie") return "";
          return [
            showComments && t.description ? `/** @description ${t.description} */\n` : "",
            `"${camelCase(normalizeName(t.name))}"`,
            t.required === true || t.in === "header" ? "" : "?",
            ":",
            this.toTypeDeclaration(t.type),
            ";\n",
          ]
            .filter(Boolean)
            .join("");
        })
        .join(""),
      "}",
    ]
      .filter(Boolean)
      .join("");
  }

  public toTypeReferenceDeclaration(typeReference: TypeReference) {
    const { typeName, typeArguments } = typeReference;

    if (!typeArguments) {
      return typeName;
    }

    return `${typeName}<${typeArguments.map((t) => this.toTypeDeclaration(t)).join(" ,")}>`;
  }

  public toUnionTypeDeclaration(type: UnionType) {
    const { types, name } = type;
    if (name !== unionType) {
      return "";
    }

    return types.map((t) => this.toTypeDeclaration(t)).join("|");
  }

  public toIntersectionTypeDeclaration(type: IntersectionType) {
    const { types, name } = type;
    if (name !== intersectionType) {
      return "";
    }

    return types.map((t) => this.toTypeDeclaration(t)).join("&");
  }

  public toArrayTypeDeclaration(type: ArrayType) {
    const { elementType } = type;
    return `(${this.toTypeDeclaration(elementType)})[]`;
  }

  public toEnumDeclaration(type: Enum) {
    const { members } = type;
    return [
      "{",
      members.map((t) => {
        if (!t.type) {
          return t.name === "" ? `"" = ""` : t.name;
        } else {
          return `${normalizeName(t.name)} = "${t.type}"`;
        }
      }),
      "}",
    ].join("\n");
  }

  public typeDeclaration(typeAlias: TypeAlias, showComments = false): string {
    const { name, modifier = [], type } = typeAlias;
    return `${modifier.join(" ")} type ${name} = ${this.toTypeDeclaration(type!, showComments)}`;
  }

  public interfaceDeclaration(typeAlias: TypeAlias): string {
    const { name, modifier = [], type } = typeAlias;
    return `${modifier.join(" ")} interface ${name} ${this.toTypeDeclaration(type!)}`;
  }

  public enumDeclaration(enumAlias: Enum): string {
    const { name, modifier = [] } = enumAlias;
    return `${modifier.join(" ")} enum ${name} ${this.toEnumDeclaration(enumAlias)}`;
  }
}
