// Small native-vector set dressing; the forest backgrounds remain hand-painted.
export function SceneGround({ place }: { place: string }) {
  if (place === "home") return null;
  const wooden = place === "posts" || place === "about";
  return (
    <svg
      className={`scene-ground scene-ground-${place}`}
      viewBox="0 0 680 105"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`ground-shade-${place}`}>
          <stop stopColor="#34482c" stopOpacity=".55" />
          <stop offset="1" stopColor="#34482c" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`ground-top-${place}`} x2="0" y2="1">
          <stop stopColor={wooden ? "#aea080" : "#a4ad74"} />
          <stop offset="1" stopColor={wooden ? "#726f50" : "#637d4d"} />
        </linearGradient>
      </defs>
      <ellipse
        cx="342"
        cy="58"
        rx="336"
        ry="46"
        fill={`url(#ground-shade-${place})`}
      />
      <path
        d={
          wooden
            ? "m45 13 562-4 44 36-621 6Z"
            : "M24 42q28-30 82-25 57-23 133-5 55-9 99 2 74-18 144 0 86-5 165 30-128 38-302 31T24 42Z"
        }
        fill={`url(#ground-top-${place})`}
      />
      <path
        d={
          wooden
            ? "m30 51 621-6-5 13-603 7Z"
            : "M27 43q143 30 309 18t307-15q-31 29-98 30-144 36-311 10T27 43Z"
        }
        fill={wooden ? "#6b704f" : "#536c43"}
        opacity=".8"
      />
      {wooden ? (
        <path
          d="m132 16-17 28m112-30-8 29m101-30 5 30m100-31 13 30m82-31 25 29M51 32l574-3"
          stroke="#665e44"
          opacity=".4"
          strokeWidth="2"
        />
      ) : (
        <path
          d="m65 34 9-19 2 18m18-5 9-17m443 20 8-18 4 18m26 6 10-16-1 18M161 59q32-13 56 1m185 2q40-14 73-3"
          stroke="#bac28b"
          opacity=".7"
          fill="none"
          strokeWidth="3"
        />
      )}
    </svg>
  );
}
export default function SceneLandmark({ place }: { place: string }) {
  if (place === "posts")
    return (
      <svg
        className="scene-landmark landmark-posts"
        viewBox="0 0 380 320"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="book-light">
            <stop stopColor="#eed99a" stopOpacity=".65" />
            <stop offset="1" stopColor="#eed99a" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="165" cy="120" rx="145" ry="125" fill="url(#book-light)" />
        <path
          d="M46 297V49Q164-13 279 49v248Z"
          fill="#4f5b3c"
          stroke="#405036"
          strokeWidth="7"
        />
        <path d="M62 277V65Q165 10 263 65v212Z" fill="#777c50" />
        <path d="M64 146h199M64 230h199" stroke="#b29b65" strokeWidth="10" />
        <g stroke="#d9d0a4" strokeWidth="2">
          <path d="m78 131-1-55 23-6 3 61Z" fill="#a7ad7f" />
          <path d="m109 132 1-61 24-4 1 65Z" fill="#c3b282" />
          <path d="m145 132-5-65 22 0 8 65Z" fill="#7d977e" />
          <path d="m183 132 10-66 19 4-8 62Z" fill="#bca57d" />
          <path d="m216 132 2-54 24 2 1 52Z" fill="#a4ad85" />
        </g>
        <path
          d="m78 218 4-50 26 2-3 48m12 0 3-57 27-1 2 58m11 0 9-59 23 2-4 57"
          fill="#c5b891"
          stroke="#dcd7b5"
          strokeWidth="2"
        />
        <path
          d="M210 216v-35m-21 2h43l-9-24h-24Z"
          fill="#e9d998"
          stroke="#b89c64"
          strokeWidth="3"
        />
        <path d="M29 300q149-22 271 0l9 15H20Z" fill="#566c43" />
      </svg>
    );
  if (place === "about")
    return (
      <svg
        className="scene-landmark landmark-about"
        viewBox="0 0 380 320"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="porch-light">
            <stop stopColor="#ffe5a2" stopOpacity=".75" />
            <stop offset="1" stopColor="#f8ce83" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="170" cy="164" rx="140" ry="140" fill="url(#porch-light)" />
        <path
          d="M53 285V44Q147-8 237 44v241Z"
          fill="#52573a"
          stroke="#414b31"
          strokeWidth="8"
        />
        <path
          d="M69 277V57q78-42 151 0v220Z"
          fill="#aa8550"
          stroke="#6a6440"
          strokeWidth="4"
        />
        <path d="M84 69q65-27 123 0v106H84Z" fill="#edce84" />
        <path d="M145 50v125m-62-53h125" stroke="#817148" strokeWidth="7" />
        <path d="M72 195h143m-143 13h143" stroke="#8c744a" strokeWidth="3" />
        <circle cx="200" cy="195" r="5" fill="#efdaa2" />
        <path
          d="m40 279 201-1 17 16-230 4Z"
          fill="#a2a17a"
          stroke="#66704c"
          strokeWidth="3"
        />
        <path d="m26 298 234-4 20 21H7Z" fill="#838c64" />
        <path d="m275 289-10-37h41l-5 37Z" fill="#8d7151" />
        <path
          d="M284 255q-37-19-22-35 21 4 22 35Zm0-1q25-39 37-21 0 17-37 21Z"
          fill="#7b9258"
        />
      </svg>
    );
  if (!["notes", "experiments"].includes(place)) return null;
  return (
    <svg
      className={`scene-landmark landmark-${place}`}
      viewBox="0 0 380 260"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`wood-${place}`} x2="0" y2="1">
          <stop stopColor="#9d7950" />
          <stop offset="1" stopColor="#574f32" />
        </linearGradient>
      </defs>
      <path
        d="m40 145 285-12 26 28-306 20Z"
        fill={`url(#wood-${place})`}
        stroke="#4b5032"
        strokeWidth="3"
      />
      <path
        d="m69 178-7 65 17 2 20-69m198-12 21 77 13-3-10-76"
        fill="#655b3d"
        stroke="#4a4d34"
        strokeWidth="3"
      />
      {place === "notes" ? (
        <>
          <path
            d="m90 119 82-12 25 19 57-18 54 26-111 26-98-18Z"
            fill="#e6e0ba"
            stroke="#9c9d76"
            strokeWidth="2"
          />
          <path
            d="m197 126 0 34m-85-27 55-6m-48 16 56-6m41 0 52-11m-47 22 49-12"
            stroke="#9c9d76"
            strokeWidth="1.5"
          />
          <path d="m274 107 28-37 5 4-27 37" stroke="#c59c55" strokeWidth="6" />
        </>
      ) : (
        <>
          <path
            d="m118 115 15-45-2-18 25-1-1 22 25 39c8 20-62 27-62 3Z"
            fill="#b4c7a5"
            fillOpacity=".85"
            stroke="#738366"
            strokeWidth="3"
          />
          <path d="m124 111 48-1c14 18-51 27-48 1Z" fill="#b5ba76" />
          <path
            d="m216 133-14-34 42-6 17 33Z"
            fill="#b59f66"
            stroke="#766b41"
            strokeWidth="3"
          />
          <path d="m202 100 40-7-20-11-35 7Z" fill="#d1be8d" />
          <path
            d="m283 120 11-20m-10 14 20 4"
            stroke="#626e4c"
            strokeWidth="5"
          />
        </>
      )}
      <path
        d="m31 172 12-12m278-18 16-7m-291 44 13 0m242-8 19-2"
        stroke="#7d8a4e"
        strokeWidth="5"
      />
    </svg>
  );
}
