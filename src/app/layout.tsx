import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Felipe Tatuador - Arte na Pele",
  description: "Especialista em Realismo e Blackwork. Agende sua sessão.",
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
