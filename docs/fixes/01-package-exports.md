# Fix 01: 修复 package.json exports 配置错误

## 问题描述

**优先级**: P0  
**位置**: `package.json:17-20`  
**类型**: 配置错误

### 问题代码

```json
"exports": {
  "./package.json": "./package.json",
  "./*": {
    "types": "./npm/*/index.js",      // ❌ 错误：类型应该指向 .d.ts
    "import": "./npm/*/index.d.ts"    // ❌ 错误：import 应该指向 .js
  },
  ".": {
    "types": "./npm/index.d.ts",
    "import": "./npm/index.js"
  }
}
```

### 问题分析

`exports` 字段中 `./*` 通配符配置存在严重错误：
- `types` 指向了 `.js` 文件，应该指向 `.d.ts` 类型声明文件
- `import` 指向了 `.d.ts` 文件，应该指向 `.js` 可执行文件

这会导致：
1. TypeScript 无法正确解析子路径导入的类型
2. 运行时导入会失败（因为导入的是类型文件而非 JS 代码）

## 修复方案

### 修改 package.json

```json
"exports": {
  "./package.json": "./package.json",
  "./*": {
    "types": "./npm/*/index.d.ts",    // ✅ 正确：类型指向 .d.ts
    "import": "./npm/*/index.js",     // ✅ 正确：ESM 指向 .js
    "require": "./npm/*/index.cjs"    // ✅ 新增：CJS 指向 .cjs
  },
  ".": {
    "types": "./npm/index.d.ts",
    "import": "./npm/index.js",
    "require": "./npm/index.cjs"       // ✅ 新增：支持 CommonJS
  }
}
```

## 验证步骤

1. 重新构建项目：`npm run build`
2. 检查生成的 `npm/` 目录包含 `.cjs` 文件
3. 创建测试文件验证子路径导入：

```typescript
// test-import.ts
import { codeGen } from '@moccona/apicodegen';
import type { ProviderInitOptions } from '@moccona/apicodegen/core';
```

4. 运行 TypeScript 检查：`tsc --noEmit test-import.ts`

## 影响范围

- **破坏性**: 否（修复错误配置）
- **用户影响**: 修复后用户才能正常使用子路径导入
- **向后兼容**: 保持兼容
