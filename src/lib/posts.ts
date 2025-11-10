import fm from 'front-matter'
import type { Post } from '../data/content'

// 计算阅读时间（约200词/分钟）
const calcReadTime = (text: string): number => {
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

// 从 Markdown 文件中加载文章
const loadPostsFromMarkdown = (): Post[] => {
  const files = import.meta.glob('../content/posts/**/*.md', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>

  const posts: Post[] = Object.entries(files).map(([path, raw]) => {
    const parsed = fm(raw as string)
    const data = parsed.attributes as any
    const content = parsed.body as string
    const slugMatch = path.match(/([^/]+)\.md$/)
    const slug = slugMatch ? slugMatch[1] : ''

    const title = data?.title ?? slug
    const date = data?.date ?? new Date().toISOString().slice(0, 10)
    const tags = Array.isArray(data?.tags) ? data.tags : []
    const excerpt = data?.excerpt ?? content.slice(0, 140)
    const coverImage = data?.coverImage ?? data?.cover

    return {
      slug,
      title,
      excerpt,
      content,
      date,
      readTime: calcReadTime(content),
      tags,
      coverImage,
    }
  })

  // 按日期倒序
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  return posts
}

let cache: Post[] | null = null

export const getAllPosts = (): Post[] => {
  if (!cache) {
    cache = loadPostsFromMarkdown()
  }
  return cache
}

export const getPostBySlug = (slug: string): Post | undefined => {
  return getAllPosts().find(p => p.slug === slug)
}