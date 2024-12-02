import Base from "./Base";

export interface TagItem {
  tag?: string;
  name?: string;
  comment: string;
}

export interface TagItemOnlyComment {
  tag: never;
  name: never;
  comment: string;
}

export type MaybeTagItem = TagItem | TagItemOnlyComment;

export default class Comment implements Base {
  #comments: MaybeTagItem[] = [];

  protected constructor(tags: MaybeTagItem[]) {
    this.#comments = tags;
  }

  static of(tags: MaybeTagItem[]) {
    return new Comment(tags);
  }

  add(tag: MaybeTagItem): this {
    this.#comments.push(tag);
    return this;
  }

  #toString() {
    const strs = ["/**"];

    const maxLength = this.#comments
      .map(({ tag, name }) => {
        return tag && name ? `@${tag} ${name}  `.length : 0;
      })
      .sort((a, b) => (a > b ? -1 : 0))[0];

    this.#comments.forEach(({ tag, name, comment }) => {
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

  to() {
    return this.#toString();
  }
}
