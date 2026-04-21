import { useEffect, useRef, useState } from "react";

const CARDS = [
  {
    label: "FOUNDATIONS",
    title: "Neural networks & learning",
    desc: "How layers of interconnected nodes learn patterns from data through iterative adjustment of millions of weights — the building blocks of every modern AI system.",
    stats: [{ v: "175B+", l: "parameters" }, { v: "10⁻⁴", l: "learning rate" }],
  },
  {
    label: "ATTENTION",
    title: "Transformers & self-attention",
    desc: "The architecture that taught machines to read by allowing every token to attend to every other token simultaneously — enabling context, meaning, and emergent reasoning.",
    stats: [{ v: "2017", l: "origin year" }, { v: "96", l: "attention heads" }],
  },
  {
    label: "ALIGNMENT",
    title: "Safety & human values",
    desc: "The discipline of ensuring AI systems behave as intended. From RLHF to constitutional AI, alignment is the hardest unsolved problem in the field.",
    stats: [{ v: "3x", l: "helpfulness gain" }, { v: "∞", l: "ongoing work" }],
  },
  {
    label: "EMERGENCE",
    title: "Capabilities that arrive uninvited",
    desc: "At sufficient scale, models develop abilities they were never explicitly trained for — arithmetic, translation, multi-step reasoning — all from predicting the next token.",
    stats: [{ v: "10B+", l: "param threshold" }, { v: "137", l: "emergent skills" }],
  },
];

const STICKY_TOP = 80;
const STICKY_STEP = 16;
const SCALE_STEP = 0.04;
const OFFSET_STEP = 8;

export function StackingResearchCards() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [depth, setDepth] = useState<number[]>(CARDS.map(() => 0));

  useEffect(() => {
    function onScroll() {
      const nextDepth = CARDS.map((_, i) => {
        let count = 0;
        for (let j = i + 1; j < CARDS.length; j++) {
          const el = cardRefs.current[j];
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          const stickyTopJ = STICKY_TOP + j * STICKY_STEP;
          if (rect.top <= stickyTopJ + 2) count++;
        }
        return count;
      });
      setDepth(nextDepth);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="flex flex-col" style={{ perspective: "1400px", perspectiveOrigin: "50% 0%" }}>
      {CARDS.map((card, i) => {
        const d = depth[i];
        const scale = 1 - d * SCALE_STEP;
        const translateY = d * OFFSET_STEP;
        return (
          <div
            key={card.label}
            ref={el => { cardRefs.current[i] = el; }}
            className="sticky mb-4"
            style={{ top: `${STICKY_TOP + i * STICKY_STEP}px`, zIndex: 10 + i }}
          >
            <div
              style={{
                transform: `scale(${scale}) translateY(${translateY}px)`,
                transformOrigin: "top center",
                transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)",
                willChange: "transform",
              }}
            >
              <div className="group relative rounded-2xl border border-white/[0.07] overflow-hidden bg-white/[0.03] backdrop-blur-sm hover:border-white/[0.12] transition-colors">
                <div className="p-8 md:p-10">
                  <div className="flex items-start justify-between mb-6">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] tracking-[0.3em] font-mono text-white/40 bg-white/[0.05]">
                      {card.label}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-3 tracking-tight">{card.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed mb-8 max-w-xl">{card.desc}</p>
                  <div className="flex gap-8 pt-6 border-t border-white/[0.06]">
                    {card.stats.map(s => (
                      <div key={s.l}>
                        <div className="text-2xl font-semibold text-white">{s.v}</div>
                        <div className="text-[10px] text-white/30 tracking-widest uppercase mt-0.5">{s.l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
