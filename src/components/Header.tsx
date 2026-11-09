import { sections } from "../config/sections";
import { NavLink, Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
export default function Header() {
  return (
    <header className="header-wrap">
      <div className="site-header shell wrap">
        <Link className="wordmark" to="/" aria-label="DyHamster 首页">
          <span className="brand-leaf">
            <img src="/favicon.svg?v=leaf-2" width="40" height="40" alt="" />
          </span>
          <span>
            DyHamster<small>学习与思考</small>
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
