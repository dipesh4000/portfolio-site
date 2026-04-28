import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CodingStatsSection } from "@/components/stats";
import {
  AboutSection,
  ProjectsSection,
  ExperienceSection,
  ContactSection,
} from "@/components/sections";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0c0a1d 0%, #1a0a2e 50%, #0d1117 100%)" }}>
      <Navbar />
      <Hero />
      <AboutSection />
      <CodingStatsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
