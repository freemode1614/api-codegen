export type BaseError = {
  error?: string;
  message?: string;
  suggestion?: string;
  docs?: string;
  help?: string;
  poem?: string[];
};
export type Apply = {
  name: string;
  email: string;
  job: string;
  pronouns?: string;
  linkedin?: string;
  github?: string;
  coverLetter?: string;
  dontReallyApply?: boolean;
};
export type Category = {
  title?: string;
  type?: string;
};
export type Changelog = {
  title: string;
  type?: string;
  body: string;
  hidden?: boolean;
};
export type CondensedProjectData = {
  name?: string;
  subdomain?: string;
  jwtSecret?: string;
  baseUrl?: string;
  plan?: string;
};
export type CustomPage = {
  title: string;
  body?: string;
  html?: string;
  htmlmode?: boolean;
  hidden?: boolean;
};
export type DocSchemaPost = {
  title?: string;
  type?: string;
  body?: string;
  category?: string;
  hidden?: boolean;
  order?: number;
  parentDoc?: string;
  error?: {
    code?: string;
  };
  categorySlug?: string;
  parentDocSlug?: string;
};
export type DocSchemaPut = {
  title?: string;
  type?: string;
  body?: string;
  category?: string;
  hidden?: boolean;
  order?: number;
  parentDoc?: string;
  error?: {
    code?: string;
  };
  categorySlug?: string;
  parentDocSlug?: string;
};
export type DocSchemaResponse = {
  title?: string;
  type?: string;
  body?: string;
  category?: string;
  hidden?: boolean;
  order?: number;
  parentDoc?: string;
  error?: {
    code?: string;
  };
};
export type Version = {
  version: string;
  codename?: string;
  from_: string;
  is_stable?: boolean;
  is_beta?: boolean;
  is_hidden?: boolean;
  is_deprecated?: boolean;
};
export type JobOpening = {
  slug?: string;
  title?: string;
  description?: string;
  pullquote?: string;
  location?: string;
  department?: string;
  url?: string;
};
export type ErrorAPIKEYEMPTY = BaseError & {
  error?: string;
};
export type ErrorAPIKEYMISMATCH = BaseError & {
  error?: string;
};
export type ErrorAPIKEYNOTFOUND = BaseError & {
  error?: string;
};
export type ErrorAPPLYINVALIDEMAIL = BaseError & {
  error?: string;
};
export type ErrorAPPLYINVALIDJOB = BaseError & {
  error?: string;
};
export type ErrorAPPLYINVALIDNAME = BaseError & {
  error?: string;
};
export type ErrorCATEGORYINVALID = BaseError & {
  error?: string;
};
export type ErrorCATEGORYNOTFOUND = BaseError & {
  error?: string;
};
export type ErrorCHANGELOGINVALID = BaseError & {
  error?: string;
};
export type ErrorCHANGELOGNOTFOUND = BaseError & {
  error?: string;
};
export type ErrorCUSTOMPAGEINVALID = BaseError & {
  error?: string;
};
export type ErrorCUSTOMPAGENOTFOUND = BaseError & {
  error?: string;
};
export type ErrorDOCINVALID = BaseError & {
  error?: string;
};
export type ErrorDOCNOTFOUND = BaseError & {
  error?: string;
};
export type ErrorENDPOINTNOTFOUND = BaseError & {
  error?: string;
};
export type ErrorINTERNALERROR = BaseError & {
  error?: string;
};
export type ErrorPROJECTNEEDSSTAGING = BaseError & {
  error?: string;
};
export type ErrorPROJECTNOTFOUND = BaseError & {
  error?: string;
};
export type ErrorRATELIMITED = BaseError & {
  error?: string;
};
export type ErrorREGISTRYINVALID = BaseError & {
  error?: string;
};
export type ErrorREGISTRYNOTFOUND = BaseError & {
  error?: string;
};
export type ErrorSPECFILEEMPTY = BaseError & {
  error?: string;
};
export type ErrorSPECIDDUPLICATE = BaseError & {
  error?: string;
};
export type ErrorSPECIDINVALID = BaseError & {
  error?: string;
};
export type ErrorSPECINVALID = BaseError & {
  error?: string;
};
export type ErrorSPECINVALIDSCHEMA = BaseError & {
  error?: string;
};
export type ErrorSPECNOTFOUND = BaseError & {
  error?: string;
};
export type ErrorSPECTIMEOUT = BaseError & {
  error?: string;
};
export type ErrorSPECVERSIONNOTFOUND = BaseError & {
  error?: string;
};
export type ErrorUNEXPECTEDERROR = BaseError & {
  error?: string;
};
export type ErrorVERSIONCANTDEMOTESTABLE = BaseError & {
  error?: string;
};
export type ErrorVERSIONCANTREMOVESTABLE = BaseError & {
  error?: string;
};
export type ErrorVERSIONDUPLICATE = BaseError & {
  error?: string;
};
export type ErrorVERSIONEMPTY = BaseError & {
  error?: string;
};
export type ErrorVERSIONFORKEMPTY = BaseError & {
  error?: string;
};
export type ErrorVERSIONFORKNOTFOUND = BaseError & {
  error?: string;
};
export type ErrorVERSIONINVALID = BaseError & {
  error?: string;
};
export type ErrorVERSIONNOTFOUND = BaseError & {
  error?: string;
};
/*Get an API definition file that's been uploaded to ReadMe.*/
export async function getAPIRegistryUsingGet({ uuid }: { uuid: string }) {
  return fetch(`/api-registry/${uuid}`, {
    method: "GET",
  });
}
/*Get API specification metadata.*/
export async function getAPISpecificationUsingGet({
  perPage,
  page,
  xReadmeVersion,
}: {
  perPage?: number;
  page?: number;
  xReadmeVersion?: string;
}) {
  return fetch(`/api-specification?perPage=${perPage}page=${page}`, {
    method: "GET",
    headers: { "x-readme-version": encodeURIComponent(String(xReadmeVersion)) },
  });
}
/*Upload an API specification to ReadMe. Or, to use a newer solution see https://docs.readme.com/main/docs/rdme.*/
export async function uploadAPISpecificationUsingPost(
  {
    xReadmeVersion,
  }: {
    xReadmeVersion?: string;
  },
  req: {
    spec: File;
  },
) {
  const fd = new FormData();
  req.spec && fd.append("spec", req.spec);
  return fetch(`/api-specification`, {
    method: "POST",
    headers: { "x-readme-version": encodeURIComponent(String(xReadmeVersion)) },
    body: fd,
  });
}
/*Update an API specification in ReadMe.*/
export async function updateAPISpecificationUsingPut(
  {
    id,
  }: {
    id: string;
  },
  req: {
    spec: File;
  },
) {
  const fd = new FormData();
  req.spec && fd.append("spec", req.spec);
  return fetch(`/api-specification/${id}`, {
    method: "PUT",
    body: fd,
  });
}
/*Delete an API specification in ReadMe.*/
export async function deleteAPISpecificationUsingDelete({
  id,
}: {
  id: string;
}) {
  return fetch(`/api-specification/${id}`, {
    method: "DELETE",
  });
}
/*Returns all the roles we're hiring for at ReadMe!*/
export async function getOpenRolesUsingGet() {
  return fetch(`/apply`, {
    method: "GET",
  });
}
/*This endpoint will let you apply to a job at ReadMe programatically, without having to go through our UI!*/
export async function applyToReadMeUsingPost(req: Apply) {
  return fetch(`/apply`, {
    method: "POST",
    body: JSON.stringify(req),
  }).then(async (response) => (await response.json()) as unknown);
}
/*Returns all the categories for a specified version.*/
export async function getCategoriesUsingGet({
  xReadmeVersion,
  perPage,
  page,
}: {
  xReadmeVersion?: string;
  perPage?: number;
  page?: number;
}) {
  return fetch(`/categories?perPage=${perPage}page=${page}`, {
    method: "GET",
    headers: { "x-readme-version": encodeURIComponent(String(xReadmeVersion)) },
  });
}
/*Create a new category inside of this project.*/
export async function createCategoryUsingPost(
  {
    xReadmeVersion,
  }: {
    xReadmeVersion?: string;
  },
  req: Category & unknown,
) {
  return fetch(`/categories`, {
    method: "POST",
    headers: { "x-readme-version": encodeURIComponent(String(xReadmeVersion)) },
    body: JSON.stringify(req),
  }).then(async (response) => (await response.json()) as unknown);
}
/*Returns the category with this slug.*/
export async function getCategoryUsingGet({
  slug,
  xReadmeVersion,
}: {
  slug: string;
  xReadmeVersion?: string;
}) {
  return fetch(`/categories/${slug}`, {
    method: "GET",
    headers: { "x-readme-version": encodeURIComponent(String(xReadmeVersion)) },
  });
}
/*Change the properties of a category.*/
export async function updateCategoryUsingPut(
  {
    slug,
    xReadmeVersion,
  }: {
    slug: string;
    xReadmeVersion?: string;
  },
  req: Category,
) {
  return fetch(`/categories/${slug}`, {
    method: "PUT",
    headers: { "x-readme-version": encodeURIComponent(String(xReadmeVersion)) },
    body: JSON.stringify(req),
  }).then(async (response) => (await response.json()) as unknown);
}
/*Delete the category with this slug.
>⚠️Heads Up!
> This will also delete all of the docs within this category.*/
export async function deleteCategoryUsingDelete({
  slug,
  xReadmeVersion,
}: {
  slug: string;
  xReadmeVersion?: string;
}) {
  return fetch(`/categories/${slug}`, {
    method: "DELETE",
    headers: { "x-readme-version": encodeURIComponent(String(xReadmeVersion)) },
  });
}
/*Returns the docs and children docs within this category.*/
export async function getCategoryDocsUsingGet({
  slug,
  xReadmeVersion,
}: {
  slug: string;
  xReadmeVersion?: string;
}) {
  return fetch(`/categories/${slug}/docs`, {
    method: "GET",
    headers: { "x-readme-version": encodeURIComponent(String(xReadmeVersion)) },
  });
}
/*Returns a list of changelogs.*/
export async function getChangelogsUsingGet({
  perPage,
  page,
}: {
  perPage?: number;
  page?: number;
}) {
  return fetch(`/changelogs?perPage=${perPage}page=${page}`, {
    method: "GET",
  });
}
/*Create a new changelog entry.*/
export async function createChangelogUsingPost(req: Changelog) {
  return fetch(`/changelogs`, {
    method: "POST",
    body: JSON.stringify(req),
  }).then(async (response) => (await response.json()) as unknown);
}
/*Returns the changelog with this slug.*/
export async function getChangelogUsingGet({ slug }: { slug: string }) {
  return fetch(`/changelogs/${slug}`, {
    method: "GET",
  });
}
/*Update a changelog with this slug.*/
export async function updateChangelogUsingPut(
  {
    slug,
  }: {
    slug: string;
  },
  req: Changelog,
) {
  return fetch(`/changelogs/${slug}`, {
    method: "PUT",
    body: JSON.stringify(req),
  }).then(async (response) => (await response.json()) as unknown);
}
/*Delete the changelog with this slug.*/
export async function deleteChangelogUsingDelete({ slug }: { slug: string }) {
  return fetch(`/changelogs/${slug}`, {
    method: "DELETE",
  });
}
/*Returns a list of custom pages.*/
export async function getCustomPagesUsingGet({
  perPage,
  page,
}: {
  perPage?: number;
  page?: number;
}) {
  return fetch(`/custompages?perPage=${perPage}page=${page}`, {
    method: "GET",
  });
}
/*Create a new custom page inside of this project.*/
export async function createCustomPageUsingPost(req: CustomPage) {
  return fetch(`/custompages`, {
    method: "POST",
    body: JSON.stringify(req),
  }).then(async (response) => (await response.json()) as unknown);
}
/*Returns the custom page with this slug.*/
export async function getCustomPageUsingGet({ slug }: { slug: string }) {
  return fetch(`/custompages/${slug}`, {
    method: "GET",
  });
}
/*Update a custom page with this slug.*/
export async function updateCustomPageUsingPut(
  {
    slug,
  }: {
    slug: string;
  },
  req: CustomPage,
) {
  return fetch(`/custompages/${slug}`, {
    method: "PUT",
    body: JSON.stringify(req),
  }).then(async (response) => (await response.json()) as unknown);
}
/*Delete the custom page with this slug.*/
export async function deleteCustomPageUsingDelete({ slug }: { slug: string }) {
  return fetch(`/custompages/${slug}`, {
    method: "DELETE",
  });
}
/*Returns the doc with this slug.*/
export async function getDocUsingGet({
  slug,
  xReadmeVersion,
}: {
  slug: string;
  xReadmeVersion?: string;
}) {
  return fetch(`/docs/${slug}`, {
    method: "GET",
    headers: { "x-readme-version": encodeURIComponent(String(xReadmeVersion)) },
  });
}
/*Update a doc with this slug.*/
export async function updateDocUsingPut(
  {
    slug,
    xReadmeVersion,
  }: {
    slug: string;
    xReadmeVersion?: string;
  },
  req: DocSchemaPut,
) {
  return fetch(`/docs/${slug}`, {
    method: "PUT",
    headers: { "x-readme-version": encodeURIComponent(String(xReadmeVersion)) },
    body: JSON.stringify(req),
  }).then(
    async (response) =>
      (await response.json()) as {
        title?: string;
        type?: string;
        body?: string;
        category?: string;
        hidden?: boolean;
        order?: number;
        parentDoc?: string;
        error?: {
          code?: string;
        };
      },
  );
}
/*Delete the doc with this slug.*/
export async function deleteDocUsingDelete({
  slug,
  xReadmeVersion,
}: {
  slug: string;
  xReadmeVersion?: string;
}) {
  return fetch(`/docs/${slug}`, {
    method: "DELETE",
    headers: { "x-readme-version": encodeURIComponent(String(xReadmeVersion)) },
  });
}
/*This is intended for use by enterprise users with staging enabled. This endpoint will return the live version of your document, whereas the standard endpoint will always return staging.*/
export async function getProductionDocUsingGet({
  slug,
  xReadmeVersion,
}: {
  slug: string;
  xReadmeVersion?: string;
}) {
  return fetch(`/docs/${slug}/production`, {
    method: "GET",
    headers: { "x-readme-version": encodeURIComponent(String(xReadmeVersion)) },
  });
}
/*Create a new doc inside of this project.*/
export async function createDocUsingPost(
  {
    xReadmeVersion,
  }: {
    xReadmeVersion?: string;
  },
  req: DocSchemaPost,
) {
  return fetch(`/docs`, {
    method: "POST",
    headers: { "x-readme-version": encodeURIComponent(String(xReadmeVersion)) },
    body: JSON.stringify(req),
  }).then(
    async (response) =>
      (await response.json()) as {
        title?: string;
        type?: string;
        body?: string;
        category?: string;
        hidden?: boolean;
        order?: number;
        parentDoc?: string;
        error?: {
          code?: string;
        };
      },
  );
}
/*Returns all docs that match the search.*/
export async function searchDocsUsingPost({
  search,
  xReadmeVersion,
}: {
  search: string;
  xReadmeVersion?: string;
}) {
  return fetch(`/docs/search?search=${search}`, {
    method: "POST",
    headers: { "x-readme-version": encodeURIComponent(String(xReadmeVersion)) },
  });
}
/*Returns project data for the API key.*/
export async function getProjectUsingGet() {
  return fetch(`/`, {
    method: "GET",
  });
}
/*Returns a copy of our OpenAPI Definition.*/
export async function getAPISchemaUsingGet() {
  return fetch(`/schema`, {
    method: "GET",
  });
}
/*Retrieve a list of versions associated with a project API key.*/
export async function getVersionsUsingGet() {
  return fetch(`/version`, {
    method: "GET",
  });
}
/*Create a new version.*/
export async function createVersionUsingPost(req: Version) {
  return fetch(`/version`, {
    method: "POST",
    body: JSON.stringify(req),
  }).then(async (response) => (await response.json()) as unknown);
}
/*Returns the version with this version ID.*/
export async function getVersionUsingGet({ versionId }: { versionId: string }) {
  return fetch(`/version/${versionId}`, {
    method: "GET",
  });
}
/*Update an existing version.*/
export async function updateVersionUsingPut(
  {
    versionId,
  }: {
    versionId: string;
  },
  req: Version,
) {
  return fetch(`/version/${versionId}`, {
    method: "PUT",
    body: JSON.stringify(req),
  }).then(async (response) => (await response.json()) as unknown);
}
/*Delete a version*/
export async function deleteVersionUsingDelete({
  versionId,
}: {
  versionId: string;
}) {
  return fetch(`/version/${versionId}`, {
    method: "DELETE",
  });
}
