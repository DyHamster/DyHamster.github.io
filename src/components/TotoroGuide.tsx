import { useEffect, useRef, useState } from "react";
import { PLACES } from "../lib/scene-journey.mjs";

function FallbackGuide({ walking }: { walking: boolean }) {
  return (
    <svg
      viewBox="0 0 240 270"
      className={`guide-fallback ${walking ? "is-walking" : ""}`}
      aria-hidden="true"
    >
      <g fill="#777b70" stroke="#505d4b" strokeWidth="2">
        <path
          className="fallback-leg leg-left"
          d="m76 205-19 40q-4 16 30 9l17-39Z"
        />
        <path
          className="fallback-leg leg-right"
          d="m143 204 4 44q8 15 35 3l-13-48Z"
        />
        <path d="m67 72-3-63q16-18 29 49m55 7 15-58q17-10 20 4l-2 67" />
        <path d="M121 43C65 39 37 106 37 173c0 109 171 106 167-4-3-72-26-125-83-126Z" />
      </g>
      <ellipse cx="126" cy="181" rx="67" ry="66" fill="#d9d2ab" />
      <g fill="none" stroke="#777b70" strokeWidth="6" strokeLinecap="round">
        <path d="m84 155 9-7 9 7m16-5 9-7 9 7m17 6 9-7 9 7m-92 16 9-7 9 7m18-1 9-7 9 7m16 2 9-7 9 7" />
      </g>
      <ellipse cx="101" cy="91" rx="11" ry="12" fill="#edeed8" />
      <ellipse cx="164" cy="91" rx="11" ry="12" fill="#edeed8" />
      <g fill="#303c2d">
        <circle cx="104" cy="92" r="4" />
        <circle cx="166" cy="92" r="4" />
        <path d="m125 98 18-1-8 10Z" />
      </g>
      <path
        d="m50 100-35-5m36 16-39 2m185-15 29-8m-27 21 29 2"
        stroke="#48513f"
        strokeWidth="2"
      />
      <path d="M116 44q17-26 46-11-16 20-46 11Z" fill="#84914c" />
    </svg>
  );
}
export default function TotoroGuide({ state, pose, reduced, small, compact }) {
  const { phase, current } = state;
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [blink, setBlink] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const useAtlas = useRef(false);
  useEffect(() => {
    const image = new Image();
    let active = true;
    image.onload = () => {
      if (active) setReady(true);
    };
    image.onerror = () => {
      if (active) setFailed(true);
    };
    image.src = "/forest/guide/totoro-atlas-aligned.webp";
    return () => {
      active = false;
    };
  }, []);
  if (ready && phase === "idle") useAtlas.current = true;
  useEffect(() => {
    if (phase !== "idle" || reduced || PLACES[current].rest !== 2) return;
    let close: ReturnType<typeof setTimeout>;
    const interval = setInterval(() => {
      setBlink(true);
      close = setTimeout(() => setBlink(false), 160);
    }, 6500);
    return () => {
      clearInterval(interval);
      clearTimeout(close);
      setBlink(false);
    };
  }, [phase, current, reduced]);
  const moving = phase !== "idle";
  const frame = moving ? state.frame : blink ? 3 : PLACES[current].rest;
  const restingSmall = compact;
  const hide = collapsed && !moving && restingSmall;
  const width = hide ? 42 : pose.size;
  const name = PLACES[state.target].name;
  return (
    <div
      className={`forest-guide ${moving ? `guide-${phase}` : "guide-resting"} ${restingSmall ? "guide-reading" : "guide-at-home"} ${hide ? "guide-collapsed" : ""} ${small ? "guide-mobile" : ""}`}
      data-testid="forest-guide"
      data-frame={frame}
      data-renderer={useAtlas.current && !failed ? "atlas" : "fallback"}
      style={
        {
          left: `${pose.x}vw`,
          top: `${pose.y}vh`,
          width: `${width}px`,
          "--facing": moving ? state.direction : PLACES[current].facing,
        } as React.CSSProperties
      }
    >
      <div className="guide-destination" aria-hidden="true">
        {moving
          ? `${phase === "respond" ? "出发吧" : phase === "arrive" ? "就到这里" : "跟上脚步"} · ${name}`
          : `在${PLACES[current].name}歇一会儿`}
      </div>
      <div className="guide-shadow" aria-hidden="true" />
      <div className="guide-figure" aria-hidden="true">
        {useAtlas.current && !failed ? (
          <div
            className="totoro-sprite"
            style={{
              backgroundPosition: `${((frame % 4) * 100) / 3}% ${Math.floor(frame / 4) * 50}%`,
            }}
          />
        ) : (
          <FallbackGuide walking={phase === "travel" && !reduced} />
        )}
      </div>
      {!compact && !moving && current !== "home" && (
        <svg
          className={`guide-ground ground-${current}`}
          viewBox="0 0 300 26"
          aria-hidden="true"
        >
          <path
            d="M6 18q36-14 65-6 34-17 73-4 38-9 58 3 44-8 91 7l-5 8H10Z"
            fill="#64784b"
            fillOpacity=".15"
          />
          <path
            d="m52 17 7-13 3 13m136 0 10-12-3 12m46 2 6-9 1 9"
            stroke="#8e9b64"
            fill="none"
            strokeWidth="3"
          />
        </svg>
      )}
      {!moving && restingSmall && (
        <button
          className="guide-rest-control"
          aria-label={collapsed ? "展开龙猫向导" : "收起龙猫向导"}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? "↗" : "−"}
        </button>
      )}
      <span className="sr-only">
        {moving ? `龙猫正在前往${name}` : `龙猫在${name}休息`}
      </span>
    </div>
  );
}
