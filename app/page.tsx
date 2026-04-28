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
    <main className="min-h-screen relative overflow-hidden" style={{ backgroundColor: "#0a0a0a" }}>
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
