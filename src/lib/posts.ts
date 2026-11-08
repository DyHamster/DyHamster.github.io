import fm from 'front-matter'
import { getSection } from '../config/sections'
import type { Post } from '../data/content'

const files = import.meta.glob(['../content/**/*.md', '!../content/**/README.md'], { eager: true, query: '?raw', import: 'default' }) as Record<string, string>
const text = (value: unknown, fallback = '') => typeof value === 'string' ? value : fallback
const link = (value: unknown) => typeof value === 'string' && /^(https?:\/\/|\/(?!\/)|#\/)/.test(value) ? value : undefined
const date = (value: unknown, fallback: string) => {
  const input = value instanceof Date ? value.toISOString().slice(0, 10) : text(value)
  return /^\d{4}-\d{2}-\d{2}$/.test(input) && !Number.isNaN(Date.parse(input)) ? input : fallback
}

const entries: Post[] = Object.entries(files).flatMap(([path, raw]) => {
  try {
    if (!raw) return []
    const { attributes: data, body } = fm<Record<string, unknown>>(raw)
    if (data.draft === true) return []
    const match = path.match(/content\/([^/]+)\/(.+)\.md$/)!
    if (!match || !getSection(match[1])) return []
    const published = date(data.date, '')
    if (!published || !text(data.title)) {
      console.warn(`Skipped content with missing title or valid date: ${path}`)
      return []
    }
    const units = (body.match(/[\u3400-\u9fff]/g)?.length ?? 0) + (body.match(/[a-zA-Z0-9]+/g)?.length ?? 0)
    return [{
      slug: text(data.slug, match[2]), kind: match[1] as Post['kind'],
      title: text(data.title), date: published, updated: date(data.updated, published),
      excerpt: text(data.excerpt), content: body,
      readTime: Math.max(1, Math.ceil(units / 300)),
      tags: Array.isArray(data.tags) ? data.tags.filter((tag): tag is string => typeof tag === 'string') : [],
      topic: text(data.topic, '未分类'), status: text(data.status, '持续更新'),
      coverImage: text(data.coverImage, text(data.cover)) || undefined,
      featured: data.featured === true,
      demoUrl: link(data.demoUrl), sourceUrl: link(data.sourceUrl ?? data.githubUrl),
    }]
  } catch (error) {
    console.warn(`Could not parse ${path}`, error)
    return []
  }
}).sort((a, b) => b.updated.localeCompare(a.updated))

export const getEntries = (kind?: Post['kind']) => kind ? entries.filter(entry => entry.kind === kind) : entries
export const getAllPosts = () => getEntries('posts')
export const getPostBySlug = (slug: string) => getAllPosts().find(post => post.slug === slug)
export const entryURL = (entry: Post) => `/${entry.kind}/${entry.slug.split('/').map(encodeURIComponent).join('/')}`
