import { useEffect, useState } from "react";
import { ScrollVideoHero } from "./scroll-video-hero";
import { ScrollVideoSection } from "./scroll-video-section";
import { StackingResearchCards } from "./stacking-research-cards";

/* ---------- Typography components ---------- */
function Lead({ children }: { children: React.ReactNode }) {
  return <p className="text-xl lg:text-2xl leading-relaxed text-white/80 mb-10">{children}</p>;
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-base lg:text-lg leading-[1.8] text-white/60 mb-6 max-w-[68ch]">{children}</p>;
}

function PullQuote({ children, by }: { children: string; by?: string }) {
  return (
    <blockquote className="my-16 lg:my-24 border-l border-white/20 pl-8">
      <p className="font-display text-2xl lg:text-4xl leading-tight tracking-tight text-white/90">"{children}"</p>
      {by && <footer className="mt-4 font-mono text-xs tracking-[0.2em] uppercase text-white/40">— {by}</footer>}
    </blockquote>
  );
}

function ChapterHead({ num, title, kicker }: { num: string; title: string; kicker: string }) {
  return (
    <header className="mt-24 lg:mt-40 mb-12 border-t border-white/10 pt-10">
      <div className="flex items-baseline gap-6 mb-6">
        <span className="font-mono text-xs tracking-[0.25em] uppercase text-white/40">Chapter {num}</span>
        <span className="h-px flex-1 bg-white/10" />
        <span className="font-mono text-xs tracking-[0.25em] uppercase text-white/40">{kicker}</span>
      </div>
      <h2 className="font-display text-4xl lg:text-6xl leading-[0.95] tracking-tight max-w-4xl">{title}</h2>
    </header>
  );
}

function MarginNote({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <aside className="my-10 grid lg:grid-cols-[160px_1fr] gap-6 lg:gap-10 max-w-[75ch]">
      <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/40 lg:text-right pt-1">{label}</div>
      <div className="border-l border-white/10 pl-6 text-sm text-white/50 leading-relaxed italic">{children}</div>
    </aside>
  );
}


