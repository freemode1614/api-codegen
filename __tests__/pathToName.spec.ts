import { expect, test } from "vitest";

import pathToName, { camelCase, upperCamelCase } from "@/utils/pathToName";

test("path name correct", () => {
  const names = [
    ["/artwork", "artwork", "Artwork"],
    ["/artwork/{id}/files", "artworkIdFiles", "ArtworkIdFiles"],
    ["/token/logout", "tokenLogout", "TokenLogout"],
    ["tokenlogout", "tokenlogout", "Tokenlogout"],
    ["/anything/image-png", "anythingImagePng", "AnythingImagePng"],
    [
      "/anything/nested-one-of-object-with-nested-one-of",
      "anythingNestedOneOfObjectWithNestedOneOf",
      "AnythingNestedOneOfObjectWithNestedOneOf",
    ],
  ];

  names.forEach((g) => {
    expect(pathToName(g[0])).toEqual(g[1]);
  });

  names.forEach((g) => {
    expect(pathToName(g[0], "get")).toEqual(g[1] + "UsingGet");
  });

  names.forEach((g) => {
    expect(camelCase(g[0])).toEqual(g[1]);
  });

  names.forEach((g) => {
    expect(upperCamelCase(g[0])).toEqual(g[2]);
  });
});
