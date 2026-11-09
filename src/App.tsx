import { sections } from "./config/sections";
import { HashRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { useLayoutEffect, lazy, Suspense, memo } from "react";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
const PostDetail = lazy(() => import("./pages/PostDetail"));
import About from "./pages/About";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MusicPlayer from "./components/MusicPlayer";
import SEO from "./components/SEO";
import SceneJourney from "./components/SceneJourney";
import "./desktop-polish.css";
import "./editorial.css";
import type { Location } from "react-router-dom";
const SiteLayout = memo(function SiteLayout({
  location,
  phase,
  progress,
}: {
  location: Location;
  phase: string;
  progress: number;
}) {
  const { pathname } = location;
  const home = pathname === "/";
  const kind = pathname.split("/")[1];
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return (
    <div
      className={`site-layout ${home ? "is-home" : `is-interior section-${kind}`}`}
    >
      <a
        className="skip-link"
        href="#main"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById("main")?.focus();
        }}
      >
        跳到正文
      </a>
      <Header />
      <main
        className={`${home ? "site-main home-main" : "shell wrap site-main inner-main"} scene-content ${phase !== "idle" && progress < 0.5 ? "content-leaving" : "content-arriving"}`}
        id="main"
        tabIndex={-1}
      >
        <Suspense
          fallback={
            <p className="page-heading" role="status">
              正在打开记录…
            </p>
          }
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            {sections.map((section) => (
              <Route
                key={section.id}
                path={`/${section.id}`}
                element={<Posts kind={section.id} />}
              />
            ))}
            {sections.map((section) => (
              <Route
                key={section.id + "-entry"}
                path={`/${section.id}/*`}
                element={<PostDetail kind={section.id} />}
              />
            ))}
            {sections.flatMap((section) =>
              (section.aliases ?? []).map((alias) => (
                <Route
                  key={alias}
                  path={`/${alias}`}
                  element={<Navigate to={`/${section.id}`} replace />}
                />
              )),
            )}
            <Route path="/about" element={<About />} />
            <Route
              path="*"
              element={
                <div className="page-heading">
                  <SEO title="页面未找到" noindex />
                  <h1>这个页面不存在。</h1>
                  <Link className="text-link" to="/">
                    返回首页 ↗
                  </Link>
                </div>
              }
            />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <MusicPlayer />
    </div>
  );
});
export default function App() {
  return (
    <HashRouter>
      <SceneJourney>
        {(location, phase, progress) => (
          <SiteLayout location={location} phase={phase} progress={progress} />
        )}
      </SceneJourney>
    </HashRouter>
  );
}
