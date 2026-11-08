import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import type { Location } from "react-router-dom";
import {
  PLACES,
  createScene,
  requestJourney,
  advanceJourney,
  restPose,
} from "../lib/scene-journey.mjs";
import TotoroGuide from "./TotoroGuide";
import SceneLandmark, { SceneGround } from "./SceneLandmark";
import "../journey.css";

const pathOf = (location: Location) =>
  location.pathname + location.search + location.hash;
export default function SceneJourney({
  children,
}: {
  children: (location: Location, phase: string, progress: number) => ReactNode;
}) {
  const requested = useLocation();
  const [small, setSmall] = useState(
    () => matchMedia("(max-width: 700px)").matches,
  );
  const [reduced, setReduced] = useState(
    () => matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [viewport, setViewport] = useState(() => ({
    width: window.innerWidth,
    height: window.innerHeight,
  }));
  const [scrollY, setScrollY] = useState(window.scrollY);
  const [state, setState] = useState(() =>
    createScene(pathOf(requested), small, viewport),
  );
  const live = useRef(state);
  const locations = useRef(new Map([[pathOf(requested), requested]]));
  const lastPose = useRef(state.pose);
  const started = useRef(0);
  const [announcement, setAnnouncement] = useState("");
  useEffect(() => {
    const mobile = matchMedia("(max-width: 700px)");
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const resize = () => {
      setSmall(mobile.matches);
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };
    const reduce = () => setReduced(motion.matches);
    const scroll = () => setScrollY(window.scrollY);
    window.addEventListener("resize", resize);
    motion.addEventListener("change", reduce);
    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      window.removeEventListener("resize", resize);
      motion.removeEventListener("change", reduce);
      window.removeEventListener("scroll", scroll);
    };
  }, []);
  useLayoutEffect(() => {
    const path = pathOf(requested);
    locations.current.set(path, requested);
    const next = requestJourney(live.current, path, {
      mobile: small,
      reduced,
      pose: lastPose.current,
      viewport,
    });
    if (next.version !== live.current.version) {
      started.current = performance.now();
      setAnnouncement(`龙猫带你前往${PLACES[next.target].name}`);
    }
    live.current = next;
    setState(next);
  }, [requested, small, reduced, viewport]);
  useEffect(() => {
    if (state.phase === "idle") return;
    const version = state.version;
    let frame: number;
    const tick = (now: number) => {
      if (live.current.version !== version) return;
      const next = advanceJourney(
        live.current,
        Math.max(0, now - started.current),
        version,
      );
      live.current = next;
      setState(next);
      if (next.phase === "idle")
        setAnnouncement(`已抵达${PLACES[next.current].name}`);
      else frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // A new version cancels the old timeline; frame updates do not restart it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.version]);
  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden && live.current.phase !== "idle") {
        const next = advanceJourney(live.current, live.current.duration);
        live.current = next;
        setState(next);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);
  const moving = state.phase !== "idle";
  const shown = locations.current.get(state.displayPath) ?? requested;
  const detail = shown.pathname.split("/").filter(Boolean).length > 1;
  const compact =
    detail ||
    scrollY > (state.current === "home" ? viewport.height * 0.6 : 120);
  const anchor = restPose(state.current, small, compact, viewport);
  const pose = moving
    ? state.pose
    : {
        ...anchor,
        y: anchor.y - (compact ? 0 : (scrollY / viewport.height) * 100),
      };
  lastPose.current = pose;
  const home = state.current === "home";
  const mix = moving
    ? Math.max(0, Math.min(1, (state.progress - 0.27) / 0.48))
    : 1;
  return (
    <div
      className={`journey-shell ${moving ? "journey-active" : "journey-idle"} ${home ? "world-home" : "world-reading"}`}
      data-reading={compact}
      data-place={state.current}
      data-target={state.target}
      data-phase={state.phase}
      data-progress={state.progress.toFixed(3)}
      data-journey-id={state.version}
    >
      <div
        className="world-stage"
        aria-hidden="true"
        style={
          {
            "--mix": mix,
            "--direction": state.direction,
          } as React.CSSProperties
        }
      >
        {(
          Object.entries(PLACES) as [
            string,
            { focus: string; zoom: number; asset: string; pan: string },
          ][]
        ).map(([id, place]) => {
          const opacity = state.weights[id] ?? 0;
          return (
            <div
              key={id}
              className={`world-place world-${id}`}
              style={
                {
                  opacity,
                  "--focus": place.focus,
                  "--zoom": place.zoom,
                  "--pan": place.pan,
                } as React.CSSProperties
              }
            >
              <picture>
                <source
                  media="(max-width: 700px)"
                  srcSet={`/forest/${place.asset}-small.webp`}
                />
                <img
                  src={`/forest/${place.asset}.webp`}
                  alt=""
                  width="1672"
                  height="941"
                  loading="eager"
                  onError={(event) => {
                    event.currentTarget.style.opacity = "0";
                  }}
                />
              </picture>
              <SceneGround place={id} />
              <SceneLandmark place={id} />
            </div>
          );
        })}
        <div className="world-soften" />
      </div>
      <div
        className="journey-mist"
        aria-hidden="true"
        style={{
          opacity:
            moving && !reduced ? Math.sin(state.progress * Math.PI) * 0.34 : 0,
        }}
      />
      {children(shown, state.phase, state.progress)}
      <TotoroGuide
        state={state}
        pose={pose}
        small={small}
        reduced={reduced}
        compact={compact}
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
