import { useEffect, useRef, useState } from "react";

const videoSrc = "/atlas/videos/parallax-3.mp4";

/**
 * Scroll-scrubbed hero.
 * The container is tall (≈ 4 viewports). The video is sticky and pinned
 * to the viewport. Scroll progress through the container drives
 * `video.currentTime` so the user "scrubs" the video by scrolling.
 * Floating captions fade in at progress thresholds, alternating
 * bottom-left / bottom-right / top-right.
 */
export function ScrollVideoHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0); // 0..1 through the section
  const [duration, setDuration] = useState(0);
  const [ready, setReady] = useState(false);

  // Capture duration once metadata loads
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onMeta = () => {
      setDuration(v.duration || 0);
      setReady(true);
    };
    if (v.readyState >= 1 && v.duration) {
      onMeta();
    } else {
      v.addEventListener("loadedmetadata", onMeta);
    }
    return () => v.removeEventListener("loadedmetadata", onMeta);
  }, []);

  // Scroll → currentTime
  useEffect(() => {
    const section = sectionRef.current;
    const v = videoRef.current;
    if (!section || !v) return;

    let raf = 0;
    const update = () => {
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const p = total > 0 ? scrolled / total : 0;
      setProgress(p);
      if (duration > 0) {
        const t = p * duration;
        // Avoid setting currentTime during seeks for performance
        if (Math.abs(v.currentTime - t) > 0.03) {
          try {
            v.currentTime = t;
          } catch {}
        }
      }
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        update();
        raf = 0;
      });
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [duration]);

  // Captions: { from, to, text, position }
  const captions: Array<{
    from: number;
    to: number;
    text: string;
    sub?: string;
    position: "bl" | "br" | "tr" | "tl";
  }> = [
    {
      from: 0.02,
      to: 0.22,
      position: "bl",
      text: "Intelligence is not a moment.",
      sub: "It is a slow accumulation of weights.",
    },
    {
      from: 0.24,
      to: 0.42,
      position: "br",
      text: "Every pattern the model finds was first a mistake it corrected.",
      sub: "— On gradient descent",
    },
    {
      from: 0.44,
      to: 0.62,
      position: "tr",
      text: "Attention is the architecture of meaning.",
      sub: "Transformers, 2017 — and after.",
    },
    {
      from: 0.64,
      to: 0.82,
      position: "bl",
      text: "Capability without intent is the open problem of our decade.",
      sub: "— Alignment, in plain language",
    },
    {
      from: 0.84,
      to: 0.99,
      position: "br",
      text: "The machine is quiet. Our work is to be deliberate.",
      sub: "Read on ↓",
    },
  ];

  const posClass = (p: "bl" | "br" | "tr" | "tl") => {
    switch (p) {
      case "bl":
        return "left-6 lg:left-16 bottom-16 lg:bottom-24 items-start text-left";
      case "br":
        return "right-6 lg:right-16 bottom-16 lg:bottom-24 items-end text-right";
      case "tr":
        return "right-6 lg:right-16 top-24 lg:top-32 items-end text-right";
      case "tl":
        return "left-6 lg:left-16 top-24 lg:top-32 items-start text-left";
    }
  };

  // Section height = (1 + duration * scrollPerSecond) viewports.
  // Default duration of 8s while metadata loads, swapped once known.
  // 1.0 viewport per second of video → a 12s clip needs 12 screens of scroll.
  const scrollPerSecond = 1.0;
  const sectionHeightVh = Math.round((1 + (duration || 8) * scrollPerSecond) * 100);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `${sectionHeightVh}vh` }}
      aria-label="Scroll-driven introduction"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-foreground">
        {/* Video */}
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          playsInline
          preload="auto"
          // Important: NO autoplay/loop — we drive currentTime manually
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Vignette + grain */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 pointer-events-none" />

        {/* Top masthead */}
        <div className="absolute top-0 left-0 right-0 px-6 lg:px-16 pt-28 lg:pt-32 z-10">
          <div className="flex items-center gap-4 font-mono text-[10px] tracking-[0.3em] uppercase text-white/70">
            <span>Optimus / Atlas</span>
            <span className="h-px flex-1 bg-white/20" />
            <span>Issue Nº 04</span>
            <span className="h-px w-8 bg-white/20" />
            <span>Fig. 01</span>
          </div>
        </div>

        {/* Floating captions */}
        {captions.map((c, i) => {
          const active = progress >= c.from && progress <= c.to;
          // Smooth fade based on distance to caption window
          const mid = (c.from + c.to) / 2;
          const half = (c.to - c.from) / 2;
          const dist = Math.abs(progress - mid) / half;
          const opacity = active ? Math.max(0, 1 - Math.pow(dist, 2)) : 0;
          return (
            <div
              key={i}
              className={`absolute flex flex-col gap-3 max-w-[88%] sm:max-w-md lg:max-w-xl text-white pointer-events-none transition-transform duration-700 ${posClass(
                c.position
              )}`}
              style={{
                opacity,
                transform: `translateY(${active ? 0 : 20}px)`,
              }}
            >
              <p className="font-display text-3xl sm:text-4xl lg:text-6xl leading-[1.05] tracking-tight">
                {c.text}
              </p>
              {c.sub && (
                <p className="font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase text-white/70">
                  {c.sub}
                </p>
              )}
            </div>
          );
        })}

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 z-10">
          <div
            className="h-full bg-white"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        {/* Scroll cue (only at start) */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 font-mono text-[10px] tracking-[0.3em] uppercase z-10 transition-opacity duration-500"
          style={{ opacity: progress < 0.04 ? 1 : 0 }}
        >
          Scroll to play ↓
        </div>

        {/* Subtle loading state */}
        {!ready && (
          <div className="absolute inset-0 flex items-center justify-center text-white/50 font-mono text-xs tracking-[0.3em] uppercase">
            Loading film…
          </div>
        )}
      </div>
    </section>
  );
}
