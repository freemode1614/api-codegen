export type DateTime = string;
export type Offset = {
  id: string;
  rules: Rules;
};
export type OffsetTransition = {
  dateTime: string;
  offsetAfter: Offset;
  offsetBefore: Offset;
};
export type Rules = {
  transitions: {
    dateTime: string;
    offsetAfter: Offset;
    offsetBefore: Offset;
  }[];
};
export type SalesLine = {
  stock: ProductStock;
};
export type ProductStock = {
  test_param: {
    stock: ProductStock;
  }[];
};
export async function anythingUsingGet() {
  return fetch(`/anything`, {
    method: "GET",
    body: req,
  }).then(
    async (response) =>
      (await response.json()) as {
        dateTime: string;
        offsetAfter: Offset;
        offsetBefore: Unknown;
      }
  );
}
export async function anythingUsingPut({
  content,
}: {
  content?: {
    stock: ProductStock;
  }[];
}) {
  return fetch(`/anything`, {
    method: "PUT",
    headers: { content: encodeURIComponent(String(content)) },
    body: req,
  }).then(
    async (response) =>
      (await response.json()) as {
        stock: ProductStock;
      }[]
  );
}
export async function anythingUsingPost() {
  return fetch(`/anything`, {
    method: "POST",
    body: JSON.stringify(req),
  });
}
