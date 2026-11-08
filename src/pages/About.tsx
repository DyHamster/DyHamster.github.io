import SEO from "../components/SEO";
import { siteConfig } from "../config/site.config";
import { Link } from "react-router-dom";
import { Leaf, Mail, Github, ArrowUpRight } from "lucide-react";
export default function About() {
  return (
    <>
      <SEO title="关于" description={siteConfig.description} />
      <header className="page-heading about-heading">
        <span className="eyebrow">傍晚小屋 · 关于作者</span>
        <h1>很高兴，你找到这里。</h1>
        <p>森林里的一盏灯，也是一个人的学习与生活。</p>
      </header>
      <div className="about-grid">
        <article className="about-content paper prose">
          <span className="about-avatar">
            <Leaf size={32} strokeWidth={1.1} />
          </span>
          <span className="eyebrow">HELLO, I'M DYHAMSTER</span>
          <h2>你好，我是 DyHamster。</h2>
          <p>南京大学在读学生，目前对强化学习比较感兴趣。</p>
          <p>
            这个网站是一个个人学习空间，用来整理笔记、记录实验，也存放一些经过思考的文字。这里收集学习过程中逐渐清楚的问题，也保留还没想明白的部分。
          </p>
          <h2>在这里，记录什么</h2>
          <p>
            概念背后的直觉，推导中容易遗漏的一步，读论文时冒出来的问题，以及实验与预期之间的距离。
          </p>
          <p>
            笔记不一定完整，理解也可能改变。随着学习深入，我会回到旧的问题，补充、修正，再往前走一点。
          </p>
          <h2>从一条小径开始</h2>
          <p>
            可以先看看<Link to="/notes">学习笔记</Link>，或者浏览
            <Link to="/experiments">实验记录</Link>。也欢迎在
            <Link to="/posts">文章</Link>里，慢慢读一个完整的想法。
          </p>
        </article>
        <aside className="about-aside">
          <div className="mailbox paper">
            <Mail size={23} strokeWidth={1.2} />
            <span className="eyebrow">LET'S KEEP IN TOUCH</span>
            <h2>林间信箱</h2>
            <p>
              发现了笔记里的错误，
              <br />
              或是想交流一个问题？
              <br />
              欢迎给我捎个口信。
            </p>
            <a href={`mailto:${siteConfig.social.email}`}>
              <Mail size={15} /> 写一封邮件 <ArrowUpRight size={15} />
            </a>
            <a href={siteConfig.social.github} target="_blank" rel="noreferrer">
              <Github size={15} /> 在 GitHub 相遇 <ArrowUpRight size={15} />
            </a>
          </div>
          <p className="aside-quote">
            “把问题记下来，
            <br />
            也是一种进展。”
          </p>
        </aside>
      </div>
    </>
  );
}
