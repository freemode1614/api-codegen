/**
 *    |1 | |   2  |  |     3       |
 * -> Omit<SomeType, "Key1" | "Key2">
 */
export interface GenericityTypeItem {
  /* 1 */
  type: string;
  typeArgs: [
    /* 2 */
    string | GenericityTypeItem | NormalTypeItems,
    /* 3 */
    ...string[],
  ];
}

/**
 *          string       GenericityTypeItem                        NormalTypeItems
 *            |            |                                         |
 *           \|/          \|/                                       \|/
 * -> { name: string; age: Omit<SomeType, "Key1" | "Key2">; address: { code: string; location: string } }
 */
export type NormalTypeItem = {
  // in: string;
  name: string;
  required?: boolean;
  deprecated?: boolean;
  type: string | GenericityTypeItem | NormalTypeItems;
};

export type NormalTypeItems = NormalTypeItem[];

export interface NormalType extends Omit<NormalTypeItem, "required"> {
  modifier?: string[];
}

export type MaybeType = NormalType;
