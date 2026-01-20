import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Felipe Tatuador - Especialista em Realismo | São José dos Campos",
  description: "Tatuador especialista em Realismo e Blackwork em São José dos Campos. Arte exclusiva, técnica refinada e cicatrização guiada. Agende seu projeto.",
  keywords: ["tatuagem realista", "tattoo realismo", "tatuagem são josé dos campos", "sjc tattoo", "felipe matias", "realismo preto e cinza", "tatuagens masculinas", "cobertura tatuagem sjc"],
  authors: [{ name: "Felipe Matias" }],
  creator: "Felipe Matias",
  publisher: "Felipe Matias",
  robots: "index, follow",
  metadataBase: new URL("https://www.felptattoo.com"),
  alternates: {
    canonical: "/",
  },
  other: {
    "geo.region": "BR-SP",
    "geo.placename": "São José dos Campos",
    "geo.position": "-23.2237;-45.9009",
    "ICBM": "-23.2237, -45.9009"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${inter.variable} ${outfit.variable} antialiased bg-background text-foreground selection:bg-primary selection:text-primary-foreground`}>
        {children}
      </body>
    </html>
  );
}
