import { Link } from "react-router-dom";
import { ArrowUpRight, FlaskConical, Play, Github } from "lucide-react";
import type { Post } from "../data/content";
import { entryURL } from "../lib/posts";
export default function ExperimentGrid({ entries }: { entries: Post[] }) {
  return (
    <div className="experiment-grid">
      {entries.map((entry) => (
        <article className="experiment-card" key={entry.slug}>
          <Link to={entryURL(entry)} className="experiment-preview">
            {entry.coverImage ? (
              <img src={entry.coverImage} alt={entry.title} loading="lazy" />
            ) : (
              <>
                <span className="preview-grid" />
                <FlaskConical size={48} strokeWidth={1} />
                <span>实验过程与结果</span>
              </>
            )}
            <span className="experiment-type">
              {entry.demoUrl ? "可体验作品" : "过程记录"}
            </span>
          </Link>
          <div className="experiment-info">
            <time dateTime={entry.updated}>{entry.updated}</time>
            <h2>
              <Link to={entryURL(entry)}>{entry.title}</Link>
            </h2>
            <p>{entry.excerpt}</p>
            <div className="entry-meta">
              {entry.tags.map((tag) => (
                <span key={tag}>#{tag}</span>
              ))}
            </div>
            <div className="experiment-actions">
              <Link to={entryURL(entry)}>
                阅读过程 <ArrowUpRight size={14} />
              </Link>
              {entry.demoUrl && (
                <a href={entry.demoUrl} target="_blank" rel="noreferrer">
                  <Play size={13} /> 开始体验
                </a>
              )}
              {entry.sourceUrl && (
                <a
                  href={entry.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${entry.title} 源码`}
                >
                  <Github size={16} />
                </a>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
