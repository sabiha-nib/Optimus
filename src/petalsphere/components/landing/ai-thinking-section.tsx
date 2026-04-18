import { useEffect, useRef, useState } from "react";

const steps = [
  { label: "Input", description: "Raw data enters the model" },
  { label: "Encode", description: "Inputs are turned into vectors" },
  { label: "Reason", description: "Layers transform representations" },
  { label: "Predict", description: "The model produces an output" },
  { label: "Learn", description: "Errors update the parameters" },
];

export function AIThinkingSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="relative py-32 lg:py-40 overflow-hidden bg-foreground text-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-20">
          <span
            className={`inline-flex items-center gap-4 text-sm font-mono text-background/40 mb-8 justify-center transition-all duration-700 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="w-12 h-px bg-background/20" />
            Inside the Model
            <span className="w-12 h-px bg-background/20" />
          </span>

          <h2
            className={`text-5xl md:text-6xl lg:text-7xl font-display tracking-tight leading-[0.95] transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            How a neural
            <br />
            <span className="text-background/40">network thinks.</span>
          </h2>
        </div>

        {/* Flow visualization */}
        <div className="relative">
          {/* Connection line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-background/10 -translate-y-1/2 hidden lg:block" />

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-4">
            {steps.map((step, index) => (
              <div
                key={step.label}
                className={`relative flex flex-col items-center text-center transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Node */}
                <div
                  className={`relative z-10 w-16 h-16 rounded-full border-2 flex items-center justify-center mb-6 transition-all duration-500 ${
                    activeStep === index
                      ? "border-[#eca8d6] bg-[#eca8d6]/20 scale-110"
                      : "border-background/20 bg-background/5"
                  }`}
                >
                  <span
                    className={`text-xl font-display transition-colors ${
                      activeStep === index ? "text-[#eca8d6]" : "text-background/40"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Pulse effect */}
                  {activeStep === index && (
                    <div className="absolute inset-0 rounded-full border-2 border-[#eca8d6] animate-ping opacity-30" />
                  )}
                </div>

                {/* Label */}
                <h3
                  className={`text-lg font-display mb-2 transition-colors ${
                    activeStep === index ? "text-background" : "text-background/60"
                  }`}
                >
                  {step.label}
                </h3>

                {/* Description */}
                <p className="text-sm text-background/40 max-w-[180px]">{step.description}</p>

                {/* Arrow (desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 -right-2 text-background/20">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 3l7 7-7 7V3z" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-16 flex justify-center gap-2">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              className={`w-12 h-1 transition-all duration-300 ${
                index === activeStep ? "bg-[#eca8d6]" : "bg-background/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
