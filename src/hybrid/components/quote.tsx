export function Quote() {
  return (
    <section className="relative py-40 px-6 border-t border-border overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 scan-lines" />
      <div className="relative max-w-5xl mx-auto text-center">
        <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">
          ✦ FIELD NOTE
        </span>
        <blockquote className="mt-10 font-display text-4xl md:text-6xl leading-[1.05] tracking-tighter">
          “The most <span className="word-aurora">intelligent</span> system
          we've ever built <br className="hidden md:block" />
          will be the one that
          <span className="italic font-light"> knows when to stop.</span>”
        </blockquote>
        <div className="mt-10 font-mono text-[11px] tracking-[0.3em] text-muted-foreground">
          ANON · OBSERVATION LOG #214
        </div>
      </div>
    </section>
  );
}
