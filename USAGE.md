# 个人主页使用指南

这份指南将详细介绍如何使用和定制这个个人主页项目，从项目初始化到部署上线的完整流程。

## 📋 目录

1. [项目初始化](#1-项目初始化)
2. [内容管理](#2-内容管理)
3. [主题和样式定制](#3-主题和样式定制)
4. [部署配置](#4-部署配置)
5. [SEO优化](#5-seo优化)
6. [评论系统集成](#6-评论系统集成)
7. [常见问题解决](#7-常见问题解决)

---

## 1. 项目初始化

### 1.1 环境要求

- Node.js >= 18.0.0
- npm >= 8.0.0 或 yarn >= 1.22.0
- Git

### 1.2 克隆和安装

```bash
# 克隆项目（假设已上传到GitHub）
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 1.3 项目结构说明

```
src/
├── components/          # 可复用组件
│   ├── Comments.tsx     # 评论组件
│   ├── Footer.tsx       # 页脚组件
│   ├── Header.tsx       # 头部导航
│   ├── SEO.tsx          # SEO优化组件
│   └── ThemeToggle.tsx  # 主题切换
├── pages/              # 页面组件
│   ├── Home.tsx        # 首页
│   ├── Posts.tsx       # 文章列表
│   ├── PostDetail.tsx  # 文章详情
│   ├── Projects.tsx    # 项目展示
│   └── About.tsx       # 关于页面
├── config/             # 配置文件
│   └── site.config.ts  # 站点配置
├── data/               # 数据文件
│   └── content.ts      # 内容数据
├── content/            # 文章内容（Markdown）
│   └── posts/          # 文章目录
└── utils/              # 工具函数
```

---

## 2. 内容管理

### 2.1 添加文章

在 `src/content/posts/` 目录下创建新的 Markdown 文件：

```markdown
---
title: "文章标题"
date: "2024-01-15"
tags: ["React", "TypeScript", "前端"]
excerpt: "这是文章的简短摘要，会在列表页面显示"
cover: "/images/post-cover.jpg"  # 可选：封面图片
---

# 文章标题

这里是文章内容，支持 Markdown 语法。

## 代码块示例

```typescript
const greeting = "Hello World!";
console.log(greeting);
```

## 图片示例

![图片描述](/images/example.png)
```

**注意事项：**
- 文件名建议使用英文，如 `my-first-post.md`
- 日期格式必须是 `YYYY-MM-DD`
- tags 数组最多包含 5 个标签
- excerpt 建议控制在 100-200 字

### 2.2 配置个人信息

编辑 `src/config/site.config.ts` 文件：

```typescript
export const siteConfig = {
  // 基本信息
  name: "你的名字",
  title: "个人主页标题",
  description: "个人简介描述",
  
  // 个人信息
  author: {
    name: "张三",
    bio: "全栈开发工程师，专注于前端技术和用户体验设计",
    avatar: "/images/avatar.jpg",
    email: "zhangsan@example.com",
    location: "北京，中国",
    company: "某某科技公司",
    position: "高级前端工程师"
  },
  
  // 社交链接
  social: {
    github: "https://github.com/yourusername",
    twitter: "https://twitter.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    weibo: "https://weibo.com/yourusername",
    // 不需要的链接可以删除或留空
  },
  
  // 技能标签
  skills: [
    "React", "TypeScript", "Node.js", "Python", 
    "Docker", "AWS", "MongoDB", "PostgreSQL"
  ],
  
  // 工作经历
  experience: [
    {
      company: "某某科技公司",
      position: "高级前端工程师",
      period: "2021.06 - 至今",
      description: "负责公司核心产品的前端架构设计和开发"
    },
    {
      company: "某互联网公司",
      position: "前端工程师",
      period: "2019.03 - 2021.05",
      description: "参与多个Web应用的开发和维护"
    }
  ],
  
  // 教育背景
  education: [
    {
      school: "某某大学",
      degree: "计算机科学与技术 学士",
      period: "2015.09 - 2019.06",
      description: "主修课程：数据结构、算法、软件工程"
    }
  ]
};
```

### 2.3 添加项目

在 `src/config/site.config.ts` 中添加项目信息：

```typescript
projects: [
  {
    title: "项目名称",
    description: "项目的详细描述，介绍项目的主要功能和特点",
    image: "/images/project1.jpg",  // 项目截图
    tags: ["React", "TypeScript", "Node.js"],
    github: "https://github.com/yourusername/project1",
    demo: "https://project1-demo.com",  // 可选
    featured: true  // 设为精选项目，会在首页展示
  },
  {
    title: "另一个项目",
    description: "这是另一个项目的描述",
    image: "/images/project2.jpg",
    tags: ["Vue.js", "Python", "Docker"],
    github: "https://github.com/yourusername/project2",
    featured: false
  }
]
```

---

## 3. 主题和样式定制

### 3.1 修改主题颜色

编辑 `tailwind.config.js` 文件：

```javascript
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // 主色调
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',  // 主色
          600: '#2563eb',
          900: '#1e3a8a'
        },
        // 深色模式背景
        dark: {
          100: '#1a1a1a',
          200: '#2d2d2d',
          300: '#404040'
        },
        // 浅色模式背景
        light: {
          100: '#ffffff',
          200: '#f8fafc',
          300: '#f1f5f9'
        }
      },
      fontFamily: {
        // 自定义字体
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace']
      }
    }
  },
  plugins: []
};
```

### 3.2 自定义组件样式

在 `src/index.css` 中添加全局样式：

```css
/* 全局样式 */
@layer base {
  body {
    @apply text-gray-900 dark:text-gray-100;
    @apply bg-white dark:bg-gray-900;
  }
  
  /* 自定义滚动条 */
  ::-webkit-scrollbar {
    width: 8px;
  }
  
  ::-webkit-scrollbar-track {
    @apply bg-gray-100 dark:bg-gray-800;
  }
  
  ::-webkit-scrollbar-thumb {
    @apply bg-gray-400 dark:bg-gray-600 rounded;
  }
  
  /* 代码块样式 */
  pre {
    @apply bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto;
  }
  
  code {
    @apply bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm;
  }
}

/* 自定义动画 */
@layer utilities {
  .animate-fade-in {
    animation: fadeIn 0.5s ease-in-out;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
}
```

### 3.3 修改布局结构

编辑页面组件，例如修改 `src/pages/Home.tsx`：

```tsx
// 修改首页布局
const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero 区域 */}
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <img 
            src={siteConfig.author.avatar} 
            alt="头像"
            className="w-32 h-32 rounded-full mx-auto mb-6"
          />
          <h1 className="text-5xl font-bold mb-4">
            {siteConfig.author.name}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            {siteConfig.author.bio}
          </p>
          {/* 社交链接 */}
          <div className="flex justify-center space-x-4">
            {Object.entries(siteConfig.social).map(([key, url]) => (
              <a key={key} href={url} className="text-gray-500 hover:text-primary-500">
                {/* 社交图标 */}
              </a>
            ))}
          </div>
        </div>
      </section>
      
      {/* 其他内容区域 */}
      {/* ... */}
    </div>
  );
};
```

---

## 4. 部署配置

### 4.1 GitHub Pages 部署

#### 方法一：GitHub Actions 自动部署（推荐）

项目已包含 `.github/workflows/deploy.yml` 文件：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
      env:
        VITE_BASE_URL: '/your-repo-name'
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

**配置步骤：**

1. 在 GitHub 仓库设置中启用 GitHub Pages
2. 设置 Source 为 "GitHub Actions"
3. 修改 `vite.config.ts` 中的 base 路径：

```typescript
export default defineConfig({
  base: '/your-repo-name/',  // 替换为你的仓库名
  // ... 其他配置
});
```

4. 推送代码到 main 分支，自动触发部署

#### 方法二：手动部署

```bash
# 构建项目
npm run build

