import { Link, useLocation } from "react-router-dom";

const links = [
  { to: "/", label: "OVERVIEW", key: "overview" },
  { to: "/deep-dive", label: "DEEP DIVE", key: "deep-dive" },
  { to: "/atlas", label: "ATLAS", key: "atlas" },
];

interface Props {
  /** Visual variant: 'light' for dark backgrounds, 'dark' for light backgrounds. */
  variant?: "light" | "dark";
}

export function OptimusNav({ variant = "light" }: Props) {
  const { pathname } = useLocation();

  const isLight = variant === "light";
  const wrap = isLight
    ? "bg-black/40 border-white/10 text-white/80"
    : "bg-white/60 border-black/10 text-black/70";
  const brand = isLight ? "text-white" : "text-black";
  const linkBase = "transition-colors hover:opacity-100";
  const inactive = isLight ? "opacity-60 hover:text-white" : "opacity-60 hover:text-black";
  const active = isLight ? "opacity-100 text-white" : "opacity-100 text-black";
  const accent = isLight ? "text-[#eca8d6]" : "text-pink-600";

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-[60] backdrop-blur-md border-b ${wrap}`}
    >
      <div className="max-w-[1400px] mx-auto px-6 h-12 flex items-center justify-between">
        <Link
          to="/"
          className={`font-mono text-[11px] tracking-[0.35em] ${brand}`}
          style={{ fontFamily: "'Instrument Sans', system-ui, sans-serif" }}
        >
          ✦ OPTIMUS
        </Link>
        <div className="flex items-center gap-5 md:gap-7 font-mono text-[10px] tracking-[0.3em]">
          {links.map((l) => {
            const isActive = pathname === l.to;
            return (
              <Link
                key={l.key}
                to={l.to}
                className={`${linkBase} ${isActive ? active : inactive} ${
                  isActive ? accent : ""
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
