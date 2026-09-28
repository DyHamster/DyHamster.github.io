# DyHamster · 学习与记录

偏强化学习方向的个人学习空间。采用暖白、墨绿和克制的文字排版，支持浅色与深色模式。

- 栏目由 `src/config/sections.ts` 统一配置，导航、列表和详情自动生成。
- Markdown 笔记支持主题、标签、全文搜索、分页、目录、公式及代码块。
- 支持草稿、固定 slug、最后更新时间和首页精选。
- 发布前验证内容字段、重复网址与栏目冲突。

## 开始

```bash
npm ci
npm run dev
```

## 检查与构建

```bash
npm run lint
npm test
npm run build
npm run preview
```

## 发布

仓库 Settings → Pages → Build and deployment → Source 选择 **GitHub Actions**，再推送到 `main`。已有 `.github/workflows/deploy.yml` 会构建并发布 `dist`。

不要从 `main` 根目录直接发布：源码入口 `/src/main.tsx` 不能在浏览器中直接运行，会导致白屏。也不要同时运行分支式 Pages 发布覆盖 Actions 产物。

## 写作与扩展

参见 [写作与维护](USAGE.md)。笔记模板在 `src/content/notes/_template.md`，实验模板在 `src/content/experiments/_template.md`，默认均为草稿。
