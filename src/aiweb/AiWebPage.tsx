import "./aiweb.css";
import { OptimusNav } from "@/components/OptimusNav";
import AgenticPage from "./AgenticPage";

export default function AiWebPage() {
  return (
    <div className="theme-aiweb min-h-screen">
      <OptimusNav variant="dark" />
      <div className="pt-12">
        <AgenticPage />
      </div>
    </div>
  );
}
