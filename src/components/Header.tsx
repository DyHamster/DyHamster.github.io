import { sections } from "../config/sections";
import { NavLink, Link } from "react-router-dom";
import { Leaf } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
export default function Header() {
  return (
    <header className="header-wrap">
      <div className="site-header shell">
        <Link className="wordmark" to="/" aria-label="DyHamster 首页">
          <span className="brand-leaf">
            <Leaf size={21} strokeWidth={1.5} />
          </span>
          <span>
            DyHamster<small>一处林间，慢慢生长</small>
          </span>
        </Link>
        <nav aria-label="主导航">
          {[
            ["/", "首页"],
            ...sections.map((section) => [
              "/" + section.id,
              section.navTitle ?? section.title,
            ]),
            ["/about", "关于"],
          ].map(([path, title]) => (
            <NavLink key={path} to={path} end={path === "/"}>
              {title}
            </NavLink>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
