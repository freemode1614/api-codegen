# API CodeGen 项目改进方案

> 本文档记录对 `@moccona/apicodegen` 项目的 Code Review 发现及改进建议。

---

## 📋 项目架构概览

这是一个 OpenAPI 到 TypeScript 的代码生成工具 CLI，支持：
- OpenAPI 2.0/3.0/3.1 规范解析
- fetch/axios 双适配器
- Vite 插件集成
- TypeScript AST 直接生成代码

---

## ❌ 发现的问题

### 1. 🔴 严重：package.json exports 配置错误

**位置**: `package.json:17-20`

**问题代码**:
```json
"./*": {
  "types": "./npm/*/index.js",     // ❌ 错误：类型应该指向 .d.ts
  "import": "./npm/*/index.d.ts"   // ❌ 错误：import 应该指向 .js
}
```

**影响**: 这会导致 TypeScript 无法正确解析类型，用户安装后类型推断失效。

**修复方案**:
```json
"exports": {
  "./*": {
    "types": "./npm/*/index.d.ts",
    "import": "./npm/*/index.js",
    "require": "./npm/*/index.cjs"
  }
}
```

---

### 2. 🔴 严重：CLI 参数解析 Bug

**位置**: `src/cli.ts:11-17`

**问题代码**:
```typescript
cli
  .option("--output", "Where code generated", "./output.ts")  // ❌ 参数定义错误
```

**问题分析**: `commander` 的 `.option()` 方法签名是 `.option(flags, description, defaultValue)`，但当前代码第二个参数是描述，第三个参数是默认值，缺少 `<value>` 标记。

**修复方案**:
```typescript
cli
  .argument("<docURL>", "OpenAPI documentation URL")
  .option("-o, --output <path>", "Output file path", "./output.ts")
  .option("-a, --adaptor <type>", "HTTP client adaptor", "fetch")
  .option("-b, --baseURL <url>", "API base URL")
  .option("-v, --verbose", "Enable verbose logging", false)
  .option("--importClientSource <path>", "Custom client import path")
```

---

### 3. 🔴 严重：未使用的代码逻辑

**位置**: `src/core/generator/index.ts:327-340`

**问题代码**:
```typescript
if (parameter.ref) {
  t.createParameterDeclaration(
    undefined,
    undefined,
    t.createIdentifier(
      Base.camelCase(Base.normalize(Base.ref2name(parameter.ref))),
    ),
    undefined,
    t.createTypeReferenceNode(
      t.createIdentifier(
        Base.upperCamelCase(Base.normalize(Base.ref2name(parameter.ref))),
      ),
    ),
    undefined,
  );  // ❌ 结果没有被使用！没有 return 或 push
}
```

**影响**: 这段代码完全无效，参数引用（`$ref`）场景的处理存在 Bug。

**修复方案**:
```typescript
if (parameter.ref) {
  const refName = Base.ref2name(parameter.ref);
  return t.createParameterDeclaration(
    undefined,
    undefined,
    t.createIdentifier(Base.camelCase(Base.normalize(refName))),
    undefined,
    t.createTypeReferenceNode(
      t.createIdentifier(Base.upperCamelCase(Base.normalize(refName))),
    ),
    undefined,
  );
}
```

---

### 4. 🟠 逻辑错误：getMediaType 方法

**位置**: `src/core/base/Base.ts:184-191`

**问题代码**:
```typescript
static getMediaType(mediaType: string): MediaTypes | undefined {
  // eslint-disable-next-line @typescript-eslint/no-for-in-array
  for (const type in Object.values(MediaTypes)) {  // ❌ for...in 遍历数组索引
    if (new RegExp(type).test(mediaType)) {        // ❌ type 是 "0", "1", "2"...
      return type as MediaTypes;
    }
  }
  return;
}
```

**问题分析**: `for...in` 遍历数组会得到索引字符串而非值，导致类型判断逻辑完全错误。

**修复方案**:
```typescript
static getMediaType(mediaType: string): MediaTypes | undefined {
  const mediaTypeValues = Object.values(MediaTypes) as string[];
  const found = mediaTypeValues.find(type => 
    mediaType.includes(type)
  );
  return found as MediaTypes | undefined;
}
```

---

### 5. 🟠 架构问题：Adapter.client 方法参数过多

**位置**: `src/core/base/Adaptor.ts:55-64`

