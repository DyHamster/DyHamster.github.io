import { fadeVolume } from "../lib/music-volume.mjs";
import { useCallback, useEffect, useRef, useState } from "react";
import { Music2, Pause, Play, Volume2, X, Leaf } from "lucide-react";
const CHOICE = "forest.music.choice.v1";
const VOLUME = "forest.music.volume.v1";
const read = (key: string) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};
const save = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* Session controls still work. */
  }
};
export default function MusicPlayer() {
  const audio = useRef<HTMLAudioElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const [welcome, setWelcome] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [panel, setPanel] = useState(false);
  const [message, setMessage] = useState("");
  const [volume, setVolume] = useState(() => {
    const stored = read(VOLUME);
    return stored === null
      ? 0.22
      : Math.min(1, Math.max(0, Number(stored) || 0));
  });
  const level = useRef(volume);
  const desired = useRef(read(CHOICE) === "music");
  const sequence = useRef(0);
  const frame = useRef(0);
  const resume = useRef(false);
  const pause = useCallback(() => {
    sequence.current++;
    cancelAnimationFrame(frame.current);
    audio.current?.pause();
  }, []);
  const play = useCallback(async () => {
    const player = audio.current;
    if (!player || document.hidden) return;
    const id = ++sequence.current;
    cancelAnimationFrame(frame.current);
    player.volume = 0;
    setMessage("");
    try {
      await player.play();
      if (id !== sequence.current || !desired.current || document.hidden) {
        player.pause();
        return;
      }
      const start = performance.now();
      const fade = (now: number) => {
        if (id !== sequence.current) return;
        const progress = Math.min(1, Math.max(0, (now - start) / 1400));
        player.volume = fadeVolume(now - start, level.current);
        if (progress < 1) frame.current = requestAnimationFrame(fade);
      };
      frame.current = requestAnimationFrame(fade);
    } catch {
      if (id === sequence.current)
        setMessage(
          player.error
            ? "音乐暂时无法加载，请稍后重试。"
            : "轻点播放，让音乐继续。",
        );
    }
  }, []);
  useEffect(() => {
    if (welcome) dialog.current?.showModal();
  }, [welcome]);
  useEffect(() => {
    if (!welcome && desired.current) void play();
    const onVisibility = () => {
      if (document.hidden) {
        resume.current =
          desired.current && !!audio.current && !audio.current.paused;
        pause();
      } else if (resume.current && desired.current) {
        resume.current = false;
        void play();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      pause();
    };
  }, [welcome, pause, play]);
  useEffect(() => {
    if (!message) return;
    const timeout = setTimeout(() => setMessage(""), 4500);
    return () => clearTimeout(timeout);
  }, [message]);
  useEffect(() => {
    if (!panel) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPanel(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [panel]);
  const choose = (music: boolean) => {
    desired.current = music;
    save(CHOICE, music ? "music" : "silent");
    dialog.current?.close();
    setWelcome(false);
    if (music) void play();
    else pause();
  };
  return (
    <>
      <audio
        ref={audio}
        data-testid="forest-audio"
        src="/musics/天空之城-宫崎骏.mp3"
        loop
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => {
          setPlaying(false);
          setMessage("音乐暂时无法加载，请稍后重试。");
        }}
      />
      <div
        className={`music-dock ${playing ? "playing" : ""}`}
        aria-label="背景音乐控制"
      >
        <button
          className="music-toggle"
          aria-label={playing ? "暂停背景音乐" : "播放背景音乐"}
          onClick={() => {
            if (audio.current && !audio.current.paused) {
              desired.current = false;
              resume.current = false;
              save(CHOICE, "silent");
              pause();
            } else {
              desired.current = true;
              save(CHOICE, "music");
              void play();
            }
          }}
        >
          {playing ? (
            <Pause size={15} fill="currentColor" />
          ) : (
            <Play size={15} fill="currentColor" />
          )}
        </button>
        <button
          className="music-label"
          aria-label="打开音乐设置：天空之城"
          aria-expanded={panel}
          aria-controls="music-settings"
          onClick={() => setPanel(!panel)}
        >
          <span className="equalizer" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>
          <span>
            天空之城
            <small>{playing ? "正在轻轻播放" : "让森林安静一会儿"}</small>
          </span>
        </button>
        {panel && (
          <div id="music-settings" className="music-panel">
            <div>
              <strong>
                <Music2 size={15} /> 森林里的声音
              </strong>
              <button aria-label="关闭音乐设置" onClick={() => setPanel(false)}>
                <X size={16} />
              </button>
            </div>
            <p>天空之城 · 循环播放</p>
            <label>
              <Volume2 size={16} />
              <span className="sr-only">音乐音量</span>
              <input
                aria-label="音乐音量"
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(event) => {
                  const next = Number(event.target.value);
                  setVolume(next);
                  level.current = next;
                  save(VOLUME, String(next));
                  cancelAnimationFrame(frame.current);
                  if (audio.current) audio.current.volume = next;
                }}
              />
              <output>{Math.round(volume * 100)}%</output>
            </label>
            <button
              className="text-link"
              onClick={() => {
                setPanel(false);
                setWelcome(true);
              }}
            >
              重新选择进入方式
            </button>
          </div>
        )}
        <span className="music-message" role="status">
          {message}
        </span>
      </div>
      <dialog
        ref={dialog}
        className="forest-welcome"
        aria-labelledby="welcome-title"
        onCancel={(event) => {
          event.preventDefault();
          choose(false);
        }}
      >
        <div className="welcome-symbol">
          <Leaf size={26} strokeWidth={1.3} />
        </div>
        <span className="eyebrow">A LITTLE FOREST, A LITTLE REST</span>
        <h2 id="welcome-title">
          欢迎来到，
          <br />
          这片小小的森林。
        </h2>
        <p>
          把脚步放慢一点。
          <br />
          你想伴着音乐，还是安静地走进来？
        </p>
        <button
          className="button primary"
          autoFocus
          onClick={() => choose(true)}
        >
          <Music2 size={16} /> 伴着音乐进入 <span>↗</span>
        </button>
        <button className="quiet-entry" onClick={() => choose(false)}>
          安静进入 <span>→</span>
        </button>
        <small>记住这次选择，随时可以通过屏幕边缘的音乐控件调整。</small>
      </dialog>
    </>
  );
}
