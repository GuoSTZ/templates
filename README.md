# templates

`templates` 是一个用于统一管理多个项目模板的单仓库目录。

## 目录说明

- `apps/`：可独立开发和维护的模板项目
- `packages/`：未来可抽离的共享配置或复用能力
- `scripts/`：未来可添加的仓库级脚本
- `docs/`：设计文档、实施计划与其他仓库文档

## 模板列表

| 模板名 | 技术栈 | 路径 | 说明 |
| --- | --- | --- | --- |
| `guostz-react-web` | Bun + Vite + React 19 + TypeScript + Antd | `apps/guostz-react-web` | Web 前端模板 |

## 新增模板约定

1. 所有新模板统一放在 `apps/` 下。
2. 每个模板保留自己的 `package.json`、`README.md`、源码和配置文件。
3. 模板目录名建议使用稳定英文命名，保持统一前缀风格。
4. 新增模板后，同步更新本文件中的模板列表。

## 当前使用方式

进入目标模板目录后，再执行对应模板自己的依赖安装和启动命令。例如：

```bash
cd apps/guostz-react-web
bun install
bun run dev
```

## 导出模板

在任意目标父目录下执行：

```bash
sh /path/to/templates/scripts/create-project.sh guostz-react-web my-project
```

如果需要显式指定目标父目录：

```bash
sh /path/to/templates/scripts/create-project.sh guostz-react-web my-project /Users/you/workspace
```

也可以使用交互模式：

```bash
sh /path/to/templates/scripts/create-project.sh -i
```

如果需要指定交互模式的目标父目录：

```bash
sh /path/to/templates/scripts/create-project.sh -i /Users/you/workspace
```

如果你更习惯完整写法，也可以继续使用 `--interactive`。

脚本会创建 `my-project/`，复制模板代码，并将 `package.json` 中的项目名替换为目标名称。

如果模板文件里使用了显式占位词 `__PROJECT_NAME__`，导出时也会被替换成目标项目名。

模板目录中的 `.templateignore` 用于控制“哪些文件不应该被导出到新项目”，它和 `.gitignore` 的职责不同：

- `.gitignore` 控制 Git 跟踪行为
- `.templateignore` 控制模板导出行为
