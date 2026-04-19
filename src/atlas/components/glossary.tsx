const terms = [
  {
    term: "Agent",
    def: "A program that decides which step to take next based on a goal, instead of executing a fixed script.",
  },
  {
    term: "Embedding",
    def: "A list of numbers that represents the meaning of a piece of text, image or sound in a shared space.",
  },
  {
    term: "Hallucination",
    def: "A confidently produced output that has no basis in the model's evidence — a side-effect of generation, not a flaw of intent.",
  },
  {
    term: "Inference",
    def: "The act of running a trained model to produce an answer, distinct from the training that created it.",
  },
  {
    term: "Context window",
    def: "The amount of recent text a model can hold in mind at once when forming a response.",
  },
  {
    term: "Tide cache",
    def: "A memory pattern in which information decays gently unless something new touches it again.",
  },
];

export function Glossary() {
  return (
    <section className="relative py-32 px-6 border-t border-border">
      <div className="max-w-[1400px] mx-auto grid md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <div className="font-mono text-[11px] tracking-[0.3em] text-muted-foreground mb-6">
            § GLOSSARY
          </div>
          <h2 className="font-display text-5xl md:text-6xl tracking-tighter leading-[0.9]">
            Words, <br />
            <span className="italic font-light text-muted-foreground">
              defined gently.
            </span>
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed max-w-sm">
            A short, plain-language vocabulary so the rest of Atlas reads
            without friction.
          </p>
        </div>
        <div className="md:col-span-8">
          <dl className="divide-y divide-border border-y border-border">
            {terms.map((t) => (
              <div key={t.term} className="grid md:grid-cols-3 gap-6 py-6">
                <dt className="font-display text-2xl tracking-tight">
                  {t.term}
                </dt>
                <dd className="md:col-span-2 text-muted-foreground leading-relaxed">
                  {t.def}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
