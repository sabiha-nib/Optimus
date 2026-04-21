import { useEffect, useRef, useState } from "react";

const videoSrc = "/atlas/videos/parallax-3.mp4";

export function ScrollVideoHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onMeta = () => { setDuration(v.duration || 0); setReady(true); };
    if (v.readyState >= 1 && v.duration) onMeta();
    else v.addEventListener("loadedmetadata", onMeta);
    return () => v.removeEventListener("loadedmetadata", onMeta);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const v = videoRef.current;
    if (!container || !v) return;
    let raf = 0;
    const update = () => {
      const rect = container.getBoundingClientRect();
      const total = container.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const p = total > 0 ? scrolled / total : 0;
      setProgress(p);
      if (duration > 0) {
        const t = p * duration;
        if (Math.abs(v.currentTime - t) > 0.03) {
          try { v.currentTime = t; } catch {}
        }
      }
    };
    const onScroll = () => { if (raf) return; raf = requestAnimationFrame(() => { update(); raf = 0; }); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [duration]);

  const overlays: Array<{
    from: number; to: number;
    text: string; sub?: string;
    position: "bl" | "br" | "tr";
  }> = [
    { from: 0.0, to: 0.15, position: "bl",
      text: "Introducing",
      sub: "Optimus Atlas — AI Research & Education" },
    { from: 0.18, to: 0.35, position: "br",
      text: "Intelligence is not a moment.",
      sub: "It is a slow accumulation of weights." },
    { from: 0.38, to: 0.55, position: "bl",
      text: "Every pattern the model finds was first a mistake it corrected.",
      sub: "— On gradient descent" },
    { from: 0.58, to: 0.75, position: "tr",
      text: "Attention is the architecture of meaning.",
      sub: "Transformers, 2017 — and after." },
    { from: 0.80, to: 0.98, position: "bl",
      text: "The machine is quiet. Our work is to be deliberate.",
      sub: "Scroll to explore ↓" },
  ];

  const posClass = (p: "bl" | "br" | "tr") => {
    switch (p) {
      case "bl": return "left-6 lg:left-16 bottom-20 lg:bottom-28 items-start text-left";
      case "br": return "right-6 lg:right-16 bottom-20 lg:bottom-28 items-end text-right";
      case "tr": return "right-6 lg:right-16 top-28 lg:top-36 items-end text-right";
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: "500vh" }}
    >
      {/* Sticky viewport — pinned to screen while scrolling through the 500vh container */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden" style={{ background: "hsl(0 0% 2%)" }}>
        <video
          ref={videoRef} src={videoSrc} muted playsInline preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/25 pointer-events-none" />

        {/* Text overlays */}
        {overlays.map((c, i) => {
          const active = progress >= c.from && progress <= c.to;
          const mid = (c.from + c.to) / 2;
          const half = (c.to - c.from) / 2;
          const dist = Math.abs(progress - mid) / half;
          const opacity = active ? Math.max(0, 1 - dist * dist) : 0;
          return (
            <div key={i}
              className={`absolute flex flex-col gap-3 max-w-[90%] sm:max-w-lg lg:max-w-2xl text-white pointer-events-none ${posClass(c.position)}`}
              style={{ opacity, transform: `translateY(${active ? 0 : 24}px)`, transition: "transform 0.7s ease" }}
            >
              <p className="font-display text-3xl sm:text-5xl lg:text-7xl leading-[1.02] tracking-tight"
                style={{ textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}>
                {c.text}
              </p>
              {c.sub && (
                <p className="font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase text-white/60">
                  {c.sub}
                </p>
              )}
            </div>
          );
        })}

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 z-10">
          <div className="h-full bg-white/80" style={{ width: `${progress * 100}%` }} />
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 font-mono text-[10px] tracking-[0.3em] uppercase z-10 transition-opacity duration-500 flex flex-col items-center gap-2"
          style={{ opacity: progress < 0.03 ? 1 : 0 }}>
          <span>Scroll to play</span>
          <span className="animate-bounce">↓</span>
        </div>

        {/* Loading state */}
        {!ready && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <div className="text-xl font-semibold tracking-tight text-white/80">OPTIMUS ATLAS</div>
            <div className="h-[2px] w-56 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-white/60 animate-pulse" style={{ width: "60%" }} />
            </div>
            <p className="font-mono text-xs tracking-widest text-white/30">Loading…</p>
          </div>
        )}
      </div>
    </div>
  );
}
