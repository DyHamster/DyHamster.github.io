import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
const saved = () => {
  try {
    return localStorage.getItem("theme");
  } catch {
    return null;
  }
};
export default function ThemeToggle() {
  const [dark, setDark] = useState(() =>
    saved()
      ? saved() === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches,
  );
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", dark ? "#1c2c25" : "#f6f5eb");
  }, [dark]);
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (!saved()) setDark(media.matches);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);
  return (
    <button
      className="theme-toggle"
      aria-label={dark ? "切换到浅色模式" : "切换到深色模式"}
      onClick={() => {
        setDark(!dark);
        try {
          localStorage.setItem("theme", dark ? "light" : "dark");
        } catch {
          /* Theme still works without storage. */
        }
      }}
    >
      {dark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
