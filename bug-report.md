# 代码生成问题分析

## 问题 1：`$ref` 引用时丢失 format 信息

**位置：** `src/openapi/V3.ts` 第 312-318 行

**描述：** 当 OpenAPI schema 中的 property 使用 `$ref` 引用时，只提取了 `type`（类名），丢失了 `format` 等原始信息。

**代码：**
```typescript
[p]: Base.isRef(propSchema)
  ? {
      type: Base.capitalize(Base.ref2name(propSchema.$ref, this.doc)),
    }
  : this.toBaseSchema(propSchema, enums, p, upLevelSchemaKey),
```

**影响：** 当 `$ref` 引用的 schema 实际是 binary 类型（如 `format: 'binary'`），但因为只提取了类名作为 `type`，导致下游的 `isBinarySchema()` 无法正确判断，从而错误地给 `Blob` 类型套上 `String()`。

**示例：** `schema-circular.json` 中的 `FormDataBodyPart` 被 `$ref` 引用，它实际上是个 object 类型，但因为引用链丢失了格式信息。

---

## 问题 2：`String(req["array"])` 和 `String(req["object"])` 是否正确？

**位置：** `__tests__/apis/schema-encoding-style.ts`

```typescript
req["array"] && fd.append("array", String(req["array"]));
fd.append("object", String(req["object"]));
```

**分析：**
- `array` 类型是 `string[]`，`String([])` 返回空字符串 `""`，这可能是错误的
- `object` 类型是 `{ foo: string; bar: string }`，`String({...})` 返回 `"[object Object]"`，这几乎肯定是错误的

**OpenAPI 文档定义：**
```json
{
  "array": { "type": "array", "items": { "type": "string" } },
  "object": { "type": "object", "properties": { "foo": {...}, "bar": {...} } }
}
```

**根本原因：** 代码对非 `string` 类型的属性统一套 `String()`，但 array/object 类型应该用 `JSON.stringify()` 或其他方式序列化，而不是 `String()`。

---

## 总结

| 问题 | 类型 | 说明 |
|------|------|------|
| `$ref` 丢失 format | 待确认修复方案 | 需要在解析时保留原始 format 信息 |
| array/object 被 String() | Bug | 应该用 JSON.stringify() 而非 String() |
| FormDataBodyPart 被 String() | 文档定义问题 | 该 schema 本身定义不明确 |

---

## 建议

1. 对于 `$ref` 引用，可以考虑在解析时递归展开 `$ref` 以获取完整的 schema 信息
2. 对于 array/object 类型的 FormData 序列化，应该使用 `JSON.stringify()` 而非 `String()`
3. 检查其他 `String(req[...])` 调用，确认是否所有非 string 类型都不应该被 String() 包装