import { siteConfig } from '../config/site.config'
export default function Footer() {
  return <footer className="site-footer shell"><span>© {new Date().getFullYear()} DyHamster</span><span className="footer-note">学习、记录，慢慢理解。</span><a href={siteConfig.social.github} target="_blank" rel="noreferrer">GitHub ↗</a><a href={`mailto:${siteConfig.social.email}`}>联系</a></footer>
}
