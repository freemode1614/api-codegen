import type { OpenAPI } from "openapi-types";
import { ExpressionStatement, FunctionDeclaration, NodeFlags, SyntaxKind, TypeAliasDeclaration } from "typescript";
import { factory as ts } from "typescript";

import Client from "@/providers/Client";
import { Enum } from "@/types/type";
import { formatCode } from "@/utils/formatCode";
import { sourceFileToCode } from "@/utils/sourceFileToCode";
import { writeToFile } from "@/utils/writetoFile";

export default abstract class Adaptor<D = OpenAPI.Document> {
  /**
   *
   * OpenAPI document object, JSON format.
   *
   */
  readonly doc: D;

  /**
   *
   * Client instance for different client, 'axios', 'fetch' or others
   *
   */
  readonly client: Client;
  readonly enums: Record<string, Enum>;

  /**
   *
   * Banner for generate file.
   *
   * @example
   *
   * Ouput:
   *
   *  USPTO Data Set API
   *  1.0.0
   *  The Data Set API (DSAPI) allows the public users to discover and search USPTO exported data sets. This is a generic API that allows USPTO users to make any CSV based data files searchable through API. With the help of GET call, it returns the list of data fields that are searchable. With the help of POST call, data can be fetched based on the filters on the field names. Please note that POST call is used to search the actual data. The reason for the POST call is that it allows users to specify any complex search criteria without worry about the GET size limitations as well as encoding of the input parameters.
   *
   */
  public banner(title: GetFromDoc<D>, version: GetFromDoc<D>, description: GetFromDoc<D>) {
    // return this.client.comment([
    //   //
    //   title(this.doc),
    //   version(this.doc),
    //   description(this.doc),
    // ]);
  }

  /**
   *
   * Get api definitions
   *
   */
  abstract apis(): (FunctionDeclaration | ExpressionStatement | TypeAliasDeclaration)[];

  /**
   *
   * Assemble all nodes
   *
   */
  // abstract assemble(): SourceFile;

  constructor(doc: D, client: Client) {
    this.doc = doc;
    this.client = client;
    this.enums = {};

    const statements = this.apis();

    const sourceFile = ts.createSourceFile(
      //
      statements,
      ts.createToken(SyntaxKind.EndOfFileToken),
      NodeFlags.None,
    );

    const code = sourceFileToCode(sourceFile);

    const w = async () => {
      const code_ = await formatCode(code);
      writeToFile("./output.ts", code_)
        .then(() => {
          //
        })
        .catch(() => {
          //
        });
    };

    w().catch((e: unknown) => {
      console.log("error", (e as Error).message);
    });
  }
}
