import { useEffect, useRef, useState } from "react";
import { Brain, Scale, Users } from "lucide-react";

const reflections = [
  {
    icon: Brain,
    title: "Bias and Fairness",
    description:
      "AI systems learn from human data — and inherit human biases. A model trained on historical hiring records may quietly reproduce decades of discrimination. Building fair AI means scrutinising datasets, auditing outputs, and accepting that neutrality is never automatic.",
    color: "#eca8d6",
  },
  {
    icon: Scale,
    title: "Transparency and Trust",
    description:
      "Modern neural networks contain billions of parameters whose individual roles no human can fully explain. As AI is deployed in medicine, law and finance, the field is racing to develop tools that can interpret a model's reasoning so the systems we depend on are not pure black boxes.",
    color: "#7dd3fc",
  },
  {
    icon: Users,
    title: "Alignment and Control",
    description:
      "How do we make sure powerful AI systems pursue what humans actually intend, not a narrow proxy that happens to be measurable? Alignment research asks how to encode values, preferences and safety constraints into models that may one day exceed our ability to oversee them in detail.",
    color: "#a5f3fc",
  },
];

export function EthicalSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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
    <section ref={sectionRef} className="relative py-32 lg:py-40 overflow-hidden">
      {/* Floating thought bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-foreground/5"
            style={{
              width: `${20 + Math.random() * 40}px`,
              height: `${20 + Math.random() * 40}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `floatBubble ${8 + Math.random() * 6}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-20 text-center">
          <span
            className={`inline-flex items-center gap-4 text-sm font-mono text-muted-foreground mb-8 justify-center transition-all duration-700 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="w-12 h-px bg-foreground/20" />
            Ethics &amp; Responsibility
            <span className="w-12 h-px bg-foreground/20" />
          </span>

          <h2
            className={`text-5xl md:text-6xl lg:text-[80px] font-display tracking-tight leading-[0.95] transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            The harder
            <br />
            <span className="text-muted-foreground">questions.</span>
          </h2>

          <p
            className={`mt-8 text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            As artificial intelligence moves from research labs into hospitals, courts and
            classrooms, the most interesting questions stop being purely technical. They
            become questions about fairness, accountability, power and what kind of future
            we are choosing to build.
          </p>
        </div>

        {/* Reflection cards with glass morphism effect */}
        <div className="grid lg:grid-cols-3 gap-6">
          {reflections.map((item, index) => (
            <div
              key={item.title}
              className={`group relative p-8 lg:p-10 border transition-all duration-500 cursor-default overflow-hidden ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
                borderColor: hoveredIndex === index ? `${item.color}50` : "rgba(var(--foreground-rgb), 0.1)",
                backgroundColor: hoveredIndex === index ? `${item.color}08` : "rgba(var(--foreground-rgb), 0.02)",
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className="absolute top-0 right-0 w-24 h-24 transition-all duration-500"
                style={{
                  background: `radial-gradient(circle at top right, ${item.color}30, transparent 70%)`,
                  opacity: hoveredIndex === index ? 1 : 0,
                }}
              />

              <div
                className="w-14 h-14 flex items-center justify-center border mb-8 transition-all duration-500"
                style={{
                  borderColor: hoveredIndex === index ? item.color : "rgba(var(--foreground-rgb), 0.2)",
                  backgroundColor: hoveredIndex === index ? item.color : "transparent",
                  color: hoveredIndex === index ? "#000" : "inherit",
                  transform: hoveredIndex === index ? "rotate(5deg)" : "rotate(0deg)",
                }}
              >
                <item.icon className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-display mb-4 group-hover:translate-x-1 transition-transform duration-300">{item.title}</h3>

              <p className="text-muted-foreground leading-relaxed text-sm group-hover:text-foreground/70 transition-colors duration-300">{item.description}</p>

              <div
                className="absolute bottom-0 left-0 h-px w-full transition-all duration-500"
                style={{
                  background: `linear-gradient(to right, transparent, ${item.color}, transparent)`,
                  opacity: hoveredIndex === index ? 1 : 0,
                }}
              />
            </div>
          ))}
        </div>

        {/* Bottom reflection with typewriter effect */}
        <div
          className={`mt-16 p-8 lg:p-12 border border-foreground/10 bg-foreground/[0.02] text-center relative overflow-hidden transition-all duration-1000 delay-500 hover:border-[#eca8d6]/30 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#eca8d6]/5 via-transparent to-[#7dd3fc]/5 opacity-0 hover:opacity-100 transition-opacity duration-700" />

          <p className="text-2xl lg:text-3xl font-display text-foreground/90 leading-relaxed max-w-4xl mx-auto relative z-10">
            &ldquo;The question is not only what artificial intelligence can do, but what
            we want it to do — and who gets to decide.&rdquo;
          </p>
        </div>
      </div>

      <style>{`
        @keyframes floatBubble {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; }
          50% { transform: translateY(-30px) scale(1.1); opacity: 0.6; }
        }
      `}</style>
    </section>
  );
}
