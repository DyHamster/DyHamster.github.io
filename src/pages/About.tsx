import SEO from '../components/SEO'
import { siteConfig } from '../config/site.config'
import { Link } from 'react-router-dom'
export default function About() {
  return <><SEO title="关于" description={siteConfig.description} /><header className="page-heading"><span className="eyebrow">ABOUT</span><h1>你好，我是 DyHamster。</h1><p>学生 · 南京大学</p></header><div className="about-content prose"><p>我目前对强化学习比较感兴趣。这个网站是一个个人学习空间，用来整理笔记、记录实验，也存放一些经过思考的文字。</p><h2>在这里记录什么</h2><p>概念背后的直觉，推导中容易遗漏的一步，读论文时冒出来的问题，以及实验与预期之间的距离。</p><p>笔记不一定完整，理解也可能改变。随着学习深入，我会回到旧的问题，补充、修正，再往前走一点。</p><h2>从哪里开始</h2><p>可以先看看<Link to="/notes">学习笔记</Link>，或者浏览<Link to="/experiments">实验记录</Link>。</p><h2>联系</h2><p>如果你发现了笔记中的错误，或想交流一个问题，欢迎联系我。</p><div className="contact-links"><a href={siteConfig.social.github} target="_blank" rel="noreferrer">GitHub ↗</a><a href={`mailto:${siteConfig.social.email}`}>Email ↗</a></div></div></>
}
