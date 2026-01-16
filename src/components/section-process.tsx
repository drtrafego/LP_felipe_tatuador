"use client"

import { motion } from "framer-motion"
import { ScanEye, PencilRuler, Layers, ShieldCheck } from "lucide-react"

const steps = [
    {
        icon: ScanEye,
        title: "a) Avaliação e encaixe",
        description: "Antes de falar em preço, eu avalio: local, tamanho mínimo pro nível de detalhe, e o que funciona na sua pele. (Realismo precisa de espaço e leitura.)"
    },
    {
        icon: PencilRuler,
        title: "b) Construção da arte",
        description: "A arte é montada respeitando proporção, luz/sombra e pontos de foco pra não “achatar” depois de cicatrizado."
    },
    {
        icon: Layers,
        title: "c) Execução por camadas",
        description: "Realismo é camada: o que dá “vida” é a relação entre contraste, transição e textura."
    },
    {
        icon: ShieldCheck,
        title: "d) Pós e cicatrização guiada",
        description: "Você recebe orientação de cuidados e acompanhamento (principalmente em peças maiores). Aqui destacamos isso como diferencial premium."
    }
]

export function SectionProcess() {
    return (
        <section className="py-12 md:py-24 bg-white relative overflow-hidden">
            {/* Background accent */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 md:mb-24 text-center"
                >
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-zinc-900 mb-6">
                        O realismo não depende de sorte.<br /> Depende de 4 etapas.
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-zinc-50 border border-zinc-200 rounded-xl p-6 hover:bg-white hover:shadow-lg transition-all duration-300 group"
                        >
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-black transition-all">
                                <step.icon size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-zinc-900 mb-3">{step.title}</h3>
                            <p className="text-neutral-600 text-sm leading-relaxed">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
