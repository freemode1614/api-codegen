import type { MaybeTagItem } from "@/types/tag";
import type { Enum, TypeAlias } from "@/types/type";

export default abstract class Generator {
  abstract comment(comments: MaybeTagItem[]): string;
  abstract typeDeclaration(typeAlias: TypeAlias): string;
  abstract interfaceDeclaration(typeAlias: TypeAlias): string;
  abstract enumDeclaration(enumAlias: Enum): string;
}
