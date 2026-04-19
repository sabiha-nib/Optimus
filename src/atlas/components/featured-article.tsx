export function FeaturedArticle() {
  return (
    <section className="relative border-t border-border">
      <div className="grid md:grid-cols-2">
        <div className="relative min-h-[70vh] overflow-hidden">
          <img
            src="/petalsphere/images/lotus-neural.png"
            alt="A lotus rendered as a neural diagram, representing emergent reasoning."
            className="absolute inset-0 w-full h-full object-cover opacity-90"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/20 to-transparent" />
          <span className="absolute top-4 left-4 font-mono text-[10px] tracking-[0.3em] bg-background/70 backdrop-blur px-3 py-1.5">
            FEATURED · ESSAY
          </span>
        </div>
        <div className="p-10 md:p-16 flex flex-col justify-center max-w-2xl">
          <div className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">
            ARTICLE · 014 · 22 MIN READ
          </div>
          <h2 className="mt-6 font-display text-4xl md:text-6xl tracking-tighter leading-[0.95]">
            How a model <span className="word-aurora">forgets</span> on purpose.
          </h2>
          <p className="mt-8 text-muted-foreground leading-relaxed">
            A walkthrough of <em>tide caching</em>: a memory architecture in
            which old facts decay unless re-touched by new context. We unpack
            why intentional forgetting outperforms infinite recall, and what it
            means for honesty, bias and trust in long-running agents.
          </p>
          <ul className="mt-8 space-y-2 font-mono text-[11px] tracking-widest text-muted-foreground">
            <li>· memory · forgetting · context windows</li>
            <li>· companion paper · open dataset</li>
            <li>· prerequisite: Atlas 101 — How Models Learn</li>
          </ul>
          <div className="mt-10 flex items-center gap-4">
            <button className="border border-foreground px-6 py-3 font-mono text-[11px] tracking-[0.3em] hover:bg-foreground hover:text-background transition-colors">
              READ ESSAY →
            </button>
            <button className="px-6 py-3 font-mono text-[11px] tracking-[0.3em] text-muted-foreground hover:text-foreground transition-colors">
              SAVE FOR LATER
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
