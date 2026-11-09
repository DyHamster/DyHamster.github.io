import { Link } from "react-router-dom";
import { ArrowDown, ArrowUpRight, NotebookPen } from "lucide-react";
import SectionIcon from "../components/SectionIcon";
import SEO from "../components/SEO";
import EntryList from "../components/EntryList";
import ForestScene from "../components/ForestScene";
import { siteConfig } from "../config/site.config";
import { sections } from "../config/sections";
import { getEntries, entryURL } from "../lib/posts";
export default function Home() {
  const entries = getEntries();
  const featured = entries.filter((entry) => entry.featured).slice(0, 2);
  const recent = entries
    .filter((entry) => !featured.includes(entry))
    .slice(0, 4);
  const noteSection = sections.find((section) => section.id === "notes");
  return (
    <>
      <SEO title="首页" description={siteConfig.description} />
      <section
        className="forest-hero hero"
        data-enter="off"
        data-big-scene="forest"
        aria-labelledby="home-title"
      >
        <ForestScene priority />
        <div className="hero-light" />
        <div className="hero-content shell wrap">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="tiny-leaf" /> DyHamster · 南京大学学生
            </div>
            <h1 id="home-title">
              把日子，
              <br />
              写进<span className="forest-word">森林</span>里
              <span className="title-period">。</span>
            </h1>
            <p className="hero-intro">
              我在学强化学习，也读论文、整理数学笔记。
              <br />
              这里放推导、实验过程，还有暂时没想明白的问题。
            </p>
            <div className="hero-actions">
              <Link className="btn button primary" to="/notes">
                <NotebookPen size={17} /> 阅读笔记 <ArrowUpRight size={16} />
              </Link>
              <Link className="btn button glass" to="/about">
                关于我 <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
        <div className="hero-bottom shell">
          <button
            className="scroll-invite"
            onClick={() =>
              document.getElementById("forest-paths")?.scrollIntoView({
                behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
                  ? "instant"
                  : "smooth",
              })
            }
          >
            <span>浏览栏目</span>
            <ArrowDown size={14} />
          </button>
          <span className="scene-index">
            01 <i /> 午后的森林
          </span>
        </div>
      </section>
      <section className="paths-section shell" id="forest-paths">
        <div className="section-heading">
          <h2>笔记、文章与实验</h2>
        </div>
        <div className="path-grid">
          {sections.map((section) => {
            return (
              <Link
                className={`card path-card path-${section.id}`}
                to={`/${section.id}`}
                key={section.id}
              >
                <div className="path-card-top">
                  <span className="path-icon">
                    <SectionIcon kind={section.id} />
                  </span>
                </div>
                <h3>{section.title}</h3>
                <p>{section.summary ?? section.description}</p>
                <div className="path-card-bottom">
                  <span>
                    {getEntries(section.id).length
                      ? `${getEntries(section.id).length} 篇记录`
                      : `查看${section.navTitle ?? section.title}`}
                  </span>
                  <ArrowUpRight size={19} />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
      {entries.length ? (
        <section className="updates-section shell">
          <div className="section-heading">
            <h2>{featured.length ? "精选与更新" : "最近更新"}</h2>
            <Link className="text-link" to="/notes">
              阅读笔记 <ArrowUpRight size={16} />
            </Link>
          </div>
          {featured.length > 0 && (
            <div className="featured-grid">
              {featured.map((entry) => (
                <Link
                  to={entryURL(entry)}
                  className="featured-card card"
                  key={entry.kind + entry.slug}
                >
                  {entry.coverImage && (
                    <img src={entry.coverImage} alt="" loading="lazy" />
                  )}
                  <span className="entry-category">精选 · {entry.topic}</span>
                  <h3>{entry.title}</h3>
                  <p>{entry.excerpt}</p>
                  <span className="entry-meta">{entry.updated} ↗</span>
                </Link>
              ))}
            </div>
          )}
          {recent.length > 0 && <EntryList entries={recent} />}
        </section>
      ) : (
        <section className="home-topics shell" aria-labelledby="topics-title">
          <div>
            <h2 id="topics-title">按主题阅读</h2>
            <p>公开笔记还在整理，可以先看看主题分类。</p>
          </div>
          <nav className="focus-topics" aria-label="学习主题">
            {noteSection?.topics?.map((topic) => (
              <Link
                key={topic.id}
                to={`/notes?topic=${encodeURIComponent(topic.title)}`}
              >
                {topic.title}
                <ArrowUpRight size={15} />
              </Link>
            ))}
          </nav>
        </section>
      )}
      <section className="cottage-section">
        <ForestScene scene="cottage" />
        <div className="cottage-shade" />
        <div className="shell wrap cottage-content">
          <h2>
            林间有一盏灯，
            <br />
            为好奇的人亮着。
          </h2>
          <p>有想讨论的问题，或者发现笔记里的疏漏，都欢迎告诉我。</p>
          <Link to="/about" className="btn button warm">
            关于我 <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
    </>
  );
}
