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
