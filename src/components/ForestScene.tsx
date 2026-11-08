import { useEffect, useRef, useState } from "react";

export default function ForestScene({
  scene = "afternoon",
  priority = false,
}: {
  scene?: "afternoon" | "cottage";
  priority?: boolean;
}) {
  const element = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "80px" },
    );
    if (element.current) observer.observe(element.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={element}
      className={`forest-scene ${scene}-clean ${visible ? "is-visible" : ""}`}
      aria-hidden="true"
    >
      <picture>
        <source
          media="(max-width: 650px)"
          srcSet={`/forest/${scene}-clean-small.webp`}
        />
        <img
          className="scene-art"
          src={`/forest/${scene}-clean.webp`}
          alt=""
          width="1672"
          height="941"
          {...{ fetchpriority: priority ? "high" : "auto" }}
          loading={priority ? "eager" : "lazy"}
        />
      </picture>
      <div className="sun-haze" />
      <div className="water-shimmer" />
      <div className="forest-particles">
        {Array.from({ length: 8 }, (_, i) => (
          <i key={i} style={{ "--i": i } as React.CSSProperties} />
        ))}
      </div>
      <div className="drifting-leaves">
        {[0, 1, 2].map((i) => (
          <svg
            key={i}
            style={{ "--i": i } as React.CSSProperties}
            viewBox="0 0 30 40"
          >
            <path
              d="M15 1C-7 12 1 31 15 35 30 26 34 10 15 1Z"
              fill="currentColor"
            />
            <path
              d="M15 6v34M15 18l-7-5M15 26l8-7"
              stroke="#dce4b1"
              strokeWidth="1"
              fill="none"
            />
          </svg>
        ))}
      </div>
    </div>
  );
}
