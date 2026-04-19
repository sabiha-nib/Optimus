import "./atlas.css";
import { OptimusNav } from "@/components/OptimusNav";
import { AtlasHero } from "./components/atlas-hero";
import { FeaturedArticle } from "./components/featured-article";
import { ArticlesGrid } from "./components/articles-grid";
import { Curriculum } from "./components/curriculum";
import { Glossary } from "./components/glossary";
import { AtlasCta } from "./components/atlas-cta";

export default function AtlasPage() {
  return (
    <div className="theme-atlas min-h-screen relative">
      <OptimusNav variant="light" />
      <main className="relative pt-12">
        <AtlasHero />
        <FeaturedArticle />
        <ArticlesGrid />
        <Curriculum />
        <Glossary />
        <AtlasCta />

        <footer className="border-t border-border py-10 px-6 font-mono text-[10px] tracking-[0.3em] text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-4">
          <span>© OPTIMUS · ATLAS — A LIVING SYLLABUS</span>
          <span>READING IS A FORM OF LISTENING</span>
        </footer>
      </main>
    </div>
  );
}
