const articles = [
  {
    n: "001",
    cat: "FOUNDATIONS",
    time: "12 MIN",
    title: "What does it mean for software to 'understand'?",
    excerpt:
      "An accessible tour from symbol manipulation to embeddings, and why neither story alone is sufficient.",
    img: "/petalsphere/images/connected-trees.png",
  },
  {
    n: "002",
    cat: "AGENTS",
    time: "18 MIN",
    title: "Planning, doubting, retrying: the loop inside an agent.",
    excerpt:
      "We open the box on tool use, reflection and the small acts of self-correction that make agents trustworthy.",
    img: "/aiweb/images/arc.png",
  },
  {
    n: "003",
    cat: "ETHICS",
    time: "9 MIN",
    title: "On consent, scraping and the quiet violence of training data.",
    excerpt:
      "A measured look at how datasets are assembled, whose voices are amplified, and the obligations that follow.",
    img: "/petalsphere/images/audit.jpg",
  },
  {
    n: "004",
    cat: "INFRASTRUCTURE",
    time: "15 MIN",
    title: "The carbon shape of a single conversation.",
    excerpt:
      "Estimating the real-world footprint of inference and the design choices that can lower it by an order of magnitude.",
    img: "/petalsphere/images/encrypted.jpg",
  },
  {
    n: "005",
    cat: "COGNITION",
    time: "11 MIN",
    title: "Why hallucinations are a feature of language, not a bug.",
    excerpt:
      "How the same generative pressure that produces metaphor also produces falsehood, and how to design with both.",
    img: "/petalsphere/images/whale.png",
  },
  {
    n: "006",
    cat: "SECURITY",
    time: "14 MIN",
    title: "Prompt injection, treated as a real attack surface.",
    excerpt:
      "A practitioner's guide to threat-modelling agentic systems that read the open web on your behalf.",
    img: "/petalsphere/images/shield.png",
  },
  {
    n: "007",
    cat: "INTERFACES",
    time: "8 MIN",
    title: "Notes on calm interfaces for non-stop systems.",
    excerpt:
      "Design patterns for surfacing AI activity without overwhelming the people who have to live next to it.",
    img: "/petalsphere/images/garden-bonsai.png",
  },
  {
    n: "008",
    cat: "PHILOSOPHY",
    time: "20 MIN",
    title: "If it tends conditions, is it still a tool?",
    excerpt:
      "Tools, instruments, companions, infrastructure — a reading list for naming what we are actually building.",
    img: "/petalsphere/images/bridge.png",
  },
];

export function ArticlesGrid() {
  return (
    <section className="relative py-32 px-6 border-t border-border">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-baseline justify-between mb-12 font-mono text-[11px] tracking-[0.3em] text-muted-foreground">
          <span>§ RESEARCH ARTICLES</span>
          <span>{articles.length} PUBLISHED · UPDATED WEEKLY</span>
        </div>

        <h2 className="font-display text-5xl md:text-7xl tracking-tighter leading-[0.9] mb-16 max-w-4xl">
          Long reads, <br />
          <span className="italic font-light text-muted-foreground">
            slowly written.
          </span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {articles.map((a) => (
            <article
              key={a.n}
              className="group bg-background hover-lift border border-transparent overflow-hidden flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={a.img}
                  alt={a.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-background/30 group-hover:bg-background/0 transition-colors" />
                <span className="absolute top-3 left-3 font-mono text-[10px] tracking-[0.25em] text-foreground bg-background/70 backdrop-blur px-2 py-1">
                  {a.cat}
                </span>
                <span className="absolute top-3 right-3 font-mono text-[10px] tracking-[0.25em] text-muted-foreground bg-background/70 backdrop-blur px-2 py-1">
                  {a.time}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground mb-3">
                  ART · {a.n}
                </div>
                <h3 className="font-display text-2xl tracking-tight mb-3 leading-tight">
                  {a.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {a.excerpt}
                </p>
                <div className="article-rule mt-6" />
                <div className="mt-4 flex items-center justify-between font-mono text-[10px] tracking-[0.3em]">
                  <span className="text-muted-foreground">READ ARTICLE</span>
                  <span className="text-accent">→</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
