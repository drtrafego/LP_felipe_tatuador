import { Hero } from "@/components/hero-section";
import { SectionPhilosophy } from "@/components/section-philosophy";
import { SectionGallery } from "@/components/section-gallery";
import { SectionProcess } from "@/components/section-process";
import { SectionTechnical } from "@/components/section-technical";
import { SectionTestimonials } from "@/components/section-testimonials";
import { SectionContact } from "@/components/section-contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Hero />
      <SectionPhilosophy />
      <SectionGallery />
      <SectionProcess />
      <SectionTechnical />
      <SectionTestimonials />
      <SectionContact />
    </main>
  );
}
