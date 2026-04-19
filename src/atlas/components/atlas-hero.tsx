export function AtlasHero() {
  return (
    <section className="relative min-h-[88vh] overflow-hidden grid-bg">
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] gradient-orb breathe pointer-events-none" />
      <div
        className="absolute -bottom-40 -right-40 w-[700px] h-[700px] gradient-orb breathe pointer-events-none"
        style={{ animationDelay: "2s" }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6 pt-28 pb-16 flex flex-col gap-14">
        <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.3em] text-muted-foreground">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            ATLAS · RESEARCH & EDUCATION
          </span>
          <span>VOL. 001 — A LIVING SYLLABUS</span>
        </div>

        <h1 className="font-display text-[12vw] md:text-[8.5vw] leading-[0.88] tracking-tighter">
          <span className="block text-stroke">a quiet</span>
          <span className="block">
            <span className="word-aurora">atlas</span> of
          </span>
          <span className="block italic font-light">machine intelligence.</span>
        </h1>

        <div className="grid md:grid-cols-12 gap-8 items-end">
          <p className="md:col-span-6 text-base md:text-lg text-muted-foreground leading-relaxed">
            Atlas is the reading room of Optimus — a slow library of essays,
            field notes and short courses that explain how the systems behind
            our agentic and observational layers actually think, learn and
            forget.
          </p>
          <div className="md:col-span-4 md:col-start-9 font-mono text-[11px] tracking-widest text-muted-foreground space-y-2">
            <div className="flex justify-between border-b border-border pb-2">
              <span>ARTICLES</span>
              <span className="text-foreground">24</span>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <span>COURSES</span>
              <span className="text-foreground">06</span>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <span>READING TIME</span>
              <span className="text-foreground">~9h</span>
            </div>
            <div className="flex justify-between">
              <span>UPDATED</span>
              <span className="text-accent">WEEKLY ↗</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
