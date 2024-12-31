import Generator from "@/providers/Generator";
import type { ClientInfo } from "@/types/client";

export default abstract class Client extends Generator {
  abstract templates(apis: ClientInfo[]): string;
  abstract fnBody(apis: ClientInfo): string;
}
