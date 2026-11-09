import type { CSSProperties } from "react";

/** One 32px drawing system for the four content destinations. */
export default function SectionIcon({
  kind,
  size = 32,
  className = "",
}: {
  kind: string;
  size?: number;
  className?: string;
}) {
  const paper = "var(--icon-paper, #eee8d2)";
  return (
    <svg
      className={`section-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ "--icon-size": `${size}px` } as CSSProperties}
    >
      {kind === "notes" ? (
        <>
          <path
            d="M8 4.5h15a2 2 0 0 1 2 2v21H8a3 3 0 0 1-3-3v-17a3 3 0 0 1 3-3Z"
            fill={paper}
          />
          <path d="M9 5v19m-3 0h19M13 11h8m-8 4h6" />
          <path d="m21 21 5-6 2 2-5 6-3 1Z" fill="var(--paper)" />
        </>
      ) : kind === "posts" ? (
        <>
          <path
            d="M16 8q-6-4-12-1v20q6-3 12 1 6-4 12-1V7q-6-3-12 1Z"
            fill={paper}
          />
          <path d="M16 8v20M8 12q2-1 5 .5m-5 4q2-1 5 .5m7-5.5q2-1 5-.5m-5 5q2-1 5-.5" />
          <path d="M23 5v6l-2-1.5-2 1.5V5" fill="var(--accent)" />
        </>
      ) : kind === "experiments" ? (
        <>
          <path d="M8 5h16v13H8Z" fill={paper} />
          <path d="M11 14 14 11l3 2 4-5M5 19h22l2 4H3Zm2 4v5m18-5v5" />
          <path d="M12 26h8" />
        </>
      ) : (
        <>
          <path d="m3.5 15 12.5-11L28.5 15M6 13v15h20V13" fill={paper} />
          <path d="M13 28V18h6v10m-9-12v3m13-3v3" />
          <path d="M22 9V5h3v7" />
        </>
      )}
    </svg>
  );
}
