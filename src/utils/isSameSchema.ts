import type { OpenAPIV3 } from "openapi-types";

export default function isSameSchema(schemaA: OpenAPIV3.SchemaObject, schemaB: OpenAPIV3.SchemaObject) {
  if (schemaA === schemaB) {
    return true;
  }

  const { properties: propsA } = schemaA;
  const { properties: propsB } = schemaB;

  if ((!propsA && propsB) || (propsA && !propsB) || (!propsA && !propsB)) {
    return false;
  }

  const keysA = Object.keys(propsA!);
  const keysB = Object.keys(propsB!);

  if (keysA.length !== keysB.length) {
    return false;
  }
}
