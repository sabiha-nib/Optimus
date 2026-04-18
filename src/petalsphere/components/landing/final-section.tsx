import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, RotateCcw } from "lucide-react";

export function FinalSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} className="relative py-32 lg:py-48 overflow-hidden bg-black">
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#eca8d6]/5 blur-[100px]" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-[#eca8d6]/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `floatGentle ${8 + Math.random() * 4}s ease-in-out ${Math.random() * 2}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-[1000px] mx-auto px-6 text-center">
        <h2
          className={`text-5xl md:text-6xl lg:text-7xl font-display tracking-tight leading-[1.1] text-white mb-8 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          What if every garden
          <br />
          <span className="text-[#eca8d6]">could think?</span>
        </h2>

        <p
          className={`text-xl md:text-2xl text-white/60 leading-relaxed font-display italic max-w-2xl mx-auto mb-4 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          The future of nature is not separate from technology.
        </p>

        <p
          className={`text-xl md:text-2xl text-white/50 leading-relaxed font-display italic max-w-2xl mx-auto mb-16 transition-all duration-1000 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          It grows with it.
        </p>

        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-600 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Button
            size="lg"
            className="bg-white hover:bg-white/90 text-black px-8 h-14 text-base rounded-full group"
          >
            Explore More
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={scrollToTop}
            className="h-14 px-8 text-base rounded-full border-white/20 text-white hover:bg-white/10"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Restart Journey
          </Button>
        </div>
      </div>

      <style>{`
        @keyframes floatGentle {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-15px) translateX(8px); }
          66% { transform: translateY(10px) translateX(-5px); }
        }
      `}</style>
    </section>
  );
}
