import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { resolve } from "node:path";

const html = await readFile("dist/index.html", "utf8");
assert(
  !/\bsrc=["'][^"']*\/src\//.test(html),
  "Pages must publish dist, not the TypeScript source entry",
);
const scripts = [...html.matchAll(/<script\b[^>]*\bsrc=["']([^"']+)["']/g)];
assert(scripts.length > 0, "Missing production JavaScript entry");
for (const [, src] of scripts) {
  assert(
    src.startsWith("/assets/") && src.endsWith(".js"),
    `Unexpected entry: ${src}`,
  );
  await access(resolve("dist", src.slice(1)));
}
console.log("Production entry and JavaScript assets verified.");

for (const asset of [
  "forest/afternoon-clean.webp",
  "forest/afternoon-clean-small.webp",
  "forest/cottage-clean.webp",
  "forest/cottage-clean-small.webp",
  "forest/guide/totoro-atlas.webp",
  "forest/guide/totoro-atlas-aligned.webp",
  "forest/guide/totoro-bridges-v2.webp",
  "forest/props/desk-v2.webp",
  "forest/props/shelf-v2.webp",
  "forest/props/bench-v2.webp",
  "musics/天空之城-宫崎骏.mp3",
])
  await access(resolve("dist", asset));
console.log("Forest scenes, guide atlas and music verified.");
