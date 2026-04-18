import { useEffect, useRef, useState } from "react";
import { NextImage as Image } from "@/petalsphere/lib/next-image";

const contexts = [
  {
    number: "01",
    title: "The Symbolic Era",
    description:
      "From the 1950s onward, the first wave of AI tried to capture human thought as explicit rules and symbols. Programs proved theorems, played chess, and answered questions by manipulating logical statements written by hand. Powerful within narrow domains, these systems struggled with the messy, ambiguous nature of the real world.",
    color: "#eca8d6",
  },
  {
    number: "02",
    title: "The Rise of Machine Learning",
    description:
      "By the 1990s, attention shifted from hand-crafted rules to algorithms that learn from data. Statistical methods, decision trees, and support vector machines could detect spam, recognise handwriting, and recommend products by extracting patterns from examples rather than explicit instructions.",
    color: "#7dd3fc",
  },
  {
    number: "03",
    title: "The Deep Learning Revolution",
    description:
      "Since 2012, deep neural networks trained on massive datasets and powerful GPUs have redefined what machines can do. From near-human performance in image recognition to large language models that converse fluently, modern AI is built on layers of learned representations rather than handwritten logic.",
    color: "#a5f3fc",
  },
];

export function ResearchContextSection() {
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
    <section ref={sectionRef} className="relative py-32 lg:py-40 overflow-hidden bg-foreground/[0.02]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-foreground/5 to-transparent w-full"
            style={{
              top: `${20 + i * 20}%`,
              animation: `slideRight ${10 + i * 2}s linear infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
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
            A Brief History
          </span>

          <h2
            className={`text-5xl md:text-6xl lg:text-[80px] font-display tracking-tight leading-[0.95] transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Three eras
            <br />
            <span className="text-muted-foreground">of artificial thought.</span>
          </h2>
        </div>

        <div className="space-y-6">
          {contexts.map((context, index) => (
            <div
              key={context.number}
              className={`group grid lg:grid-cols-12 gap-6 lg:gap-12 p-8 lg:p-12 border bg-background transition-all duration-500 cursor-default ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: `${index * 150}ms`,
                borderColor: hoveredIndex === index ? `${context.color}50` : "rgba(var(--foreground-rgb), 0.1)",
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="lg:col-span-1 relative">
                <span
                  className="text-4xl font-display transition-all duration-500"
                  style={{ color: hoveredIndex === index ? context.color : "rgba(var(--foreground-rgb), 0.2)" }}
                >
                  {context.number}
                </span>
                <div
                  className="absolute top-2 -right-2 w-2 h-2 rounded-full transition-all duration-500"
                  style={{
                    backgroundColor: context.color,
                    opacity: hoveredIndex === index ? 1 : 0,
                    boxShadow: hoveredIndex === index ? `0 0 20px ${context.color}` : "none",
                  }}
                />
              </div>

              <div className="lg:col-span-3">
                <h3 className="text-2xl font-display group-hover:translate-x-2 transition-transform duration-300">{context.title}</h3>
              </div>

              <div className="lg:col-span-8">
                <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/70 transition-colors duration-300">{context.description}</p>
              </div>

              <div
                className="col-span-full h-px transition-all duration-500 origin-left"
                style={{
                  background: `linear-gradient(to right, ${context.color}, transparent)`,
                  transform: hoveredIndex === index ? "scaleX(1)" : "scaleX(0)",
                }}
              />
            </div>
          ))}
        </div>

        <div className="mt-16 grid lg:grid-cols-2 gap-8">
          <div
            className={`p-8 lg:p-12 border border-[#eca8d6]/30 bg-[#eca8d6]/5 transition-all duration-1000 delay-500 hover:border-[#eca8d6]/50 hover:bg-[#eca8d6]/10 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <p className="text-xl lg:text-2xl font-display text-foreground/90 leading-relaxed">
              Each era did not erase the one before it. Today's most advanced AI systems still
              draw on logic, statistics, and learned representations — woven together into
              something far greater than any single approach.
            </p>
          </div>

          <div
            className={`relative h-64 lg:h-auto overflow-hidden rounded-lg group transition-all duration-1000 delay-600 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src="/petalsphere/images/lotus-neural.png"
              alt="Layers of intelligence"
              fill
              className="object-contain object-center group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideRight {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
}
