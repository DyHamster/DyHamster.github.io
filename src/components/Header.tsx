import { sections } from '../config/sections'
import { NavLink, Link } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  return <header className="site-header shell">
    <Link className="wordmark" to="/">DyHamster<span className="wordmark-dot">.</span></Link>
    <nav aria-label="主导航">
      {[['/', '首页'], ...sections.map(section => ['/' + section.id, section.navTitle ?? section.title]), ['/about', '关于']].map(([path, title]) =>
        <NavLink key={path} to={path} end={path === '/'}>{title}</NavLink>)}
    </nav>
    <ThemeToggle />
  </header>
}
