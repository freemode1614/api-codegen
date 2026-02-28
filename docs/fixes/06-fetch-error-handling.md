# Fix 06: 修复异常处理空 try-catch

## 问题描述

**优先级**: P2  
**位置**: `src/core/base/Base.ts:156-177`  
**类型**: 代码质量

### 问题代码

```typescript
static async fetchDoc<T = unknown>(
  url: string,
  requestInit: FetchDocRequestInit = {},
): Promise<T> {
  const agent = new Agent({
    connect: {
      rejectUnauthorized: false,
    },
  });

  // eslint-disable-next-line no-useless-catch
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
}
```

### 问题分析

1. `try-catch` 块中只是捕获异常又立即抛出，没有任何处理
2. 这增加了不必要的代码复杂度
3. 没有提供有用的错误信息（如 HTTP 状态码、URL 等）
4. ESLint 规则 `no-useless-catch` 已经被禁用，说明这是一个已知问题

## 修复方案

### 方案 A：移除无用的 try-catch（简单）

```typescript
static async fetchDoc<T = unknown>(
  url: string,
  requestInit: FetchDocRequestInit = {},
): Promise<T> {
  const agent = new Agent({
    connect: { rejectUnauthorized: false },
  });

  const { body } = await request(url, {
    method: "GET",
    dispatcher: agent,
    ...requestInit,
  });
  
  return body.json() as T;
}
```

### 方案 B：添加有意义的错误处理（推荐）

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
    throw new Error(
      `Failed to fetch OpenAPI documentation from ${url}: HTTP ${statusCode}`
    );
  }

  try {
    return body.json() as T;
  } catch (error) {
    throw new Error(
      `Failed to parse JSON response from ${url}: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}
```

## 采用方案

采用 **方案 B**，原因：
1. 提供更清晰的错误信息
2. 早期检查 HTTP 错误状态
3. 区分网络错误和 JSON 解析错误

## 验证步骤

1. 测试正常请求：
```typescript
const doc = await Base.fetchDoc('https://api.example.com/openapi.json');
```

2. 测试 404 错误：
```typescript
try {
  await Base.fetchDoc('https://api.example.com/not-found.json');
} catch (error) {
  console.log(error.message); // 应该包含 "HTTP 404"
}
```

3. 测试无效 JSON：
```typescript
try {
  await Base.fetchDoc('https://api.example.com/invalid.txt');
} catch (error) {
  console.log(error.message); // 应该包含 "parse JSON"
}
```

## 影响范围

- **破坏性**: 否（改进错误信息）
- **用户影响**: 更好的错误诊断体验
- **向后兼容**: 兼容
