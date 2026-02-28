# Fix 03: 修复未使用的参数声明

## 问题描述

**优先级**: P1  
**位置**: `src/core/generator/index.ts:327-340`  
**类型**: 逻辑 Bug

### 问题代码

```typescript
static toDeclarationNode(
  parameters: ParameterObject[],
): ParameterDeclaration {
  const objectElements: BindingElement[] = [];
  const typeObjectElements: PropertySignature[] = [];

  for (const parameter of parameters) {
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
      );  // ❌ 严重问题：创建的结果没有被使用！
    } else {
      // ... 正常处理逻辑
    }
  }
  // ...
}
```

### 问题分析

当参数包含 `$ref` 引用（如 `#/components/parameters/PageSize`）时：
1. 代码创建了一个独立的参数声明
2. 但结果没有被 `return` 或添加到任何数组中
3. 这导致引用类型的参数完全被忽略

正确的行为应该是：
- 将引用参数作为解构模式的独立参数添加
- 或者展开到对象解构模式中

## 修复方案

### 方案选择

由于这是一个生成函数参数列表的方法，我们需要处理混合场景：
- 部分参数是普通参数（解构到对象中）
- 部分参数是引用类型（作为独立参数）

**采用方案**: 生成多个参数声明，返回数组

### 修改 src/core/generator/index.ts

```typescript
static toDeclarationNodes(
  parameters: ParameterObject[],
): ParameterDeclaration[] {
  const objectElements: BindingElement[] = [];
  const typeObjectElements: PropertySignature[] = [];
  const refParameters: ParameterDeclaration[] = [];

  for (const parameter of parameters) {
    if (parameter.ref) {
      // ✅ 修复：正确处理引用参数，作为独立参数
      const refName = Base.ref2name(parameter.ref);
      refParameters.push(
        t.createParameterDeclaration(
          undefined,
          undefined,
          t.createIdentifier(Base.camelCase(Base.normalize(refName))),
          undefined,
          t.createTypeReferenceNode(
            t.createIdentifier(Base.upperCamelCase(Base.normalize(refName))),
          ),
          undefined,
        ),
      );
    } else {
      const { name, schema, required } = parameter;
      objectElements.push(
        t.createBindingElement(
          undefined,
          undefined,
          t.createIdentifier(Base.camelCase(Base.normalize(name))),
        ),
      );

      typeObjectElements.push(
        t.createPropertySignature(
          [],
          t.createIdentifier(Base.camelCase(Base.normalize(name))),
          required ? undefined : t.createToken(SyntaxKind.QuestionToken),
          !schema
            ? t.createToken(SyntaxKind.UnknownKeyword)
            : this.toTypeNode(schema),
        ),
      );
    }
  }

  // 构建普通参数的对象解构
  if (objectElements.length > 0) {
    const objectParam = t.createParameterDeclaration(
      undefined,
      undefined,
      t.createObjectBindingPattern(objectElements),
      undefined,
      t.createTypeLiteralNode(typeObjectElements),
      undefined,
    );
    return [objectParam, ...refParameters];
  }

  return refParameters;
}
```

**注意**: 此方法签名从返回单个 `ParameterDeclaration` 改为返回 `ParameterDeclaration[]`，需要同步修改调用方。

### 同步修改调用方

在 `schemaToStatemets` 方法中：

```typescript
// 修改前
[
  parameters.length > 0
    ? Generator.toDeclarationNode(parameters)  // 返回单个
    : undefined,
  // ...
].filter(Boolean) as ParameterDeclaration[]

// 修改后
[
  ...(parameters.length > 0
    ? Generator.toDeclarationNodes(parameters)  // 返回数组
    : []),
  // ...
].filter(Boolean) as ParameterDeclaration[]
```

## 验证步骤

1. 创建包含 `$ref` 参数的 OpenAPI 文档测试用例
2. 运行代码生成
3. 验证生成的函数签名包含所有参数
4. 运行 TypeScript 检查确保类型正确

## 影响范围

- **破坏性**: 是（方法签名改变）
- **用户影响**: 修复后引用参数才能正确生成
- **向后兼容**: 需要同步更新调用方