**问题代码**:
```typescript
abstract client(
  uri: string,
  method: string,
  parameters: ParameterObject[],
  requestBody: MediaTypeObject | undefined,
  response: MediaTypeObject | undefined,
  adapter: Adapter,           // ❌ 为什么要把自己传给自己？
  useFormData: boolean,
  useJSONResponse: boolean,
): Statement[];
```

**修复方案**:
```typescript
interface ClientOptions {
  uri: string;
  method: string;
  parameters: ParameterObject[];
  requestBody?: MediaTypeObject;
  response?: MediaTypeObject;
  useFormData: boolean;
  useJSONResponse: boolean;
}

abstract client(options: ClientOptions): Statement[];
```

---

### 6. 🟠 性能问题：O(n²) 的枚举去重算法

**位置**: `src/core/base/Base.ts:235-246`

**问题代码**:
```typescript
static uniqueEnums(enums: EnumSchemaObject[]) {
  const uniqueEnums_: EnumSchemaObject[] = [];
  for (const enumObject of enums) {
    if (uniqueEnums_.length === 0) {
      uniqueEnums_.push(enumObject);
    } else {
      if (!uniqueEnums_.some((a) => this.isSameEnum(a, enumObject))) {  // ❌ 嵌套循环 O(n²)
        uniqueEnums_.push(enumObject);
      }
    }
  }
  return uniqueEnums_;
}
```

**修复方案**:
```typescript
static uniqueEnums(enums: EnumSchemaObject[]): EnumSchemaObject[] {
  const seen = new Set<string>();
  return enums.filter(e => {
    const key = `${e.name}:${[...e.enum].sort().join(',')}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
```

---

### 7. 🟡 类型安全：过度使用 any 和类型断言

**位置**: 多处代码

**问题代码**:
```typescript
// src/openapi/V3.ts:187
schema = this.doc.components?.schemas?.[
  Base.ref2name(schema.$ref, this.doc)
] as OpenAPIV3.SchemaObject;  // ❌ 没有空值检查