/* ---------- Reading progress ---------- */
function ReadingProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      setP(Math.max(0, Math.min(100, (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[60] bg-transparent">
      <div className="h-full bg-white/80 transition-[width] duration-150" style={{ width: `${p}%` }} />
    </div>
  );
}

/* ==================== THE ARTICLE ==================== */
export function ArticleEssay() {
  return (
    <article className="relative" style={{ background: "hsl(0 0% 2%)" }}>
      <ReadingProgress />

      {/* Scroll-scrubbed video hero */}
      <ScrollVideoHero />

      {/* Masthead */}
      <header className="max-w-7xl mx-auto px-6 md:px-12 pt-32 lg:pt-40 pb-16">
        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">Optimus Atlas · Research</p>
        <h1 className="max-w-3xl text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tighter text-white leading-[0.95]"
          style={{ textShadow: "0 4px 30px rgba(0,0,0,0.3)" }}>
          The Quiet Machine:
          <br />
          <span className="text-white/60">On Intelligence</span>
        </h1>
        <p className="mt-8 max-w-xl text-base text-white/50 leading-relaxed">
          A long-form research essay on artificial intelligence — how machines learn, what attention really means,
          and the alignment problem that defines our era.
        </p>
        <div className="mt-10 flex items-center gap-3">
          <div className="h-px w-8 bg-white/20" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">28 min read · Spring 2026</span>
        </div>
      </header>

      {/* Scroll-scrub video — Fig. 02 */}
      <ScrollVideoSection
        src="/atlas/videos/optimized/parallax-1-scrub.mp4"
        figure="Fig. 02"
        scrollHeight={350}
        overlays={[
          { from: 0.0, to: 0.3, position: "bl", text: "Gradients descending.", sub: "A model in motion toward an unseen minimum." },
          { from: 0.4, to: 0.7, position: "br", text: "Loss is the distance between prediction and truth.", sub: "Each step narrows the gap." },
          { from: 0.75, to: 0.98, position: "bl", text: "Convergence is not guaranteed.", sub: "But patience is rewarded." },
        ]}
      />

      {/* Chapter I */}
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <ChapterHead num="I" kicker="Foundations" title="What we mean when we say a machine learns." />
        <Lead>
          Learning, in the technical sense, is the gradual reshaping of a function until it agrees with the world. There is no understanding
          inside the model — only a long argument between predictions and evidence, settled one small adjustment at a time.
        </Lead>
        <P>
          The earliest neural networks were not built to think. They were built to recognise: a digit, a phoneme, the edge of a leaf against
          the sky. Each neuron held a number; each connection held a weight; and the weights, nudged by errors, slowly arranged themselves
          into something that could distinguish a seven from a nine.
        </P>
        <P>
          What changed was not the idea but the scale. When you give a sufficiently flexible architecture enough examples and enough compute,
          the patience compounds. The network stops merely recognising and begins to generalise. It develops internal representations —
          coordinates for things it has never been told to name.
        </P>
        <MarginNote label="Definition">
          A <em>representation</em> is the model's private vocabulary: the way it encodes the world before producing an answer. Most of what
          a model "knows" lives here, in geometry no human ever wrote down.
        </MarginNote>
        <PullQuote by="Frank Rosenblatt, 1958">
          The perceptron may eventually be able to learn, make decisions, and translate languages.
        </PullQuote>
      </div>

      {/* Scroll-scrub video — Fig. 03 */}
      <ScrollVideoSection
        src="/atlas/videos/optimized/parallax-2-scrub.mp4"
        figure="Fig. 03"
        scrollHeight={350}
        overlays={[
          { from: 0.0, to: 0.3, position: "br", text: "Attention is all you need.", sub: "Vaswani et al., 2017" },
          { from: 0.35, to: 0.65, position: "bl", text: "Every token speaks to every other.", sub: "Self-attention maps meaning across distance." },
          { from: 0.7, to: 0.98, position: "tr", text: "Context is not a window. It is a web.", sub: "The transformer rewired sequence modelling." },
        ]}
      />

      {/* Chapter II */}
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <ChapterHead num="II" kicker="Attention" title="The architecture that taught machines to read." />
        <P>
          Before 2017, sequence models read like impatient students — left to right, forgetting the beginning by the time they reached the end.
          Attention changed the geometry of reading. Instead of marching through a sentence, the model could glance at every word simultaneously
          and decide which ones mattered to which.
        </P>
        <P>
          The transformer is a parliament of these glances. Each token proposes; each token votes; the result is a richer representation than
          any single pass could yield. Stack enough of these layers and the model begins to behave as though it understands syntax, then
          semantics, then — disconcertingly — intent.
        </P>
        <MarginNote label="Note">
          "Attention" here is a metaphor borrowed from cognitive science. The mechanism is mathematical: a weighted sum. The behaviour,
          however, rhymes with how humans focus.
        </MarginNote>
        <PullQuote>
          Attention is not understanding. But understanding can be approximated by enough attention.
        </PullQuote>
      </div>

      {/* Chapter III */}
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <ChapterHead num="III" kicker="Alignment" title="Getting the machine to want what we want." />
        <P>
          A model that can predict the next word is not yet a model that should be trusted to answer a question. Capability and intent
          are different axes. The field calls the gap between them alignment — which sounds gentle, as if we were straightening a picture
          frame. The reality is closer to negotiation with a stranger who has read every book and met no one.
        </P>
        <P>
          We align models in layers. We curate the data they see. We fine-tune them on examples of helpful behaviour. We train reward models
          on human preferences. None of these steps is sufficient. Together they produce something serviceable — a system that mostly refuses
          what it should and mostly offers what it should.
        </P>
        <MarginNote label="Open problem">
          Specification gaming: when a model satisfies the literal objective while violating its spirit. The fault is rarely the model's.
          It is ours, for writing objectives we did not mean.
        </MarginNote>
      </div>

      {/* Chapter IV */}
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <ChapterHead num="IV" kicker="Emergence" title="On capabilities that arrive uninvited." />
        <P>
          Somewhere between ten billion and a hundred billion parameters, behaviours begin to appear that were not present in smaller models.
          Arithmetic. Translation. Multi-step reasoning. None of these were trained for explicitly. They emerged from the same objective —
          predict the next token — applied at sufficient scale.
        </P>
        <P>
          Emergence is the most intellectually unsettling property of modern systems, because it implies that we do not entirely know what
          we are building until we have built it. The training run is a kind of experiment whose outcome cannot be derived from first principles.
        </P>
        <PullQuote by="Field notes, Optimus Research">
          A capability that appears without being requested is also a capability that may disappear without being noticed.
        </PullQuote>
      </div>

      {/* Chapter V */}
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <ChapterHead num="V" kicker="Stewardship" title="What is left for us to do." />
        <P>
          If the machines are quiet, our work is to be deliberate. To choose which problems are worth this much energy. To insist on systems
          we can audit. To remember that a model's confidence is a property of its training, not of the world.
        </P>
        <P>
          Atlas exists because the most important conversations about artificial intelligence are not the loudest ones. They are the slow
          ones — held in essays, in lab notes, in classrooms, in the margins of papers.
        </P>
      </div>

      {/* Stacking research cards */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <div className="mb-16">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">Key Concepts</p>
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-5xl">
            The building blocks of modern AI.
          </h2>
        </div>
        <StackingResearchCards />
      </section>

      {/* End mark */}
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="mt-16 mb-32 flex items-center gap-6">
          <span className="w-2 h-2 bg-white" />
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40">End of essay</span>
          <span className="h-px flex-1 bg-white/10" />
        </div>

        {/* Further reading */}
        <section className="border-t border-white/10 pt-16 pb-32">
          <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40 mb-10">Further reading from Atlas</div>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { k: "Essay", t: "On the geometry of meaning.", d: "How embeddings turn language into landscape." },
              { k: "Field note", t: "Reading the loss curve.", d: "What a training run tells you, and what it hides." },
              { k: "Lecture", t: "Alignment, in plain language.", d: "A primer for readers without a maths degree." },
            ].map((a) => (
              <a key={a.t} href="#" className="group block border-t border-white/20 pt-5">
                <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/40 mb-3">{a.k}</div>
                <h3 className="font-display text-xl lg:text-2xl leading-tight mb-3 text-white group-hover:text-white/70 transition-colors">{a.t}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{a.d}</p>
              </a>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
