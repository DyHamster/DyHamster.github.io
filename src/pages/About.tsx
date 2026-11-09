import SectionIcon from "../components/SectionIcon";
import SEO from "../components/SEO";
import { siteConfig } from "../config/site.config";
import { Link } from "react-router-dom";
import { Mail, ArrowUpRight } from "lucide-react";
export default function About() {
  return (
    <>
      <SEO title="关于" description={siteConfig.description} />
      <header className="page-heading about-heading">
        <span className="eyebrow">关于我</span>
        <h1>你好，我是 DyHamster。</h1>
        <p>南京大学学生，主要关注强化学习。</p>
      </header>
      <div className="about-grid">
        <article className="about-content paper prose">
          <span className="about-avatar">
            <SectionIcon kind="about" size={36} />
          </span>
          <h2>怎么记录</h2>
          <p>
            我想把学习过程留下来：概念背后的直觉、推导需要的条件、读论文时的疑问，还有实验与预期之间的距离。
          </p>
          <p>理解还会变，笔记也会继续补。暂时没有答案的问题，就先留在这里。</p>
          <h2>从哪里开始</h2>
          <p>
            查找一个概念，可以从<Link to="/notes">学习笔记</Link>
            开始；想读完整讨论，看看<Link to="/posts">文章</Link>
            ；实现和复现过程放在<Link to="/experiments">实验</Link>里。
          </p>
        </article>
        <aside className="about-aside">
          <div className="mailbox paper">
            <Mail size={23} strokeWidth={1.2} />
            <h2>联系我</h2>
            <p>笔记里有错误，或有想交流的问题，都欢迎发邮件。</p>
            <a href={`mailto:${siteConfig.social.email}`}>
              <Mail size={15} /> 发邮件 <ArrowUpRight size={15} />
            </a>
            <a href={siteConfig.social.github} target="_blank" rel="noreferrer">
              <span className="github-mark" aria-hidden="true" /> GitHub{" "}
              <ArrowUpRight size={15} />
            </a>
          </div>
        </aside>
      </div>
    </>
  );
}
