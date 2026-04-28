import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  AboutSection,
  ProjectsSection,
  ExperienceSection,
  ContactSection,
} from "@/components/sections";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <AboutSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
