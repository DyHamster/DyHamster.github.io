import { useSearchParams } from 'react-router-dom'
import { getEntries } from '../lib/posts'
import type { Post } from '../data/content'
import { getSection } from '../config/sections'
import EntryList from '../components/EntryList'
import SEO from '../components/SEO'
export default function Posts({ kind = 'posts' }: { kind?: Post['kind'] }) {
  const section = getSection(kind)!
  const [params, setParams] = useSearchParams()
  const query = params.get('q') ?? ''
  const topic = params.get('topic') ?? ''
  const tag = params.get('tag') ?? ''
  const all = getEntries(kind)
  const entries = all.filter(entry => (!topic || entry.topic === topic) && (!tag || entry.tags.includes(tag)) && `${entry.title} ${entry.excerpt} ${entry.content} ${entry.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase()))
  const topics = [...new Set([...(section.topics ?? []).map(item => item.title), ...all.map(entry => entry.topic)])]
  const change = (key: string, value: string) => { const next = new URLSearchParams(params); next.delete('page'); if (value) next.set(key, value); else next.delete(key); setParams(next, { replace: true }) }
  const pageCount = Math.max(1, Math.ceil(entries.length / 10))
  const page = Math.min(pageCount, Math.max(1, Math.floor(Number(params.get('page'))) || 1))
  const visible = entries.slice((page - 1) * 10, page * 10)
  const goPage = (value: number) => { const next = new URLSearchParams(params); next.set('page', String(value)); setParams(next); window.scrollTo(0, 0) }
  return <><SEO title={section.title} description={section.description} /><header className="page-heading"><span className="eyebrow">{section.english}</span><h1>{section.title}</h1><p>{section.description}</p></header>
    {section.topics && <nav className="topic-filters" aria-label="笔记主题">{['', ...topics].map(item => <button key={item} aria-pressed={topic === item} onClick={() => change('topic', item)}>{item || '全部主题'}</button>)}</nav>}
    <div className="list-tools"><label className="search-label"><span>搜索</span><input aria-label={`搜索${section.title}`} type="search" value={query} onChange={event => change('q', event.target.value)} placeholder="标题、正文或关键词" /></label><span>{entries.length} 篇记录</span></div>
    {tag && <button className="text-link" onClick={() => change('tag', '')}>标签：{tag} ×</button>}
    {entries.length ? <EntryList entries={visible} /> : <div className="empty-state"><span className="empty-mark">—</span><h2>{query || tag ? '没有找到匹配的记录。' : section.empty}</h2><p>{query || tag ? '试试其他关键词，或清除筛选条件。' : '先把问题留下，让理解慢慢生长。'}</p>{(query || topic || tag) && <button className="text-link" onClick={() => setParams({})}>查看全部</button>}</div>}
    {pageCount > 1 && <nav className="pagination" aria-label="分页"><button disabled={page <= 1} onClick={() => goPage(page - 1)}>← 上一页</button><span>{page} / {pageCount}</span><button disabled={page >= pageCount} onClick={() => goPage(page + 1)}>下一页 →</button></nav>}
  </>
}
