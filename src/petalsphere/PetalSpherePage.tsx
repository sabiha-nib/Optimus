import { Link } from "react-router-dom";
import "./petalsphere.css";
import { OptimusNav } from "@/components/OptimusNav";
import PetalPage from "./PetalPage";

export default function PetalSpherePage() {
  return (
    <div className="theme-petalsphere min-h-screen">
      <OptimusNav variant="light" />
      {/* Floating quick-link back to overview (kept for parity with previous design) */}
      <Link
        to="/"
        className="fixed bottom-4 right-4 z-[100] px-4 py-2 rounded-full bg-white text-black text-xs font-medium shadow-lg hover:bg-white/80 transition-colors"
      >
        ← Back to overview
      </Link>
      <div className="pt-12">
        <PetalPage />
      </div>
    </div>
  );
}
