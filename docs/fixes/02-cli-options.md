# Fix 02: 修复 CLI 参数解析 Bug

## 问题描述

**优先级**: P0  
**位置**: `src/cli.ts:9-18`  
**类型**: 功能 Bug

### 问题代码

```typescript
cli
  .version(version)
  .argument("<docURL>", "DOc url for tool to read")
  .option("--output", "Where code generated", "./output.ts")      // ❌ 错误
  .option("--adaptor", "Adaptor for api call", "fetch")           // ❌ 错误
  .option("--baseURL", "Base path of the api endpoint", "")       // ❌ 错误
  .option("--verbose", "More logs", false)                        // ❌ 错误
  .option("--importClientSource", "Where request tool comes from") // ❌ 错误
```

### 问题分析

`commander` 的 `.option()` 方法签名是：
```typescript
option(flags: string, description?: string, defaultValue?: T)
```

当前代码的问题：
1. `flags` 参数缺少 `<value>` 或 `[value]` 标记来指定参数值
2. `--output` 这样定义会被解析为布尔标志，而非字符串选项
3. 缺少短选项别名（如 `-o`）

这会导致：
- `--output ./api.ts` 被错误解析
- 用户无法通过 CLI 正确设置输出路径等参数

## 修复方案

### 修改 src/cli.ts

```typescript
cli
  .version(version)
  .argument("<docURL>", "URL of the OpenAPI documentation")
  .option("-o, --output <path>", "Output file path", "./output.ts")
  .option("-a, --adaptor <type>", "HTTP client adaptor (fetch|axios)", "fetch")
  .option("-b, --baseURL <url>", "Base URL for API endpoints")
  .option("-v, --verbose", "Enable verbose logging", false)
  .option("--importClientSource <path>", "Custom client import source path")
```

## 变更说明

| 选项 | 变更 |
|------|------|
| `--output` | 添加 `-o` 短选项，添加 `<path>` 值标记 |
| `--adaptor` | 添加 `-a` 短选项，添加 `<type>` 值标记 |
| `--baseURL` | 添加 `-b` 短选项，添加 `<url>` 值标记 |
| `--verbose` | 添加 `-v` 短选项 |
| `--importClientSource` | 添加 `<path>` 值标记 |

## 验证步骤

1. 构建项目：`npm run build`
2. 测试帮助信息：`node ./bin/cli.cjs --help`
3. 测试参数解析：

```bash
# 测试输出路径
node ./bin/cli.cjs https://example.com/api.json --output ./test-output.ts

# 测试短选项
node ./bin/cli.cjs https://example.com/api.json -o ./test-output.ts -a axios -v
```

## 影响范围

- **破坏性**: 否（修复错误行为）
- **用户影响**: 修复后 CLI 参数才能正常工作
- **向后兼容**: 长选项保持兼容
