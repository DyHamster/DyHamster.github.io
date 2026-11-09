import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "../config/site.config";
export default function Footer() {
  return (
    <footer className="site-footer shell wrap">
      <div>
        <img src="/favicon.svg?v=leaf-2" width="20" height="20" alt="" />
        <span>© {new Date().getFullYear()} DyHamster</span>
      </div>
      <div>
        <a href={siteConfig.social.github} target="_blank" rel="noreferrer">
          GitHub <ArrowUpRight size={15} />
        </a>
        <a href={`mailto:${siteConfig.social.email}`}>
          发邮件 <ArrowUpRight size={15} />
        </a>
      </div>
    </footer>
  );
}
