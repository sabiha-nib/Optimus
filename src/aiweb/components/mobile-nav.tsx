import { useState } from "react"
import { Link, useLocation } from "react-router-dom"

const NAV_LINKS = [
  { label: "Overview",     href: "#platform" },
  { label: "Capabilities", href: "#agents" },
  { label: "How it works", href: "#workflow" },
  { label: "Applications", href: "#integrations" },
  { label: "Read more",    href: "#pricing" },
]

const ROUTE_LINKS: { label: string; to: string }[] = [
  { label: "OVERVIEW",  to: "/" },
  { label: "DEEP DIVE", to: "/deep-dive" },
  { label: "ATLAS",     to: "/atlas" },
]

const NAV_STYLE = {
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  background: "rgba(245,244,240,0.30)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.06)",
} as const

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  const close = () => setOpen(false)

  return (
    <div className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <div className="pointer-events-auto w-full max-w-3xl">

        {/* Main bar */}
        <nav
          className="flex items-center justify-between px-5 py-3 rounded-2xl border border-black/[0.06]"
          style={NAV_STYLE}
        >
          <Link to="/" className="font-pixel text-xs tracking-[0.25em] text-black/80 hover:text-black transition-colors">✦ OPTIMUS</Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
            {NAV_LINKS.map(l => (
              <a
                key={l.label}
                href={l.href}
                className="text-[11px] text-black/60 hover:text-black transition-colors duration-200 tracking-wide"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Cross-route links — always visible on desktop */}
            <div className="hidden md:flex items-center gap-3 mr-2">
              {ROUTE_LINKS.map(r => {
                const active = pathname === r.to
                return (
                  <Link
                    key={r.to}
                    to={r.to}
                    className={`text-[10px] tracking-[0.3em] transition-colors ${active ? "text-black" : "text-black/50 hover:text-black"}`}
                    style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
                  >
                    {r.label}
                  </Link>
                )
              })}
            </div>
            <Link to="/atlas" className="text-[11px] px-4 py-2 rounded-xl border border-black/10 text-black/70 hover:text-black hover:border-black/20 hover:bg-black/[0.03] transition-all duration-200 tracking-wide hidden md:block" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
              START READING
            </Link>

            {/* Burger — mobile only */}
            <button
              onClick={() => setOpen(v => !v)}
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px] rounded-lg hover:bg-black/[0.04] transition-colors"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              <span
                className="block h-px bg-black/60 transition-all duration-300 origin-center"
                style={{
                  width: "18px",
                  transform: open ? "translateY(6px) rotate(45deg)" : "none",
                }}
              />
              <span
                className="block h-px bg-black/60 transition-all duration-300"
                style={{
                  width: "18px",
                  opacity: open ? 0 : 1,
                  transform: open ? "scaleX(0)" : "none",
                }}
              />
              <span
                className="block h-px bg-black/60 transition-all duration-300 origin-center"
                style={{
                  width: "18px",
                  transform: open ? "translateY(-6px) rotate(-45deg)" : "none",
                }}
              />
            </button>
          </div>
        </nav>

        {/* Mobile dropdown */}
        <div
          className="md:hidden mt-2 overflow-hidden transition-all duration-300 ease-in-out"
          style={{ maxHeight: open ? "320px" : "0px", opacity: open ? 1 : 0 }}
        >
          <div
            className="rounded-2xl border border-black/[0.06] px-2 py-2 flex flex-col"
            style={NAV_STYLE}
          >
            {NAV_LINKS.map(l => (
              <a
                key={l.label}
                href={l.href}
                onClick={close}
                className="px-4 py-3 text-sm text-black/60 hover:text-black hover:bg-black/[0.03] rounded-xl transition-colors tracking-wide"
                style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
              >
                {l.label}
              </a>
            ))}
            <div className="mt-1 px-2 pb-1 border-t border-black/[0.06] pt-2 flex flex-col gap-1">
              {ROUTE_LINKS.map(r => (
                <Link
                  key={r.to}
                  to={r.to}
                  onClick={close}
                  className="px-4 py-2.5 text-[11px] tracking-[0.3em] text-black/70 hover:text-black hover:bg-black/[0.03] rounded-xl transition-colors"
                  style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
                >
                  {r.label}
                </Link>
              ))}
              <Link to="/atlas" onClick={close} className="mt-1 w-full text-center text-[11px] px-4 py-2.5 rounded-xl border border-black/10 text-black/70 hover:text-black hover:border-black/20 hover:bg-black/[0.03] transition-all duration-200 tracking-wide" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
                START READING
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
