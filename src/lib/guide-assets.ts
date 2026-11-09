export const GUIDE_ATLASES = {
  base: { url: "/forest/guide/totoro-atlas-aligned.webp", columns: 4, rows: 3 },
  bridge: { url: "/forest/guide/totoro-bridges-v2.webp", columns: 3, rows: 2 },
} as const;
const decoded = new Map<string, Promise<boolean>>();
/** Resolve failures too: art must never hold up navigation or reading. */
export function decodeImage(url: string): Promise<boolean> {
  if (!decoded.has(url))
    decoded.set(
      url,
      (async () => {
        const image = new Image();
        image.src = url;
        try {
          await image.decode();
          return true;
        } catch {
          return false;
        }
      })(),
    );
  return decoded.get(url)!;
}
export function warmGuide() {
  return {
    base: decodeImage(GUIDE_ATLASES.base.url),
    bridge: decodeImage(GUIDE_ATLASES.bridge.url),
  };
}
