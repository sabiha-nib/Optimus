import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    title: "Perceive",
    subtitle: "data in",
    description: "An AI system begins by ingesting data — pixels from a camera, words from a query, signals from a sensor. Raw inputs are normalised and turned into the numerical vectors a model can reason over.",
    color: "#eca8d6",
  },
  {
    number: "02",
    title: "Learn",
    subtitle: "patterns emerge",
    description: "During training, the model adjusts millions or billions of internal parameters to minimise its mistakes. Each pass through the data leaves it slightly better at its task — a slow, statistical kind of understanding.",
    color: "#7dd3fc",
  },
  {
    number: "03",
    title: "Act",
    subtitle: "decisions out",
    description: "Once trained, the model is deployed: it answers questions, classifies images, generates text, or controls systems in real time. Every action it takes can become new training data, closing the loop.",
    color: "#a5f3fc",
  },
];

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative py-24 lg:py-32 how-it-works-bg text-white overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full blur-3xl"
            style={{
              width: `${200 + i * 100}px`,
              height: `${200 + i * 100}px`,
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
              backgroundColor: steps[i % 3].color,
              opacity: 0.03,
              animation: `floatOrb ${10 + i * 2}s ease-in-out infinite`,
              animationDelay: `${i * 1.5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="relative mb-0 lg:mb-0 grid lg:grid-cols-2 gap-4 lg:gap-12 items-end">
          <div className="overflow-hidden pb-0 lg:pb-32">
            <div className={`transition-all duration-1000 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"}`}>
              <span className="inline-flex items-center gap-3 text-sm font-mono text-white/40 mb-8">
                <span className="w-12 h-px bg-white/20" />
                The Cycle
              </span>
            </div>

            <h2 className={`text-6xl md:text-7xl lg:text-[128px] font-display tracking-tight leading-[0.85] transition-all duration-1000 delay-100 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
            }`}>
              <span className="block" style={{ color: steps[0].color }}>Perceive.</span>
              <span className="block" style={{ color: steps[1].color }}>Learn.</span>
              <span className="block" style={{ color: steps[2].color }}>Act.</span>
            </h2>
          </div>

          <div className={`relative h-[320px] lg:h-[640px] overflow-hidden transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}>
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tree-uAia6REvB137CQyHFCf0za3O6h2zKO.png"
              alt=""
              aria-hidden="true"
              className="absolute bottom-0 left-0 w-full h-full object-contain object-bottom"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          {steps.map((step, index) => (
            <button
              key={step.number}
              type="button"
              onClick={() => setActiveStep(index)}
              onMouseEnter={() => setHoveredStep(index)}
              onMouseLeave={() => setHoveredStep(null)}
              className="relative text-left p-8 lg:p-12 border transition-all duration-500 overflow-hidden"
              style={{
                backgroundColor: "#000000",
                borderColor: activeStep === index || hoveredStep === index ? `${step.color}80` : "rgba(255,255,255,0.25)",
              }}
            >
              <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 0% 0%, ${step.color}20, transparent 60%)`,
                  opacity: activeStep === index || hoveredStep === index ? 1 : 0,
                }}
              />

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <span
                    className="text-4xl font-display transition-colors duration-300"
                    style={{ color: activeStep === index || hoveredStep === index ? step.color : "rgba(255,255,255,0.2)" }}
                  >
                    {step.number}
                  </span>
                  <div className="flex-1 h-px bg-white/10 overflow-hidden">
                    {activeStep === index && (
                      <div
                        className="h-full animate-progress"
                        style={{ backgroundColor: step.color }}
                      />
                    )}
                  </div>
                </div>

                <h3
                  className="text-3xl lg:text-4xl font-display mb-2 transition-transform duration-300"
                  style={{ transform: hoveredStep === index ? "translateX(8px)" : "translateX(0)" }}
                >
                  {step.title}
                </h3>
                <span
                  className="text-xl font-display block mb-6 transition-colors duration-300"
                  style={{ color: hoveredStep === index ? step.color : "rgba(255,255,255,0.4)" }}
                >
                  {step.subtitle}
                </span>

                <p className={`text-white/60 leading-relaxed transition-opacity duration-300 ${
                  activeStep === index ? "opacity-100" : "opacity-60"
                }`}>
                  {step.description}
                </p>
              </div>

              <div
                className="absolute bottom-0 left-0 right-0 h-1 transition-transform duration-500 origin-left"
                style={{
                  backgroundColor: step.color,
                  transform: activeStep === index || hoveredStep === index ? "scaleX(1)" : "scaleX(0)",
                  boxShadow: activeStep === index || hoveredStep === index ? `0 0 20px ${step.color}` : "none",
                }}
              />
            </button>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .animate-progress {
          animation: progress 6s linear forwards;
        }
        @keyframes floatOrb {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-30px) translateX(20px); }
        }
      `}</style>
    </section>
  );
}
