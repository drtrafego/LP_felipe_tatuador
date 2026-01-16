"use client"

import { motion } from "framer-motion"

export function SectionPhilosophy() {
    return (
        <section className="py-12 md:py-24 bg-white px-4 md:px-8 overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                {/* Left: Headline/Impact */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6"
                >
                    <h2 className="text-4xl md:text-6xl font-heading font-bold text-zinc-900 leading-tight">
                        A tatuagem de realismo é, no fundo, uma <span className="text-neutral-500">“ilusão óptica”</span> aplicada na pele.
                    </h2>
                </motion.div>

                {/* Right: Detailed Copy */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="space-y-6 text-lg md:text-xl text-neutral-600 font-light leading-relaxed"
                >
                    <p>
                        Em vez de depender de contornos fortes, ela depende de valores (escala de claro/escuro), transições suaves, texturas e controle de contraste para parecer tridimensional.
                    </p>
                    <p>
                        Por isso ela é uma das vertentes mais exigentes — tanto no fazer quanto no manter bonito ao longo dos anos.
                    </p>

                    <div className="border-l-4 border-red-600 pl-6 py-2 mt-8">
                        <p className="text-zinc-900 font-medium">
                            O erro não é querer realismo. O erro é escolher pelo “mais barato” ou pelo “mais perto”.
                        </p>
                    </div>

                    <p>
                        No realismo, o detalhe é tudo. E quando o detalhe falha… não vira “mais ou menos”. Vira frustração.
                    </p>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                        <li className="flex items-center gap-3 text-red-600">
                            <span className="text-lg font-bold">✕</span> “Não ficou parecido”
                        </li>
                        <li className="flex items-center gap-3 text-red-600">
                            <span className="text-lg font-bold">✕</span> “Virou mancha depois de cicatrizar”
                        </li>
                        <li className="flex items-center gap-3 text-red-600">
                            <span className="text-lg font-bold">✕</span> “O sombreado matou o desenho”
                        </li>
                        <li className="flex items-center gap-3 text-red-600">
                            <span className="text-lg font-bold">✕</span> “O rosto perdeu expressão”
                        </li>
                    </ul>
                </motion.div>

            </div>
        </section>
    )
}
