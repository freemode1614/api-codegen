import Client from "@/providers/Client";
import type { ClientInfo } from "@/types/client";
import type { MaybeTagItem } from "@/types/tag";
import type { Enum, TypeAlias } from "@/types/type";

/**
 * Abstract base class for generating code.
 */
export default abstract class Generator {
  /**
   * Generates a comment string from an array of MaybeTagItem objects.
   * @param comments - The array of MaybeTagItem objects to generate the comment from.
   * @returns The generated comment string.
   */
  abstract comment(comments: MaybeTagItem[]): string;

  /**
   * Generates a type declaration string for a given TypeAlias.
   * @param typeAlias - The TypeAlias object to generate the type declaration for.
   * @returns The generated type declaration string.
   */
  abstract typeDeclaration(typeAlias: TypeAlias, showComments: boolean): string;

  /**
   * Generates an interface declaration string for a given TypeAlias.
   * @param typeAlias - The TypeAlias object to generate the interface declaration for.
   * @returns The generated interface declaration string.
   */
  abstract interfaceDeclaration(typeAlias: TypeAlias): string;

  /**
   * Generates an enum declaration string for a given Enum.
   * @param enumAlias - The Enum object to generate the enum declaration for.
   * @returns The generated enum declaration string.
   */
  abstract enumDeclaration(enumAlias: Enum): string;

  /**
   * Converts ClientInfo into a URL string.
   * @param api - The ClientInfo object containing API endpoint information.
   * @returns A URL string representing the API endpoint.
   */
  abstract toURL(api: ClientInfo): string;

  /**
   * Converts ClientInfo into a function string representation.
   * @param api - The ClientInfo object containing API endpoint information.
   * @returns A string representing the API endpoint as a function.
   */
  abstract toFunction(api: ClientInfo, client: Client): string;
}
