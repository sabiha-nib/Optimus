import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const sectionLinks: { name: string; href: string }[] = [];

const routeLinks = [
  { name: "Overview", to: "/" },
  { name: "Deep Dive", to: "/deep-dive" },
  { name: "Atlas", to: "/atlas" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed z-50 transition-all duration-500 ${
        isScrolled ? "top-4 left-4 right-4" : "top-0 left-0 right-0"
      }`}
    >
      <nav
        className={`mx-auto transition-all duration-500 ${
          isScrolled || isMobileMenuOpen
            ? "bg-background/80 backdrop-blur-xl border border-foreground/10 rounded-2xl shadow-lg max-w-[1200px]"
            : "bg-transparent max-w-[1400px]"
        }`}
      >
        <div
          className={`flex items-center justify-between transition-all duration-500 px-6 lg:px-8 ${
            isScrolled ? "h-14" : "h-20"
          }`}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span
              className={`font-display tracking-tight transition-all duration-500 ${
                isScrolled ? "text-xl" : "text-2xl"
              }`}
            >
              Optimus
            </span>
            <span
              className={`text-muted-foreground font-mono transition-all duration-500 ${
                isScrolled ? "text-[10px] mt-0.5" : "text-xs mt-1"
              }`}
            >
              TM
            </span>
          </Link>

          {/* Desktop Section Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {sectionLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-foreground/70 hover:text-foreground transition-colors duration-300 relative group whitespace-nowrap"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Desktop Route Switcher + CTA */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            <div className="flex items-center gap-3 lg:gap-4 mr-1 font-mono text-[10px] tracking-[0.2em] uppercase">
              {routeLinks.map((r) => {
                const active = pathname === r.to;
                return (
                  <Link
                    key={r.to}
                    to={r.to}
                    className={`transition-colors whitespace-nowrap ${
                      active
                        ? "text-foreground"
                        : "text-foreground/50 hover:text-foreground"
                    }`}
                  >
                    {r.name}
                  </Link>
                );
              })}
            </div>
            <span className="hidden lg:inline-block font-mono text-[10px] tracking-[0.25em] uppercase text-foreground/50 ml-2">
              Issue 04
            </span>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-background z-40 transition-all duration-500 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ top: 0 }}
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
                } ${
                  isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: isMobileMenuOpen ? `${i * 75}ms` : "0ms" }}
              >
                {r.name}
              </Link>
            ))}
            <div className="h-px bg-foreground/10 my-4" />
            {sectionLinks.map((link, i) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-2xl text-foreground/70 hover:text-foreground transition-all duration-500 ${
                  isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: isMobileMenuOpen ? `${(i + routeLinks.length) * 75}ms` : "0ms" }}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
