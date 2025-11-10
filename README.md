# DyHamster 个人主页

一个现代化的个人主页项目，使用 React + Vite + Tailwind CSS 构建。

## ✨ 特性

- 🎨 响应式设计，支持深色模式
- 📝 Markdown 文章渲染，支持代码高亮
- 💬 GitHub Issues 评论系统集成
- 🔍 SEO 优化，支持 Open Graph 和 Twitter Card
- ⚡ 性能优化：代码分割、图片优化、Service Worker
- 📱 PWA 支持，可安装到桌面
- 🚀 支持 GitHub Pages 和 Vercel 部署

## 🛠️ 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式**: Tailwind CSS
- **路由**: React Router v7
- **状态管理**: Zustand
- **Markdown 渲染**: react-markdown + remark-gfm
- **SEO**: react-helmet-async
- **评论系统**: utterances

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建项目

```bash
npm run build
```

### 预览构建结果

```bash
npm run preview
```

## 📦 部署

### GitHub Pages

1. 在 GitHub 上创建仓库
2. 配置 GitHub Actions（已包含 `.github/workflows/deploy.yml`）
3. 推送代码到 main 分支，自动部署

或者手动部署：

```bash
npm run deploy:gh-pages
```

### Vercel

1. 安装 Vercel CLI: `npm i -g vercel`
2. 运行: `npm run deploy:vercel`

## 📝 内容管理

### 添加文章

在 `src/content/posts/` 目录下添加 Markdown 文件，包含以下 frontmatter：

```yaml
---
title: 文章标题
date: 2024-01-01
tags: [标签1, 标签2]
excerpt: 文章摘要
---
```

### 添加项目

在 `src/config/site.ts` 中修改 `projects` 数组。

### 个人信息配置

在 `src/config/site.ts` 中修改个人信息、技能、工作经历等。

## 🔧 配置

### SEO 配置

- 修改 `index.html` 中的 meta 标签
- 更新 `public/manifest.json` 中的 PWA 配置
- 配置 `src/config/site.ts` 中的站点信息

### 评论系统

在 `src/pages/PostDetail.tsx` 中配置 utterances：

```typescript
<Comments
  repo="your-username/your-repo"
  theme={isDark ? 'github-dark' : 'github-light'}
  issueTerm="pathname"
  label="💬"
/>
```

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 联系

- 邮箱: your-email@example.com
- GitHub: [@your-username](https://github.com/your-username)
- 个人主页: [your-domain.com](https://your-domain.com)