# guostz-react-web

一个基于 `Bun + Vite + React 19 + TypeScript + Antd + react-router-dom` 的前端工程骨架。

## 启动

```bash
bun install
bun run dev
```

## 脚本

- `bun run dev`：启动开发环境
- `bun run preview`：本地预览构建产物
- `bun run typecheck`：执行 TypeScript 类型检查
- `bun run test`：执行 Vitest 测试

## 目录

- `src/app`：应用装配，包含根组件、Provider 和路由
- `src/pages`：页面级入口
- `src/shared`：共享 UI、工具函数、类型与 hooks
- `src/services`：请求层封装
- `src/styles`：全局样式与 reset
- `src/tests`：测试初始化与测试辅助

## 环境变量

- `VITE_API_BASE_URL`：请求层基础地址

## 当前示例

- `/demo/list`：列表示例页
- `/demo/form`：表单示例页
- `*`：404 页面
