'use client'
import HeroSection from "./components/Hero";
import ServiceSection from "./components/Services";
import WhySection from "./components/WhyUs";
import CaseSection from "./components/CaseStudies";
import FeatureSection from "./components/FeatureSection";
import CTASec from "./components/CTA";
import { CTASection } from "./components/CTASection";
import { useRouter } from "next/navigation";
import UnravelingFlow from './components/UravelingFlow'
import ProblemFraming from "./components/ProblemFacing";
import HowWeHelpSection from "./components/HowWeHelpSection";


export default function Home() {

  const router = useRouter();

  return (
    <>
    <div className="min-h-screen">
        <HeroSection />
        <UnravelingFlow />
        <ProblemFraming />
        <HowWeHelpSection />
        <ServiceSection />
        <FeatureSection />
        <WhySection />
        <CaseSection />
        {/* CTA */}
        <section className="py-32 px-6 lg:px-20">
          <div className="max-w-[1200px] mx-auto">
            <CTASection
              title="Modernize With Confidence"
              description="Partner with an IT consulting team that understands secure software, technical staffing, compliance, and regulated operations."
              primaryButton={{
                text: 'Work With Us',
                onClick: () => router.push('/contact'),
              }}
              
            />
          </div>
        </section>
    </div>
    </>
  );
}
