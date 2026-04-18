import { useEffect, useRef, useState } from "react";
import { Eye, BarChart3, Lightbulb } from "lucide-react";

const comparisons = [
  {
    icon: Eye,
    title: "Narrow AI",
    description:
      "The AI that exists today. Each system is highly capable at one specific task — playing Go, translating Spanish, recommending songs — but cannot transfer that skill to anything outside its training. Almost every product called 'AI' falls into this category.",
    characteristics: ["Single task focus", "Trained on a fixed domain", "Superhuman at narrow problems", "No general understanding"],
    color: "#eca8d6",
    gradient: "from-[#eca8d6]/20 to-[#eca8d6]/5",
  },
  {
    icon: BarChart3,
    title: "General AI",
    description:
      "A still-hypothetical machine that could match a human across the full breadth of cognitive tasks — reasoning, planning, learning new skills, navigating unfamiliar problems. Whether and when it can be built remains one of the field's biggest open questions.",
    characteristics: ["Cross-domain reasoning", "Transfer learning", "Common-sense knowledge", "Self-directed problem solving"],
    color: "#7dd3fc",
    gradient: "from-[#7dd3fc]/20 to-[#7dd3fc]/5",
  },
  {
    icon: Lightbulb,
    title: "Superintelligence",
    description:
      "A theoretical AI whose abilities surpass human intelligence in every dimension. Long discussed by philosophers and now taken seriously by researchers, it raises questions of safety, alignment and human agency that the field is only beginning to address.",
    characteristics: ["Beyond human ability", "Autonomous goal pursuit", "Speculative and contested", "Subject of ongoing safety research"],
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
        <div className="mb-20">
          <span
            className={`inline-flex items-center gap-4 text-sm font-mono text-muted-foreground mb-8 transition-all duration-700 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="w-12 h-px bg-foreground/20" />
            Types of AI
          </span>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            <h2
              className={`text-5xl md:text-6xl lg:text-[80px] font-display tracking-tight leading-[0.95] transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Narrow, general,
              <br />
              <span className="text-muted-foreground">and beyond.</span>
            </h2>

            <p
              className={`text-xl text-muted-foreground leading-relaxed self-end transition-all duration-1000 delay-200 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              Researchers usually distinguish three levels of artificial intelligence based on
              breadth of ability. Understanding the difference makes it easier to read past
              the headlines and see what today's AI really is — and is not.
            </p>
          </div>
        </div>

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
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient} transition-opacity duration-500`}
                style={{ opacity: activeCard === index ? 1 : 0 }}
              />

              <div
                className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl transition-all duration-700"
                style={{
                  backgroundColor: item.color,
                  opacity: activeCard === index ? 0.15 : 0,
                  transform: activeCard === index ? "scale(1.2)" : "scale(1)",
                }}
              />

              <div className="relative z-10">
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

                <h3 className="text-2xl font-display mb-4 group-hover:translate-x-1 transition-transform duration-300">{item.title}</h3>

                <p className="text-muted-foreground leading-relaxed mb-8 text-sm group-hover:text-foreground/70 transition-colors duration-300">{item.description}</p>

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
