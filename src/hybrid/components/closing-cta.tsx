import { Link } from "react-router-dom";

export function ClosingCta() {
  return (
    <section className="relative py-32 px-6 border-t border-border overflow-hidden">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] gradient-orb breathe pointer-events-none" />
      <div className="relative max-w-[1400px] mx-auto grid md:grid-cols-12 gap-10 items-end">
        <div className="md:col-span-7">
          <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">
            § CONTINUE
          </span>
          <h2 className="mt-6 font-display text-6xl md:text-8xl tracking-tighter leading-[0.85]">
            Two doors. <br />
            <span className="italic font-light">One organism.</span>
          </h2>
        </div>
        <div className="md:col-span-5 grid grid-cols-1 gap-4">
          <Link
            to="/"
            className="group flex items-center justify-between border border-border p-6 hover-lift bg-background"
          >
            <div>
              <div className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">
                ROUTE · 01
              </div>
              <div className="font-display text-3xl tracking-tight mt-1">
                AI · Web
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                The agentic, brutal layer.
              </div>
            </div>
            <span className="font-mono text-2xl group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
          <Link
            to="/petalsphere"
            className="group flex items-center justify-between border border-border p-6 hover-lift bg-background"
          >
            <div>
              <div className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">
                ROUTE · 02
              </div>
              <div className="font-display text-3xl tracking-tight mt-1">
                PetalSphere
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                The slow, observational deep dive.
              </div>
            </div>
            <span className="font-mono text-2xl group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
