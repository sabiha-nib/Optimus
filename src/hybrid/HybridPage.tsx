import { Link } from "react-router-dom";
import "./hybrid.css";
import { HybridHero } from "./components/hero";
import { Manifesto } from "./components/manifesto";
import { Ticker } from "./components/ticker";
import { Diptych } from "./components/diptych";
import { LabGrid } from "./components/lab-grid";
import { Quote } from "./components/quote";
import { ClosingCta } from "./components/closing-cta";

export default function HybridPage() {
  return (
    <div className="theme-hybrid min-h-screen relative">
      {/* Top route nav */}
      <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/60 border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6 h-14 flex items-center justify-between">
          <Link to="/hybrid" className="font-mono text-xs tracking-[0.3em] text-foreground">
            ░ HYBRID/LAB
          </Link>
          <div className="flex items-center gap-6 font-mono text-[10px] tracking-[0.25em] text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">AI·WEB</Link>
            <Link to="/petalsphere" className="hover:text-foreground transition-colors">PETALSPHERE</Link>
            <span className="text-accent">HYBRID</span>
          </div>
        </div>
      </nav>

      <main className="relative pt-14">
        <HybridHero />
        <Ticker />
        <Manifesto />
        <Diptych />
        <LabGrid />
        <Quote />
        <ClosingCta />

        <footer className="border-t border-border py-10 px-6 font-mono text-[10px] tracking-[0.3em] text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-4">
          <span>© HYBRID/LAB — A SPECULATIVE INTERFACE</span>
          <span>BUILT WITH SIGNALS FROM AI·WEB &amp; PETALSPHERE</span>
        </footer>
      </main>
    </div>
  );
}
