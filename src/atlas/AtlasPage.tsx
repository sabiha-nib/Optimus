import "./atlas.css";
import { OptimusNav } from "@/components/OptimusNav";
import { ArticleEssay } from "./components/landing/article-essay";
import { FooterSection } from "./components/landing/footer-section";

export default function AtlasPage() {
  return (
    <div className="theme-atlas">
      <OptimusNav variant="light" />
      <main className="relative min-h-screen">
        <ArticleEssay />
        <FooterSection />
      </main>
    </div>
  );
}
