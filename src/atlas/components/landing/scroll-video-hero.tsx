import { useEffect, useRef, useState, useCallback } from "react";

const videoSrc = "/atlas/videos/parallax-3.mp4";

export function ScrollVideoHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const durationRef = useRef(0);

  /* Preload the video fully so scrubbing never freezes */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onCanPlay = () => {
      durationRef.current = v.duration || 0;
      setReady(true);
    };
    if (v.readyState >= 3 && v.duration) onCanPlay();
    else v.addEventListener("canplaythrough", onCanPlay);
    return () => v.removeEventListener("canplaythrough", onCanPlay);
  }, []);

  /* Draw current frame to canvas for smoother scrubbing */
  const drawFrame = useCallback(() => {
    const v = videoRef.current;
    const c = canvasRef.current;
    if (!v || !c || v.readyState < 2) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    if (c.width !== v.videoWidth || c.height !== v.videoHeight) {
      c.width = v.videoWidth;
      c.height = v.videoHeight;
    }
    ctx.drawImage(v, 0, 0);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const v = videoRef.current;
    if (!container || !v) return;
    let raf = 0;
    let seeking = false;

    const onSeeked = () => {
      seeking = false;
      drawFrame();
    };
    v.addEventListener("seeked", onSeeked);

    const update = () => {
      const rect = container.getBoundingClientRect();
      const total = container.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const p = total > 0 ? scrolled / total : 0;
      progressRef.current = p;
      setProgress(p);

      const dur = durationRef.current;
      if (dur > 0 && !seeking) {
        const t = p * dur;
        if (Math.abs(v.currentTime - t) > 0.05) {
          seeking = true;
          v.currentTime = t;
        }
      }
    };

    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => { update(); raf = 0; });
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      v.removeEventListener("seeked", onSeeked);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [drawFrame]);

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
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden" style={{ background: "hsl(0 0% 2%)" }}>
        {/* Hidden video element for decoding */}
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: ready ? 1 : 0 }}
        />
        {/* Canvas for smooth frame display */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover hidden"
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
          <div className="h-full bg-white/80 transition-[width] duration-100" style={{ width: `${progress * 100}%` }} />
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 font-mono text-[10px] tracking-[0.3em] uppercase z-10 transition-opacity duration-500 flex flex-col items-center gap-2"
          style={{ opacity: progress < 0.03 ? 1 : 0 }}>
          <span>Scroll to play</span>
          <span className="animate-bounce">↓</span>
        </div>

        {/* Loading state */}
        {!ready && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[hsl(0_0%_2%)]">
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
