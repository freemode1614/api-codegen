# Fix 05: 优化枚举去重算法

## 问题描述

**优先级**: P2  
**位置**: `src/core/base/Base.ts:235-246`  
**类型**: 性能优化

### 问题代码

```typescript
static uniqueEnums(enums: EnumSchemaObject[]) {
  const uniqueEnums_: EnumSchemaObject[] = [];
  for (const enumObject of enums) {
    if (uniqueEnums_.length === 0) {
      uniqueEnums_.push(enumObject);
    } else {
      if (!uniqueEnums_.some((a) => this.isSameEnum(a, enumObject))) {  // ❌ O(n²)
        uniqueEnums_.push(enumObject);
      }
    }
  }
  return uniqueEnums_;
}
```

### 问题分析

当前算法使用嵌套循环进行去重：
- 外层循环遍历所有枚举：O(n)
- 内层循环遍历已收集的唯一枚举：O(n)
- 总复杂度：O(n²)

对于包含大量枚举的大型 OpenAPI 文档，性能会很差。

## 修复方案

### 使用 Set 优化到 O(n)

```typescript
static uniqueEnums(enums: EnumSchemaObject[]): EnumSchemaObject[] {
  const seen = new Set<string>();
  return enums.filter((e) => {
    // 创建唯一键：排序后的枚举值确保顺序无关
    const key = `${e.name}:${[...e.enum].sort().join(',')}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
```

### 考虑因素

1. **键生成策略**:
   - 使用 `name` + 排序后的 `enum` 值
   - 确保相同内容的枚举被识别为重复

2. **边界情况**:
   - 空枚举数组：返回空数组
   - 单个枚举：直接返回
   - 重复枚举：只保留第一个

## 性能对比

| 枚举数量 | 原算法 O(n²) | 新算法 O(n) |
|---------|-------------|------------|
| 100     | 10,000 次比较 | 100 次操作 |
| 1,000   | 1,000,000 次比较 | 1,000 次操作 |
| 10,000  | 100,000,000 次比较 | 10,000 次操作 |

## 验证步骤

1. 单元测试：

```typescript
describe('uniqueEnums', () => {
  it('should remove duplicate enums', () => {
    const input = [
      { name: 'Status', enum: ['active', 'inactive'] },
      { name: 'State', enum: ['active', 'inactive'] },  // 内容相同，名字不同
      { name: 'Status', enum: ['active', 'inactive'] },  // 完全重复
    ];
    const result = Base.uniqueEnums(input);
    expect(result).toHaveLength(2);
  });

  it('should handle empty array', () => {
    expect(Base.uniqueEnums([])).toEqual([]);
  });

  it('should handle single enum', () => {
    const input = [{ name: 'Status', enum: ['active'] }];
    expect(Base.uniqueEnums(input)).toEqual(input);
  });
});
```

## 影响范围

- **破坏性**: 否
- **用户影响**: 无感知，性能提升
- **向后兼容**: 完全兼容
