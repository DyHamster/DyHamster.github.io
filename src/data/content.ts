// 文章数据
export interface Post {
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  readTime: number
  tags: string[]
  coverImage?: string
}

// 项目数据
export interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  githubUrl?: string
  demoUrl?: string
  featured: boolean
}

// 模拟文章数据
export const posts: Post[] = [
  {
    slug: 'building-modern-web-apps',
    title: '构建现代化Web应用的最佳实践',
    excerpt: '探讨如何使用最新的技术栈构建高性能、可维护的Web应用程序，包括前端框架选择、状态管理、性能优化等方面。',
    content: `# 构建现代化Web应用的最佳实践

在当今快速发展的技术环境中，构建现代化Web应用需要考虑多个方面。本文将分享一些最佳实践和经验。

## 技术栈选择

选择合适的技术栈是成功项目的基础。React、Vue和Angular各有优势，需要根据项目需求和团队技能来选择。

## 性能优化

性能优化是用户体验的关键。包括代码分割、懒加载、缓存策略等。

## 结论

构建现代化应用需要持续学习和实践，保持对新技术的关注。`,
    date: '2024-01-15',
    readTime: 5,
    tags: ['React', 'JavaScript', 'Performance'],
    coverImage: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Modern%20web%20application%20development%2C%20clean%20minimalist%20design%2C%20code%20editor%20interface%2C%20blue%20accent%20colors&image_size=landscape_16_9'
  },
  {
    slug: 'typescript-best-practices',
    title: 'TypeScript开发最佳实践',
    excerpt: '分享在大型项目中使用TypeScript的经验，包括类型定义、配置优化、团队协作等方面的最佳实践。',
    content: `# TypeScript开发最佳实践

TypeScript为JavaScript带来了类型安全，但要在大型项目中发挥其最大价值，需要遵循一些最佳实践。

## 类型定义策略

合理使用接口、类型别名和泛型，建立清晰的类型层次结构。

## 配置优化

根据项目需求调整tsconfig.json配置，平衡类型严格性和开发效率。

## 团队协作

建立代码规范，使用ESLint和Prettier保持代码一致性。`,
    date: '2024-01-10',
    readTime: 8,
    tags: ['TypeScript', 'JavaScript', 'Best Practices']
  },
  {
    slug: 'react-hooks-deep-dive',
    title: 'React Hooks深度解析',
    excerpt: '深入理解React Hooks的工作原理，包括useState、useEffect、自定义Hooks等，以及如何在实际项目中正确使用。',
    content: `# React Hooks深度解析

React Hooks改变了我们编写React组件的方式，让函数组件拥有了状态管理和生命周期的能力。

## useState和useEffect

这两个最基本的Hooks是React函数组件的核心。

## 自定义Hooks

通过自定义Hooks可以提取组件逻辑，实现代码复用。`,
    date: '2024-01-05',
    readTime: 10,
    tags: ['React', 'Hooks', 'JavaScript']
  }
]

// 模拟项目数据
export const projects: Project[] = [
  {
    id: '1',
    title: '个人博客系统',
    description: '基于React和TypeScript构建的现代化个人博客系统，支持Markdown编辑、标签管理、评论系统等功能。',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Modern%20personal%20blog%20interface%2C%20clean%20design%2C%20reading%20experience%2C%20minimalist%20layout&image_size=square',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Markdown'],
    githubUrl: 'https://github.com/example/blog',
    demoUrl: 'https://blog.example.com',
    featured: true
  },
  {
    id: '2',
    title: '任务管理应用',
    description: '一个简洁高效的任务管理工具，支持项目分类、标签管理、进度跟踪等功能，帮助提升工作效率。',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Task%20management%20app%20interface%2C%20clean%20UI%2C%20productivity%20tools%2C%20minimalist%20design&image_size=square',
    tags: ['Vue.js', 'Node.js', 'MongoDB', 'Express'],
    githubUrl: 'https://github.com/example/task-manager',
    featured: true
  },
  {
    id: '3',
    title: '数据可视化平台',
    description: '基于D3.js和React的数据可视化平台，提供丰富的图表类型和交互功能，帮助用户更好地理解数据。',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Data%20visualization%20dashboard%2C%20charts%20and%20graphs%2C%20modern%20UI%2C%20analytics%20interface&image_size=square',
    tags: ['React', 'D3.js', 'Python', 'Flask'],
    githubUrl: 'https://github.com/example/data-viz',
    featured: false
  }
]