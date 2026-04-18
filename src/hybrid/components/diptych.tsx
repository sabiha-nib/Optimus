export function Diptych() {
  return (
    <section className="relative border-t border-border">
      <div className="grid md:grid-cols-2">
        {/* Left — agentic */}
        <div className="relative p-10 md:p-16 min-h-[80vh] border-b md:border-b-0 md:border-r border-border grid-bg overflow-hidden">
          <div className="absolute -top-20 -right-20 w-96 h-96 gradient-orb pointer-events-none" />
          <div className="relative">
            <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">
              ◐ SIDE A · AGENTIC
            </span>
            <h3 className="mt-8 font-display text-5xl md:text-6xl tracking-tighter leading-[0.9]">
              Machines <br />
              that <span className="word-aurora">act.</span>
            </h3>
            <ul className="mt-12 space-y-6 font-mono text-sm">
              {[
                ["plan()", "decompose intent into steps"],
                ["call()", "reach across the network"],
                ["verify()", "double-check before commit"],
                ["forget()", "release what no longer serves"],
              ].map(([k, v]) => (
                <li
                  key={k}
                  className="flex items-baseline justify-between gap-6 border-b border-border pb-3"
                >
                  <span className="text-foreground">{k}</span>
                  <span className="text-muted-foreground text-right">{v}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right — organic */}
        <div className="relative min-h-[80vh] overflow-hidden">
          <img
            src="/petalsphere/images/garden-bonsai.png"
            alt="A bonsai-shaped garden representing organic computation"
            className="absolute inset-0 w-full h-full object-cover opacity-80"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="relative p-10 md:p-16 h-full flex flex-col justify-end">
            <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">
              ◑ SIDE B · ORGANIC
            </span>
            <h3 className="mt-6 font-display text-5xl md:text-6xl tracking-tighter leading-[0.9]">
              Gardens <br />
              that <span className="italic font-light">listen.</span>
            </h3>
            <p className="mt-8 max-w-md text-muted-foreground leading-relaxed">
              Beneath the protocols, a slower layer: ambient signals, shared
              roots, decisions that take their time. The same system, observed
              from the soil up.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
