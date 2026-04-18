const tenets = [
  {
    n: "01",
    title: "Compute, but quietly.",
    body: "Every cycle has a cost. We design agents that hesitate, defer, and release attention back to the world.",
  },
  {
    n: "02",
    title: "Interfaces are habitats.",
    body: "A screen is a clearing. Things should grow there — not be installed.",
  },
  {
    n: "03",
    title: "Memory is a garden, not a warehouse.",
    body: "What the system remembers is who it becomes. Curate; don't hoard.",
  },
  {
    n: "04",
    title: "Brutal honesty, tender defaults.",
    body: "Hard edges in the architecture, soft edges where humans live.",
  },
];

export function Manifesto() {
  return (
    <section className="relative py-32 px-6 border-t border-border">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-baseline justify-between mb-16 font-mono text-[11px] tracking-[0.3em] text-muted-foreground">
          <span>§ MANIFESTO</span>
          <span>FOUR TENETS</span>
        </div>

        <h2 className="font-display text-5xl md:text-7xl tracking-tighter leading-[0.9] mb-20 max-w-4xl">
          We don't build products. <br />
          <span className="italic font-light text-muted-foreground">
            We tend conditions.
          </span>
        </h2>

        <div className="grid md:grid-cols-2 gap-px bg-border">
          {tenets.map((t) => (
            <article
              key={t.n}
              className="bg-background p-10 hover-lift border border-transparent"
            >
              <div className="flex items-baseline justify-between mb-8 font-mono text-[10px] tracking-[0.3em] text-muted-foreground">
                <span>{t.n}</span>
                <span>TENET</span>
              </div>
              <h3 className="font-display text-3xl md:text-4xl tracking-tight mb-4">
                {t.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed max-w-md">
                {t.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
