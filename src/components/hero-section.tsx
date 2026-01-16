"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const images = [
    "/tatoohero1.jpg",
    "/tatoohero2.jpg",
    "/clientehero.png",
    "/tatoohero3.jpg",
    "/tatoohero4.jpg",
]

export function Hero() {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background py-8 md:py-0">

            {/* 1. Headline - Top */}
            <div className="z-20 text-center space-y-4 max-w-4xl px-4 order-1 mb-6 md:mb-10 relative">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 2.2 }}
                    className="text-2xl md:text-5xl font-heading font-extrabold tracking-tight text-white leading-tight"
                >
                    Não é “parecido”. É realismo: <span className="text-primary block md:inline">profundidade, textura e presença na pele.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 2.4 }}
                    className="text-sm md:text-xl text-muted-foreground font-light max-w-2xl mx-auto"
                >
                    Se você quer realismo, você precisa de um tatuador que trabalha com método: avaliação, encaixe, execução por camadas e orientação de cicatrização.
                </motion.p>
            </div>

            {/* 2. Image Reveal Animation 
          Cleaner "Rowan Black" style:
          - Softer rotation
          - Minimal overlap (using gap)
          - Bowtie effect maintained but cleaner
      */}
            <div className="relative z-10 w-full max-w-[90rem] px-2 flex items-center justify-center h-[300px] md:h-[550px] order-2 perspective-[2500px] gap-2 md:gap-4">
                {images.map((src, index) => {
                    const isCenter = index === 2
                    const distFromCenter = Math.abs(2 - index)

                    const delay = (2 - distFromCenter) * 0.4 + 0.5

                    // Height/Scale Logic
                    const scaleFactor = 1 + (distFromCenter * 0.20)

                    const offset = index - 2
                    const rotateY = offset * -15 // Softer 15deg

                    return (
                        <motion.div
                            key={index}
                            initial={{
                                opacity: 0,
                                y: 50,
                                scale: scaleFactor * 0.9,
                                rotateY: 0
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                scale: scaleFactor,
                                rotateY: rotateY,
                            }}
                            transition={{
                                duration: 1.0,
                                delay,
                                type: "spring", stiffness: 45, damping: 20
                            }}
                            className={`relative rounded-xl md:rounded-2xl overflow-hidden border border-white/10 shadow-2xl shrink-0
                        ${isCenter
                                    ? "z-30 w-20 md:w-64 aspect-[3/4] shadow-[0_0_40px_rgba(34,197,94,0.15)] brightness-110"
                                    : "z-20 w-20 md:w-64 aspect-[3/4] grayscale-[80%] brightness-75 hover:grayscale-0 transition-all duration-500"
                                }
                    `}
                            style={{
                                transformStyle: "preserve-3d",
                                // removed negative margins for cleaner look
                            }}
                        >
                            <img src={src} alt="Portfolio" className="object-cover w-full h-full" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-50 pointer-events-none" />
                        </motion.div>
                    )
                })}
            </div>

            {/* 3. CTA & Trust Seals - Bottom */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 2.8 }}
                className="order-3 mt-8 md:mt-12 z-30 flex flex-col items-center gap-6"
            >
                <Link href="#contato">
                    <Button size="lg" className="text-base md:text-lg px-8 md:px-12 py-6 md:py-8 rounded-full bg-green-600 hover:bg-green-500 text-white font-bold transition-all hover:scale-105 shadow-[0_0_30px_-5px_var(--green-500)] animate-pulse">
                        ✅ Quero Uma Tattoo Realista
                    </Button>
                </Link>

                {/* Seals */}
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs md:text-sm text-neutral-400 font-light max-w-lg text-center">
                    <span className="flex items-center gap-1.5">
                        <span className="text-yellow-500">⭐</span> Provas Sociais Reais
                    </span>
                    <span className="hidden md:inline text-neutral-700">|</span>
                    <span className="flex items-center gap-1.5">
                        <span className="text-neutral-300">🧾</span> Orçamento claro
                    </span>
                    <span className="hidden md:inline text-neutral-700">|</span>
                    <span className="flex items-center gap-1.5">
                        <span className="text-purple-400">🖼️</span> Arte personalizada
                    </span>
                </div>
            </motion.div>

        </section>
    )
}
