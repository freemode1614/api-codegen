import Client from "@/client/Client";

export default class AxiosClient extends Client {
  static #clientName = "axiosInstance"
  /**
   * Create axios instance for each client file.
   */
  static createAxiosInstance() {
    return `export const ${this.#clientName} = axios.create({})`;
  }
}
