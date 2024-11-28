import Base from "./Base";

export default class FormData implements Base {
  #formDataFields: string[] = [];

  public from(formData: string[]) {
    this.#formDataFields = formData;
    return this;
  }

  #toString() {
    const literal = ["const fd = new FormData();"];
    this.#formDataFields.forEach((field) => {
      literal.push(`fd.append("${field}", ${field});`);
    });

    return literal.join("\n");
  }

  public to(): string {
    return this.#toString();
  }
}
