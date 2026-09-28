# 写作与维护

这是一个以 Markdown 为内容源的个人学习空间。文章、笔记和实验共用列表与阅读页面，栏目由配置驱动。

## 新增一篇笔记

复制 `src/content/notes/_template.md`，改名并填写正文。完成后把 `draft: true` 改为 `draft: false`，运行 `npm run build` 检查，再提交部署。

```yaml
---
title: "要讨论的问题"
slug: "a-stable-url"
date: "2026-09-28"
updated: "2026-09-28"
topic: "强化学习"
tags: ["基础概念"]
excerpt: "一句话说明内容。"
status: "持续更新"
featured: false
draft: true
---
```

- `title`、`date` 是公开内容的必填项；日期使用 `YYYY-MM-DD`，推荐加引号。
- `slug` 是固定路径：以上笔记地址为 `/#/notes/a-stable-url`。标题、文件名可以修改，保持 slug 不变即可保留链接。支持 `foundations/mdp` 这样的层级路径。
- 省略 `slug` 时使用栏目目录内的文件相对路径。已经公开的文章建议显式指定 slug。
- `updated` 决定最近更新排序；省略时使用发布日期。
- `featured: true` 将记录加入首页精选。
- `draft: true` 的记录不会出现在列表、搜索和网站构建产物中；草稿如果提交到公开 Git 仓库，仍可被查看，不属于保密功能。
- `topic` 在列表里自动增加对应主题。若希望主题也出现在首页导航中，在栏目配置的 `topics` 中添加。
- 模板保留为草稿，网站不会替你生成公开的学习经历。

## 新增栏目

打开 `src/config/sections.ts`，在 `sections` 数组中添加：

```ts
{
  id: 'reading',
  title: '阅读记录',
  navTitle: '阅读',
  english: 'READING',
  description: '记录读过的文字与留下的问题。',
  empty: '阅读记录正在整理。',
}
```

然后创建 `src/content/reading/`，把 Markdown 放进去。导航、列表、搜索、分页、详情路由、相关文章和首页最近更新都会自动接入，无需复制 React 页面。

- 数组顺序就是导航顺序；`navTitle` 是导航短标题。
- `id` 同时决定目录名和 URL 前缀，请保持稳定；只修改显示名称不会改变链接。
- `topics` 是可选的主题导航，格式参考笔记栏目。`showStatus: true` 显示正文的更新状态。
- `aliases: ['old-reading']` 可以保留旧栏目入口；文章层级的迁移请保留原栏目 id 和 slug，或单独配置明确的跳转。不要仅靠重命名文件迁移公开链接。
- `/about` 留给关于页。栏目 ID、别名不能重复，构建会检查冲突。
- 首页的学习主题来自 `notes` 栏目；新增的其他栏目自动进入最近更新。

## 正文功能

支持 Markdown 标题、列表、表格、图片、代码块和数学公式。标题自动生成目录，重复标题会得到不同锚点。

```md
行内公式：$V(s)$。

$$
V^{\pi}(s)=\mathbb{E}_{\pi}[G_t\mid S_t=s]
$$
```

公式和字体在本地打包，无需读者连接外部公式服务。

图片放在 `public/images/` 下，正文使用 `![图片说明](/images/your-image.png)`。PDF 等附件可放在 `public/files/` 下并以链接引用。请压缩大图和附件，避免让仓库不断膨胀。

站内链接使用 `[另一篇笔记](#/notes/a-stable-url)`，不要直接链接源文件 `.md`。正文锚点使用标题的小写形式，空格和标点转换为 `-`，例如 `[推导](#bellman-equation)`；中文标题保持中文。

## 发布前检查

```bash
npm ci
npm run lint
npm test
npm run build
npm run preview
```

构建会检查必填字段、日期、重复文章路径和栏目冲突，并检查最终入口是否为生产 JavaScript。搜索、主题和分页保存在 URL 中，刷新页面不会丢失筛选状态。每页显示 10 条记录。

GitHub 仓库 Settings → Pages → Source 选择 **GitHub Actions**，由已有工作流发布 `dist`。不要同时从 main 根目录直接发布。保留 HashRouter，分享时复制浏览器中的完整 `/#/...` 地址。

## 日常维护

- 修改介绍、联系方式：`src/config/site.config.ts` 和 `src/pages/About.tsx`。
- 修改栏目、排序、主题：`src/config/sections.ts`。
- 修改首页布局：`src/pages/Home.tsx`；整体视觉变量在 `src/index.css`。
- 原来的示例文章保留为草稿，虚构项目和工作经历已移除。
- 尚未配置评论服务，页面不加载无效的第三方评论脚本。
- 新依赖应通过 npm 安装并提交 `package.json` 和 `package-lock.json`。`node_modules` 不应继续作为新文件提交；仓库中历史已跟踪的依赖可另行清理。
- 当前全文检索在浏览器本地进行，正文随内容索引打包；适合个人规模的文字笔记。内容达到数百篇且首屏体积明显增长时，应迁移为构建时摘要索引与正文按需加载。分页只限制显示数量，不减少索引体积。
- 目前仍是客户端渲染。若以后重视每篇文章的搜索引擎收录与社交分享卡片，可迁移到静态页面生成，同时保留 slug，避免旧链接失效。
