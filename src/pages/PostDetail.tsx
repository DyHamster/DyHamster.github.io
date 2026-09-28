import { getSection } from '../config/sections'
import { Link, useParams } from 'react-router-dom'
import { useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'
import type { Root } from 'mdast'
import type { Post } from '../data/content'
import { getEntries } from '../lib/posts'
import SEO from '../components/SEO'
import EntryList from '../components/EntryList'

// Generate heading IDs and the table of contents from the same Markdown tree.
function outlinePlugin(outline: { id: string; text: string; depth: number }[]) {
  return () => (tree: Root) => {
    outline.length = 0
    const plainText = (node: { value?: string; children?: unknown[] }): string => node.value ?? (node.children ?? []).map(child => plainText(child as typeof node)).join('')
    tree.children.forEach(node => {
      if (node.type !== 'heading') return
      const base = plainText(node).toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '') || 'section'
      let id = base
      let suffix = 1
      while (outline.some(item => item.id === id)) id = `${base}-${suffix++}`
      node.data = { ...node.data, hProperties: { ...node.data?.hProperties, id } }
      outline.push({ id, text: plainText(node), depth: node.depth })
    })
  }
}
function Contents({ outline }: { outline: { id: string; text: string; depth: number }[] }) {
  return outline.length > 0 ? <aside className="article-toc" aria-label="正文目录"><span className="eyebrow">本页目录</span><ol>{outline.map(item => <li key={item.id} className={item.depth > 2 ? 'toc-indent' : ''}><a href={`#${item.id}`} onClick={event => {
    event.preventDefault()
    const heading = document.getElementById(item.id)
    heading?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
    heading?.setAttribute('tabindex', '-1')
    heading?.focus({ preventScroll: true })
  }}>{item.text}</a></li>)}</ol></aside> : null
}
export default function PostDetail({ kind = 'posts' }: { kind?: Post['kind'] }) {
  const params = useParams()
  const entry = getEntries(kind).find(item => item.slug === params['*'])
  const section = getSection(kind)!
  const label = section.title
  const outline = useMemo(() => [] as { id: string; text: string; depth: number }[], [])
  // ReactMarkdown processes synchronously here, so the outline is available
  // before the separate Contents component is rendered.
  const markdown = useMemo(() => entry ? ReactMarkdown({
    children: entry.content,
    remarkPlugins: [remarkGfm, remarkMath, outlinePlugin(outline)],
    rehypePlugins: [rehypeKatex],
    components: {
      a: ({ href, children }) => <a href={href} onClick={event => {
        if (href?.startsWith('#') && !href.startsWith('#/')) {
          const target = document.getElementById(href.slice(1))
          if (target) { event.preventDefault(); target.scrollIntoView() }
        }
      }} {...(href?.startsWith('https://') ? { target: '_blank', rel: 'noreferrer' } : {})}>{children}</a>,
    },
  }) : null, [entry, outline])
  if (!entry) return <div className="page-heading"><SEO title="记录未找到" noindex /><span className="eyebrow">NOT FOUND</span><h1>这篇记录还未公开，或已被移动。</h1><Link className="text-link" to={`/${kind}`}>返回{label} ↗</Link></div>
  const related = getEntries(kind).filter(item => item.slug !== entry.slug && (item.topic === entry.topic || item.tags.some(tag => entry.tags.includes(tag)))).slice(0, 3)
  return <><SEO title={entry.title} description={entry.excerpt} type="article" publishedTime={entry.date} modifiedTime={entry.updated} keywords={entry.tags.join(', ')} />
    <header className="page-heading article-heading"><Link className="text-link" to={`/${kind}`}>← {label}</Link><h1>{entry.title}</h1>{entry.excerpt && <p>{entry.excerpt}</p>}<div className="article-meta"><time dateTime={entry.updated}>更新于 {entry.updated}</time><span>{entry.readTime} 分钟阅读</span>{section.showStatus && <span>{entry.status}</span>}</div><div className="article-tags">{entry.tags.map(tag => <Link key={tag} to={`/${kind}?tag=${encodeURIComponent(tag)}`}>#{tag}</Link>)}</div></header>
    <div className="reading-layout"><article className="prose">{markdown}</article><Contents outline={outline} /></div>
    {related.length > 0 && <section className="home-section"><div className="section-heading"><h2>接着阅读</h2></div><EntryList entries={related} /></section>}
    <p className="article-end">记录会随着理解而更新。如果发现错误，欢迎通过页脚的联系方式告诉我。</p>
  </>
}
