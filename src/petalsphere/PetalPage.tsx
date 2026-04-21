import { HeroSection } from "@/petalsphere/components/landing/hero-section";
import { IntroductionSection } from "@/petalsphere/components/landing/introduction-section";
import { ResearchContextSection } from "@/petalsphere/components/landing/research-context-section";
import { FeaturesSection } from "@/petalsphere/components/landing/features-section";
import { HowItWorksSection } from "@/petalsphere/components/landing/how-it-works-section";
import { ScienceSection } from "@/petalsphere/components/landing/science-section";
import { ObservationSection } from "@/petalsphere/components/landing/observation-section";
import { InfrastructureSection } from "@/petalsphere/components/landing/infrastructure-section";
import { MetricsSection } from "@/petalsphere/components/landing/metrics-section";
import { EcologicalSection } from "@/petalsphere/components/landing/ecological-section";
import { AIThinkingSection } from "@/petalsphere/components/landing/ai-thinking-section";
import { EthicalSection } from "@/petalsphere/components/landing/ethical-section";
import { DevelopersSection } from "@/petalsphere/components/landing/developers-section";
import { TestimonialsSection } from "@/petalsphere/components/landing/testimonials-section";
import { PricingSection } from "@/petalsphere/components/landing/pricing-section";
import { FutureSection } from "@/petalsphere/components/landing/future-section";
import { FooterSection } from "@/petalsphere/components/landing/footer-section";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <HeroSection />
      {/* Scientific Introduction */}
      <IntroductionSection />
      <ResearchContextSection />
      {/* Core Scientific Content */}
      <FeaturesSection />
      <HowItWorksSection />
      <ScienceSection />
      <ObservationSection />
      <InfrastructureSection />
      <MetricsSection />
      <EcologicalSection />
      <AIThinkingSection />
      <EthicalSection />
      <DevelopersSection />
      <TestimonialsSection />
      <PricingSection />
      {/* Future Implications */}
      <FutureSection />
      <FooterSection />
    </main>
  );
}
