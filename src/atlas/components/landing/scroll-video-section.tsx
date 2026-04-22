import { useEffect, useRef, useState, useCallback } from "react";

interface ScrollVideoSectionProps {
  src: string;
  figure: string;
  overlays: Array<{
    from: number;
    to: number;
    text: string;
    sub?: string;
    position: "bl" | "br" | "tr";
  }>;
  /** Height in vh units, default 400 */
  scrollHeight?: number;
}

export function ScrollVideoSection({
  src,
  figure,
  overlays,
  scrollHeight = 400,
}: ScrollVideoSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const durationRef = useRef(0);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onReady = () => {
      durationRef.current = v.duration || 0;
      setReady(true);
    };
    if (v.readyState >= 3 && v.duration) onReady();
    else v.addEventListener("canplaythrough", onReady);
    return () => v.removeEventListener("canplaythrough", onReady);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const v = videoRef.current;
    if (!container || !v) return;
    let raf = 0;
    let seeking = false;

    const onSeeked = () => { seeking = false; };
    v.addEventListener("seeked", onSeeked);

    const update = () => {
      const rect = container.getBoundingClientRect();
      const total = container.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const p = total > 0 ? scrolled / total : 0;
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
  }, []);

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
      style={{ height: `${scrollHeight}vh` }}
    >
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden" style={{ background: "hsl(0 0% 2%)" }}>
        <video
          ref={videoRef}
          src={src}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: ready ? 1 : 0, transition: "opacity 0.5s" }}
        />
        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none" />

        {/* Figure label */}
        <div className="absolute top-6 left-6 lg:left-16 font-mono text-[10px] tracking-[0.25em] uppercase text-white/40 z-10">
          {figure}
        </div>

        {/* Text overlays */}
        {overlays.map((c, i) => {
          const active = progress >= c.from && progress <= c.to;
          const mid = (c.from + c.to) / 2;
          const half = (c.to - c.from) / 2;
          const dist = Math.abs(progress - mid) / half;
          const opacity = active ? Math.max(0, 1 - dist * dist) : 0;
          return (
            <div
              key={i}
              className={`absolute flex flex-col gap-3 max-w-[90%] sm:max-w-lg lg:max-w-2xl text-white pointer-events-none ${posClass(c.position)}`}
              style={{ opacity, transform: `translateY(${active ? 0 : 20}px)`, transition: "transform 0.6s ease, opacity 0.4s ease" }}
            >
              <p className="font-display text-2xl sm:text-4xl lg:text-5xl leading-[1.05] tracking-tight"
                style={{ textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}>
                {c.text}
              </p>
              {c.sub && (
                <p className="font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase text-white/50">
                  {c.sub}
                </p>
              )}
            </div>
          );
        })}

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 z-10">
          <div className="h-full bg-white/60 transition-[width] duration-100" style={{ width: `${progress * 100}%` }} />
        </div>

        {/* Loading */}
        {!ready && (
          <div className="absolute inset-0 flex items-center justify-center bg-[hsl(0_0%_2%)]">
            <div className="h-[2px] w-32 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-white/40 animate-pulse" style={{ width: "60%" }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
