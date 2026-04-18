"use client";

import { useEffect, useRef, useState } from "react";
import { Eye, BarChart3, Lightbulb } from "lucide-react";

const comparisons = [
  {
    icon: Eye,
    title: "Human Observation",
    description:
      "The human observer brings contextual understanding and intuitive pattern recognition developed through experience. We perceive the garden holistically, integrating aesthetic judgment with biological assessment.",
    characteristics: ["Intermittent sampling", "Contextual understanding", "Intuitive recognition", "Aesthetic integration"],
    color: "#eca8d6",
    gradient: "from-[#eca8d6]/20 to-[#eca8d6]/5",
  },
  {
    icon: BarChart3,
    title: "Data-Driven Observation",
    description:
      "Sensor networks provide continuous, quantified measurement across multiple environmental parameters simultaneously. Data streams capture fluctuations invisible to human perception.",
    characteristics: ["Continuous monitoring", "Quantified measurement", "Multi-parameter correlation", "Historical comparison"],
    color: "#7dd3fc",
    gradient: "from-[#7dd3fc]/20 to-[#7dd3fc]/5",
  },
  {
    icon: Lightbulb,
    title: "The Synthesis",
    description:
      "Neither approach alone captures the full complexity of a living system. The integration of human wisdom with computational analysis creates a new mode of understanding.",
    characteristics: ["Complementary strengths", "Enhanced interpretation", "Accelerated learning", "Deeper understanding"],
    color: "#a5f3fc",
    gradient: "from-[#a5f3fc]/20 to-[#a5f3fc]/5",
  },
];

export function ObservationSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
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

  return (
    <section id="observation" ref={sectionRef} className="relative py-32 lg:py-40 overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-20">
          <span
            className={`inline-flex items-center gap-4 text-sm font-mono text-muted-foreground mb-8 transition-all duration-700 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="w-12 h-px bg-foreground/20" />
            Epistemology
          </span>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            <h2
              className={`text-5xl md:text-6xl lg:text-[80px] font-display tracking-tight leading-[0.95] transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Perception
              <br />
              <span className="text-muted-foreground">versus analysis.</span>
            </h2>

            <p
              className={`text-xl text-muted-foreground leading-relaxed self-end transition-all duration-1000 delay-200 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              There exists a fundamental distinction between perceiving and understanding, 
              between the immediate apprehension of sensory data and the deeper comprehension 
              of underlying patterns and causal relationships.
            </p>
          </div>
        </div>

        {/* Comparison cards with enhanced animations */}
        <div className="grid lg:grid-cols-3 gap-6">
          {comparisons.map((item, index) => (
            <div
              key={item.title}
              className={`group relative p-8 lg:p-10 border transition-all duration-500 cursor-default overflow-hidden ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ 
                transitionDelay: `${index * 100}ms`,
                borderColor: activeCard === index ? `${item.color}60` : "rgba(var(--foreground-rgb), 0.1)",
                backgroundColor: activeCard === index ? `${item.color}08` : "rgba(var(--foreground-rgb), 0.02)",
              }}
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
            >
              {/* Animated gradient background */}
              <div 
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient} transition-opacity duration-500`}
                style={{ opacity: activeCard === index ? 1 : 0 }}
              />

              {/* Floating orb */}
              <div 
                className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl transition-all duration-700"
                style={{ 
                  backgroundColor: item.color,
                  opacity: activeCard === index ? 0.15 : 0,
                  transform: activeCard === index ? "scale(1.2)" : "scale(1)",
                }}
              />

              <div className="relative z-10">
                {/* Icon with animation */}
                <div
                  className="w-14 h-14 flex items-center justify-center border mb-8 transition-all duration-500"
                  style={{
                    borderColor: activeCard === index ? item.color : "rgba(var(--foreground-rgb), 0.2)",
                    backgroundColor: activeCard === index ? item.color : "transparent",
                    color: activeCard === index ? "#000" : "inherit",
                    transform: activeCard === index ? "rotate(3deg) scale(1.05)" : "rotate(0deg) scale(1)",
                  }}
                >
                  <item.icon className="w-6 h-6" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-display mb-4 group-hover:translate-x-1 transition-transform duration-300">{item.title}</h3>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed mb-8 text-sm group-hover:text-foreground/70 transition-colors duration-300">{item.description}</p>

                {/* Characteristics with staggered animation */}
                <div className="space-y-3 pt-6 border-t border-foreground/10">
                  {item.characteristics.map((char, charIndex) => (
                    <div 
                      key={char} 
                      className="flex items-center gap-3 text-sm transition-all duration-300"
                      style={{
                        transform: activeCard === index ? "translateX(8px)" : "translateX(0)",
                        transitionDelay: `${charIndex * 50}ms`,
                      }}
                    >
                      <span
                        className="w-2 h-2 rounded-full transition-all duration-300"
                        style={{ 
                          backgroundColor: activeCard === index ? item.color : "rgba(var(--foreground-rgb), 0.2)",
                          boxShadow: activeCard === index ? `0 0 10px ${item.color}` : "none",
                        }}
                      />
                      <span className="text-muted-foreground group-hover:text-foreground/80 transition-colors">{char}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
