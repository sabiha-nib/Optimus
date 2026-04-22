import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const routeLinks = [
  { name: "Overview", to: "/" },
  { name: "Deep Dive", to: "/deep-dive" },
  { name: "Atlas", to: "/atlas" },
];

interface Props {
  variant?: "light" | "dark";
}

export function OptimusNav({ variant = "light" }: Props) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const isLight = variant === "light";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* --- Color tokens per state --- */
  const textBase = isScrolled
    ? "text-foreground/70 hover:text-foreground"
    : isLight
    ? "text-white/60 hover:text-white"
    : "text-black/60 hover:text-black";

  const textActive = isScrolled
    ? "text-foreground"
    : isLight
    ? "text-white"
    : "text-black";

  const brandColor = isScrolled
    ? "text-foreground"
    : isLight
    ? "text-white"
    : "text-black";

  const mobileText = isScrolled || isMobileMenuOpen
    ? "text-foreground"
    : isLight
    ? "text-white"
    : "text-black";

  return (
    <header
      className={`fixed z-[60] transition-all duration-500 ${
        isScrolled ? "top-4 left-4 right-4" : "top-0 left-0 right-0"
      }`}
    >
      <nav
        className={`mx-auto transition-all duration-500 ${
          isScrolled || isMobileMenuOpen
            ? "bg-background/60 backdrop-blur-2xl border border-foreground/10 rounded-2xl shadow-lg max-w-[1200px]"
            : "bg-transparent max-w-[1400px]"
        }`}
      >
        <div
          className={`flex items-center justify-between transition-all duration-500 px-6 lg:px-8 ${
            isScrolled ? "h-12" : "h-16"
          }`}
        >
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2">
            <span
              className={`font-mono text-[11px] tracking-[0.35em] transition-colors duration-500 ${brandColor}`}
              style={{ fontFamily: "'Instrument Sans', system-ui, sans-serif" }}
            >
              ✦ OPTIMUS
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-5 lg:gap-7 font-mono text-[10px] tracking-[0.3em] uppercase">
            {routeLinks.map((r) => {
              const active = pathname === r.to;
              return (
                <Link
                  key={r.to}
                  to={r.to}
                  className={`transition-colors duration-300 ${active ? textActive : textBase}`}
                >
                  {r.name}
                </Link>
              );
            })}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 transition-colors duration-500 ${mobileText}`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-background z-40 transition-all duration-500 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col h-full px-8 pt-28 pb-8">
          <div className="flex-1 flex flex-col justify-center gap-6">
            {routeLinks.map((r, i) => (
              <Link
                key={r.to}
                to={r.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-5xl font-display transition-all duration-500 ${
                  pathname === r.to ? "text-foreground" : "text-foreground/60 hover:text-foreground"
                } ${isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: isMobileMenuOpen ? `${i * 75}ms` : "0ms" }}
              >
                {r.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
