import { useEffect, useRef, useState } from "react";
import { Droplets, Sprout, Globe, Utensils } from "lucide-react";

const reasons = [
  {
    icon: Droplets,
    title: "Productivity &amp; Work",
    description: "AI is automating repetitive cognitive work — from drafting emails to triaging support tickets — and changing what skills carry the most value in the modern workplace.",
    stat: "Every",
    statLabel: "knowledge job",
    color: "#7dd3fc",
  },
  {
    icon: Sprout,
    title: "Science &amp; Discovery",
    description: "Models like AlphaFold have already accelerated entire scientific fields. AI is becoming a partner to researchers, sifting through data and proposing hypotheses at a scale humans alone cannot match.",
    stat: "Faster",
    statLabel: "research cycles",
    color: "#86efac",
  },
  {
    icon: Globe,
    title: "Access &amp; Inequality",
    description: "AI promises personalised education, healthcare and tools for all — yet the compute, talent and data needed to build it are concentrated in a few companies and countries. Who benefits is itself a design choice.",
    stat: "Global",
    statLabel: "access challenge",
    color: "#eca8d6",
  },
  {
    icon: Utensils,
    title: "Society &amp; Culture",
    description: "From recommendation feeds to generative media, AI quietly shapes what we read, watch and believe. Its long-term effect on attention, creativity and democratic discourse is one of the central stories of our era.",
    stat: "Shaping",
    statLabel: "everyday life",
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
              Why It Matters
            </span>
            <h2 className={`text-6xl md:text-7xl lg:text-[100px] font-display tracking-tight leading-[0.9] transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}>
              Why AI
              <br />
              <span className="text-muted-foreground">matters now.</span>
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
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 50% 100%, ${reason.color}15 0%, transparent 70%)`
                }}
              />

              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  boxShadow: `inset 0 0 30px ${reason.color}20, 0 0 20px ${reason.color}10`
                }}
              />

              <div
                className="absolute top-0 left-0 h-[2px] transition-all duration-700 ease-out"
                style={{
                  width: hoveredCard === index ? '100%' : '0%',
                  background: `linear-gradient(90deg, transparent, ${reason.color}, transparent)`
                }}
              />

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

              <div className="relative mb-4">
                <span
                  className="text-4xl font-display transition-colors duration-300"
                  style={{ color: reason.color }}
                >
                  {reason.stat}
                </span>
                <span className="block text-sm text-muted-foreground font-mono mt-1">{reason.statLabel}</span>
              </div>

              <h3 className="relative text-xl font-display mb-3 group-hover:text-foreground transition-colors duration-300">
                {reason.title}
              </h3>
              <p className="relative text-sm text-muted-foreground leading-relaxed group-hover:text-muted-foreground/90 transition-colors duration-300">
                {reason.description}
              </p>
            </div>
          ))}
        </div>

        {/* Key observation callout */}
        <div className={`mt-16 relative overflow-hidden transition-all duration-1000 delay-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}>
          <div className="absolute -inset-1 bg-gradient-to-r from-[#eca8d6]/20 via-[#7dd3fc]/20 to-[#eca8d6]/20 blur-sm rounded-lg" />

          <div className="relative p-8 lg:p-12 border border-[#eca8d6]/30 bg-background">
            <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-[#eca8d6]/50" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-[#7dd3fc]/50" />

            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-12">
              <div className="shrink-0">
                <div className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#eca8d6] animate-pulse" />
                  <span className="text-sm font-mono text-[#eca8d6] uppercase tracking-widest">Key Idea</span>
                </div>
              </div>
              <p className="text-xl lg:text-2xl font-display text-foreground/90 leading-relaxed">
                Artificial intelligence is best understood as a general-purpose technology — like
                electricity or the internet. Its biggest effects will not come from any single
                product, but from how it slowly reshapes work, science and society over decades.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Full-width connected trees image */}
      <div className={`mt-24 relative w-full overflow-hidden transition-all duration-1000 delay-700 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background z-10 pointer-events-none" />
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full max-w-4xl h-48 bg-gradient-to-r from-[#eca8d6]/20 via-[#fbbf24]/30 to-[#eca8d6]/20 blur-3xl animate-pulse" />
        </div>

        <img
          src="/petalsphere/images/connected-trees.png"
          alt="An interconnected network of intelligent systems"
          className="relative w-full h-auto max-h-[500px] object-cover object-center"
        />

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
          <span className="text-sm font-mono text-foreground/60 bg-background/80 backdrop-blur-sm px-4 py-2 border border-foreground/10">
            Intelligence connects across systems, like signals through a network
          </span>
        </div>
      </div>
    </section>
  );
}