// src/core/base/Base.ts:265
static isRef(schema: any): schema is ReferenceObject {  // ❌ any 类型
```

**修复方案**:
```typescript
// 使用 unknown 替代 any
static isRef(schema: unknown): schema is ReferenceObject {
  return typeof schema === 'object' 
    && schema !== null 
    && '$ref' in schema 
    && typeof (schema as Record<string, unknown>).$ref === 'string';
}

// 添加空值检查
private resolveSchemaRef(ref: string): OpenAPIV3.SchemaObject | undefined {
  const refName = Base.ref2name(ref, this.doc);
  const schema = this.doc.components?.schemas?.[refName];
  if (!schema) {
    throw new Error(`Schema reference not found: ${ref}`);
  }
  if (Base.isRef(schema)) {
    return this.resolveSchemaRef(schema.$ref);
  }
  return schema;
}
```

---

### 8. 🟡 异常处理：空 try-catch

**位置**: `src/core/base/Base.ts:166-176`

**问题代码**:
```typescript
try {
  const { body } = await request(url, {
    method: "GET",
    dispatcher: agent,
    ...requestInit,
  });
  return body.json() as T;
} catch (error) {
  throw error;  // ❌ 什么都没做，直接抛出
}
```

**修复方案**:
```typescript
static async fetchDoc<T = unknown>(
  url: string,
  requestInit: FetchDocRequestInit = {},
): Promise<T> {
  const agent = new Agent({
    connect: { rejectUnauthorized: false },
  });

  const { body, statusCode } = await request(url, {
    method: "GET",
    dispatcher: agent,
    ...requestInit,
  });

  if (statusCode >= 400) {
    throw new Error(`Failed to fetch ${url}: HTTP ${statusCode}`);
  }

  return body.json() as T;
}
```

---

### 9. 🟡 代码重复：大量重复的 reduce 代码

**位置**: `src/openapi/V3.ts:310-344`

**问题代码**:
```typescript
const schemas_ = Object.keys(schemas).reduce((acc, key) => {
  const schema = schemas[key];
  return { ...acc, [key]: this.getSchemaByRef(schema, false, enums, key) };
}, {});

const parameters_ = Object.keys(parameters).reduce((acc, key) => {
  const parameter = parameters[key];
  return { ...acc, [key]: this.getParameterByRef(parameter, enums, key) };
}, {});
// 几乎相同的逻辑重复 4 次
```

**修复方案**:
```typescript
private transformComponents<T, R>(
  components: Record<string, T>,
  transformer: (item: T, key: string) => R
): Record<string, R> {
  return Object.entries(components).reduce((acc, [key, value]) => ({
    ...acc,
    [key]: transformer(value, key)
  }), {});
}

// 使用
const schemas_ = this.transformComponents(
  components.schemas ?? {},
  (schema, key) => this.getSchemaByRef(schema, false, enums, key)
);
```

---

### 10. 🟢 可维护性：Generator.schemaToStatemets 函数过大

**位置**: `src/core/generator/index.ts`

**问题分析**: 该函数超过 700+ 行，违反单一职责原则，难以测试和维护。

**修复方案**:
```typescript
class Generator {
  static async genCode(
    schema: ProviderInitResult,
    initOptions: ProviderInitOptions,
    adaptor: Adapter,
  ) {
    const statements = [
      ...this.generateEnums(schema.enums),
      ...this.generateSchemas(schema.schemas, schema.enums),
      ...this.generateApis(schema.apis, adaptor, initOptions),
    ];

    let code = this.toCode(statements);
    // ...
  }

  private static generateEnums(enums: EnumSchemaObject[]): Statement[] {
    // 枚举生成逻辑
  }

  private static generateSchemas(
    schemas: Record<string, SchemaObject>,
    enums: EnumSchemaObject[]
  ): Statement[] {
    // Schema 生成逻辑
  }

  private static generateApis(
    apis: PathsObject,
    adaptor: Adapter,
    options: ProviderInitOptions
  ): Statement[] {
    // API 方法生成逻辑
  }
}
```

---

## 📊 优先级建议

| 优先级 | 问题 | 影响 | 估计工时 |
|--------|------|------|---------|
| 🔴 P0 | package.json exports 错误 | 用户无法使用类型 | 10min |
| 🔴 P0 | CLI 参数解析 Bug | 功能无法正常使用 | 20min |
| 🟠 P1 | 未使用的参数声明 | 运行时 Bug | 30min |
| 🟠 P1 | getMediaType 逻辑错误 | 媒体类型识别失败 | 15min |
| 🟡 P2 | 类型安全改进 | 开发体验、维护性 | 2h |
| 🟡 P2 | 性能优化 | 大规模文档处理 | 1h |
| 🟢 P3 | 代码重构 | 长期可维护性 | 4h |

---

## 🚀 长期架构建议

### 1. 引入插件系统

将 OpenAPI 解析器、代码生成器、适配器都做成插件，支持社区扩展：

```typescript
interface CodeGenPlugin {
  name: string;
  parse?(doc: unknown): ProviderInitResult;
  transform?(ast: SourceFile): SourceFile;
  generate?(result: ProviderInitResult): string;
}
```

### 2. 支持模板引擎

除了 AST 生成，支持 Handlebars/EJS 模板自定义输出格式：

```typescript
// codegen.config.ts
export default {
  template: './templates/api-client.hbs',
  helpers: {
    camelCase: (str: string) => /* ... */
  }
};
```

### 3. 增加校验层

在解析前对 OpenAPI 文档进行 JSON Schema 校验：

```typescript
import { validateOpenAPI } from '@apicodegen/validator';

const result = await validateOpenAPI(doc);
if (!result.valid) {
  console.error(result.errors);
  process.exit(1);
}
```

### 4. 支持增量生成

大型 API 文档只生成变更部分，提高性能：

```typescript
// 使用缓存和 diff 算法
const cache = await loadCache();
const changes = diff(cache.schemas, newSchemas);
await generateOnly(changes);
await updateCache();
```

### 5. 提供 Language Server

IDE 插件支持实时预览生成的代码：

```typescript
// VSCode 插件
import { createLanguageServer } from '@apicodegen/lsp';

const server = createLanguageServer({
  onHover: (doc, position) => {
    const generatedCode = previewGeneration(doc, position);
    return { contents: generatedCode };
  }
});
```

---

## ✅ 检查清单

实施改进时，请确保：

- [ ] 所有 P0/P1 问题已修复
- [ ] 单元测试通过
- [ ] 类型检查通过 (`tsc --noEmit`)
- [ ] ESLint 检查通过
- [ ] 在真实 OpenAPI 文档上验证
- [ ] 更新 CHANGELOG.md
- [ ] 更新版本号

---

## 📚 相关资源

- [OpenAPI Specification](https://swagger.io/specification/)
- [TypeScript Compiler API](https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API)
- [Commander.js Documentation](https://github.com/tj/commander.js/)
