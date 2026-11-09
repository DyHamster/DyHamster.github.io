import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import type { Location } from "react-router-dom";
import {
  PLACES,
  createScene,
  requestJourney,
  advanceJourney,
  restPose,
  TIMING,
} from "../lib/scene-journey.mjs";
import TotoroGuide from "./TotoroGuide";
import type { GuideHandle } from "./TotoroGuide";
import SceneLandmark, { SceneGround } from "./SceneLandmark";
import "../journey.css";
const pathOf = (location: Location) =>
  location.pathname + location.search + location.hash;

/** One persistent timeline. React commits semantic changes; the local painter owns frames. */
export default function SceneJourney({
  children,
}: {
  children: (location: Location, phase: string, progress: number) => ReactNode;
}) {
  const requested = useLocation();
  const [viewport, setViewport] = useState(() => ({
    width: innerWidth,
    height: innerHeight,
  }));
  const [reduced, setReduced] = useState(
    () => matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const small = viewport.width <= 700;
  const [view, setView] = useState(() =>
    createScene(pathOf(requested), small, viewport),
  );
  const live = useRef(view),
    shell = useRef<HTMLDivElement>(null),
    stage = useRef<HTMLDivElement>(null),
    mist = useRef<HTMLDivElement>(null),
    guide = useRef<GuideHandle>(null);
  const started = useRef(0),
    scrollY = useRef(window.scrollY),
    lastPose = useRef(view.pose),
    screen = useRef(viewport);
  const locations = useRef(new Map([[pathOf(requested), requested]]));
  const [compact, setCompact] = useState(false),
    compactRef = useRef(false),
    [announcement, setAnnouncement] = useState("");
  screen.current = viewport;
  const rest = useCallback((snapshot: typeof view) => {
    const reading =
      snapshot.displayPath.split(/[?#]/)[0].split("/").filter(Boolean).length >
        1 ||
      scrollY.current >
        (snapshot.current === "home" ? screen.current.height * 0.6 : 120);
    const anchor = restPose(
      snapshot.current,
      screen.current.width <= 700,
      reading,
      screen.current,
    );
    return {
      reading,
      pose: {
        ...anchor,
        y:
          anchor.y -
          (reading ? 0 : (scrollY.current / screen.current.height) * 100),
      },
    };
  }, []);
  const paint = useCallback(
    (snapshot: typeof view) => {
      const moving = snapshot.phase !== "idle";
      const resting = rest(snapshot),
        pose = moving ? snapshot.pose : resting.pose;
      lastPose.current = pose;
      if (!moving && compactRef.current !== resting.reading) {
        compactRef.current = resting.reading;
        setCompact(resting.reading);
      }
      if (shell.current) {
        shell.current.dataset.phase = snapshot.phase;
        shell.current.dataset.progress = snapshot.progress.toFixed(3);
        shell.current.dataset.place = snapshot.current;
        shell.current.dataset.target = snapshot.target;
      }
      if (stage.current) {
        const breathing =
          moving && !snapshot.reduced
            ? Math.sin(snapshot.progress * Math.PI)
            : 0;
        stage.current.style.setProperty(
          "--camera-shift",
          String(-snapshot.direction * 6 * breathing),
        );
        stage.current.style.setProperty(
          "--camera-push",
          String(0.025 * breathing),
        );
        for (const el of stage.current.querySelectorAll<HTMLElement>(
          ".world-place",
        )) {
          const next = String(snapshot.weights[el.dataset.world!] ?? 0);
          if (el.style.opacity !== next) el.style.opacity = next;
        }
      }
      if (mist.current)
        mist.current.style.opacity = String(
          moving && !snapshot.reduced
            ? Math.sin(snapshot.progress * Math.PI) * 0.22
            : 0,
        );
      guide.current?.paint(snapshot, pose);
    },
    [rest],
  );
  useEffect(() => {
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let scrollFrame = 0;
    const resize = () =>
      setViewport({ width: innerWidth, height: innerHeight });
    const reduce = () => setReduced(motion.matches);
    const scroll = () => {
      scrollY.current = window.scrollY;
      if (live.current.phase === "idle") {
        cancelAnimationFrame(scrollFrame);
        scrollFrame = requestAnimationFrame(() => paint(live.current));
      }
    };
    window.addEventListener("resize", resize);
    motion.addEventListener("change", reduce);
    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      window.removeEventListener("resize", resize);
      motion.removeEventListener("change", reduce);
      window.removeEventListener("scroll", scroll);
      cancelAnimationFrame(scrollFrame);
    };
  }, [paint]);
  useLayoutEffect(() => {
    const path = pathOf(requested);
    locations.current.set(path, requested);
    const next = requestJourney(live.current, path, {
      mobile: small,
      reduced,
      pose: guide.current?.getPose() ?? lastPose.current,
      viewport,
      facing: guide.current?.getFacing() ?? live.current.facing,
    });
    if (next.version !== live.current.version) {
      started.current = performance.now();
      setAnnouncement(`龙猫带你前往${PLACES[next.target].name}`);
    }
    live.current = next;
    setView(next);
    paint(next);
  }, [requested, small, reduced, viewport, paint]);
  useEffect(() => {
    if (live.current.phase === "idle") return;
    const version = live.current.version;
    let frame = 0;
    const tick = (now: number) => {
      if (live.current.version !== version) return;
      const previous = live.current,
        next = advanceJourney(
          previous,
          Math.max(0, now - started.current),
          version,
        );
      live.current = next;
      paint(next);
      // Content/phase commits only. No per-frame React state or full-route traversal.
      if (
        previous.phase !== next.phase ||
        previous.displayPath !== next.displayPath
      )
        setView(next);
      if (next.phase === "idle")
        setAnnouncement(`已抵达${PLACES[next.current].name}`);
      else frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [view.version, paint]);
  useLayoutEffect(() => paint(live.current), [view, compact, paint]);
  useEffect(() => {
    const hidden = () => {
      if (document.hidden && live.current.phase !== "idle") {
        const next = advanceJourney(live.current, live.current.duration);
        live.current = next;
        paint(next);
        setView(next);
      }
    };
    document.addEventListener("visibilitychange", hidden);
    return () => document.removeEventListener("visibilitychange", hidden);
  }, [paint]);
  const moving = view.phase !== "idle",
    shown = locations.current.get(view.displayPath) ?? requested;
  const resting = rest(view),
    pose = moving ? view.pose : resting.pose;
  return (
    <div
      ref={shell}
      className={`journey-shell ${moving ? "journey-active" : "journey-idle"} ${view.current === "home" ? "world-home" : "world-reading"}`}
      data-place={view.current}
      data-target={view.target}
      data-phase={view.phase}
      data-progress={view.progress.toFixed(3)}
      data-reading={compact}
      data-journey-id={view.version}
    >
      <div ref={stage} className="world-stage" aria-hidden="true">
        {(
          Object.entries(PLACES) as [
            string,
            { asset: string; focus: string; zoom: number; pan: string },
          ][]
        ).map(([id, place]) => (
          <div
            key={id}
            data-world={id}
            className={`world-place world-${id}`}
            style={
              {
                opacity: view.weights[id] ?? 0,
                "--focus": place.focus,
                "--zoom": place.zoom,
                "--pan": place.pan,
              } as React.CSSProperties
            }
          >
            <picture>
              <source
                media="(max-width:700px)"
                srcSet={`/forest/${place.asset}-small.webp`}
              />
              <img
                src={`/forest/${place.asset}.webp`}
                alt=""
                width="1672"
                height="941"
                loading="eager"
                onError={(e) => {
                  e.currentTarget.style.opacity = "0";
                }}
              />
            </picture>
            <SceneGround place={id} />
            <SceneLandmark place={id} />
          </div>
        ))}
        <div className="world-soften" />
      </div>
      <div
        ref={mist}
        className="journey-mist"
        aria-hidden="true"
        style={{ opacity: 0 }}
      />
      {children(shown, view.phase, view.progress >= TIMING.commit ? 1 : 0)}
      <TotoroGuide
        ref={guide}
        state={view}
        pose={pose}
        small={small}
        compact={compact}
        reduced={reduced}
      />
      <span
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </span>
    </div>
  );
}
