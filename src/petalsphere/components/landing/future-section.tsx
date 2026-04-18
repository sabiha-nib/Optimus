import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, Sparkles, Globe, Network } from "lucide-react";

const futures = [
  {
    icon: Globe,
    title: "More Capable Models",
    description:
      "Each generation of frontier models is more multimodal, more reliable and better at long-horizon reasoning. Tomorrow's AI will likely combine text, images, video, audio and action into a single, seamless system.",
    color: "#eca8d6",
  },
  {
    icon: Sparkles,
    title: "AI as a Collaborator",
    description:
      "The most likely near-term future is not AI replacing people but AI working with them — a tireless assistant for writing, designing, coding, researching and learning, available to anyone with an internet connection.",
    color: "#7dd3fc",
  },
  {
    icon: Network,
    title: "Toward General Intelligence",
    description:
      "Whether artificial general intelligence is years or decades away is one of the most debated questions in technology. Either way, the steps toward it are already reshaping research priorities, regulation and public conversation.",
    color: "#a5f3fc",
  },
];

export function FutureSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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
      {/* Animated starfield background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-px bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle ${2 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#eca8d6]/5 blur-[150px]"
          style={{ animation: "pulseGlow 8s ease-in-out infinite" }}
        />
        <div
          className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#7dd3fc]/5 blur-[100px]"
          style={{ animation: "pulseGlow 10s ease-in-out infinite reverse" }}
        />
      </div>

      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: i % 2 === 0 ? "#eca8d6" : "#7dd3fc",
              opacity: 0.3,
              animation: `floatGentle ${8 + Math.random() * 4}s ease-in-out ${Math.random() * 2}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="mb-20 text-center">
          <span
            className={`inline-flex items-center gap-4 text-sm font-mono text-white/40 mb-8 justify-center transition-all duration-700 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="w-12 h-px bg-white/20" />
            What Comes Next
            <span className="w-12 h-px bg-white/20" />
          </span>

          <h2
            className={`text-5xl md:text-6xl lg:text-7xl font-display tracking-tight leading-[1.1] text-white mb-8 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            The road
            <br />
            <span className="bg-gradient-to-r from-[#eca8d6] to-[#7dd3fc] bg-clip-text text-transparent">ahead.</span>
          </h2>

          <p
            className={`text-xl text-white/60 leading-relaxed max-w-3xl mx-auto transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            Predicting AI's future is notoriously hard, but the direction of travel is clear:
            more capable systems, more deeply embedded in everyday life, raising questions
            humanity has never had to answer at this scale before.
          </p>
        </div>

        {/* Future cards */}
        <div className="grid lg:grid-cols-3 gap-6 mb-20">
          {futures.map((item, index) => (
            <div
              key={item.title}
              className={`group relative p-8 lg:p-10 border backdrop-blur-sm transition-all duration-500 overflow-hidden ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: `${index * 100 + 300}ms`,
                borderColor: hoveredIndex === index ? `${item.color}50` : "rgba(255,255,255,0.1)",
                backgroundColor: hoveredIndex === index ? `${item.color}10` : "rgba(255,255,255,0.02)",
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${item.color}20, transparent 70%)`,
                  opacity: hoveredIndex === index ? 1 : 0,
                }}
              />

              <div
                className="w-12 h-12 flex items-center justify-center mb-6 transition-all duration-500"
                style={{
                  color: hoveredIndex === index ? item.color : "rgba(255,255,255,0.6)",
                  transform: hoveredIndex === index ? "scale(1.1)" : "scale(1)",
                }}
              >
                <item.icon className="w-8 h-8" />
              </div>

              <h3 className="text-xl font-display text-white mb-4 group-hover:translate-x-1 transition-transform duration-300">{item.title}</h3>
              <p className="text-white/50 leading-relaxed text-sm group-hover:text-white/70 transition-colors duration-300">{item.description}</p>

              <div
                className="absolute bottom-0 left-0 h-[2px] transition-all duration-500"
                style={{
                  background: item.color,
                  width: hoveredIndex === index ? "100%" : "0%",
                  boxShadow: hoveredIndex === index ? `0 0 20px ${item.color}` : "none",
                }}
              />
            </div>
          ))}
        </div>

        {/* Closing reflection */}
        <div
          className={`text-center transition-all duration-1000 delay-600 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="text-2xl md:text-3xl text-white/80 leading-relaxed font-display italic max-w-3xl mx-auto mb-4">
            Artificial intelligence is no longer a question for the distant future.
          </p>

          <p className="text-2xl md:text-3xl text-white/50 leading-relaxed font-display italic max-w-3xl mx-auto mb-16">
            It is a tool, a discipline, and a mirror — being shaped, right now, by all of us.
          </p>

          <Button
            size="lg"
            variant="outline"
            onClick={scrollToTop}
            className="group h-14 px-8 text-base rounded-full border-white/20 text-white hover:bg-white/10 hover:border-[#eca8d6]/50 transition-all duration-300"
          >
            <RotateCcw className="w-4 h-4 mr-2 group-hover:-rotate-180 transition-transform duration-500" />
            Back to the top
          </Button>
        </div>
      </div>

      <style>{`
        @keyframes floatGentle {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-15px) translateX(8px); }
          66% { transform: translateY(10px) translateX(-5px); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
        }
      `}</style>
    </section>
  );
}
