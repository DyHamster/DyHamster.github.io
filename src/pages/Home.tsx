import { Link } from "react-router-dom";
import {
  ArrowDown,
  ArrowUpRight,
  BookOpen,
  NotebookPen,
  FlaskConical,
  Leaf,
  Sprout,
} from "lucide-react";
import SEO from "../components/SEO";
import EntryList from "../components/EntryList";
import ForestScene from "../components/ForestScene";
import { siteConfig } from "../config/site.config";
import { sections } from "../config/sections";
import { getEntries, entryURL } from "../lib/posts";
const icons = {
  notes: NotebookPen,
  posts: BookOpen,
  experiments: FlaskConical,
};
const subtitles = {
  notes: "强化学习、数学基础与论文阅读，按主题持续整理。",
  posts: "围绕一个问题展开推导、分析和完整的思考。",
  experiments: "记录实现与复现过程，查看结果与可体验作品。",
};
export default function Home() {
  const entries = getEntries();
  const selected = [
    ...entries.filter((entry) => entry.featured),
    ...entries.filter((entry) => !entry.featured),
  ].slice(0, 3);
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
        <div className="hero-content shell">
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
              你好，我是 <strong>DyHamster</strong>。<br />
              一名对强化学习感兴趣的南京大学学生。
              <br />
              整理数学基础、论文阅读、实验与思考。
            </p>
            <div className="hero-actions">
              <Link className="btn button primary" to="/notes">
                <NotebookPen size={17} /> 阅读笔记 <ArrowUpRight size={16} />
              </Link>
              <Link className="btn button glass" to="/about">
                了解作者 <ArrowUpRight size={16} />
              </Link>
            </div>
            <div className="hero-footnote">
              <span /> 不急着抵达，先在这里坐一会儿。
            </div>
          </div>
        </div>
        <div className="scene-caption">
          <span>风经过树梢</span>
          <span>也翻过一页笔记</span>
          <Leaf size={15} strokeWidth={1} />
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
            <span>沿着小径，往里走走</span>
            <ArrowDown size={14} />
          </button>
          <span className="scene-index">
            01 <i /> 午后的森林
          </span>
        </div>
      </section>
      <section className="paths-section shell" id="forest-paths">
        <div className="section-heading">
          <div>
            <span className="eyebrow">THREE PATHS THROUGH THE WOODS</span>
            <h2>笔记、文章与实验</h2>
          </div>
          <p>按学习主题查找笔记，阅读长文，查看实验过程。</p>
        </div>
        <div className="path-grid">
          {sections.map((section, i) => {
            const Icon = icons[section.id] ?? BookOpen;
            return (
              <Link
                className={`card path-card path-${section.id}`}
                to={`/${section.id}`}
                key={section.id}
              >
                <div className="path-card-top">
                  <span className="path-icon">
                    <Icon size={24} strokeWidth={1.25} />
                  </span>
                  <span className="path-number">0{i + 1}</span>
                </div>
                <span className="eyebrow">{section.english}</span>
                <h3>{section.navTitle ?? section.title}</h3>
                <p>{subtitles[section.id] ?? section.description}</p>
                <div className="path-card-bottom">
                  <span>
                    {getEntries(section.id).length
                      ? `${getEntries(section.id).length} 篇记录`
                      : "暂无公开记录"}
                  </span>
                  <ArrowUpRight size={19} />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
      <section className="updates-section shell">
        <div className="section-heading">
          <div>
            <span className="eyebrow">RECENT GROWTH</span>
            <h2>最近更新</h2>
          </div>
          <Link className="text-link" to="/posts">
            去文章里看看 <ArrowUpRight size={15} />
          </Link>
        </div>
        {selected.length ? (
          <>
            <div className="featured-grid">
              {selected
                .filter((entry) => entry.featured)
                .map((entry) => (
                  <Link
                    to={entryURL(entry)}
                    className="featured-card"
                    key={entry.kind + entry.slug}
                  >
                    {entry.coverImage && (
                      <img src={entry.coverImage} alt="" loading="lazy" />
                    )}
                    <span className="eyebrow">精选 · {entry.topic}</span>
                    <h3>{entry.title}</h3>
                    <p>{entry.excerpt}</p>
                    <span className="entry-meta">{entry.updated} ↗</span>
                  </Link>
                ))}
            </div>
            <EntryList entries={entries.slice(0, 4)} />
          </>
        ) : (
          <div className="growth-empty">
            <span className="seed-icon">
              <Sprout size={36} strokeWidth={1} />
            </span>
            <div>
              <h3>目前关注：强化学习、数学与论文阅读</h3>
              <p>公开记录尚在整理。可以先按主题浏览，或了解我的学习方向。</p>
              <nav className="focus-topics" aria-label="当前学习主题">
                {sections
                  .find((section) => section.id === "notes")
                  ?.topics?.map((topic) => (
                    <Link
                      key={topic.id}
                      to={`/notes?topic=${encodeURIComponent(topic.title)}`}
                    >
                      {topic.title} ↗
                    </Link>
                  ))}
              </nav>
            </div>
            <Link className="text-link" to="/about">
              关于我 <ArrowUpRight size={16} />
            </Link>
          </div>
        )}
      </section>
      <section className="cottage-section">
        <ForestScene scene="cottage" />
        <div className="cottage-shade" />
        <div className="shell cottage-content">
          <span className="eyebrow">A LIGHT IN THE WOODS</span>
          <h2>
            林间有一盏灯，
            <br />
            为好奇的人亮着。
          </h2>
          <p>
            关于强化学习、数学、阅读，或是一个没想明白的问题。
            <br />
            很高兴在这片森林里，与你相遇。
          </p>
          <Link to="/about" className="btn button warm">
            了解作者 <ArrowUpRight size={17} />
          </Link>
          <span className="cottage-coordinate">02 — 傍晚，灯亮了。</span>
        </div>
      </section>
    </>
  );
}
