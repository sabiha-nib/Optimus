import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const articles = [
  {
    tag: "Foundations",
    readTime: "12 min",
    title: "What is Artificial Intelligence?",
    excerpt:
      "AI is the study of building systems that perceive, reason, and act. From symbolic logic in the 1950s to today's large neural networks, the field has evolved through booms, winters, and a steady accumulation of compute, data, and ideas.",
  },
  {
    tag: "Machine Learning",
    readTime: "9 min",
    title: "Supervised, Unsupervised, and Reinforcement Learning",
    excerpt:
      "Models learn from labeled examples, find structure in unlabeled data, or maximize a reward signal through trial and error. Each paradigm shapes which problems we can solve and how we measure progress.",
  },
  {
    tag: "Deep Learning",
    readTime: "14 min",
    title: "Neural Networks, From Perceptrons to Transformers",
    excerpt:
      "Layered networks of differentiable functions trained with backpropagation. Convolutional nets unlocked vision, recurrent nets handled sequences, and the transformer's attention mechanism rewrote what scale could buy.",
  },
  {
    tag: "Language Models",
    readTime: "11 min",
    title: "How Large Language Models Actually Work",
    excerpt:
      "Pretraining on next-token prediction, fine-tuning on instructions, and alignment through human feedback. We unpack tokenization, context windows, sampling, and why scale produces emergent behavior.",
  },
  {
    tag: "Agents",
    readTime: "10 min",
    title: "Agentic Systems and Tool Use",
    excerpt:
      "When models can call tools, browse, and run code, they become agents. We cover planning loops, memory, evaluation harnesses, and the failure modes that show up only at runtime.",
  },
  {
    tag: "Alignment",
    readTime: "13 min",
    title: "Safety, Alignment, and Evaluation",
    excerpt:
      "Capability without alignment is risk. RLHF, constitutional AI, red-teaming, and interpretability research each tackle a different slice of making powerful systems do what we actually want.",
  },
  {
    tag: "Compute",
    readTime: "8 min",
    title: "Scaling Laws and the Economics of AI",
    excerpt:
      "Loss curves bend predictably with data, parameters, and compute. Understanding scaling laws explains why frontier labs spend billions and what diminishing returns might look like.",
  },
  {
    tag: "Society",
    readTime: "15 min",
    title: "AI in the Real World — Bias, Labor, and Policy",
    excerpt:
      "Beyond benchmarks: how AI reshapes hiring, healthcare, art, and governance. A clear-eyed look at trade-offs, regulation, and the questions that don't have technical answers.",
  },
];

const concepts = [
  { term: "Token", meaning: "The smallest unit a language model reads — usually a sub-word fragment." },
  { term: "Context window", meaning: "How much text a model can consider at once when generating its next output." },
  { term: "Embedding", meaning: "A high-dimensional vector that captures the meaning of a word, sentence, or image." },
  { term: "Inference", meaning: "Running a trained model to produce predictions, as opposed to training it." },
  { term: "Fine-tuning", meaning: "Continuing training on a narrower dataset to specialize a general model." },
  { term: "RAG", meaning: "Retrieval-Augmented Generation — pulling external documents into the context at runtime." },
];

function ArticleCard({ article, index }: { article: typeof articles[0]; index: number }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      className={`group relative border border-foreground/10 hover:border-foreground/30 bg-card/40 hover:bg-card transition-all duration-500 p-8 cursor-pointer hover-lift ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${(index % 4) * 80}ms` }}
    >
      <div className="flex items-center justify-between mb-6">
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
          {article.tag}
        </span>
        <span className="font-mono text-[10px] text-muted-foreground">{article.readTime}</span>
      </div>
      <h3 className="text-2xl font-display leading-tight mb-4 group-hover:translate-x-1 transition-transform duration-300">
        {article.title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-6">{article.excerpt}</p>
      <div className="flex items-center gap-2 text-sm font-medium">
        Read article
        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
      </div>
    </article>
  );
}

export function AiResearchSection() {
  const [headerVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setHeaderVisible(true),
      { threshold: 0.1 }
    );
    if (headerRef.current) obs.observe(headerRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="research" className="relative py-24 lg:py-32 border-t border-foreground/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="mb-16 lg:mb-24 max-w-3xl">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            Research & Education
          </span>
          <h2
            className={`text-4xl lg:text-6xl font-display tracking-tight transition-all duration-700 mb-6 ${
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Understanding artificial intelligence,
            <br />
            <span className="text-muted-foreground">one idea at a time.</span>
          </h2>
          <p
            className={`text-lg text-muted-foreground leading-relaxed transition-all duration-700 delay-150 ${
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Atlas is the research and education layer of Optimus. Plain-language essays on the
            history, mechanics, and consequences of AI — written for engineers, founders, and
            curious readers who want more than a headline.
          </p>
        </div>

        {/* Articles grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {articles.map((a, i) => (
            <ArticleCard key={a.title} article={a} index={i} />
          ))}
        </div>

        {/* Concept glossary */}
        <div className="border-t border-foreground/10 pt-16">
          <div className="grid lg:grid-cols-3 gap-12">
            <div>
              <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-4">
                <span className="w-8 h-px bg-foreground/30" />
                Glossary
              </span>
              <h3 className="text-3xl lg:text-4xl font-display leading-tight">
                Six terms you'll meet everywhere in AI.
              </h3>
            </div>
            <dl className="lg:col-span-2 grid sm:grid-cols-2 gap-x-10 gap-y-8">
              {concepts.map((c) => (
                <div key={c.term} className="border-l-2 border-foreground/20 pl-5">
                  <dt className="font-display text-lg mb-2">{c.term}</dt>
                  <dd className="text-sm text-muted-foreground leading-relaxed">{c.meaning}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