# 部署到 GitHub Pages
npm run deploy:gh-pages
```

### 4.2 Vercel 部署

1. 安装 Vercel CLI：
```bash
npm i -g vercel
```

2. 部署：
```bash
npm run deploy:vercel
```

3. 或者通过 GitHub 集成：
   - 登录 [vercel.com](https://vercel.com)
   - 导入 GitHub 仓库
   - 自动部署

---

## 5. SEO优化

### 5.1 配置站点地图

在 `vite.config.ts` 中添加：

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { sitemapPlugin } from 'vite-plugin-sitemap';

export default defineConfig({
  plugins: [
    react(),
    sitemapPlugin({
      hostname: 'https://your-domain.com',
      dynamicRoutes: [
        '/posts',
        '/projects',
        '/about'
      ]
    })
  ]
});
```

### 5.2 配置 robots.txt

在 `public/robots.txt` 中添加：

```
User-agent: *
Allow: /

Sitemap: https://your-domain.com/sitemap.xml
```

### 5.3 页面 SEO 配置

在每个页面组件中使用 SEO 组件：

```tsx
import { SEO } from '../components/SEO';

const PostDetail = () => {
  return (
    <>
      <SEO
        title="文章标题 - 你的个人主页"
        description="文章摘要描述"
        keywords={["React", "TypeScript", "前端开发"]}
        image="/images/post-cover.jpg"
        url="https://your-domain.com/posts/post-slug"
      />
      {/* 页面内容 */}
    </>
  );
};
```

