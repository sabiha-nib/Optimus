import { useEffect, useRef, useState } from "react";

export function ChapterThreeSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[80vh] flex flex-col justify-center items-center overflow-hidden bg-black py-32"
    >
      {/* Neural network background */}
      <div className="absolute inset-0 z-0">
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 800 600">
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#eca8d6" />
              <stop offset="100%" stopColor="#67e8f9" />
            </linearGradient>
          </defs>
          {/* Neural network lines */}
          {[...Array(15)].map((_, i) => (
            <line
              key={i}
              x1={`${100 + i * 40}`}
              y1={`${50 + Math.sin(i) * 100}`}
              x2={`${300 + i * 30}`}
              y2={`${200 + Math.cos(i) * 80}`}
              stroke="url(#lineGrad)"
              strokeWidth="0.5"
              className={isVisible ? "animate-drawLine" : ""}
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
          {/* Nodes */}
          {[...Array(12)].map((_, i) => (
            <circle
              key={`node-${i}`}
              cx={150 + (i % 4) * 150}
              cy={100 + Math.floor(i / 4) * 150}
              r="4"
              fill="#eca8d6"
              className={isVisible ? "animate-nodeAppear" : "opacity-0"}
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[900px] mx-auto px-6 text-center">
        <span
          className={`inline-flex items-center gap-4 text-sm font-mono text-white/40 mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="w-12 h-px bg-white/20" />
          Chapter Three
          <span className="w-12 h-px bg-white/20" />
        </span>

        <h2
          className={`text-4xl md:text-5xl lg:text-6xl font-display tracking-tight leading-[1.2] text-white mb-12 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          The Hidden Intelligence
        </h2>

        <div className="space-y-8">
          <p
            className={`text-xl md:text-2xl text-white/70 leading-relaxed font-display italic transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            This is not magic.
          </p>
          <p
            className={`text-2xl md:text-3xl text-white leading-relaxed font-display transition-all duration-1000 delay-600 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            This is <span className="text-[#eca8d6]">artificial intelligence</span>
            <br />
            working with nature.
          </p>
        </div>

        {/* Transition indicator */}
        <div
          className={`mt-16 flex flex-col items-center gap-4 transition-all duration-1000 delay-1000 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="text-sm font-mono text-white/30">Discover the science</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </div>

      <style>{`
        @keyframes drawLine {
          from { stroke-dashoffset: 1000; stroke-dasharray: 1000; }
          to { stroke-dashoffset: 0; stroke-dasharray: 1000; }
        }
        .animate-drawLine {
          animation: drawLine 2s ease-out forwards;
        }
        @keyframes nodeAppear {
          from { opacity: 0; transform: scale(0); }
          to { opacity: 0.6; transform: scale(1); }
        }
        .animate-nodeAppear {
          animation: nodeAppear 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
