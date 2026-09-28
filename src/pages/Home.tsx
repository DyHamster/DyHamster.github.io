import { getSection } from '../config/sections'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import EntryList from '../components/EntryList'
import { siteConfig } from '../config/site.config'
import { getEntries } from '../lib/posts'
export default function Home() {
  const noteTopics = getSection('notes')?.topics ?? []
  const entries = getEntries()
  const featured = entries.filter(entry => entry.featured)
  return <>
    <SEO title="首页" description={siteConfig.description} />
    <section className="home-intro">
      <div className="eyebrow"><span className="status-dot" /> PERSONAL NOTEBOOK</div>
      <h1>学习，记录，<br /><span>慢慢理解。</span></h1>
      <div className="intro-bottom"><p>我是 DyHamster，南京大学在读学生。<br />目前对强化学习比较感兴趣，这里记录学习笔记、实验和一些思考。</p><Link className="text-link" to="/about">关于我 <span>↗</span></Link></div>
    </section>
    <section className="home-section">
      <div className="section-heading"><div><span className="eyebrow">01 / NOTEBOOK</span><h2>沿着问题，积累笔记</h2></div><Link className="text-link" to="/notes">全部笔记 ↗</Link></div>
      <div className="topic-grid">{noteTopics.map((topic, index) => {
        const count = getEntries('notes').filter(note => note.topic === topic.title).length
        return <Link key={topic.id} className="topic-link" to={`/notes?topic=${encodeURIComponent(topic.title)}`}><span className="topic-number">0{index + 1}</span><div><span className="topic-en">{topic.subtitle}</span><h3>{topic.title}</h3><p>{topic.description}</p><span className="topic-count">{count ? `${count} 篇笔记` : '等待第一篇记录'}</span></div><span className="topic-arrow" aria-hidden="true">↗</span></Link>
      })}</div>
    </section>
    {featured.length > 0 && <section className="home-section"><div className="section-heading"><div><span className="eyebrow">SELECTED</span><h2>值得回看的记录</h2></div></div><EntryList entries={featured.slice(0, 3)} /></section>}
    <section className="home-section"><div className="section-heading"><div><span className="eyebrow">02 / RECENT</span><h2>最近更新</h2></div><Link className="text-link" to="/posts">文章归档 ↗</Link></div>
      {entries.length ? <EntryList entries={entries.slice(0, 5)} /> : <div className="empty-state"><span className="empty-mark">—</span><h3>留一点空白，给接下来的学习。</h3><p>新的笔记、文章和实验记录，会在这里陆续出现。</p></div>}
    </section>
    <aside className="home-colophon"><span>ON THIS SITE</span><p>不必每次都有结论。把问题记下来，也是一种进展。</p></aside>
  </>
}
