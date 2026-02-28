# Fix 08: 修复 polymorphism.json 测试用例 - Enum 重复定义问题

## 问题描述

**测试文件**: `api-docs/openapi/3.0/json/polymorphism.json`

### 生成的错误代码

```typescript
// 第一个 ExemptionReason enum
export enum ExemptionReason {
  "hotel_motel" = "hotel_motel",
}

// 第二个 ExemptionReason enum - 名称冲突！
export enum ExemptionReason {
  "bed_breakfast_lodging" = "bed_breakfast_lodging",
  "hospitals" = "hospitals",
  "hotel_motel" = "hotel_motel",  // ❌ 重复成员
  "institutional_business" = "institutional_business",
}
```

### TypeScript 错误

```
test-output.ts(16,3): error TS2300: Duplicate identifier '"hotel_motel"'.
test-output.ts(21,3): error TS2300: Duplicate identifier '"hotel_motel"'.
```

## 问题分析

### 根本原因

在 `polymorphism.json` 中，`/one-of-complex` 路径的请求体包含多个 oneOf 选项，每个选项都有 `exemption` 属性，但它们的 enum 值不同：

1. **Baltimore** 的 exemption:
```json
"exemption": {
  "properties": {
    "exemption_reason": {
      "enum": ["hotel_motel"]
    }
  }
}
```

2. **Boston** 的 exemption:
```json
"exemption": {
  "properties": {
    "exemption_reason": {
      "enum": ["hotel_motel", "bed_breakfast_lodging", "institutional_business", "hospitals"]
    }
  }
}
```

3. **Catalonia** 的 exemption:
```json
"exemption": {
  "properties": {
    "reason": {
      "enum": ["LISTING_TYPE_NOT_INCLUDED", "LISTING_NOT_TOURIST_ACCOMMODATION"]
    }
  }
}
```

### 代码生成问题

当前代码生成逻辑：
1. 为每个内联 enum 生成一个类型名（如 `ExemptionReason`）
2. 通过 `uniqueEnums` 去重，但只比较 enum 值是否完全相同
3. 相同名称但不同值的 enum 被视为不同的 enum，但生成时会使用相同的名称

### 具体问题

```typescript
// 在 V3.ts 中生成 enum 名称的逻辑
const type =
  Base.upperCamelCase(Base.normalize(upLevelSchemaKey)) +
  Base.upperCamelCase(Base.normalize(name));
```

对于 Baltimore 和 Boston 的 `exemption_reason`：
- 都生成了名称 `ExemptionReason`
- 但值不同： `["hotel_motel"]` vs `["hotel_motel", "bed_breakfast_lodging", ...]`

## 修复方案

### 方案 1：合并相同名称的 enum（推荐）

当发现相同名称但不同值的 enum 时，合并它们的值：

```typescript
// 合并后的 ExemptionReason
export enum ExemptionReason {
  "hotel_motel" = "hotel_motel",
  "bed_breakfast_lodging" = "bed_breakfast_lodging",
  "hospitals" = "hospitals",
  "institutional_business" = "institutional_business",
}
```

### 方案 2：生成唯一名称

为重复的 enum 名称添加后缀：

```typescript
export enum ExemptionReason {
  "hotel_motel" = "hotel_motel",
}

export enum ExemptionReason2 {
  "hotel_motel" = "hotel_motel",
  "bed_breakfast_lodging" = "bed_breakfast_lodging",
  // ...
}
```

## 采用方案 1

原因：
1. 更符合 TypeScript 的最佳实践（单一类型定义）
2. 语义上相同路径名的 enum 应该是同一概念
3. 用户使用时不需要区分不同变体

## 修复代码

### 修改 `src/core/base/Base.ts`

```typescript
static uniqueEnums(enums: EnumSchemaObject[]): EnumSchemaObject[] {
  const enumMap = new Map<string, Set<string | number>>();
  
  for (const e of enums) {
    const existing = enumMap.get(e.name);
    if (existing) {
      // 合并相同名称的 enum 值
      for (const value of e.enum) {
        existing.add(value);
      }
    } else {
      enumMap.set(e.name, new Set(e.enum));
    }
  }
  
  // 转换回数组
  return Array.from(enumMap.entries()).map(([name, values]) => ({
    name,
    enum: Array.from(values),
  }));
}
```

## 验证

修复后生成的代码应该为：

```typescript
export enum ExemptionReason {
  "hotel_motel" = "hotel_motel",
  "bed_breakfast_lodging" = "bed_breakfast_lodging",
  "hospitals" = "hospitals",
  "institutional_business" = "institutional_business",
}
```

## 影响范围

- **破坏性**: 否（修复错误行为）
- **用户影响**: 修复后 enum 定义更符合预期
- **向后兼容**: 生成的 API 兼容（只是类型定义变化）
