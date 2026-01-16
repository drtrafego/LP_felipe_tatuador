"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"

const testimonials = [
    {
        name: "Ricardo M.",
        text: "“Não ficou parecido, ficou idêntico. A técnica de camadas fez toda a diferença na cicatrização.”",
        role: "Realismo Preto e Cinza"
    },
    {
        name: "Fernanda S.",
        text: "“Eu tinha medo de virar uma mancha com o tempo. Já faz 2 anos e os detalhes continuam nítidos.”",
        role: "Microrealismo"
    },
    {
        name: "André L.",
        text: "“O atendimento é outro nível. A avaliação da pele antes de tudo me passou muita segurança.”",
        role: "Fechamento de Braço"
    }
]

export function SectionTestimonials() {
    return (
        <section className="py-24 bg-white relative">
            <div className="max-w-7xl mx-auto px-4">

                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-zinc-900 mb-4">
                        Realismo bom não gera “alívio”. <br /> <span className="text-primary">Gera orgulho.</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-zinc-50 p-8 rounded-2xl border border-zinc-200 shadow-sm relative"
                        >
                            <div className="flex gap-1 text-yellow-500 mb-4">
                                <Star size={16} fill="currentColor" />
                                <Star size={16} fill="currentColor" />
                                <Star size={16} fill="currentColor" />
                                <Star size={16} fill="currentColor" />
                                <Star size={16} fill="currentColor" />
                            </div>
                            <p className="text-lg text-neutral-700 italic mb-6">
                                {t.text}
                            </p>
                            <div>
                                <h4 className="text-zinc-900 font-bold">{t.name}</h4>
                                <span className="text-xs text-neutral-500 uppercase tracking-wider">{t.role}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    )
}
