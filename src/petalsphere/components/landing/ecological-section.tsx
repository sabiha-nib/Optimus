import { useEffect, useRef, useState } from "react";
import { NextImage as Image } from "@/petalsphere/lib/next-image";
const interactions = [
  {
    title: "Adaptive Irrigation",
    description:
      "Water delivery systems guided by soil moisture sensors and evapotranspiration models adjust flow rates in response to real-time plant demand. Rather than operating on fixed schedules, these systems respond to the actual hydrological state of the root zone.",
    insight: "Water is delivered when needed, not when scheduled.",
    color: "#7dd3fc",
  },
  {
    title: "Growth Pattern Analysis",
    description:
      "Computer vision systems track morphological changes over time: the rate of leaf expansion, the angle of stem growth, the progression of flowering stages. These measurements reveal growth trajectories indicating optimal development or emerging stress.",
    insight: "Growth tells a story visible only in aggregate.",
    color: "#eca8d6",
  },
  {
    title: "Resource Optimization",
    description:
      "Machine learning models correlate input variables with output metrics, identifying the relationships between environmental conditions and plant performance. Energy, water, and nutrients flow to where they are most effectively utilized.",
    insight: "Efficiency emerges from understanding relationships.",
    color: "#a5f3fc",
  },
];

export function EcologicalSection() {
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
      {/* Animated connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#eca8d6" stopOpacity="0" />
            <stop offset="50%" stopColor="#eca8d6" stopOpacity="1" />
            <stop offset="100%" stopColor="#eca8d6" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[...Array(3)].map((_, i) => (
          <path
            key={i}
            d={`M0,${150 + i * 200} Q${400 + i * 100},${100 + i * 50} 800,${200 + i * 150} T1600,${150 + i * 200}`}
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="1"
            style={{
              animation: `drawLine ${8 + i * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </svg>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header with organic hands image */}
        <div className="mb-20 grid lg:grid-cols-2 gap-12 items-end">
          <div>
            <span
              className={`inline-flex items-center gap-4 text-sm font-mono text-muted-foreground mb-8 transition-all duration-700 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="w-12 h-px bg-foreground/20" />
              Ecological Interaction
            </span>

            <h2
              className={`text-5xl md:text-6xl lg:text-[80px] font-display tracking-tight leading-[0.95] transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Working with
              <br />
              <span className="text-muted-foreground">natural systems.</span>
            </h2>
          </div>

          {/* Organic hands image */}
          <div 
            className={`relative h-48 lg:h-64 overflow-hidden rounded-lg transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <Image
              src="/images/connected-trees.png"
              alt="Bridging ecosystems"
              fill
              className="object-cover object-center"
            />
          </div>
        </div>

        <div
          className={`mb-16 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
            Artificial intelligence in gardening operates not as a controlling force imposing 
            external order, but as an interpretive layer that enhances responsiveness to 
            the inherent dynamics of biological systems.
          </p>
        </div>

        {/* Interaction cards with enhanced effects */}
        <div className="space-y-6">
          {interactions.map((item, index) => (
            <div
              key={item.title}
              className={`group grid lg:grid-cols-12 gap-6 lg:gap-12 p-8 lg:p-12 border bg-background transition-all duration-500 cursor-default relative overflow-hidden ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ 
                transitionDelay: `${index * 150}ms`,
                borderColor: hoveredIndex === index ? `${item.color}50` : "rgba(var(--foreground-rgb), 0.1)",
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Animated glow on hover */}
              <div 
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 20% 50%, ${item.color}15 0%, transparent 50%)`,
                  opacity: hoveredIndex === index ? 1 : 0,
                }}
              />

              {/* Title */}
              <div className="lg:col-span-4 relative z-10">
                <h3 className="text-2xl font-display mb-4 group-hover:translate-x-2 transition-transform duration-300">{item.title}</h3>
                <p 
                  className="text-sm font-mono italic transition-colors duration-300"
                  style={{ color: hoveredIndex === index ? item.color : "#eca8d6" }}
                >
                  {item.insight}
                </p>
              </div>

              {/* Description */}
              <div className="lg:col-span-8 relative z-10">
                <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">{item.description}</p>
              </div>

              {/* Animated border line */}
              <div 
                className="absolute bottom-0 left-0 h-[2px] transition-all duration-700"
                style={{
                  background: `linear-gradient(to right, ${item.color}, transparent)`,
                  width: hoveredIndex === index ? "100%" : "0%",
                }}
              />
            </div>
          ))}
        </div>

        {/* Bottom note with pulsing accent */}
        <div
          className={`mt-16 text-center relative transition-all duration-1000 delay-600 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[#eca8d6]/5 blur-3xl animate-pulse" />
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed relative z-10">
            In each case, the artificial system responds to signals generated by the natural system, 
            creating a feedback loop where machine intelligence serves plant biology rather than 
            overriding it. This is cultivation enhanced, not replaced.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes drawLine {
          0%, 100% { stroke-dashoffset: 1000; stroke-dasharray: 1000; }
          50% { stroke-dashoffset: 0; }
        }
      `}</style>
    </section>
  );
}
