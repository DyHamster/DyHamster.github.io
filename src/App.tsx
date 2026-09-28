import { sections } from './config/sections'
import { HashRouter, Routes, Route, Navigate, useLocation, Link } from 'react-router-dom'
import { useEffect, lazy, Suspense } from 'react'
import Home from './pages/Home'
import Posts from './pages/Posts'
const PostDetail = lazy(() => import('./pages/PostDetail'))
import About from './pages/About'
import Header from './components/Header'
import Footer from './components/Footer'
import SEO from './components/SEO'
function ScrollReset() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}
function App() {
  return <HashRouter><ScrollReset /><a className="skip-link" href="#main" onClick={event => { event.preventDefault(); document.getElementById('main')?.focus() }}>跳到正文</a><div className="site-layout"><Header /><main className="shell site-main" id="main" tabIndex={-1}><Suspense fallback={<p className="page-heading" role="status">正在打开记录…</p>}><Routes>
    <Route path="/" element={<Home />} />
    {sections.map(section => <Route key={section.id} path={`/${section.id}`} element={<Posts kind={section.id} />} />)}
    {sections.map(section => <Route key={section.id + '-entry'} path={`/${section.id}/*`} element={<PostDetail kind={section.id} />} />)}
    {sections.flatMap(section => (section.aliases ?? []).map(alias => <Route key={alias} path={`/${alias}`} element={<Navigate to={`/${section.id}`} replace />} />))}
    <Route path="/about" element={<About />} />
    <Route path="*" element={<div className="page-heading"><SEO title="页面未找到" noindex /><span className="eyebrow">404</span><h1>这里暂时没有内容。</h1><Link className="text-link" to="/">返回首页 ↗</Link></div>} />
  </Routes></Suspense></main><Footer /></div></HashRouter>
}
export default App
