export interface Post {
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  updated: string
  readTime: number
  tags: string[]
  coverImage?: string
  kind: string
  topic: string
  status: string
  featured: boolean
}
