import { useEffect, useRef, useState } from "react";

export function ChapterOneSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, 1 - rect.top / window.innerHeight));
        setScrollY(progress);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-black py-32"
    >
      {/* Parallax background layers */}
      <div 
        className="absolute inset-0 z-0"
        style={{ transform: `translateY(${scrollY * -50}px)` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a1a0f] to-black" />
      </div>

      {/* Floating petals */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 rounded-full bg-[#eca8d6]/30 blur-[1px]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${6 + Math.random() * 4}s ease-in-out ${Math.random() * 2}s infinite`,
              transform: `translateY(${scrollY * (30 + i * 5)}px)`,
            }}
          />
        ))}
      </div>

      {/* Depth trees silhouettes */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[60%] z-[2] pointer-events-none opacity-20"
        style={{ transform: `translateY(${scrollY * -30}px)` }}
      >
        <div className="absolute bottom-0 left-[10%] w-32 h-64 bg-gradient-to-t from-[#1a2f1a] to-transparent rounded-t-full" />
        <div className="absolute bottom-0 left-[30%] w-24 h-48 bg-gradient-to-t from-[#1a2f1a] to-transparent rounded-t-full" />
        <div className="absolute bottom-0 right-[20%] w-40 h-72 bg-gradient-to-t from-[#1a2f1a] to-transparent rounded-t-full" />
        <div className="absolute bottom-0 right-[40%] w-20 h-40 bg-gradient-to-t from-[#1a2f1a] to-transparent rounded-t-full" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[900px] mx-auto px-6 text-center">
        <span
          className={`inline-flex items-center gap-4 text-sm font-mono text-white/40 mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="w-12 h-px bg-white/20" />
          Chapter One
          <span className="w-12 h-px bg-white/20" />
        </span>

        <h2
          className={`text-4xl md:text-5xl lg:text-6xl font-display tracking-tight leading-[1.2] text-white mb-12 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          The Garden Awakens
        </h2>

        <div className="space-y-8">
          <p
            className={`text-xl md:text-2xl text-white/70 leading-relaxed font-display italic transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Imagine one evening, you step into your garden...
          </p>
          <p
            className={`text-xl md:text-2xl text-white/60 leading-relaxed font-display italic transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            The air is calm. The flowers glow softly.
          </p>
          <p
            className={`text-xl md:text-2xl text-white/50 leading-relaxed font-display italic transition-all duration-1000 delay-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            And something feels... different.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          25% { transform: translateY(-20px) translateX(10px); opacity: 0.6; }
          50% { transform: translateY(-10px) translateX(-5px); opacity: 0.4; }
          75% { transform: translateY(-30px) translateX(5px); opacity: 0.5; }
        }
      `}</style>
    </section>
  );
}
