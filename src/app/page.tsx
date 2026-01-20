import { Hero } from "@/components/hero-section";
import { SectionPhilosophy } from "@/components/section-philosophy";
import { SectionGallery } from "@/components/section-gallery";
import { SectionProcess } from "@/components/section-process";
import { SectionTechnical } from "@/components/section-technical";
import { SectionTestimonials } from "@/components/section-testimonials";
import { SectionContact } from "@/components/section-contact";


export const metadata = {
  title: "Felipe Matias - Tatuagem Realista em São José dos Campos",
  description: "Estúdio de Tatuagem em SJC especializado em Realismo. Projetos exclusivos, ambiente privado e atendimento personalizado. Solicite um orçamento.",
  alternates: {
    canonical: "https://felipematias.com.br", // Replace with actual domain if known, implies canonical
  }
}

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TattooParlor",
    "name": "Felipe Matias Tattoo",
    "image": "https://felipematias.com.br/IMG_2317.jpg", // Using one of the hero images
    "description": "Especialista em Tatuagem Realista e Blackwork em São José dos Campos.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Avenida Andrômeda número 1280, 1º andar, sala 3",
      "addressLocality": "São José dos Campos",
      "addressRegion": "SP",
      "postalCode": "12230-000",
      "addressCountry": "BR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -23.2237,
      "longitude": -45.9009
    },
    "url": "https://felipematias.com.br",
    "telephone": "+5512982881280",
    "priceRange": "$$$",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "10:00",
        "closes": "20:00"
      }
    ]
  }

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
