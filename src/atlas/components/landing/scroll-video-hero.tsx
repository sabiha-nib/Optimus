import { useEffect, useRef, useState } from "react";

const videoSrc = "/atlas/videos/optimized/parallax-3-scrub.mp4";

export function ScrollVideoHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const durationRef = useRef(0);
  const lastTimeRef = useRef(-1);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShouldLoad(true);
      },
      { rootMargin: "150% 0px" },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !shouldLoad) return;

    const onCanPlay = () => {
      durationRef.current = v.duration || 0;
      setReady(true);
    };

    if (v.readyState >= 3 && v.duration) onCanPlay();
    else v.addEventListener("canplaythrough", onCanPlay, { once: true });

    return () => v.removeEventListener("canplaythrough", onCanPlay);
  }, [shouldLoad]);

  useEffect(() => {
    const container = containerRef.current;
    const v = videoRef.current;
    if (!container || !v || !shouldLoad) return;

    let raf = 0;
    let seeking = false;

    const onSeeked = () => {
      seeking = false;
    };

    const update = () => {
      const rect = container.getBoundingClientRect();
      const total = container.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const p = total > 0 ? scrolled / total : 0;
      const isActive = rect.top <= 0 && rect.bottom >= window.innerHeight;

      setProgress(p);

      if (!isActive) return;

      const dur = durationRef.current;
      if (dur <= 0 || seeking) return;

      const nextTime = Math.max(0, Math.min(dur, p * dur));
      if (Math.abs(nextTime - lastTimeRef.current) < 0.08) return;
      if (Math.abs(v.currentTime - nextTime) < 0.08) return;

      lastTimeRef.current = nextTime;
      seeking = true;
      try {
        v.currentTime = nextTime;
      } catch {
        seeking = false;
      }
    };

    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        update();
        raf = 0;
      });
    };

    v.addEventListener("seeked", onSeeked);
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      v.removeEventListener("seeked", onSeeked);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [shouldLoad]);

  const overlays: Array<{
    from: number;
    to: number;
    text: string;
    sub?: string;
    position: "bl" | "br" | "tr";
  }> = [
    { from: 0.0, to: 0.15, position: "bl", text: "Introducing", sub: "Optimus Atlas — AI Research & Education" },
    { from: 0.18, to: 0.35, position: "br", text: "Intelligence is not a moment.", sub: "It is a slow accumulation of weights." },
    { from: 0.38, to: 0.55, position: "bl", text: "Every pattern the model finds was first a mistake it corrected.", sub: "— On gradient descent" },
    { from: 0.58, to: 0.75, position: "tr", text: "Attention is the architecture of meaning.", sub: "Transformers, 2017 — and after." },
    { from: 0.8, to: 0.98, position: "bl", text: "The machine is quiet. Our work is to be deliberate.", sub: "Scroll to explore ↓" },
  ];

  const posClass = (p: "bl" | "br" | "tr") => {
    switch (p) {
      case "bl":
        return "left-6 lg:left-16 bottom-20 lg:bottom-28 items-start text-left";
      case "br":
        return "right-6 lg:right-16 bottom-20 lg:bottom-28 items-end text-right";
      case "tr":
        return "right-6 lg:right-16 top-28 lg:top-36 items-end text-right";
    }
  };

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: "500vh" }}>
      <div className="sticky top-0 left-0 h-screen w-full overflow-hidden" style={{ background: "hsl(0 0% 2%)" }}>
        {shouldLoad && (
          <video
            ref={videoRef}
            src={videoSrc}
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ opacity: ready ? 1 : 0, transition: "opacity 0.35s ease" }}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/25 pointer-events-none" />

        {overlays.map((c, i) => {
          const active = progress >= c.from && progress <= c.to;
          const mid = (c.from + c.to) / 2;
          const half = (c.to - c.from) / 2;
          const dist = Math.abs(progress - mid) / half;
          const opacity = active ? Math.max(0, 1 - dist * dist) : 0;

          return (
            <div
              key={i}
              className={`absolute flex max-w-[90%] flex-col gap-3 text-white pointer-events-none sm:max-w-lg lg:max-w-2xl ${posClass(c.position)}`}
              style={{ opacity, transform: `translateY(${active ? 0 : 24}px)`, transition: "transform 0.7s ease, opacity 0.4s ease" }}
            >
              <p className="font-display text-3xl leading-[1.02] tracking-tight sm:text-5xl lg:text-7xl" style={{ textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}>
                {c.text}
              </p>
              {c.sub && (
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/60 sm:text-xs">
                  {c.sub}
                </p>
              )}
            </div>
          );
        })}

        <div className="absolute bottom-0 left-0 right-0 z-10 h-[2px] bg-white/10">
          <div className="h-full bg-white/80 transition-[width] duration-100" style={{ width: `${progress * 100}%` }} />
        </div>

        <div
          className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/50 transition-opacity duration-500"
          style={{ opacity: progress < 0.03 ? 1 : 0 }}
        >
          <span>Scroll to play</span>
          <span className="animate-bounce">↓</span>
        </div>

        {!ready && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[hsl(0_0%_2%)]">
            <div className="text-xl font-semibold tracking-tight text-white/80">OPTIMUS ATLAS</div>
            <div className="h-[2px] w-56 overflow-hidden rounded-full bg-white/10">
              <div className="h-full animate-pulse bg-white/60" style={{ width: "60%" }} />
            </div>
            <p className="font-mono text-xs tracking-widest text-white/30">Loading…</p>
          </div>
        )}
      </div>
    </div>
  );
}

