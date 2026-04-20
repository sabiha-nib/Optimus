import "./atlas.css";
import { Navigation } from "./components/landing/navigation";
import { ArticleEssay } from "./components/landing/article-essay";
import { FooterSection } from "./components/landing/footer-section";

export default function AtlasPage() {
  return (
    <div className="theme-atlas">
      <main className="relative min-h-screen overflow-x-hidden noise-overlay bg-background text-foreground">
        <Navigation />
        <ArticleEssay />
        <FooterSection />
      </main>
    </div>
  );
}
