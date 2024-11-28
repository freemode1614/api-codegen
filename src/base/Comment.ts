import Base from "@/base/Base";

interface TagItem {
  tag?: string;
  name?: string;
  comment: string;
}

interface TagItemOnlyComment {
  tag: never;
  name: never;
  comment: string;
}

type MaybeTagItem = TagItem | TagItemOnlyComment;

export default class Comment implements Base {
  #comments: MaybeTagItem[] = [];

  from(tags: MaybeTagItem[]): Base {
    this.#comments = tags;
    return this;
  }

  add(tag: MaybeTagItem) {
    this.#comments.push(tag);
  }

  #toString() {
    const strs = ["/**"];

    this.#comments.forEach(({ tag, name, comment }) => {
      if (!tag || !name) {
        strs.push(` * ${comment}`);
      } else {
        strs.push(` * @${tag} ${name} - ${comment}`);
      }
    });

    strs.push(" */");

    return strs.join("\n");
  }

  to(): string {
    return this.#toString();
  }
}
