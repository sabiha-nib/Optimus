export function HybridHero() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden grid-bg scan-lines">
      {/* gradient orbs */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] gradient-orb breathe pointer-events-none" />
      <div
        className="absolute -bottom-40 -right-40 w-[700px] h-[700px] gradient-orb breathe pointer-events-none"
        style={{ animationDelay: "2s" }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6 pt-24 pb-16 flex flex-col gap-16">
        {/* status bar */}
        <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.3em] text-muted-foreground">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            SIGNAL/LIVE · 04.18.26
          </span>
          <span>VOL. 003 — INTERFERENCE PATTERNS</span>
        </div>

        {/* main headline */}
        <h1 className="font-display text-[14vw] md:text-[10vw] leading-[0.85] tracking-tighter">
          <span className="block text-stroke">where</span>
          <span className="block">
            <span
              className="glitch-text word-aurora"
              data-text="machines"
            >
              machines
            </span>
          </span>
          <span className="block italic font-light">become gardens.</span>
        </h1>

        {/* sub block */}
        <div className="grid md:grid-cols-12 gap-8 items-end">
          <p className="md:col-span-5 text-base md:text-lg text-muted-foreground leading-relaxed">
            A laboratory at the intersection of brutalist agentic computing and
            soft, observational science. Two vocabularies, one organism — built
            for a web that thinks, breathes and remembers.
          </p>
          <div className="md:col-span-4 md:col-start-9 font-mono text-[11px] tracking-widest text-muted-foreground space-y-2">
            <div className="flex justify-between border-b border-border pb-2">
              <span>SYSTEMS</span>
              <span className="text-foreground">04 / ACTIVE</span>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <span>EXPERIMENTS</span>
              <span className="text-foreground">128</span>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <span>LATENCY</span>
              <span className="text-foreground">42ms</span>
            </div>
            <div className="flex justify-between">
              <span>ENTROPY</span>
              <span className="text-accent">RISING ↗</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
