"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"

const testimonials = [
    {
        name: "Arthur",
        text: "\"Mano, bom dia! Passando para agradecer pelo trampo. O resultado ficou incrível e a qualidade superou o que eu esperava. Estou muito animado para os próximos episódios e para fecharmos mais projetos juntos. Parabéns pelo trabalho excepcional!\"",
        role: "Realismo"
    },
    {
        name: "Daniel",
        text: "\"Thanks a lot, it was really wonderful. The session was great and you made the whole process very easy. I really appreciate your professional approach and the high quality of your work. I'm super happy with it! 👍🏻\"",
        role: "Realismo Preto e Cinza"
    },
    {
        name: "Eduardo",
        text: "\"Valeuu meu bom! Gratidão! Fiquei muito feliz com o resultado, as tattoos ficaram animais e o atendimento sempre nota mil. Já estou pensando nas próximas!\"",
        role: "Microrealismo"
    },
    {
        name: "Caio",
        text: "\"O trampo fala por si só, ficou bom demais! Teve gente perguntando se era real de tão bem feito que ficou. Postei no Instagram e só recebi elogios dos parceiros. Ficou surreal, mano. Trabalho muito bem feito mesmo, nível diferenciado.\"",
        role: "Fechamento de Braço"
    }
]

export function SectionTestimonials() {
    return (
        <section className="py-12 md:py-24 bg-white relative">
            <div className="max-w-7xl mx-auto px-4">

                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-zinc-900 mb-4">
                        Realismo bom não gera “alívio”. <br /> <span className="text-primary">Gera orgulho.</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
