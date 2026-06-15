import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Method from "@/components/sections/Method";
import WhyUs from "@/components/sections/WhyUs";
import Results from "@/components/sections/Results";
import CaseStudies from "@/components/sections/CaseStudies";
import ConsultationForm from "@/components/sections/ConsultationForm";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problem />
        <Method />
        <WhyUs />
        <Results />
        <CaseStudies />
        <ConsultationForm />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
