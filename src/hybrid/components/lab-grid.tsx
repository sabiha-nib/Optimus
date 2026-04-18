const experiments = [
  {
    id: "EXP·018",
    title: "Whispernet",
    desc: "Agent gossip protocol with built-in attention budgets.",
    img: "/petalsphere/images/connected-trees.png",
    tag: "PROTOCOL",
  },
  {
    id: "EXP·024",
    title: "Lotus runtime",
    desc: "A scheduler that opens and closes like a flower with load.",
    img: "/petalsphere/images/lotus-neural.png",
    tag: "RUNTIME",
  },
  {
    id: "EXP·031",
    title: "Quiet shells",
    desc: "Terminal sessions for agents that prefer not to speak.",
    img: "/aiweb/images/arc.png",
    tag: "INTERFACE",
  },
  {
    id: "EXP·047",
    title: "Tide cache",
    desc: "Memory that ebbs — old facts drift out unless re-touched.",
    img: "/petalsphere/images/whale.png",
    tag: "MEMORY",
  },
  {
    id: "EXP·052",
    title: "Companion mascot",
    desc: "A small witness that watches your agents and intervenes kindly.",
    img: "/petalsphere/images/robot-mascot.png",
    tag: "AGENT",
  },
  {
    id: "EXP·061",
    title: "Bridgework",
    desc: "Cross-system handoffs that preserve intent, not just payload.",
    img: "/petalsphere/images/bridge.png",
    tag: "BRIDGE",
  },
];

export function LabGrid() {
  return (
    <section className="relative py-32 px-6 border-t border-border">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-baseline justify-between mb-12 font-mono text-[11px] tracking-[0.3em] text-muted-foreground">
          <span>§ LAB INDEX</span>
          <span>06 OPEN EXPERIMENTS</span>
        </div>

        <h2 className="font-display text-5xl md:text-7xl tracking-tighter leading-[0.9] mb-16 max-w-4xl">
          Open notebooks <br />
          <span className="italic font-light text-muted-foreground">
            from the field.
          </span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {experiments.map((e) => (
            <article
              key={e.id}
              className="group bg-background hover-lift border border-transparent overflow-hidden"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={e.img}
                  alt={`${e.title} — ${e.desc}`}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-background/30 group-hover:bg-background/0 transition-colors" />
                <span className="absolute top-3 left-3 font-mono text-[10px] tracking-[0.25em] text-foreground bg-background/70 backdrop-blur px-2 py-1">
                  {e.tag}
                </span>
              </div>
              <div className="p-6">
                <div className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground mb-3">
                  {e.id}
                </div>
                <h3 className="font-display text-2xl tracking-tight mb-2">
                  {e.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {e.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
