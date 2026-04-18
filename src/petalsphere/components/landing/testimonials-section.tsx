import { useEffect, useState, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const insights = [
  {
    quote: "Artificial intelligence is not one invention but a long conversation — a question humans keep asking machines, in different forms, decade after decade.",
    topic: "The Optimist",
    context: "AI as humanity's greatest amplifier",
    metric: { value: "Tool", label: "A new kind of instrument" },
  },
  {
    quote: "The most important question is no longer whether machines can think, but what we should be willing to let them decide on our behalf.",
    topic: "The Skeptic",
    context: "Caution before capability",
    metric: { value: "Limits", label: "Where humans must stay in charge" },
  },
  {
    quote: "AI is best understood as a general-purpose technology — like electricity or the internet — quietly reshaping nearly every industry it touches.",
    topic: "The Realist",
    context: "AI as infrastructure, not magic",
    metric: { value: "Every", label: "Industry it touches" },
  },
  {
    quote: "The systems we build today are mirrors. They reflect our data, our priorities, and our blind spots — and then scale them to billions of decisions.",
    topic: "The Ethicist",
    context: "On values, bias and accountability",
    metric: { value: "Mirror", label: "AI reflects its makers" },
  },
];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
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
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % insights.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const goTo = (index: number) => {
    setActiveIndex(index);
  };

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + insights.length) % insights.length);
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % insights.length);
  };

  const activeInsight = insights[activeIndex];

  return (
    <section ref={sectionRef} className="relative py-32 lg:py-40 bg-foreground text-background overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#eca8d6]/20 via-transparent to-[#7dd3fc]/10"
          style={{ animation: "gradientShift 15s ease-in-out infinite alternate" }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#eca8d6]/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `floatParticle ${6 + Math.random() * 4}s ease-in-out ${Math.random() * 2}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-20">
          <div>
            <span className="inline-flex items-center gap-3 text-sm font-mono text-background/40 mb-4">
              <span className="w-12 h-px bg-background/20" />
              Voices on AI
            </span>
            <h2 className={`text-4xl lg:text-5xl font-display transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}>
              How thinkers describe
              <span className="text-background/40"> the field.</span>
            </h2>
          </div>

          {/* Navigation arrows */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={goPrev}
              className="p-4 border border-background/20 hover:bg-background/10 hover:border-[#eca8d6]/50 transition-all duration-300 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={goNext}
              className="p-4 border border-background/20 hover:bg-background/10 hover:border-[#eca8d6]/50 transition-all duration-300 group"
            >
              <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Main content - Split layout */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Quote side */}
          <div className="lg:col-span-7 relative">
            <span className="absolute -left-4 -top-8 text-[200px] font-display text-[#eca8d6]/10 leading-none select-none">
              &ldquo;
            </span>

            <div className="relative">
              <blockquote
                key={activeIndex}
                className="text-3xl lg:text-4xl xl:text-5xl font-display leading-[1.2] tracking-tight animate-fadeSlideIn"
              >
                {activeInsight.quote}
              </blockquote>

              <div className="mt-12 flex items-center gap-6">
                <div className="px-4 py-2 bg-[#eca8d6]/20 border border-[#eca8d6]/30 rounded-full">
                  <span className="text-sm font-mono text-[#eca8d6]">{activeInsight.topic}</span>
                </div>
                <span className="text-background/60">
                  {activeInsight.context}
                </span>
              </div>
            </div>
          </div>

          {/* Metric cards side */}
          <div className="lg:col-span-5 flex flex-col justify-center gap-6">
            <div
              key={`metric-${activeIndex}`}
              className="relative p-10 bg-background/5 animate-fadeSlideIn overflow-hidden group"
            >
              <div className="absolute inset-0 rounded-none">
                <div className="absolute inset-0 border border-background/20 group-hover:border-[#eca8d6]/40 transition-colors duration-500" />
                <div
                  className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-[#eca8d6] to-transparent"
                  style={{ width: "100%", animation: "borderGlow 2s ease-in-out infinite" }}
                />
              </div>

              <span className="text-7xl lg:text-8xl font-display block mb-4 bg-gradient-to-r from-background to-background/70 bg-clip-text">
                {activeInsight.metric.value}
              </span>
              <span className="text-lg text-background/60">
                {activeInsight.metric.label}
              </span>
            </div>

            {/* Progress indicators */}
            <div className="flex gap-2">
              {insights.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goTo(idx)}
                  className="flex-1 h-1.5 bg-background/20 overflow-hidden rounded-full hover:bg-background/30 transition-colors"
                >
                  <div
                    className={`h-full bg-[#eca8d6] rounded-full transition-all duration-300 ${
                      idx === activeIndex ? "w-full" : idx < activeIndex ? "w-full opacity-50" : "w-0"
                    }`}
                    style={idx === activeIndex ? { animation: "progress 8s linear forwards" } : {}}
                  />
                </button>
              ))}
            </div>

            <div className="mt-4 pt-6 border-t border-background/10">
              <span className="text-xs font-mono text-background/30 uppercase tracking-widest block mb-4">
                Perspectives
              </span>
              <div className="flex flex-wrap gap-3">
                {insights.map((t, idx) => (
                  <button
                    key={t.topic}
                    onClick={() => goTo(idx)}
                    className={`px-4 py-2 text-sm border transition-all duration-300 hover:scale-105 ${
                      idx === activeIndex
                        ? "border-[#eca8d6]/60 text-background bg-[#eca8d6]/10"
                        : "border-background/10 text-background/40 hover:border-background/30 hover:bg-background/5"
                    }`}
                  >
                    {t.topic}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>


      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fadeSlideIn {
          animation: fadeSlideIn 0.5s ease-out forwards;
        }
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        @keyframes gradientShift {
          0% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(-5%, -5%) rotate(3deg); }
        }
        @keyframes floatParticle {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); opacity: 0.3; }
          50% { transform: translateY(-20px) translateX(10px) scale(1.2); opacity: 0.6; }
        }
        @keyframes borderGlow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </section>
  );
}
