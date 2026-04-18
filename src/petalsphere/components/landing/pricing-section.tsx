"use client";

import { useEffect, useRef, useState } from "react";
import { Droplets, Sprout, Globe, Utensils } from "lucide-react";

const reasons = [
  {
    icon: Droplets,
    title: "Resource Conservation",
    description: "Precision irrigation algorithms demonstrate consistent reductions in water consumption by optimizing delivery timing and volume based on real-time soil moisture data and evapotranspiration models.",
    stat: "38-47%",
    statLabel: "water reduction",
    color: "#7dd3fc",
  },
  {
    icon: Sprout,
    title: "Agricultural Efficiency",
    description: "Machine learning optimization of environmental parameters in controlled growing environments correlates with measurable increases in harvestable biomass per unit input of energy, water, and nutrients.",
    stat: "Variable",
    statLabel: "yield improvement",
    color: "#86efac",
  },
  {
    icon: Globe,
    title: "Environmental Impact",
    description: "Reduced resource inputs, decreased chemical applications through targeted intervention, and optimized energy usage collectively contribute to lower environmental footprints per unit of agricultural output.",
    stat: "Significant",
    statLabel: "reduction potential",
    color: "#eca8d6",
  },
  {
    icon: Utensils,
    title: "Food System Implications",
    description: "Scalable AI-assisted cultivation methods may enable distributed food production closer to consumption points, potentially reducing transportation requirements and increasing access to fresh produce.",
    stat: "Emerging",
    statLabel: "research area",
    color: "#fbbf24",
  },
];

export function PricingSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
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
    <section id="pricing" ref={sectionRef} className="relative py-32 lg:py-40">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="grid lg:grid-cols-12 gap-8 mb-20">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-8">
              <span className="w-12 h-px bg-foreground/30" />
              Broader Implications
            </span>
            <h2 className={`text-6xl md:text-7xl lg:text-[100px] font-display tracking-tight leading-[0.9] transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}>
              Systemic
              <br />
              <span className="text-muted-foreground">implications.</span>
            </h2>
          </div>
          

        </div>

        {/* Impact cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => (
            <div
              key={reason.title}
              className={`group relative p-8 border border-foreground/10 bg-foreground/[0.02] transition-all duration-500 overflow-hidden ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Animated background gradient on hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 50% 100%, ${reason.color}15 0%, transparent 70%)`
                }}
              />
              
              {/* Glowing border effect */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  boxShadow: `inset 0 0 30px ${reason.color}20, 0 0 20px ${reason.color}10`
                }}
              />
              
              {/* Animated top accent line */}
              <div 
                className="absolute top-0 left-0 h-[2px] transition-all duration-700 ease-out"
                style={{
                  width: hoveredCard === index ? '100%' : '0%',
                  background: `linear-gradient(90deg, transparent, ${reason.color}, transparent)`
                }}
              />

              {/* Icon */}
              <div 
                className="relative w-12 h-12 flex items-center justify-center border border-foreground/20 group-hover:border-transparent transition-all duration-300 mb-6"
                style={{
                  background: hoveredCard === index ? `${reason.color}20` : 'transparent'
                }}
              >
                <reason.icon 
                  className="w-6 h-6 transition-colors duration-300" 
                  style={{ color: hoveredCard === index ? reason.color : 'currentColor' }}
                />
              </div>

              {/* Stat */}
              <div className="relative mb-4">
                <span 
                  className="text-4xl font-display transition-colors duration-300"
                  style={{ color: reason.color }}
                >
                  {reason.stat}
                </span>
                <span className="block text-sm text-muted-foreground font-mono mt-1">{reason.statLabel}</span>
              </div>

              {/* Content */}
              <h3 className="relative text-xl font-display mb-3 group-hover:text-foreground transition-colors duration-300">
                {reason.title}
              </h3>
              <p className="relative text-sm text-muted-foreground leading-relaxed group-hover:text-muted-foreground/90 transition-colors duration-300">
                {reason.description}
              </p>
            </div>
          ))}
        </div>

        {/* Key observation callout with enhanced styling */}
        <div className={`mt-16 relative overflow-hidden transition-all duration-1000 delay-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}>
          {/* Outer glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#eca8d6]/20 via-[#7dd3fc]/20 to-[#eca8d6]/20 blur-sm rounded-lg" />
          
          <div className="relative p-8 lg:p-12 border border-[#eca8d6]/30 bg-background">
            {/* Animated corner accents */}
            <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-[#eca8d6]/50" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-[#7dd3fc]/50" />
            
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-12">
              <div className="shrink-0">
                <div className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#eca8d6] animate-pulse" />
                  <span className="text-sm font-mono text-[#eca8d6] uppercase tracking-widest">Key Observation</span>
                </div>
              </div>
              <p className="text-xl lg:text-2xl font-display text-foreground/90 leading-relaxed">
                The convergence of sensor technology, machine learning algorithms, and automated control systems 
                creates feedback loops that may fundamentally alter the relationship between human cultivators and plant systems.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Full-width connected trees image - data flowing like light between branches */}
      <div className={`mt-24 relative w-full overflow-hidden transition-all duration-1000 delay-700 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}>
        {/* Gradient overlays for seamless blending */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background z-10 pointer-events-none" />
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        
        {/* Animated glow behind image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full max-w-4xl h-48 bg-gradient-to-r from-[#eca8d6]/20 via-[#fbbf24]/30 to-[#eca8d6]/20 blur-3xl animate-pulse" />
        </div>
        
        {/* The image */}
        <img
          src="/images/connected-trees.png"
          alt="Data flow visualization through connected networks"
          className="relative w-full h-auto max-h-[500px] object-cover object-center"
        />
        
        {/* Caption */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
          <span className="text-sm font-mono text-foreground/60 bg-background/80 backdrop-blur-sm px-4 py-2 border border-foreground/10">
            Data flows between systems like light through branches
          </span>
        </div>
      </div>
    </section>
  );
}
