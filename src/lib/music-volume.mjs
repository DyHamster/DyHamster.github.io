// Animation timestamps may precede performance.now() within the same frame.
export function fadeVolume(elapsed, target, duration = 1400) {
  const progress = Math.min(1, Math.max(0, elapsed / duration));
  return Math.min(1, Math.max(0, target * progress));
}
