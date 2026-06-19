import { BloodFlares } from "@/components/landing/BloodFlares";
import { CtaSection } from "@/components/landing/CtaSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { Marquee } from "@/components/landing/Marquee";
import { OgSection } from "@/components/landing/OgSection";
import { VerifySection } from "@/components/landing/VerifySection";
import { WhyZegonSection } from "@/components/landing/WhyZegonSection";

export function App() {
  return (
    <div className="relative min-h-screen">
      <BloodFlares />
      <div className="pointer-events-none fixed inset-0 noise opacity-40" />
      <Header />
      <main className="relative z-10">
        <Hero />
        <Marquee />
        <HowItWorksSection />
        <WhyZegonSection />
        <OgSection />
        <VerifySection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
