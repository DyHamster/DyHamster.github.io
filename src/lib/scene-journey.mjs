export const PLACES = {
  home: {
    order: 0,
    name: "大树溪边",
    asset: "afternoon-clean",
    focus: "50% 50%",
    zoom: 1,
    pan: "0vh",
    rest: 0,
    facing: 1,
    action: "醒来，沿溪边出发",
  },
  notes: {
    order: 1,
    name: "树荫笔记桌",
    facing: 1,
    asset: "afternoon-clean",
    focus: "85% 58%",
    zoom: 1.16,
    pan: "-37vh",
    rest: 2,
    action: "翻过小径，去树荫下",
  },
  posts: {
    order: 2,
    name: "林间书屋",
    facing: -1,
    asset: "cottage-clean",
    focus: "62% 40%",
    zoom: 1.09,
    pan: "-25vh",
    rest: 0,
    action: "轻轻放慢脚步，去书屋",
  },
  experiments: {
    order: 3,
    name: "树根工作台",
    facing: 1,
    asset: "afternoon-clean",
    focus: "100% 76%",
    zoom: 1.32,
    pan: "-40vh",
    rest: 2,
    action: "竖起耳朵，去工作台看看",
  },
  about: {
    order: 4,
    name: "傍晚小屋",
    facing: -1,
    asset: "cottage-clean",
    focus: "78% 50%",
    zoom: 1,
    pan: "-21vh",
    rest: 0,
    action: "沿着灯光，走到小屋前",
  },
};
export function placeForPath(path) {
  const id = path.split(/[?#]/)[0].split("/")[1];
  return id === "projects"
    ? "experiments"
    : Object.hasOwn(PLACES, id)
      ? id
      : "home";
}
export const TIMING = {
  depart: 0.23,
  commit: 0.48,
  land: 0.74,
  turn: 0.88,
  settle: 0.95,
};
const clamp = (value) => Math.max(0, Math.min(1, value));
const lerp = (a, b, t) => a + (b - a) * t;
const defaultViewport = { width: 1440, height: 900 };
// Coordinates are foot anchors on the same stage, not image centres. Each prop uses
// the matching --ground-* value in desktop-polish.css.
export function restPose(
  place,
  mobile = false,
  compact = false,
  viewport = defaultViewport,
) {
  const { width, height } = viewport;
  if (compact) {
    const size = mobile ? 68 : 72;
    return {
      x: ((width - (mobile ? 12 : 16) - size / 2) / width) * 100,
      y: { home: 86, notes: 84, posts: 78, experiments: 87, about: 81 }[place],
      size,
    };
  }
  if (mobile)
    return place === "home"
      ? { x: 75, y: 94, size: Math.min(190, width * 0.46) }
      : {
          x: { notes: 80, posts: 84, experiments: 77, about: 86 }[place],
          y: 44,
          size: 100,
        };
  const stops = {
    home: { x: 81, y: 83, scale: 0.36, min: 240, max: 340 },
    notes: { x: 76, y: 46, scale: 0.215, min: 152, max: 220 },
    posts: { x: 87, y: 45, scale: 0.23, min: 164, max: 230 },
    experiments: { x: 79, y: 49, scale: 0.225, min: 160, max: 225 },
    about: { x: 86, y: 47, scale: 0.235, min: 166, max: 235 },
  };
  const stop = stops[place] ?? stops.home;
  return {
    x: stop.x,
    y: stop.y,
    size: Math.max(stop.min, Math.min(stop.max, height * stop.scale)),
  };
}
// Quadratic routes bend toward the creek, shelves, workbench or porch. Arc length
// determines both travel and frame cadence, so varying perspective does not skate.
function pointOnRoute(origin, destination, control, t) {
  return {
    x:
      (1 - t) ** 2 * origin.x +
      2 * (1 - t) * t * control.x +
      t * t * destination.x,
    y:
      (1 - t) ** 2 * origin.y +
      2 * (1 - t) * t * control.y +
      t * t * destination.y,
  };
}
function makeRoute(origin, destination, target, viewport) {
  const dx = destination.x - origin.x;
  const control = {
    x:
      lerp(origin.x, destination.x, 0.5) +
      (target === "notes" ? -2.5 : target === "experiments" ? 2 : 0),
    y: lerp(origin.y, destination.y, 0.5) + 5,
  };
  const points = [{ t: 0, distance: 0 }],
    count = 64;
  let previous = origin,
    length = 0;
  for (let i = 1; i <= count; i++) {
    const t = i / count,
      point = pointOnRoute(origin, destination, control, t);
    length += Math.hypot(
      ((point.x - previous.x) * viewport.width) / 100,
      ((point.y - previous.y) * viewport.height) / 100,
    );
    points.push({ t, distance: length });
    previous = point;
  }
  return {
    control,
    points,
    length,
    // Four drawings per planted step; short routes do not force a full stride.
    steps: Math.max(1, Math.round(length / ((origin.size + destination.size) * 0.19))),
    direction: Math.abs(dx) > 0.2 ? Math.sign(dx) : PLACES[target].facing,
  };
}
function routeSample(state, movement) {
  const distance = movement * state.route.length;
  const points = state.route.points;
  const index = Math.max(
    1,
    points.findIndex((point) => point.distance >= distance),
  );
  const a = points[index - 1],
    b = points[index] ?? points[points.length - 1];
  const t = lerp(
    a.t,
    b.t,
    clamp((distance - a.distance) / (b.distance - a.distance || 1)),
  );
  return {
    ...pointOnRoute(state.origin, state.destination, state.route.control, t),
    size: lerp(state.origin.size, state.destination.size, movement),
  };
}
export function createScene(path, mobile = false, viewport = defaultViewport) {
  const place = placeForPath(path);
  return {
    weights: { [place]: 1 },
    originWeights: { [place]: 1 },
    version: 0,
    displayPath: path,
    targetPath: path,
    current: place,
    from: place,
    target: place,
    phase: "idle",
    progress: 1,
    pose: restPose(place, mobile, false, viewport),
    origin: restPose(place, mobile, false, viewport),
    destination: restPose(place, mobile, false, viewport),
    frame: PLACES[place].rest,
    atlas: "base",
    facing: PLACES[place].facing,
    bodyScale: 1,
    lean: 0,
    direction: PLACES[place].facing,
    viewport,
    duration: 0,
    reduced: false,
  };
}
export function requestJourney(
  state,
  path,
  {
    mobile = false,
    reduced = false,
    pose = state.pose,
    viewport = state.viewport ?? defaultViewport,
    facing = state.facing ?? PLACES[state.current].facing,
  } = {},
) {
  const target = placeForPath(path);
  if (
    state.phase !== "idle" &&
    target === state.target &&
    state.viewport.width === viewport.width &&
    state.viewport.height === viewport.height
  )
    return {
      ...state,
      targetPath: path,
      reduced: reduced || state.reduced,
      duration: reduced ? 110 : state.duration,
      displayPath: state.progress >= TIMING.commit ? path : state.displayPath,
    };
  if (state.phase === "idle" && target === state.current)
    return { ...state, displayPath: path, targetPath: path };
  const from = state.progress >= TIMING.commit ? state.target : state.from;
  const destination = restPose(target, mobile, false, viewport);
  const route = makeRoute(pose, destination, target, viewport);
  return {
    ...state,
    version: state.version + 1,
    targetPath: path,
    from,
    target,
    phase: "respond",
    progress: 0,
    originWeights: { ...state.weights },
    origin: pose,
    destination,
    route,
    viewport,
    pose,
    direction: route.direction,
    duration: reduced ? 110 : mobile ? 1240 : 1680,
    reduced,
    frame: state.frame,
    atlas: state.atlas ?? "base",
    originAtlas: state.atlas ?? "base",
    originFrame: state.frame,
    originFacing: facing,
    wasResting: state.phase === "idle" && PLACES[state.current].rest === 0,
    facing,
    bodyScale: state.bodyScale ?? 1,
    lean: state.lean ?? 0,
  };
}
// A turn passes through a frontal drawing. The base atlas is only mirrored while
// the symmetric front drawing is visible, never as an unexplained end-of-route flip.
function turn(from, to, progress) {
  if (from === to) return { frame: 2, atlas: "base", facing: to };
  if (progress < 0.27) return { frame: 3, atlas: "base", facing: from };
  if (progress < 0.73) return { frame: 2, atlas: "bridge", facing: to };
  return { frame: 2, atlas: "base", facing: to };
}
export function advanceJourney(state, elapsed, version = state.version) {
  if (version !== state.version || state.phase === "idle") return state;
  const progress = clamp(elapsed / state.duration);
  const phase =
    progress < TIMING.depart
      ? "respond"
      : progress < TIMING.land
        ? "travel"
        : progress < 1
          ? "arrive"
          : "idle";
  const movement = clamp(
    (progress - TIMING.depart) / (TIMING.land - TIMING.depart),
  );
  const eased = movement * movement * (3 - 2 * movement);
  let pose =
    progress >= TIMING.land ? state.destination : routeSample(state, eased);
  if (state.reduced)
    pose = progress >= TIMING.commit ? state.destination : state.origin;
  const mix = clamp((progress - 0.23) / 0.49);
  const weights = Object.fromEntries(
    Object.keys(PLACES).map((id) => [
      id,
      (state.originWeights[id] ?? 0) * (1 - mix) +
        (id === state.target ? mix : 0),
    ]),
  );
  let sprite = { frame: 2, atlas: "base", facing: state.direction };
  let bodyScale = 1,
    lean = 0;
  if (phase === "respond") {
    if (progress < 0.035)
      sprite = {
        frame: state.originFrame,
        atlas: state.originAtlas,
        facing: state.originFacing,
      };
    else if (state.wasResting && progress < 0.15) {
      sprite =
        progress < 0.075
          ? { frame: 0, atlas: "bridge", facing: state.originFacing }
          : progress < 0.105
            ? { frame: 1, atlas: "base", facing: state.originFacing }
            : progress < 0.135
              ? { frame: 1, atlas: "bridge", facing: state.originFacing }
              : { frame: 2, atlas: "base", facing: state.originFacing };
      bodyScale =
        1 - 0.012 * Math.sin(clamp((progress - 0.035) / 0.115) * Math.PI);
    } else
      sprite = turn(
        state.originFacing,
        state.direction,
        clamp(
          (progress - (state.wasResting ? 0.15 : 0.035)) /
            (TIMING.depart - (state.wasResting ? 0.15 : 0.035)),
        ),
      );
  }
  const planted = 4 + ((state.route.steps * 4 + 1) % 8);
  if (phase === "travel") {
    const frame = movement > 0.975 ? planted : 4 + ((Math.floor(eased * state.route.steps * 4) + 1) % 8);
    sprite = { frame, atlas: "base", facing: state.direction };
    // Small weight transfer supplements the actual leg/arm drawings; feet stay anchored.
    bodyScale = 1 + 0.005 * Math.sin(eased * state.route.steps * Math.PI * 2);
    lean = state.direction * 0.5 * Math.sin(movement * Math.PI);
  }
  if (phase === "arrive") {
    if (progress < 0.785)
      sprite = { frame: planted, atlas: "base", facing: state.direction };
    else if (progress < TIMING.turn)
      sprite = turn(
        state.direction,
        PLACES[state.target].facing,
        (progress - 0.785) / (TIMING.turn - 0.785),
      );
    else if (PLACES[state.target].rest === 0)
      sprite =
        progress < 0.925
          ? { frame: 1, atlas: "bridge", facing: PLACES[state.target].facing }
          : progress < TIMING.settle
            ? { frame: 4, atlas: "bridge", facing: PLACES[state.target].facing }
            : progress < 0.985
              ? {
                  frame: 0,
                  atlas: "bridge",
                  facing: PLACES[state.target].facing,
                }
              : {
                  frame: 0,
                  atlas: "base",
                  facing: PLACES[state.target].facing,
                };
    else
      sprite = { frame: 2, atlas: "base", facing: PLACES[state.target].facing };
    bodyScale =
      1 -
      0.008 *
        Math.sin(clamp((progress - TIMING.land) / (1 - TIMING.land)) * Math.PI);
  }
  if (phase === "idle" || state.reduced)
    sprite = {
      frame: PLACES[state.target].rest,
      atlas: "base",
      facing: PLACES[state.target].facing,
    };
  return {
    ...state,
    weights,
    phase,
    progress,
    pose,
    ...sprite,
    bodyScale,
    lean,
    current: progress >= TIMING.commit ? state.target : state.current,
    displayPath:
      progress >= TIMING.commit ? state.targetPath : state.displayPath,
  };
}
