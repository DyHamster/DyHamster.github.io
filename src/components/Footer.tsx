import { Leaf } from "lucide-react";
import { siteConfig } from "../config/site.config";
export default function Footer() {
  return (
    <footer className="site-footer shell">
      <div>
        <Leaf size={16} />
        <span>© {new Date().getFullYear()} DyHamster</span>
        <span className="footer-note">愿每一次停留，都有一点收获。</span>
      </div>
      <div>
        <a href={siteConfig.social.github} target="_blank" rel="noreferrer">
          GitHub ↗
        </a>
        <a href={`mailto:${siteConfig.social.email}`}>写封信 ↗</a>
      </div>
    </footer>
  );
}
