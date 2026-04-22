import { useEffect, useRef, useState } from "react";

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

    const onReady = () => {
      durationRef.current = v.duration || 0;
      setReady(true);
    };

    if (v.readyState >= 3 && v.duration) onReady();
    else v.addEventListener("canplaythrough", onReady, { once: true });

    return () => v.removeEventListener("canplaythrough", onReady);
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
    <div ref={containerRef} className="relative w-full" style={{ height: `${scrollHeight}vh` }}>
      <div className="sticky top-0 left-0 h-screen w-full overflow-hidden" style={{ background: "hsl(0 0% 2%)" }}>
        {shouldLoad && (
          <video
            ref={videoRef}
            src={src}
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ opacity: ready ? 1 : 0, transition: "opacity 0.35s ease" }}
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

        <div className="absolute top-6 left-6 z-10 font-mono text-[10px] uppercase tracking-[0.25em] text-white/40 lg:left-16">
          {figure}
        </div>

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
              style={{ opacity, transform: `translateY(${active ? 0 : 20}px)`, transition: "transform 0.6s ease, opacity 0.4s ease" }}
            >
              <p className="font-display text-2xl leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl" style={{ textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}>
                {c.text}
              </p>
              {c.sub && (
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/50 sm:text-xs">
                  {c.sub}
                </p>
              )}
            </div>
          );
        })}

        <div className="absolute bottom-0 left-0 right-0 z-10 h-[2px] bg-white/10">
          <div className="h-full bg-white/60 transition-[width] duration-100" style={{ width: `${progress * 100}%` }} />
        </div>

        {!ready && (
          <div className="absolute inset-0 flex items-center justify-center bg-[hsl(0_0%_2%)]">
            <div className="h-[2px] w-32 overflow-hidden rounded-full bg-white/10">
              <div className="h-full animate-pulse bg-white/40" style={{ width: "60%" }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
