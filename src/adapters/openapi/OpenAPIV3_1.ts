/* eslint-disable unicorn/filename-case */
import { createScopedLogger } from "@moccona/logger";
import { OpenAPIV3_1 } from "openapi-types";

import Adaptor from "@/providers/Adaptor";
import Client from "@/providers/Client";
import { ClientInfo } from "@/types/client";
import { ArrayType, Enum, PropertySignature } from "@/types/type";
import format2type from "@/utils/format2type";
import isSameEnum from "@/utils/isSameEnum";
import pathToName, { capitalize } from "@/utils/pathToName";
import reference2name from "@/utils/reference2name";

const logger = createScopedLogger("OpenAPIV3_1");

export default class OpenApiV3_1 implements Adaptor {
  protected readonly doc: OpenAPIV3_1.Document;
  protected enums: Record<string, Enum> = {};
  private client: Client;

  constructor(doc: OpenAPIV3_1.Document, client: Client) {
    this.doc = doc;
    this.client = client;
  }

  public get banner() {
    const { info } = this.doc;
    const { version, title, description } = info;

    return this.client.comment([{ comment: version }, { comment: title }, { comment: description ?? "" }]);
  }

  public get schemas() {
    const { components } = this.doc;
    if (components?.schemas) {
      return components.schemas;
    }
    return {};
  }

  protected expandSchemaObject(
    schema: OpenAPIV3_1.ReferenceObject | OpenAPIV3_1.SchemaObject,
    parentName: string,
  ): ArrayType["elementType"] {
    if ("$ref" in schema) {
      return reference2name(schema.$ref);
    }

    const { type, format, items, properties, enum: enum_, oneOf, anyOf, allOf } = schema;

    if (items) {
      return {
        elementType: this.expandSchemaObject(items, parentName),
      };
    }

    if (oneOf || anyOf || allOf) {
      const types = (oneOf ?? anyOf ?? allOf)!.map((s) => this.expandSchemaObject(s, parentName));
      return {
        types,
        type: oneOf || anyOf ? "union" : "intersection",
      };
    }

    if (enum_) {
      const enumName = capitalize(parentName);
      if (!this.enums[enumName]) {
        this.enums[enumName] = {
          name: enumName,
          members: enum_.map((value) => ({
            name: String(value),
            type: typeof value,
          })),
        };
      }
      return enumName;
    }

    if (type === "object" && properties) {
      return {
        members: Object.entries(properties).map(
          ([key, prop]): PropertySignature => ({
            name: key,
            type: this.expandSchemaObject(prop, key),
          }),
        ),
      };
    }

    return format ? format2type(format) : format2type(type as string);
  }

  protected analyzeApis() {
    const { paths, webhooks } = this.doc;
    const apis: ClientInfo[] = [];

    // Process regular paths
    if (paths) {
      Object.entries(paths).forEach(([path, pathItem]) => {
        if (!pathItem) return;

        Object.entries(pathItem).forEach(([method, operation]) => {
          if (!operation || method === "parameters") return;

          const { operationId, summary, description, tags = [] } = operation;

          apis.push({
            comments: [
              summary && { comment: summary },
              description && { comment: description },
              tags.length > 0 && { tag: "tag", comment: tags.join(", ") },
            ].filter(Boolean),
            method,
            url: path,
            name: pathToName(path, method, operationId),
          });
        });
      });
    }

    // Process webhooks (new in 3.1)
    if (webhooks) {
      Object.entries(webhooks).forEach(([name, webhook]) => {
        if (!webhook || "$ref" in webhook) return;

        Object.entries(webhook).forEach(([method, operation]) => {
          if (!operation || method === "parameters") return;

          const { operationId, summary, description, tags = [] } = operation;

          apis.push({
            comments: [
              summary && { comment: summary },
              description && { comment: description },
              tags.length > 0 && { tag: "tag", comment: tags.join(", ") },
              { tag: "webhook", comment: name },
            ].filter(Boolean),
            method,
            url: name,
            name: pathToName(name, method, operationId),
          });
        });
      });
    }

    return apis;
  }

  public parse(): string {
    const apis = this.analyzeApis();
    logger.debug("Analyzed APIs:", apis);

    return [
      this.banner,
      Object.keys(this.enums)
        .map((enumName) => this.client.enumDeclaration(this.enums[enumName]))
        .join("\n\n"),
      "\n\n",
      Object.keys(this.schemas)
        .map((typeName) =>
          this.client.typeDeclaration({
            name: typeName,
            modifier: ["export"],
            type: this.expandSchemaObject(this.schemas[typeName], typeName),
          }),
        )
        .join(";\n\n"),
      "\n\n",
      this.client.templates(apis),
    ].join("\n");
  }
}
