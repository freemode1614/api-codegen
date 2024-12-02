import Base from "./Base";

export default class FormData implements Base {
  #formDataFields: string[] = [];

  protected constructor(formData: string[]) {
    this.#formDataFields = formData;
  }

  static of(formData: string[]) {
    return new FormData(formData);
  }

  #toString() {
    const literal = ["const fd = new FormData();"];
    this.#formDataFields.forEach((field) => {
      literal.push(`fd.append("${field}", ${field});`);
    });

    return literal.join("\n");
  }

  public to() {
    return this.#toString();
  }
}
