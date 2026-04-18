"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

const regions = [
  { name: "Soil Sensors", nodes: 12, status: "active", color: "#eca8d6" },
  { name: "Climate Monitors", nodes: 8, status: "active", color: "#7dd3fc" },
  { name: "Light Sensors", nodes: 6, status: "active", color: "#a5f3fc" },
  { name: "Water Systems", nodes: 4, status: "active", color: "#fbbf24" },
];

export function InfrastructureSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeRegion, setActiveRegion] = useState(0);
  const [hoveredRegion, setHoveredRegion] = useState<number | null>(null);
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
      setActiveRegion((prev) => (prev + 1) % regions.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="infra" ref={sectionRef} className="relative py-32 lg:py-40 overflow-hidden">
      {/* Animated background lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-[#eca8d6] to-transparent w-full"
            style={{
              top: `${10 + i * 12}%`,
              animation: `slideAcross ${15 + i * 3}s linear infinite`,
              animationDelay: `${i * 0.8}s`,
            }}
          />
        ))}
      </div>
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-20">
          <span className={`inline-flex items-center gap-4 text-sm font-mono text-muted-foreground mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}>
            <span className="w-12 h-px bg-foreground/20" />
            Living Systems
          </span>
          
          <div className="grid lg:grid-cols-[auto_1fr] gap-8 lg:gap-16 items-stretch">
            {/* Image globe */}
            <div className={`w-48 lg:w-72 xl:w-80 shrink-0 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}>
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/world-3i68QNWJwmO7W19ztZWbevAwJQHzYL.png"
                alt="Global network sphere"
                className="w-full h-full object-contain object-center animate-slowSpin"
              />
            </div>

            {/* Title + description */}
            <div className="flex flex-col justify-center">
              <h2 className={`text-6xl md:text-7xl lg:text-[128px] font-display tracking-tight leading-[0.9] transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}>
                Connected
                <br />
                <span className="text-muted-foreground">ecosystem.</span>
              </h2>

              <p className={`mt-8 text-xl text-muted-foreground leading-relaxed max-w-lg transition-all duration-1000 delay-100 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}>
                A network of sensors, AI models, and automated systems working together to create the perfect growing environment.
              </p>
            </div>
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Large stat card */}
          <div className={`lg:col-span-2 relative p-8 lg:p-12 border border-foreground/10 bg-foreground/[0.02] overflow-hidden transition-all duration-700 hover:border-[#eca8d6]/30 group ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            {/* Animated dots background with connecting lines */}
            <div className="absolute inset-0 opacity-70">
              {/* SVG for connecting lines */}
              <svg
                className="absolute inset-0 w-full h-full"
                style={{ pointerEvents: "none" }}
              >
                <defs>
                  <style>{`
                    @keyframes drawLine {
                      0%   { stroke-dashoffset: 1000; opacity: 0; }
                      15%  { opacity: 1; }
                      70%  { opacity: 0.7; }
                      100% { stroke-dashoffset: 0; opacity: 0; }
                    }
                    .connecting-line {
                      stroke: #eca8d6;
                      stroke-width: 1.2;
                      fill: none;
                      stroke-dasharray: 1000;
                      animation: drawLine 3s ease-in-out infinite;
                    }
                  `}</style>
                </defs>
                {[...Array(19)].map((_, i) => {
                  const x1 = 10 + (i % 5) * 20;
                  const y1 = 10 + Math.floor(i / 5) * 25;
                  const x2 = 10 + ((i + 1) % 5) * 20;
                  const y2 = 10 + Math.floor((i + 1) / 5) * 25;
                  return (
                    <line
                      key={`line-${i}`}
                      x1={`${x1}%`}
                      y1={`${y1}%`}
                      x2={`${x2}%`}
                      y2={`${y2}%`}
                      className="connecting-line"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  );
                })}
              </svg>

              {/* Dots */}
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full bg-[#eca8d6]"
                  style={{
                    left: `${10 + (i % 5) * 20}%`,
                    top: `${10 + Math.floor(i / 5) * 25}%`,
                    animation: `pulse 2s ease-in-out ${i * 0.1}s infinite`,
                  }}
                />
              ))}
            </div>
            
            <div className="relative z-10">
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-8xl lg:text-[10rem] font-display leading-none group-hover:text-[#eca8d6] transition-colors duration-500">30</span>
                <span className="text-2xl text-muted-foreground">sensors</span>
              </div>
              <p className="text-muted-foreground max-w-md">
                Smart sensors distributed throughout your garden for comprehensive environmental monitoring.
              </p>
            </div>
          </div>

          {/* Stacked stat cards */}
          <div className="flex flex-col gap-6">
            <div className={`p-8 border border-foreground/10 bg-foreground/[0.02] transition-all duration-500 hover:border-[#7dd3fc]/30 group ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`} style={{ transitionDelay: "100ms" }}>
              <span className="text-5xl lg:text-6xl font-display group-hover:text-[#7dd3fc] transition-colors duration-300">40%</span>
              <span className="block text-sm text-muted-foreground mt-2">Water savings</span>
            </div>
            
            <div className={`p-8 border border-foreground/10 bg-foreground/[0.02] transition-all duration-500 hover:border-[#a5f3fc]/30 group ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`} style={{ transitionDelay: "200ms" }}>
              <span className="text-5xl lg:text-6xl font-display group-hover:text-[#a5f3fc] transition-colors duration-300">5min</span>
              <span className="block text-sm text-muted-foreground mt-2">Data refresh rate</span>
            </div>
          </div>
        </div>

        {/* Region list with enhanced hover */}
        <div className={`mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-1000 delay-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}>
          {regions.map((region, index) => (
            <div
              key={region.name}
              className="p-6 border transition-all duration-500 cursor-default relative overflow-hidden"
              style={{
                borderColor: hoveredRegion === index || activeRegion === index ? `${region.color}50` : "rgba(var(--foreground-rgb), 0.1)",
                backgroundColor: hoveredRegion === index ? `${region.color}08` : "transparent",
              }}
              onMouseEnter={() => setHoveredRegion(index)}
              onMouseLeave={() => setHoveredRegion(null)}
            >
              {/* Animated background glow */}
              <div 
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${region.color}20, transparent 70%)`,
                  opacity: hoveredRegion === index ? 1 : 0,
                }}
              />

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <span 
                    className="w-2 h-2 rounded-full transition-all duration-300"
                    style={{ 
                      backgroundColor: activeRegion === index || hoveredRegion === index ? region.color : "rgba(var(--foreground-rgb), 0.2)",
                      boxShadow: activeRegion === index || hoveredRegion === index ? `0 0 10px ${region.color}` : "none",
                    }}
                  />
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                    {region.status}
                  </span>
                </div>
                <span className="font-medium block mb-1">{region.name}</span>
                <span className="text-sm text-muted-foreground">{region.nodes} nodes</span>
              </div>

              {/* Animated border line */}
              <div 
                className="absolute bottom-0 left-0 h-[2px] transition-all duration-500"
                style={{
                  background: region.color,
                  width: hoveredRegion === index || activeRegion === index ? "100%" : "0%",
                }}
              />
            </div>
          ))}
        </div>

        {/* Whale image showcase */}
        <div className={`mt-16 grid lg:grid-cols-2 gap-8 items-center transition-all duration-1000 delay-400 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}>
          <div className="relative h-64 lg:h-80 overflow-hidden rounded-lg group">
            <Image
              src="/images/robot-garden.png"
              alt="Organic data visualization"
              fill
              className="object-contain object-center group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="p-8 lg:p-12 border border-foreground/10 bg-foreground/[0.02]">
            <p className="text-xl lg:text-2xl font-display leading-relaxed text-foreground/90">
              Like organic systems in nature, data flows through interconnected networks, 
              each node contributing to the collective intelligence of the ecosystem.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.3); opacity: 1; }
        }
        @keyframes slideAcross {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes slowSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-slowSpin {
          animation: slowSpin 60s linear infinite;
        }
      `}</style>
    </section>
  );
}
