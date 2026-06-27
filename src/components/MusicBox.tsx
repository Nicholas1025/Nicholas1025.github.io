import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const SONG_SRC = "/Song/wave%20to%20earth%20-%20Seasons.mp3";

export default function MusicBox() {
  const rootRef = useRef<HTMLButtonElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const isLive = hasStarted && !isMuted;

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const bars = gsap.utils.toArray<HTMLElement>(".music-box-bar");

      gsap.set(bars, { scaleY: isLive ? 0.5 : 0.18, opacity: isLive ? 1 : 0.42 });

      if (!isLive || reduceMotion) {
        return;
      }

      const timeline = gsap.timeline({ repeat: -1, defaults: { transformOrigin: "50% 100%" } });

      timeline
        .to(bars, {
          scaleY: () => gsap.utils.random(0.34, 1, 0.01),
          opacity: () => gsap.utils.random(0.62, 1, 0.01),
          duration: 0.42,
          stagger: { each: 0.055, from: "center" },
          ease: "power2.out",
        })
        .to(bars, {
          scaleY: () => gsap.utils.random(0.22, 0.72, 0.01),
          opacity: () => gsap.utils.random(0.48, 0.86, 0.01),
          duration: 0.5,
          stagger: { each: 0.045, from: "edges" },
          ease: "power3.out",
        });

      return () => {
        timeline.kill();
      };
    },
    { scope: rootRef, dependencies: [isLive], revertOnUpdate: true },
  );

  const handleToggle = async () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (!hasStarted) {
      audio.muted = false;
      audio.volume = 0.42;

      try {
        await audio.play();
        setHasStarted(true);
        setIsMuted(false);
      } catch {
        setHasStarted(false);
        setIsMuted(true);
      }

      return;
    }

    const nextMuted = !isMuted;
    audio.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  return (
    <button
      ref={rootRef}
      className="music-box"
      type="button"
      onClick={handleToggle}
      aria-label={isLive ? "Mute background music" : "Play background music"}
      aria-pressed={isLive}
      data-live={isLive ? "true" : "false"}
    >
      <audio ref={audioRef} src={SONG_SRC} preload="metadata" loop muted />
      <span className="music-box-label" aria-hidden="true">
        audio
      </span>
      <span className="music-box-bars" aria-hidden="true">
        <span className="music-box-bar" />
        <span className="music-box-bar" />
        <span className="music-box-bar" />
        <span className="music-box-bar" />
        <span className="music-box-bar" />
      </span>
      <span className="music-box-state" aria-hidden="true">
        {isLive ? "on" : "off"}
      </span>
      <span className="music-box-title" aria-hidden="true">
        seasons
      </span>
    </button>
  );
}
