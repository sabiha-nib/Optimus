const courses = [
  {
    code: "ATL · 101",
    title: "How models learn",
    lessons: 6,
    hours: "1h 40m",
    level: "Beginner",
    desc: "From a single neuron to gradient descent, told without the math intimidation.",
  },
  {
    code: "ATL · 201",
    title: "Anatomy of an agent",
    lessons: 8,
    hours: "2h 15m",
    level: "Intermediate",
    desc: "Planners, tools, memory, reflection — what each part does and how they fail.",
  },
  {
    code: "ATL · 220",
    title: "Prompting as design",
    lessons: 5,
    hours: "1h 10m",
    level: "Intermediate",
    desc: "Prompts as interfaces: how wording, structure and examples reshape behaviour.",
  },
  {
    code: "ATL · 305",
    title: "Evaluating intelligence",
    lessons: 7,
    hours: "2h 00m",
    level: "Advanced",
    desc: "Benchmarks, red-teaming and the limits of any single number describing a model.",
  },
  {
    code: "ATL · 410",
    title: "Ethical infrastructure",
    lessons: 6,
    hours: "1h 50m",
    level: "Advanced",
    desc: "Governance, audits, consent and what 'responsible deployment' actually requires.",
  },
  {
    code: "ATL · 480",
    title: "Building with calm",
    lessons: 5,
    hours: "1h 25m",
    level: "Practitioner",
    desc: "Patterns for human-AI interfaces that respect attention, energy and time.",
  },
];

export function Curriculum() {
  return (
    <section className="relative py-32 px-6 border-t border-border">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-baseline justify-between mb-12 font-mono text-[11px] tracking-[0.3em] text-muted-foreground">
          <span>§ EDUCATIONAL TRACKS</span>
          <span>{courses.length} COURSES · SELF-PACED</span>
        </div>

        <h2 className="font-display text-5xl md:text-7xl tracking-tighter leading-[0.9] mb-16 max-w-4xl">
          A small <span className="word-aurora">curriculum</span> <br />
          <span className="italic font-light text-muted-foreground">
            for everyone next to a model.
          </span>
        </h2>

        <div className="grid md:grid-cols-2 gap-px bg-border">
          {courses.map((c) => (
            <article
              key={c.code}
              className="bg-background p-8 md:p-10 hover-lift border border-transparent"
            >
              <div className="flex items-baseline justify-between mb-6 font-mono text-[10px] tracking-[0.3em] text-muted-foreground">
                <span>{c.code}</span>
                <span className="text-accent">{c.level.toUpperCase()}</span>
              </div>
              <h3 className="font-display text-3xl md:text-4xl tracking-tight mb-4">
                {c.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-8 max-w-md">
                {c.desc}
              </p>
              <div className="flex items-center justify-between font-mono text-[11px] tracking-widest border-t border-border pt-4">
                <span className="text-muted-foreground">
                  {c.lessons} LESSONS · {c.hours}
                </span>
                <span className="text-foreground hover:text-accent transition-colors cursor-pointer">
                  ENROL →
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
