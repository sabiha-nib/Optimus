const items = [
  "AGENTIC ↔ ORGANIC",
  "OBSERVATION OVER OPTIMIZATION",
  "INTERFACES THAT BREATHE",
  "CODE AS SOIL",
  "PROTOCOLS WITH PATIENCE",
  "BRUTAL × TENDER",
  "SIGNAL IS A FLOWER",
  "THE WEB AS ECOSYSTEM",
];

export function Ticker() {
  return (
    <section className="ticker-row overflow-hidden bg-background">
      <div className="flex w-max marquee-x font-display text-4xl md:text-6xl py-6">
        {[...items, ...items].map((t, i) => (
          <span key={i} className="px-8 flex items-center gap-8">
            <span className={i % 3 === 0 ? "italic font-light" : "text-stroke"}>
              {t}
            </span>
            <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}
