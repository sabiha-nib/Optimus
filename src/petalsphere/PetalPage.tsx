import { Navigation } from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { IntroductionSection } from "@/components/landing/introduction-section";
import { ResearchContextSection } from "@/components/landing/research-context-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { ScienceSection } from "@/components/landing/science-section";
import { ObservationSection } from "@/components/landing/observation-section";
import { InfrastructureSection } from "@/components/landing/infrastructure-section";
import { MetricsSection } from "@/components/landing/metrics-section";
import { EcologicalSection } from "@/components/landing/ecological-section";
import { AIThinkingSection } from "@/components/landing/ai-thinking-section";
import { EthicalSection } from "@/components/landing/ethical-section";
import { DevelopersSection } from "@/components/landing/developers-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { FutureSection } from "@/components/landing/future-section";
import { FooterSection } from "@/components/landing/footer-section";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navigation />
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
