import { Link } from "react-router-dom";
import "./aiweb.css";
import AgenticPage from "./AgenticPage";

export default function AiWebPage() {
  return (
    <div className="theme-aiweb min-h-screen">
      {/* Cross-site link to PetalSphere */}
      <Link
        to="/petalsphere"
        className="fixed bottom-4 right-4 z-[100] px-4 py-2 rounded-full bg-black text-white text-xs font-medium shadow-lg hover:bg-black/80 transition-colors"
      >
        Visit PetalSphere →
      </Link>
      <AgenticPage />
    </div>
  );
}
