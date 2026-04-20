import { useEffect, useRef, useState } from "react";

const video1 = "/atlas/videos/parallax-1.mp4";
const video2 = "/atlas/videos/parallax-2.mp4";
const video3 = "/atlas/videos/parallax-3.mp4";

/* ---------- Parallax video block ---------- */
function ParallaxVideo({
  src,
  caption,
  figure,
  align = "full",
}: {
  src: string;
  caption: string;
  figure: string;
  align?: "full" | "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.play().catch(() => {});
    }
    const onScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      // gentle parallax - clamp
      const next = Math.max(-120, Math.min(120, -center * 0.18));
      setOffset(next);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const widthClass =
    align === "full"
      ? "w-full"
      : align === "left"
      ? "lg:w-[70%] lg:mr-auto"
      : "lg:w-[70%] lg:ml-auto";

  return (
    <figure ref={ref} className={`my-20 lg:my-32 ${widthClass}`}>
      <div className="relative overflow-hidden rounded-sm bg-foreground/5 aspect-[16/10] lg:aspect-[16/9]">
        <video
          ref={videoRef}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-[120%] object-cover will-change-transform"
          style={{ transform: `translate3d(0, ${offset}px, 0)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent pointer-events-none" />
      </div>
      <figcaption className="mt-4 flex items-baseline gap-4 text-sm text-muted-foreground">
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-foreground/60">
          {figure}
        </span>
        <span className="italic font-display">{caption}</span>
      </figcaption>
    </figure>
  );
}

/* ---------- Drop cap paragraph ---------- */
function Lead({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-display text-2xl lg:text-3xl leading-snug text-foreground/90 mb-12 first-letter:font-display first-letter:text-7xl lg:first-letter:text-8xl first-letter:font-semibold first-letter:float-left first-letter:mr-3 first-letter:mt-2 first-letter:leading-[0.85]">
      {children}
    </p>
  );
}

/* ---------- Pull quote ---------- */
function PullQuote({ children, by }: { children: string; by?: string }) {
  return (
    <blockquote className="my-16 lg:my-24 border-l-2 border-foreground pl-6 lg:pl-10">
      <p className="font-display text-3xl lg:text-5xl leading-tight tracking-tight">
        "{children}"
      </p>
      {by && (
        <footer className="mt-4 font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">
          — {by}
        </footer>
      )}
    </blockquote>
  );
}

/* ---------- Section header ---------- */
function ChapterHead({
  num,
  title,
  kicker,
}: {
  num: string;
  title: string;
  kicker: string;
}) {
  return (
    <header className="mt-24 lg:mt-40 mb-12 border-t border-foreground/15 pt-10">
      <div className="flex items-baseline gap-6 mb-6">
        <span className="font-mono text-xs tracking-[0.25em] uppercase text-foreground/50">
          Chapter {num}
        </span>
        <span className="h-px flex-1 bg-foreground/15" />
        <span className="font-mono text-xs tracking-[0.25em] uppercase text-foreground/50">
          {kicker}
        </span>
      </div>
      <h2 className="font-display text-5xl lg:text-7xl leading-[0.95] tracking-tight max-w-4xl">
        {title}
      </h2>
    </header>
  );
}

/* ---------- Body paragraph ---------- */
function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-lg lg:text-xl leading-[1.7] text-foreground/85 mb-7 max-w-[68ch]">
      {children}
    </p>
  );
}

/* ---------- Margin note (sidebar) ---------- */
function MarginNote({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <aside className="my-12 grid lg:grid-cols-[180px_1fr] gap-6 lg:gap-12 max-w-[80ch]">
      <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-foreground/50 lg:text-right pt-1">
        {label}
      </div>
      <div className="border-l border-foreground/15 pl-6 text-base text-foreground/70 leading-relaxed italic">
        {children}
      </div>
    </aside>
  );
}

/* ---------- Reading progress ---------- */
function ReadingProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      setP(Math.max(0, Math.min(100, pct)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[60] bg-transparent">
      <div
        className="h-full bg-foreground transition-[width] duration-150"
        style={{ width: `${p}%` }}
      />
    </div>
  );
}

/* ---------- The article ---------- */
export function ArticleEssay() {
  return (
    <article className="relative">
      <ReadingProgress />

      {/* Masthead */}
      <header className="max-w-[1200px] mx-auto px-6 lg:px-12 pt-40 lg:pt-52 pb-16">
        <div className="flex items-center gap-4 mb-12 font-mono text-[10px] tracking-[0.3em] uppercase text-foreground/50">
          <span>Optimus / Atlas</span>
          <span className="h-px flex-1 bg-foreground/15" />
          <span>Issue Nº 04</span>
          <span className="h-px w-8 bg-foreground/15" />
          <span>Spring 2026</span>
        </div>

        <p className="font-mono text-xs tracking-[0.25em] uppercase text-foreground/60 mb-8">
          A research essay · 28 min read
        </p>

        <h1 className="font-display text-[clamp(3rem,9vw,8rem)] leading-[0.92] tracking-tight max-w-6xl">
          The quiet machine:
          <br />
          <span className="italic text-foreground/70">on learning,</span>{" "}
          attention, and the
          <br />
          shape of intelligence.
        </h1>

        <div className="mt-16 grid lg:grid-cols-[1fr_2fr] gap-10 lg:gap-20 items-end max-w-5xl">
          <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-foreground/60 leading-loose">
            <div>Words — The Atlas Desk</div>
            <div>Field notes — Optimus Research</div>
            <div>Photography — Generative</div>
          </div>
          <p className="text-xl lg:text-2xl leading-relaxed text-foreground/80 font-display">
            Artificial intelligence is no longer a frontier we approach. It is the
            weather we live inside. This essay is a slow walk through what the
            machines have learned, what they cannot, and what we are still
            responsible for.
          </p>
        </div>
      </header>

      {/* Opening figure — full bleed */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <ParallaxVideo
          src={video1}
          figure="Fig. 01"
          caption="A model in motion — gradients descending toward an unseen minimum."
        />
      </div>

      {/* Chapter I */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <ChapterHead num="I" kicker="Foundations" title="What we mean when we say a machine learns." />

        <Lead>
          Learning, in the technical sense, is the gradual reshaping of a
          function until it agrees with the world. There is no understanding
          inside the model — only a long argument between predictions and
          evidence, settled one small adjustment at a time.
        </Lead>

        <P>
          The earliest neural networks were not built to think. They were built
          to recognise: a digit, a phoneme, the edge of a leaf against the sky.
          Each neuron held a number; each connection held a weight; and the
          weights, nudged by errors, slowly arranged themselves into something
          that could distinguish a seven from a nine. This was not intelligence.
          It was statistics with patience.
        </P>

        <P>
          What changed in the last decade was not the idea but the scale. When
          you give a sufficiently flexible architecture enough examples and
          enough compute, the patience compounds. The network stops merely
          recognising and begins to generalise. It develops, in the literal
          sense, internal representations — coordinates for things it has never
          been told to name.
        </P>

        <MarginNote label="Definition">
          A <em>representation</em> is the model's private vocabulary: the way
          it encodes the world before producing an answer. Most of what a model
          "knows" lives here, in geometry no human ever wrote down.
        </MarginNote>

        <P>
          To call this intelligence is a stretch, but to call it nothing is
          dishonest. The model has learned a map. The map is not the territory,
          but it is detailed enough to navigate.
        </P>

        <PullQuote by="Frank Rosenblatt, 1958">
          The perceptron may eventually be able to learn, make decisions, and
          translate languages.
        </PullQuote>
      </div>

      {/* Mid figure — offset right */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <ParallaxVideo
          src={video2}
          figure="Fig. 02"
          caption="Attention, visualised — every token weighted against every other."
          align="right"
        />
      </div>

      {/* Chapter II */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <ChapterHead num="II" kicker="Attention" title="The architecture that taught machines to read." />

        <P>
          Before 2017, sequence models read like impatient students — left to
          right, forgetting the beginning by the time they reached the end.
          Attention changed the geometry of reading. Instead of marching
          through a sentence, the model could glance at every word
          simultaneously and decide which ones mattered to which.
        </P>

        <P>
          The transformer is, in essence, a parliament of these glances. Each
          token proposes; each token votes; the result is a richer
          representation than any single pass could yield. Stack enough of
          these layers and the model begins to behave as though it understands
          syntax, then semantics, then — disconcertingly — intent.
        </P>

        <MarginNote label="Note">
          "Attention" here is a metaphor borrowed from cognitive science. The
          mechanism is mathematical: a weighted sum. The behaviour, however,
          rhymes with how humans focus.
        </MarginNote>

        <P>
          What makes the architecture remarkable is not its cleverness but its
          uniformity. The same block — attention, normalisation, a small
          feed-forward network — repeats hundreds of times. Intelligence, in
          this paradigm, is not an algorithm. It is a depth.
        </P>

        <PullQuote>
          Attention is not understanding. But understanding, it turns out, can
          be approximated by enough attention.
        </PullQuote>

        <ChapterHead num="III" kicker="Alignment" title="The harder problem: getting the machine to want what we want." />

        <P>
          A model that can predict the next word is not yet a model that should
          be trusted to answer a question. Capability and intent are different
          axes. The field calls the gap between them <em>alignment</em>, which
          sounds gentle, as if we were straightening a picture frame. The
          reality is closer to negotiation with a stranger who has read every
          book and met no one.
        </P>

        <P>
          We align models in layers. We curate the data they see. We fine-tune
          them on examples of helpful behaviour. We train reward models on
          human preferences and use those rewards to shape the policy. None of
          these steps is sufficient. Together they produce something
          serviceable — a system that mostly refuses what it should and mostly
          offers what it should — without ever resolving the underlying
          question of <em>why</em>.
        </P>

        <MarginNote label="Open problem">
          Specification gaming: when a model satisfies the literal objective
          while violating its spirit. The fault is rarely the model's. It is
          ours, for writing objectives we did not mean.
        </MarginNote>

        <P>
          The honest position is that alignment is not a technical milestone we
          will pass. It is a discipline we will practise, the way pilots
          practise checklists, indefinitely.
        </P>
      </div>

      {/* Closing figure — offset left */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <ParallaxVideo
          src={video3}
          figure="Fig. 03"
          caption="Emergent behaviour — capabilities appearing without being asked for."
          align="left"
        />
      </div>

      {/* Chapter IV */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <ChapterHead num="IV" kicker="Emergence" title="On capabilities that arrive uninvited." />

        <P>
          Somewhere between ten billion and a hundred billion parameters,
          behaviours begin to appear that were not present in smaller models.
          Arithmetic. Translation. Multi-step reasoning. None of these were
          trained for explicitly. They emerged from the same objective —
          predict the next token — applied at sufficient scale to sufficient
          text.
        </P>

        <P>
          Emergence is the most intellectually unsettling property of modern
          systems, because it implies that we do not entirely know what we are
          building until we have built it. The training run is a kind of
          experiment whose outcome cannot be derived from first principles. We
          launch, we measure, we are surprised.
        </P>

        <PullQuote by="Field notes, Optimus Research">
          A capability that appears without being requested is also a
          capability that may disappear without being noticed.
        </PullQuote>

        <ChapterHead num="V" kicker="Stewardship" title="What is left for us to do." />

        <P>
          If the machines are quiet, our work is to be deliberate. To choose
          which problems are worth this much energy. To insist on systems we
          can audit. To remember that a model's confidence is a property of its
          training, not of the world.
        </P>

        <P>
          Atlas exists because we believe the most important conversations
          about artificial intelligence are not the loudest ones. They are the
          slow ones — held in essays, in lab notes, in classrooms, in the
          margins of papers. This page is one room in that conversation.
        </P>

        <P>
          Read on. Disagree freely. Return often.
        </P>

        {/* End mark */}
        <div className="mt-24 mb-32 flex items-center gap-6">
          <span className="w-2 h-2 bg-foreground" />
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-foreground/60">
            End of essay
          </span>
          <span className="h-px flex-1 bg-foreground/15" />
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-foreground/60">
            Filed under: Foundations · Attention · Alignment · Emergence
          </span>
        </div>

        {/* Further reading */}
        <section className="border-t border-foreground/15 pt-16 pb-32">
          <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-foreground/50 mb-10">
            Further reading from Atlas
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                k: "Essay",
                t: "On the geometry of meaning.",
                d: "How embeddings turn language into landscape.",
              },
              {
                k: "Field note",
                t: "Reading the loss curve.",
                d: "What a training run tells you, and what it hides.",
              },
              {
                k: "Lecture",
                t: "Alignment, in plain language.",
                d: "A primer for readers without a maths degree.",
              },
            ].map((a) => (
              <a key={a.t} href="#" className="group block border-t border-foreground/30 pt-5">
                <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-foreground/50 mb-3">
                  {a.k}
                </div>
                <h3 className="font-display text-2xl lg:text-3xl leading-tight mb-3 group-hover:italic transition-all">
                  {a.t}
                </h3>
                <p className="text-sm text-foreground/70 leading-relaxed">{a.d}</p>
              </a>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
