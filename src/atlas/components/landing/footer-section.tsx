import { Link } from "react-router-dom";

export function FooterSection() {
  return (
    <footer className="border-t border-white/10" style={{ background: "hsl(0 0% 2%)" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          <div className="col-span-2 md:col-span-1">
            <span className="text-xl font-semibold tracking-tight text-white">Optimus</span>
            <p className="mt-4 text-sm text-white/40 leading-relaxed max-w-xs">
              Research, education, and exploration at the frontier of artificial intelligence.
            </p>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-white/60 uppercase tracking-widest mb-4">Navigate</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-sm text-white/40 hover:text-white transition-colors">Overview</Link></li>
              <li><Link to="/deep-dive" className="text-sm text-white/40 hover:text-white transition-colors">Deep Dive</Link></li>
              <li><Link to="/atlas" className="text-sm text-white/40 hover:text-white transition-colors">Atlas</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-white/60 uppercase tracking-widest mb-4">Research</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-white/40 hover:text-white transition-colors">Foundations</a></li>
              <li><a href="#" className="text-sm text-white/40 hover:text-white transition-colors">Alignment</a></li>
              <li><a href="#" className="text-sm text-white/40 hover:text-white transition-colors">Emergence</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-white/60 uppercase tracking-widest mb-4">Connect</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-white/40 hover:text-white transition-colors">Twitter</a></li>
              <li><a href="#" className="text-sm text-white/40 hover:text-white transition-colors">GitHub</a></li>
              <li><a href="#" className="text-sm text-white/40 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">© 2026 Optimus. All rights reserved.</p>
          <div className="flex items-center gap-2 text-xs text-white/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}
