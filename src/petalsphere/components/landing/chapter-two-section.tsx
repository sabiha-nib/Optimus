import { useEffect, useRef, useState } from "react";

export function ChapterTwoSection() {
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
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0f1a14] to-black" />

      {/* Animated water drops */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-8 bg-gradient-to-b from-[#67e8f9]/40 to-transparent rounded-full"
            style={{
              left: `${10 + i * 8}%`,
              animation: `dropFall ${2 + Math.random() * 2}s ease-in ${Math.random() * 3}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Glowing orbs representing sensors */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        <div 
          className={`absolute top-[30%] left-[20%] w-4 h-4 rounded-full bg-[#eca8d6] blur-sm transition-all duration-1000 ${
            isVisible ? "opacity-60 scale-100" : "opacity-0 scale-0"
          }`}
          style={{ animationDelay: "0.5s", animation: isVisible ? "pulse 2s ease-in-out infinite" : "none" }}
        />
        <div 
          className={`absolute top-[50%] right-[25%] w-3 h-3 rounded-full bg-[#67e8f9] blur-sm transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-60 scale-100" : "opacity-0 scale-0"
          }`}
          style={{ animation: isVisible ? "pulse 2.5s ease-in-out 0.5s infinite" : "none" }}
        />
        <div 
          className={`absolute bottom-[35%] left-[40%] w-5 h-5 rounded-full bg-[#a78bfa] blur-sm transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-50 scale-100" : "opacity-0 scale-0"
          }`}
          style={{ animation: isVisible ? "pulse 3s ease-in-out 1s infinite" : "none" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[900px] mx-auto px-6 text-center">
        <span
          className={`inline-flex items-center gap-4 text-sm font-mono text-white/40 mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="w-12 h-px bg-white/20" />
          Chapter Two
          <span className="w-12 h-px bg-white/20" />
        </span>

        <h2
          className={`text-4xl md:text-5xl lg:text-6xl font-display tracking-tight leading-[1.2] text-white mb-12 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Something Is Changing
        </h2>

        <div className="space-y-8">
          <p
            className={`text-xl md:text-2xl text-white/70 leading-relaxed font-display italic transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            The plants respond before you act.
          </p>
          <p
            className={`text-xl md:text-2xl text-white/60 leading-relaxed font-display italic transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Water flows at the right moment.
          </p>
          <p
            className={`text-xl md:text-2xl text-white/60 leading-relaxed font-display italic transition-all duration-1000 delay-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Light adjusts without touch.
          </p>
          <p
            className={`text-2xl md:text-3xl text-[#eca8d6]/80 leading-relaxed font-display transition-all duration-1000 delay-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Is this nature... or something more?
          </p>
        </div>
      </div>

      <style>{`
        @keyframes dropFall {
          0% { top: -5%; opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.4; }
          100% { top: 105%; opacity: 0; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.3); opacity: 0.8; }
        }
      `}</style>
    </section>
  );
}