### 5.4 结构化数据

在 `src/components/SEO.tsx` 中添加 JSON-LD：

```tsx
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": siteConfig.author.name,
  "url": siteConfig.url,
  "jobTitle": siteConfig.author.position,
  "sameAs": [
    siteConfig.social.github,
    siteConfig.social.twitter,
    siteConfig.social.linkedin
  ]
};

// 在组件中添加
<script type="application/ld+json">
  {JSON.stringify(structuredData)}
</script>
```

---

## 6. 评论系统集成

### 6.1 配置 utterances

1. 在 GitHub 上创建一个公开仓库（如 `blog-comments`）
2. 安装 [utterances app](https://github.com/apps/utterances)
3. 修改 `src/pages/PostDetail.tsx`：

```tsx
import { Comments } from '../components/Comments';

const PostDetail = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* 文章内容 */}
      
      {/* 评论区 */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-8">评论</h2>
        <Comments
          repo="your-username/blog-comments"  // 替换为你的仓库
          theme={isDark ? 'github-dark' : 'github-light'}
          issueTerm="pathname"
          label="💬"
        />
      </div>
    </div>
  );
};
```

### 6.2 配置 giscus（替代方案）

如果想要更现代的评论系统，可以使用 giscus：

```tsx
import Giscus from '@giscus/react';

const Comments = () => {
  return (
    <Giscus
      repo="your-username/blog-comments"
      repoId="你的仓库ID"
      category="General"
      categoryId="分类ID"
      mapping="pathname"
      reactionsEnabled="1"
      emitMetadata="0"
      theme={isDark ? 'dark' : 'light'}
    />
  );
};
```

---

## 7. 常见问题解决

### 7.1 构建失败

**问题：** `npm run build` 报错

**解决方案：**

1. 检查 TypeScript 错误：
```bash
npm run type-check
```

2. 清除缓存重新安装：
```bash
rm -rf node_modules package-lock.json
npm install
```

3. 检查内存使用：
```bash
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

### 7.2 GitHub Pages 404 错误

**问题：** 部署后页面显示 404

**解决方案：**

1. 检查 `vite.config.ts` 中的 base 路径：
```typescript
export default defineConfig({
  base: '/your-repo-name/',
  // ...
});
```

2. 确保仓库设置为 GitHub Pages
3. 等待几分钟让 GitHub Pages 更新

### 7.3 评论系统不工作

**问题：** utterances 无法加载

**解决方案：**

1. 确保仓库是公开的
2. 检查仓库名称是否正确
3. 确认 utterances app 已安装
4. 检查浏览器控制台错误信息

### 7.4 深色模式闪烁

**问题：** 页面加载时出现主题闪烁

**解决方案：**

在 `src/hooks/useTheme.ts` 中添加：

```typescript
// 防止闪烁的脚本
const preventFlash = () => {
  const theme = localStorage.getItem('theme');
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  }
};

// 在 useEffect 中调用
useEffect(() => {
  preventFlash();
}, []);
```

### 7.5 构建产物过大

**问题：** 构建后的文件太大

**解决方案：**

1. 分析打包大小：
```bash
npm run build
npx vite-bundle-visualizer
```

2. 优化策略：
   - 使用动态导入：
   ```typescript
   const MarkdownComponent = lazy(() => import('./components/Markdown'));
   ```
   
   - 优化图片：
   ```typescript
   // 使用 WebP 格式
   import Image from 'next/image';
   
   <Image
     src="/images/photo.webp"
     alt="照片"
     width={400}
     height={300}
     loading="lazy"
   />
   ```

---

## 📞 获取更多帮助

如果遇到其他问题，可以通过以下方式获取帮助：

1. 查看项目 Issues
2. 提交新的 Issue
3. 查看相关文档：
   - [Vite 文档](https://vitejs.dev/)
   - [React 文档](https://react.dev/)
   - [Tailwind CSS 文档](https://tailwindcss.com/)
   - [utterances 文档](https://utteranc.es/)

---

*最后更新：2024年1月*