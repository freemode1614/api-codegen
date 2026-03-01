# @moccona/apicodegen

一个强大的 OpenAPI 代码生成工具，根据 OpenAPI/Swagger 文档自动生成 TypeScript API 客户端代码。

[![npm version](https://badge.fury.io/js/@moccona%2Fapicodegen.svg)](https://www.npmjs.com/package/@moccona/apicodegen)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ 特性

- 🚀 **多版本支持** - 完整支持 OpenAPI 2.0、3.0 和 3.1
- 📝 **TypeScript 优先** - 生成完整的类型定义和类型安全的 API 函数
- 🔌 **多适配器** - 内置 `fetch` 和 `axios` HTTP 客户端支持
- 🛠️ **CLI 工具** - 简单易用的命令行界面
- ⚡ **Vite 插件** - 无缝集成到 Vite 构建流程
- 📦 **文件上传** - 原生支持 multipart/form-data 文件上传
- 🎯 **完整类型** - 支持枚举、联合类型、交叉类型、复杂嵌套对象等

## 📦 安装

```bash
# 全局安装（推荐用于 CLI 使用）
npm install -g @moccona/apicodegen

# 或本地安装
npm install -D @moccona/apicodegen

# 使用 pnpm
pnpm add -D @moccona/apicodegen

# 使用 yarn
yarn add -D @moccona/apicodegen
```

## 🚀 快速开始

### CLI 使用

```bash
# 基本用法
apicodegen <OpenAPI文档URL> -o ./src/api.ts

# 完整示例
apicodegen https://api.example.com/openapi.json \
  -o ./src/api.ts \
  -a fetch \
  -b https://api.example.com \
  -v
```

### 选项说明

| 选项 | 简写 | 说明 | 默认值 |
|------|------|------|--------|
| `--output` | `-o` | 输出文件路径 | `./output.ts` |
| `--adaptor` | `-a` | HTTP 客户端适配器 (`fetch` 或 `axios`) | `fetch` |
| `--baseURL` | `-b` | API 基础 URL | - |
| `--verbose` | `-v` | 启用详细日志输出 | `false` |
| `--importClientSource` | - | 自定义客户端导入路径 | - |

## 📖 使用示例

### 1. 基础代码生成

```bash
# 从远程 OpenAPI 文档生成
apicodegen https://petstore3.swagger.io/api/v3/openapi.json -o ./api/petstore.ts

# 从本地文件生成
apicodegen ./docs/openapi.json -o ./src/generated/api.ts
```

### 2. 使用 Axios 适配器

```bash
apicodegen https://api.example.com/openapi.json \
  -o ./src/api.ts \
  -a axios \
  -b https://api.example.com
```

生成的代码将使用 axios 进行 HTTP 请求：

```typescript
export async function getUserById({ userId }: { userId: number }) {
  return axios.get<User>(`/users/${userId}`).then((response) => response.data);
}
```

### 3. 自定义客户端导入

```bash
apicodegen https://api.example.com/openapi.json \
  -o ./src/api.ts \
  --importClientSource "import { customFetch } from '@/utils/http'"
```

## 🔌 Vite 插件

在 Vite 项目中自动集成代码生成：

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import { apiCodeGenPlugin } from '@moccona/apicodegen/vite-plugin';

export default defineConfig({
  plugins: [
    apiCodeGenPlugin([
      {
        name: 'petstore-api',
        docURL: 'https://petstore3.swagger.io/api/v3/openapi.json',
        output: './src/api/petstore.ts',
        adaptor: 'fetch',
        baseURL: 'https://petstore3.swagger.io/api/v3',
        // 可选：配置代理
        proxy: {
          '/api': {
            target: 'https://petstore3.swagger.io',
            changeOrigin: true,
          },
        },
      },
      // 支持多个 API 源
      {
        name: 'user-api',
        docURL: 'https://api.example.com/openapi.json',
        output: './src/api/user.ts',
        adaptor: 'axios',
        baseURL: 'https://api.example.com',
      },
    ]),
  ],
});
```

### Vite 插件配置项

| 配置项 | 类型 | 说明 |
|--------|------|------|
| `name` | `string` | API 名称标识 |
| `docURL` | `string` | OpenAPI 文档 URL（必需） |
| `output` | `string` | 输出文件路径（必需） |
| `adaptor` | `'fetch' \| 'axios'` | HTTP 客户端适配器 |
| `baseURL` | `string` | API 基础 URL |
| `proxy` | `ServerOptions['proxy']` | Vite 开发服务器代理配置 |
| `verbose` | `boolean` | 启用详细日志 |
| `importClientSource` | `string` | 自定义客户端导入语句 |
| `requestOptions` | `FetchDocRequestInit` | 获取文档时的请求配置 |

## 📝 生成的代码示例

假设有以下 OpenAPI 定义：

```yaml
paths:
  /pets/{petId}:
    get:
      operationId: getPetById
      parameters:
        - name: petId
          in: path
          required: true
          schema:
            type: integer
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Pet'

components:
  schemas:
    Pet:
      type: object
      properties:
        id:
          type: integer
        name:
          type: string
        status:
          type: string
          enum: [available, pending, sold]
```

生成的 TypeScript 代码：

```typescript
/**
 * Pet 对象
 */
export type Pet = {
  id?: number;
  name?: string;
  status?: "available" | "pending" | "sold";
};

/**
 * 根据 ID 获取宠物信息
 */
export async function getPetById({ petId }: { petId: number }) {
  return fetch(`/pets/${petId}`, {
    method: "GET",
  }).then(async (response) => (await response.json()) as Pet);
}
```

## 🎯 支持的 OpenAPI 特性

### Schema 类型
- ✅ 基础类型：`string`, `number`, `integer`, `boolean`
- ✅ 复杂对象：`object` 及其属性定义
- ✅ 数组类型：`array` 及嵌套数组
- ✅ 枚举类型：自动生成 TypeScript 枚举
- ✅ 联合类型：`oneOf`, `anyOf`
- ✅ 交叉类型：`allOf`
- ✅ 引用类型：`$ref` 循环引用处理
- ✅ 文件类型：`binary`, `blob`, `file` 格式

### 参数位置
- ✅ Path 参数：`/users/{id}`
- ✅ Query 参数：`?page=1&limit=10`
- ✅ Header 参数：自定义请求头
- ✅ Cookie 参数：请求 Cookie
- ✅ Body 参数：JSON 和 FormData

### 请求体格式
- ✅ `application/json` - JSON 数据
- ✅ `multipart/form-data` - 文件上传
- ✅ `application/x-www-form-urlencoded` - 表单数据
- ✅ `text/plain`, `image/*` 等 - 二进制数据

## 🔧 高级配置

### 自定义 HTTP 客户端

生成代码后，您可以通过 `importClientSource` 选项使用自定义 HTTP 客户端：

```bash
apicodegen https://api.example.com/openapi.json \
  -o ./src/api.ts \
  --importClientSource "import { httpClient } from './client'"
```

然后在生成的代码中所有请求都将使用 `httpClient`。

### 请求文档时的认证

如果 OpenAPI 文档需要认证才能访问：

```typescript
// vite.config.ts
apiCodeGenPlugin([
  {
    name: 'protected-api',
    docURL: 'https://api.example.com/openapi.json',
    output: './src/api.ts',
    requestOptions: {
      headers: {
        'Authorization': 'Bearer your-token',
      },
    },
  },
]);
```

## 🧪 开发

```bash
# 克隆仓库
git clone https://github.com/freemode1614/api-codegen.git
cd api-codegen

# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 构建
pnpm build

# 运行测试
pnpm test
```

## 📄 许可证

[MIT](LICENSE) © freemode

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

有问题或建议？请访问 [GitHub Issues](https://github.com/freemode1614/api-codegen/issues) 页面。
