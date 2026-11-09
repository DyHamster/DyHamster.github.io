import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { PLACES } from "../lib/scene-journey.mjs";
import { GUIDE_ATLASES, warmGuide } from "../lib/guide-assets";
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
export type GuidePose = { x: number; y: number; size: number };
type Snapshot = {
  phase: string;
  current: string;
  target: string;
  frame: number;
  atlas: string;
  facing: number;
  bodyScale: number;
  lean: number;
  version: number;
};
export type GuideHandle = {
  paint: (state: Snapshot, pose: GuidePose) => void;
  getPose: () => GuidePose | undefined;
  getFacing: () => number;
};
type Props = {
  state: Snapshot;
  pose: GuidePose;
  reduced: boolean;
  small: boolean;
  compact: boolean;
};
export default forwardRef<GuideHandle, Props>(function TotoroGuide(
  { state, pose, reduced, small, compact },
  ref,
) {
  const root = useRef<HTMLDivElement>(null),
    ui = useRef<HTMLDivElement>(null),
    sprite = useRef<HTMLDivElement>(null),
    figure = useRef<HTMLDivElement>(null);
  const ready = useRef({ base: false, bridge: false }),
    enabled = useRef(false),
    collapsedRef = useRef(false),
    last = useRef({ state, pose }),
    visualPose = useRef(pose);
  const lastSprite = useRef("");
  const bridgeLatch = useRef({ version: -1, available: false });
  const idlePose = useRef<{ frame: number; atlas: string } | null>(null);
  const [loaded, setLoaded] = useState(0),
    [collapsed, setCollapsed] = useState(false);
  const paint = useCallback((snapshot: Snapshot, anchor: GuidePose) => {
    last.current = { state: snapshot, pose: anchor };
    const size =
      collapsedRef.current && snapshot.phase === "idle" && anchor.size < 100
        ? 42
        : anchor.size;
    const width = window.innerWidth,
      height = window.innerHeight,
      x = (anchor.x * width) / 100,
      y = (anchor.y * height) / 100;
    visualPose.current = { ...anchor, size };
    if (root.current) {
      root.current.style.transform = `translate3d(${x}px,${y}px,0) scale(${size / 320}) translate(-50%,-100%)`;
      root.current.dataset.facing = String(snapshot.facing);
    }
    if (ui.current)
      ui.current.style.transform = `translate3d(${x + size / 2}px,${y - size}px,0)`;
    if (figure.current) {
      figure.current.style.setProperty("--facing", String(snapshot.facing));
      figure.current.style.setProperty(
        "--pose-scale",
        String(snapshot.bodyScale),
      );
      figure.current.style.setProperty("--pose-lean", `${snapshot.lean}deg`);
    }
    let frame = snapshot.frame,
      atlas = snapshot.atlas;
    if (snapshot.phase === "idle" && idlePose.current) {
      frame = idlePose.current.frame;
      atlas = idlePose.current.atlas;
    }
    if (
      snapshot.phase !== "idle" &&
      snapshot.version !== bridgeLatch.current.version
    )
      bridgeLatch.current = {
        version: snapshot.version,
        available: ready.current.bridge,
      };
    if (
      atlas === "bridge" &&
      !(snapshot.phase === "idle"
        ? ready.current.bridge
        : bridgeLatch.current.available)
    ) {
      frame = [0, 1, 2, 2, 1, 0][frame] ?? 2;
      atlas = "base";
    }
    if (root.current) {
      root.current.dataset.frame = String(frame);
      root.current.dataset.atlas = atlas;
    }
    const key = `${atlas}:${frame}`;
    if (sprite.current && key !== lastSprite.current) {
      const spec =
        GUIDE_ATLASES[atlas as keyof typeof GUIDE_ATLASES] ??
        GUIDE_ATLASES.base;
      sprite.current.style.backgroundImage = `url("${spec.url}")`;
      sprite.current.style.backgroundSize = `${spec.columns * 100}% ${spec.rows * 100}%`;
      sprite.current.style.backgroundPosition = `${((frame % spec.columns) * 100) / (spec.columns - 1)}% ${(Math.floor(frame / spec.columns) * 100) / (spec.rows - 1)}%`;
      lastSprite.current = key;
    }
  }, []);
  useImperativeHandle(
    ref,
    () => ({
      paint,
      getPose: () => visualPose.current,
      getFacing: () => last.current.state.facing,
    }),
    [paint],
  );
  useEffect(() => {
    let active = true;
    const assets = warmGuide();
    for (const key of ["base", "bridge"] as const)
      void assets[key].then((ok) => {
        if (active) {
          ready.current[key] = ok;
          setLoaded((value) => value + 1);
        }
      });
    return () => {
      active = false;
    };
  }, []);
  if (loaded && ready.current.base && state.phase === "idle")
    enabled.current = true;
  useLayoutEffect(
    () => paint(state, pose),
    [state, pose, paint, loaded, collapsed],
  );
  const { phase, current, version } = state;
  useEffect(() => {
    idlePose.current = null;
    if (reduced || phase !== "idle" || !enabled.current) return;
    const intervals = [6800, 8300, 7200, 9100];
    let step = current.length % 4;
    let timer: ReturnType<typeof setTimeout>,
      close: ReturnType<typeof setTimeout>;
    const next = () => {
      timer = setTimeout(
        () => {
          if (last.current.state.phase !== "idle") return;
          idlePose.current =
            PLACES[current].rest === 2
              ? { frame: 3, atlas: "base" }
              : { frame: 0, atlas: ready.current.bridge ? "bridge" : "base" };
          paint(last.current.state, last.current.pose);
          close = setTimeout(
            () => {
              idlePose.current = null;
              paint(last.current.state, last.current.pose);
              next();
            },
            PLACES[current].rest === 2 ? 160 : 900,
          );
        },
        intervals[step++ % intervals.length],
      );
    };
    next();
    return () => {
      clearTimeout(timer);
      clearTimeout(close);
      idlePose.current = null;
    };
  }, [phase, current, version, reduced, loaded, paint]);
  const moving = state.phase !== "idle",
    hide = collapsed && !moving && compact;
  return (
    <>
      <div
        ref={root}
        className={`forest-guide ${moving ? `guide-${state.phase}` : "guide-resting"} ${compact ? "guide-reading" : "guide-at-home"} ${hide ? "guide-collapsed" : ""} ${small ? "guide-mobile" : ""}`}
        data-testid="forest-guide"
        data-renderer={enabled.current ? "atlas" : "fallback"}
      >
        <div className="guide-shadow" aria-hidden="true" />
        <div ref={figure} className="guide-figure" aria-hidden="true">
          <div
            ref={sprite}
            className="totoro-sprite"
            hidden={!enabled.current}
          />
          <div className="guide-fallback-slot" hidden={enabled.current}>
            <FallbackGuide walking={state.phase === "travel" && !reduced} />
          </div>
        </div>
        {!compact && !moving && state.current !== "home" && (
          <svg
            className={`guide-ground ground-${state.current}`}
            viewBox="0 0 300 26"
            aria-hidden="true"
          >
            <path
              d="m52 19 7-13 3 13m136 0 10-12-3 12m46 2 6-9 1 9"
              stroke="#8e9b64"
              fill="none"
              strokeWidth="3"
            />
          </svg>
        )}
      </div>
      <div ref={ui} className={`guide-ui ${moving ? "guide-ui-moving" : ""}`}>
        {moving && (
          <div className="guide-destination" aria-hidden="true">
            {state.phase === "respond"
              ? "准备出发"
              : state.phase === "arrive"
                ? "到了"
                : "前往"}{" "}
            · {PLACES[state.target].name}
          </div>
        )}
        {!moving && compact && (
          <button
            className="guide-rest-control"
            aria-label={collapsed ? "展开龙猫向导" : "收起龙猫向导"}
            onClick={() => {
              collapsedRef.current = !collapsed;
              setCollapsed(!collapsed);
            }}
          >
            {collapsed ? "↗" : "−"}
          </button>
        )}
      </div>
    </>
  );
});
