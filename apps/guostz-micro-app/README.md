# guostz-micro-app

一个基于 `Bun + Vite + React 19 + TypeScript + Antd + @micro-zoe/micro-app` 的微前端基座模板。

## 启动

```bash
bun install
bun run dev
```

## 脚本

- `bun run dev`：启动开发环境
- `bun run preview`：本地预览
- `bun run typecheck`：执行 TypeScript 类型检查
- `bun run test`：执行 Vitest 测试

## 目录

- `src/app`：应用装配与 `micro-app` 初始化
- `src/features/micro-app`：子应用注册表、类型与帮助函数
- `src/pages`：首页、工作台与 404 页面
- `src/shared/ui`：基座壳层布局
- `src/shared/components`：`micro-app` 挂载组件
- `src/services`：请求层占位
- `src/styles`：全局样式
- `src/tests`：测试初始化

## 环境变量

- `VITE_DEFAULT_SUB_APP_ENTRY`：默认子应用入口地址

## 当前路由

- `/home`：基座首页
- `/workspace/dashboard`：默认子应用工作台
- `*`：404 页面
