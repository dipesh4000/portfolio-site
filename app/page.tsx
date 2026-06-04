import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CodingStats } from "@/components/stats";
import { BentoGrid } from "@/components/bento-grid";
import {
  ProjectsSection,
  ExperienceSection,
  ContactSection,
} from "@/components/sections";

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen relative overflow-hidden" style={{ backgroundColor: "#0a0a0a" }}>
      <Navbar />
      <Hero />
      <BentoGrid />
      <CodingStats />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
