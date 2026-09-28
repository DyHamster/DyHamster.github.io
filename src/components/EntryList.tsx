import { getSection } from '../config/sections'
import { Link } from 'react-router-dom'
import type { Post } from '../data/content'
import { entryURL } from '../lib/posts'
export default function EntryList({ entries }: { entries: Post[] }) {
  return <div className="entry-list">{entries.map(entry => <Link className="entry-row" key={`${entry.kind}/${entry.slug}`} to={entryURL(entry)}>
    <time dateTime={entry.updated}>{entry.updated.split('-').join('.')}</time>
    <div><h3>{entry.title}</h3>{entry.excerpt && <p>{entry.excerpt}</p>}<span className="entry-meta">{getSection(entry.kind)?.topics ? entry.topic : getSection(entry.kind)?.title} · {entry.readTime} 分钟阅读</span></div><span className="entry-arrow" aria-hidden="true">↗</span>
  </Link>)}</div>
}
