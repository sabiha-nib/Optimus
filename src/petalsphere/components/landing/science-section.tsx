import { useEffect, useRef, useState } from "react";
import { Cpu, Eye, Cloud, TrendingUp } from "lucide-react";

const scienceTopics = [
  {
    icon: TrendingUp,
    title: "Machine Learning",
    description: "The branch of AI in which models improve at a task by being shown examples rather than being told the rules. Most everyday AI — spam filters, recommendations, fraud detection — is machine learning under the hood.",
    color: "#eca8d6",
  },
  {
    icon: Cpu,
    title: "Deep Learning",
    description: "A family of machine-learning techniques built on multi-layered neural networks. Deep learning underlies image recognition, speech-to-text, and the large language models that have come to define modern AI.",
    color: "#7dd3fc",
  },
  {
    icon: Eye,
    title: "Computer Vision",
    description: "Algorithms that interpret images and video — recognising faces, detecting tumors, reading road signs. Computer vision turns pixels into structured understanding of the visual world.",
    color: "#a5f3fc",
  },
  {
    icon: Cloud,
    title: "Natural Language Processing",
    description: "The field that gives machines the ability to read, write, translate and converse. From search engines to chatbots, NLP is what makes computers genuinely useful with human language.",
    color: "#fbbf24",
  },
];

export function ScienceSection() {
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
    <section id="science" ref={sectionRef} className="relative py-32 lg:py-40 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-5">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-32 bg-gradient-to-b from-transparent via-foreground to-transparent"
            style={{
              left: `${5 + i * 5}%`,
              top: `${Math.random() * 100}%`,
              animation: `dropLine ${4 + Math.random() * 4}s linear infinite`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-20 grid lg:grid-cols-2 gap-12 items-end">
          <div>
            <span
              className={`inline-flex items-center gap-4 text-sm font-mono text-muted-foreground mb-8 transition-all duration-700 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="w-12 h-px bg-foreground/20" />
              The Science
            </span>

            <h2
              className={`text-6xl md:text-7xl lg:text-[100px] font-display tracking-tight leading-[0.9] transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Inside
              <br />
              <span className="text-muted-foreground">the field.</span>
            </h2>

            <p
              className={`mt-8 text-xl text-muted-foreground leading-relaxed max-w-xl transition-all duration-1000 delay-200 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              Artificial intelligence is not a single technology — it is a family of related disciplines, each tackling a different facet of intelligent behaviour.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {scienceTopics.map((topic, index) => (
            <div
              key={topic.title}
              className={`group relative p-8 lg:p-10 border bg-foreground/[0.02] transition-all duration-500 cursor-default overflow-hidden ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
                borderColor: hoveredIndex === index ? `${topic.color}50` : "rgba(var(--foreground-rgb), 0.1)",
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 0% 0%, ${topic.color}15, transparent 50%)`,
                  opacity: hoveredIndex === index ? 1 : 0,
                }}
              />

              <div className="relative z-10 flex items-start gap-6">
                <div
                  className="shrink-0 w-14 h-14 flex items-center justify-center border transition-all duration-500"
                  style={{
                    borderColor: hoveredIndex === index ? topic.color : "rgba(var(--foreground-rgb), 0.2)",
                    backgroundColor: hoveredIndex === index ? topic.color : "transparent",
                    color: hoveredIndex === index ? "#000" : "inherit",
                    transform: hoveredIndex === index ? "rotate(-3deg) scale(1.05)" : "rotate(0deg) scale(1)",
                  }}
                >
                  <topic.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-display mb-3 group-hover:translate-x-1 transition-transform duration-300">{topic.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm group-hover:text-foreground/70 transition-colors duration-300">{topic.description}</p>
                </div>
              </div>

              <div
                className="absolute bottom-0 right-0 w-24 h-24 transition-all duration-500"
                style={{
                  background: `radial-gradient(circle at bottom right, ${topic.color}20, transparent 70%)`,
                  opacity: hoveredIndex === index ? 1 : 0,
                }}
              />

              <div
                className="absolute bottom-0 left-0 h-[2px] transition-all duration-500"
                style={{
                  background: topic.color,
                  width: hoveredIndex === index ? "100%" : "0%",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        @keyframes dropLine {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(200%); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
