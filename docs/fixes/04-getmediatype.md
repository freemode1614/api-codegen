# Fix 04: 修复 getMediaType 逻辑错误

## 问题描述

**优先级**: P1  
**位置**: `src/core/base/Base.ts:184-191`  
**类型**: 逻辑错误

### 问题代码

```typescript
static getMediaType(mediaType: string): MediaTypes | undefined {
  // eslint-disable-next-line @typescript-eslint/no-for-in-array
  for (const type in Object.values(MediaTypes)) {  // ❌ 严重错误
    if (new RegExp(type).test(mediaType)) {        // ❌ type 是 "0", "1", "2"...
      return type as MediaTypes;
    }
  }
  return;
}
```

### 问题分析

`for...in` 遍历数组会得到索引字符串（"0", "1", "2"...）而非数组值：

```typescript
const values = Object.values(MediaTypes);
// values = ["application/json", "text", "image", "audio", "video"]

for (const type in values) {
  console.log(type);  // "0", "1", "2", "3", "4"
}
```

这导致：
1. `new RegExp("0")` 会匹配任何包含 "0" 的字符串
2. 返回的是索引而非实际的媒体类型值
3. 整个方法逻辑完全错误

## 修复方案

### 修改 src/core/base/Base.ts

```typescript
static getMediaType(mediaType: string): MediaTypes | undefined {
  const mediaTypeValues = Object.values(MediaTypes) as string[];
  const found = mediaTypeValues.find(type => 
    mediaType.includes(type)
  );
  return found as MediaTypes | undefined;
}
```

### 替代方案（使用正则匹配）

如果需要更精确的匹配（如匹配 `application/json;charset=utf-8`）：

```typescript
static getMediaType(mediaType: string): MediaTypes | undefined {
  const mediaTypeValues = Object.values(MediaTypes) as string[];
  
  // 精确匹配：application/json 也能匹配 application/json;charset=utf-8
  const found = mediaTypeValues.find(type => 
    mediaType === type || mediaType.startsWith(type + ';')
  );
  
  return found as MediaTypes | undefined;
}
```

## 验证步骤

1. 创建单元测试：

```typescript
import { describe, expect, it } from 'vitest';
import { Base } from '../src/core/base/Base';
import { MediaTypes } from '../src/core/interface';

describe('getMediaType', () => {
  it('should return JSON for application/json', () => {
    expect(Base.getMediaType('application/json')).toBe(MediaTypes.JSON);
  });

  it('should return JSON for application/json;charset=utf-8', () => {
    expect(Base.getMediaType('application/json;charset=utf-8')).toBe(MediaTypes.JSON);
  });

  it('should return undefined for unknown type', () => {
    expect(Base.getMediaType('application/xml')).toBeUndefined();
  });

  it('should not return index numbers', () => {
    const result = Base.getMediaType('application/json');
    expect(result).not.toBe('0');
    expect(result).not.toBe('1');
  });
});
```

2. 运行测试确保通过

## 影响范围

- **破坏性**: 否（修复错误行为）
- **用户影响**: 修复后媒体类型识别才能正常工作
- **向后兼容**: 修复后的行为才是预期行为
