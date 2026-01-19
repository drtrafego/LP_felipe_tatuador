"use client"

import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const techSteps = [
    { title: "Referência excelente", desc: "Boa luz, boa resolução, foco claro." },
    { title: "Edição para tatuagem", desc: "Aumentar contraste local, reduzir “ruído” (pele porosa demais), separar planos." },
    { title: "Mapa de valores", desc: "Pensar em entre 5 e 7 níveis de cinza (do quase preto ao quase pele)." },
    { title: "Decidir o “ponto de foco”", desc: "Onde vai ter mais detalhe e nitidez." },
    { title: "Definir tamanho mínimo e local", desc: "Áreas de muita fricção e sol tendem a perder nitidez mais rápido." },
]

export function SectionTechnical() {
    return (
        <section className="py-8 md:py-16 bg-zinc-50 px-4 border-y border-zinc-200">
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Left: Content */}
                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-5xl font-heading font-bold text-zinc-900 mb-4">
                            Como nasce o Realismo
                        </h2>
                        <div className="h-1 w-20 bg-primary rounded-full" />
                    </motion.div>

                    <div className="space-y-6">
                        {techSteps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex gap-4"
                            >
                                <CheckCircle2 className="text-primary shrink-0 mt-1" size={20} />
                                <div>
                                    <h4 className="text-zinc-900 font-bold">{step.title}</h4>
                                    <p className="text-neutral-600 text-sm mt-1">{step.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="pt-4">
                        <a href="#contato">
                            <Button size="lg" className="text-sm md:text-lg px-6 md:px-8 py-5 md:py-6 rounded-full bg-black text-white font-bold hover:bg-neutral-800 transition-all">
                                📩 Quero Minha Tattoo
                            </Button>
                        </a>
                    </div>
                </div>

                {/* Right: Technical Image/Visual */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-zinc-200 shadow-xl"
                >
                    {/* Actual Image - No placeholder text behind, full opacity */}
                    <img src="/IMG_5868_jpg.jpg" alt="Processo Técnico" className="object-cover w-full h-full" />
                </motion.div>

            </div>
        </section>
    )
}
