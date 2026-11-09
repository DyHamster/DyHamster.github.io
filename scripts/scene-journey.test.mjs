import test from "node:test";
import assert from "node:assert/strict";
import {
  PLACES,
  createScene,
  requestJourney,
  advanceJourney,
  restPose,
} from "../src/lib/scene-journey.mjs";

test("all 20 directed routes prepare, travel, commit content, arrive and idle", () => {
  for (const from of Object.keys(PLACES))
    for (const to of Object.keys(PLACES)) {
      if (from === to) continue;
      const a = from === "home" ? "/" : `/${from}`;
      const b = to === "home" ? "/" : `/${to}`;
      let state = requestJourney(createScene(a), b);
      assert.equal(state.phase, "respond");
      assert.equal(state.displayPath, a);
      const frames = new Set();
      for (let time = 300; time < 1160; time += 33)
        frames.add(advanceJourney(state, time).frame);
      assert([...frames].some((frame) => frame >= 4 && frame < 12));
      state = advanceJourney(state, 850);
      assert.equal(state.displayPath, b);
      state = advanceJourney(state, state.duration);
      assert.equal(state.phase, "idle");
      assert.equal(state.current, to);
      assert.equal(state.displayPath, b);
      assert.deepEqual(state.pose, restPose(to));
    }
});
test("retarget starts at the current pose and ignores the old timeline", () => {
  let state = requestJourney(createScene("/"), "/notes");
  state = advanceJourney(state, 500);
  const pose = state.pose;
  const old = state.version;
  state = requestJourney(state, "/about");
  assert.deepEqual(state.pose, pose);
  assert.equal(advanceJourney(state, 2000, old), state);
  state = advanceJourney(state, 2000);
  assert.equal(state.displayPath, "/about");
});
test("changing to another detail in the same destination preserves progress", () => {
  let state = requestJourney(createScene("/"), "/posts");
  state = advanceJourney(state, 850);
  const version = state.version;
  state = requestJourney(state, "/posts/paper?q=one");
  assert.equal(state.version, version);
  assert.equal(state.progress, 850 / state.duration);
  assert.equal(state.displayPath, "/posts/paper?q=one");
});
test("query, tags and detail navigation do not replay a journey", () => {
  const a = createScene("/notes");
  const b = requestJourney(a, "/notes/mdp?tag=RL&page=2");
  assert.equal(b.phase, "idle");
  assert.equal(b.version, a.version);
  assert.equal(b.displayPath, "/notes/mdp?tag=RL&page=2");
});
test("direct routes, legacy routes and reduced motion have deterministic destinations", () => {
  assert.equal(createScene("/projects").current, "experiments");
  assert.equal(createScene("/posts/nested/paper").current, "posts");
  let state = requestJourney(createScene("/about"), "/notes", {
    reduced: true,
  });
  state = advanceJourney(state, 110);
  assert.equal(state.phase, "idle");
  assert.equal(state.current, "notes");
});
test("back navigation during departure cancels the previous target", () => {
  let state = requestJourney(createScene("/"), "/notes");
  state = advanceJourney(state, 350);
  state = requestJourney(state, "/");
  state = advanceJourney(state, 2000);
  assert.equal(state.displayPath, "/");
  assert.equal(state.current, "home");
});
test("retarget preserves the exact background mixture instead of cutting to a full layer", () => {
  let state = requestJourney(createScene("/"), "/about");
  state = advanceJourney(state, 700);
  const weights = state.weights;
  state = requestJourney(state, "/notes");
  assert.deepEqual(state.weights, weights);
  assert.deepEqual(state.originWeights, weights);
  state = advanceJourney(state, 800);
  assert(
    Math.abs(Object.values(state.weights).reduce((a, b) => a + b, 0) - 1) <
      1e-9,
  );
});
test("reduced motion switches the pose once at content commit, without traveling", () => {
  let state = requestJourney(createScene("/"), "/about", { reduced: true });
  assert.deepEqual(advanceJourney(state, 40).pose, state.origin);
  assert.deepEqual(advanceJourney(state, 90).pose, state.destination);
});

test("home to notes completes a distance-driven gait and each stop has a separate ground anchor", () => {
  const trip = requestJourney(createScene("/"), "/notes");
  const frames = new Set();
  for (let time = 300; time < 1250; time += 10)
    frames.add(advanceJourney(trip, time).frame);
  for (let f = 4; f < 12; f++) assert(frames.has(f));
  assert(trip.destination.y < trip.origin.y);
  assert(trip.destination.size < trip.origin.size);
  const stops = Object.keys(PLACES).map((id) => JSON.stringify(restPose(id)));
  assert.equal(new Set(stops).size, 5);
  for (const width of [1024, 1366, 1440, 1920]) {
    const pose = restPose("posts", false, true, { width, height: 900 });
    const left = (pose.x / 100) * width - pose.size / 2;
    const paperRight = width - Math.max(96, (width - 1280) / 2);
    assert(left > paperRight, `reading guide must clear the paper at ${width}`);
  }
});

test("a seated arrival has stance, turn, crouch and seated frames rather than a direct walk-to-sit cut", () => {
  const trip = requestJourney(createScene("/notes"), "/about");
  const sequence = [0.75, 0.8, 0.84, 0.9, 0.94, 0.97, 1].map((p) =>
    advanceJourney(trip, p * trip.duration),
  );
  assert.equal(sequence[0].frame, 5);
  assert(sequence.some((s) => s.atlas === "bridge" && s.frame === 2));
  assert(sequence.some((s) => s.atlas === "bridge" && s.frame === 4));
  assert.equal(sequence.at(-1).frame, 0);
  assert.equal(sequence.at(-1).facing, PLACES.about.facing);
});
test("retargeting a walking guide preserves its drawn pose and facing during the response", () => {
  let trip = requestJourney(createScene("/"), "/notes");
  trip = advanceJourney(trip, 800);
  const next = requestJourney(trip, "/posts");
  const start = advanceJourney(next, 0);
  assert.equal(start.frame, trip.frame);
  assert.equal(start.atlas, trip.atlas);
  assert.equal(start.facing, trip.facing);
  assert.equal(next.wasResting, false);
  assert.deepEqual(start.pose, trip.pose);
});
test("turns pass through the frontal drawing; final resting direction is settled before idle", () => {
  const trip = requestJourney(createScene("/"), "/notes");
  const states = Array.from({ length: 169 }, (_, i) =>
    advanceJourney(trip, i * 10),
  );
  for (let i = 1; i < states.length; i++)
    if (states[i].facing !== states[i - 1].facing)
      assert(states[i].atlas === "bridge" || states[i - 1].atlas === "bridge");
  const settled = advanceJourney(trip, trip.duration - 5),
    idle = advanceJourney(trip, trip.duration);
  assert.equal(settled.facing, idle.facing);
  assert.equal(settled.frame, idle.frame);
});
