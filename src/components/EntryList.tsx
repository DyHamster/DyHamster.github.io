import { Link } from "react-router-dom";
import { ArrowUpRight, Leaf } from "lucide-react";
import type { Post } from "../data/content";
import { entryURL } from "../lib/posts";
import { getSection } from "../config/sections";
export default function EntryList({ entries }: { entries: Post[] }) {
  return (
    <div className="entry-list">
      {entries.map((entry) => (
        <Link
          className={`entry-row entry-${entry.kind}`}
          key={`${entry.kind}/${entry.slug}`}
          to={entryURL(entry)}
        >
          <time dateTime={entry.updated}>
            {entry.updated.split("-").join(".")}
          </time>
          <div className="entry-body">
            <span className="entry-category">
              <Leaf size={11} />{" "}
              {getSection(entry.kind)?.topics
                ? entry.topic
                : getSection(entry.kind)?.title}
            </span>
            <h3>{entry.title}</h3>
            {entry.excerpt && <p>{entry.excerpt}</p>}
            <div className="entry-meta">
              <span>{entry.readTime} 分钟阅读</span>
              {entry.tags.slice(0, 3).map((tag) => (
                <span key={tag}>#{tag}</span>
              ))}
            </div>
          </div>
          {entry.coverImage && (
            <img
              className="entry-cover"
              src={entry.coverImage}
              alt=""
              loading="lazy"
            />
          )}
          <ArrowUpRight className="entry-arrow" size={18} />
        </Link>
      ))}
    </div>
  );
}
