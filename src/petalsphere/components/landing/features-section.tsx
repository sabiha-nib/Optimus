import { useEffect, useRef, useState } from "react";
import { NextImage as Image } from "@/petalsphere/lib/next-image";
const features = [
  {
    number: "01",
    title: "Environmental Sensing",
    description: "Capacitive soil moisture probes, thermocouples, and photodiode arrays collect continuous streams of environmental data. Each measurement represents a point in a multidimensional space describing the conditions experienced by plants at any given moment.",
    stats: { value: "Continuous", label: "data collection" },
    color: "#eca8d6",
  },
  {
    number: "02",
    title: "Pattern Recognition",
    description: "Convolutional neural networks trained on botanical datasets identify morphological patterns indicating plant health status. These systems detect spectral signatures of chlorophyll degradation and textural changes indicating pathogen presence.",
    stats: { value: "Multi-spectral", label: "analysis" },
    color: "#7dd3fc",
  },
  {
    number: "03",
    title: "Predictive Modeling",
    description: "Regression algorithms correlate environmental variables with growth outcomes, generating probabilistic forecasts of future plant states. These models improve through feedback, refining predictions as actual outcomes become available.",
    stats: { value: "Adaptive", label: "learning" },
    color: "#a5f3fc",
  },
  {
    number: "04",
    title: "Feedback Systems",
    description: "Closed-loop control architectures translate analytical outputs into physical interventions: valve positions adjusted, light spectra modulated, nutrient concentrations modified. Each action generates new data, completing cycles of observation and response.",
    stats: { value: "Real-time", label: "response" },
    color: "#fbbf24",
  },
];

// Floating dot particles visualization
function ParticleVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };
    canvas.addEventListener("mousemove", handleMouseMove);

    // Generate stable particle positions
    const COUNT = 70;
    const particles = Array.from({ length: COUNT }, (_, i) => {
      const seed = i * 1.618;
      return {
        bx: ((seed * 127.1) % 1),
        by: ((seed * 311.7) % 1),
        phase: seed * Math.PI * 2,
        speed: 0.4 + (seed % 0.4),
        radius: 1.2 + (seed % 2.2),
      };
    });

    let time = 0;
    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      particles.forEach((p) => {
        const flowX = Math.sin(time * p.speed * 0.4 + p.phase) * 38;
        const flowY = Math.cos(time * p.speed * 0.3 + p.phase * 0.7) * 24;

        const bx = p.bx * w;
        const by = p.by * h;
        const dx = p.bx - mx;
        const dy = p.by - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - dist * 2.8);

        const x = bx + flowX + influence * Math.cos(time + p.phase) * 36;
        const y = by + flowY + influence * Math.sin(time + p.phase) * 36;

        const pulse = Math.sin(time * p.speed + p.phase) * 0.5 + 0.5;
        const alpha = 0.08 + pulse * 0.18 + influence * 0.3;

        ctx.beginPath();
        ctx.arc(x, y, p.radius + pulse * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(236, 168, 214, ${alpha})`;
        ctx.fill();
      });

      time += 0.016;
      frameRef.current = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-auto"
      style={{ width: "100%", height: "100%" }}
    />
  );
}

export function FeaturesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header - Full width with diagonal layout */}
        <div className="relative mb-24 lg:mb-32">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
                <span className="w-12 h-px bg-foreground/30" />
                Technical Foundations
              </span>
              <h2
                className={`text-6xl md:text-7xl lg:text-[128px] font-display tracking-tight leading-[0.9] transition-all duration-1000 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                Core
                <br />
                <span className="text-muted-foreground">systems.</span>
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pb-4">
              <p className={`text-xl text-muted-foreground leading-relaxed transition-all duration-1000 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}>
                The application of machine learning to horticultural systems rests on four interconnected technological pillars, each contributing to an integrated framework for plant cultivation.
              </p>
            </div>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid lg:grid-cols-12 gap-4 lg:gap-6">
          {/* Large feature card */}
          <div 
            className={`lg:col-span-12 relative bg-black border border-foreground/10 min-h-[500px] overflow-hidden group transition-all duration-700 flex hover:border-[#eca8d6]/30 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
            onMouseEnter={() => setActiveFeature(0)}
          >
            {/* Left: text content */}
            <div className="relative flex-1 p-8 lg:p-12 bg-black">
              <ParticleVisualization />
              <div className="relative z-10">
                <span className="font-mono text-sm text-[#eca8d6]">{features[0].number}</span>
                <h3 className="text-3xl lg:text-4xl font-display mt-4 mb-6 group-hover:translate-x-2 transition-transform duration-500">
                  {features[0].title}
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-md mb-8">
                  {features[0].description}
                </p>
                <div>
                  <span className="text-5xl lg:text-6xl font-display bg-gradient-to-r from-white to-white/70 bg-clip-text">{features[0].stats.value}</span>
                  <span className="block text-sm text-muted-foreground font-mono mt-2">{features[0].stats.label}</span>
                </div>
              </div>
            </div>

            {/* Right: mirrored image, full height */}
            <div className="hidden lg:block relative w-[42%] shrink-0 overflow-hidden">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Upscaled%20Image%20%2812%29-ng3RrNnsPMJ5CrtOjcPTmhHg01W11q.png"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                style={{ transform: "scaleX(-1)" }}
              />
              {/* Fade left edge into black */}
              <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent" />
            </div>
          </div>

          {/* Secondary feature cards */}
          {features.slice(1).map((feature, index) => (
            <div 
              key={feature.number}
              className={`lg:col-span-4 relative p-8 lg:p-10 border bg-foreground/[0.02] transition-all duration-500 cursor-default overflow-hidden ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ 
                transitionDelay: `${(index + 1) * 100}ms`,
                borderColor: hoveredIndex === index ? `${feature.color}50` : "rgba(var(--foreground-rgb), 0.1)",
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Animated gradient background */}
              <div 
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 0% 0%, ${feature.color}15, transparent 50%)`,
                  opacity: hoveredIndex === index ? 1 : 0,
                }}
              />

              <div className="relative z-10">
                <span 
                  className="font-mono text-sm transition-colors duration-300"
                  style={{ color: hoveredIndex === index ? feature.color : "var(--muted-foreground)" }}
                >
                  {feature.number}
                </span>
                <h3 className="text-2xl font-display mt-4 mb-4 group-hover:translate-x-1 transition-transform duration-300">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm mb-6">{feature.description}</p>
                <div className="pt-6 border-t border-foreground/10">
                  <span 
                    className="text-3xl font-display transition-colors duration-300"
                    style={{ color: hoveredIndex === index ? feature.color : "inherit" }}
                  >
                    {feature.stats.value}
                  </span>
                  <span className="block text-xs text-muted-foreground font-mono mt-1">{feature.stats.label}</span>
                </div>
              </div>

              {/* Animated border line */}
              <div 
                className="absolute bottom-0 left-0 h-[2px] transition-all duration-500"
                style={{
                  background: feature.color,
                  width: hoveredIndex === index ? "100%" : "0%",
                }}
              />
            </div>
          ))}
        </div>

        {/* Robot garden image showcase */}
        <div className={`mt-12 relative h-64 lg:h-80 overflow-hidden rounded-lg transition-all duration-1000 delay-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}>
          <Image
            src="/images/organic-hands.png"
            alt="AI-powered garden monitoring"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <p className="text-sm text-foreground/70 font-mono">
              Where artificial intelligence meets botanical cultivation
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
