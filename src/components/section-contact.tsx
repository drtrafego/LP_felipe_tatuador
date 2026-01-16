"use client"

import { motion } from "framer-motion"
import { ContactForm } from "@/components/contact-form"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const faqItems = [
    {
        q: "Quanto tempo leva pra cicatrizar?",
        a: "Em geral, dá pra ver sinais de cicatrização em 2–4 semanas, mas o processo completo pode variar conforme tamanho/local e cuidados."
    },
    {
        q: "Realismo desbota? perde detalhe?",
        a: "Toda tattoo envelhece, mas a preservação do detalhe depende de: aplicação correta, contraste bem construído, cuidados e proteção solar."
    },
    {
        q: "Dói muito?",
        a: "Depende do local e da sua tolerância. Na avaliação eu te digo o que esperar no local escolhido. Realismo geralmente exige mais tempo, especialmente em peças grandes."
    },
    {
        q: "Dá pra fazer igual à foto?",
        a: "O objetivo é fidelidade e impacto realista, mas a pele não é papel: eu ajusto luz/sombra e composição pra ficar bonito na pele, não só na tela. Honestamente: não fica “igual”, fica “traduzido para a pele” e um bom artista explica isso com exemplos."
    },
    {
        q: "Vocês fazem orçamento online?",
        a: "Sim, envio valor aproximado com base nas informações e depois confirmo ao avaliar o projeto."
    },
    {
        q: "Minha pele serve? (melasma, cicatriz, etc)",
        a: "Serve, mas pode exigir adaptação (tamanho, contraste, menos microdetalhe)."
    },
    {
        q: "Quantas sessões?",
        a: "A quantidade de sessões depende de dois fatores, o tamanho da tatuagem, mas o principal é o limiar de dor que você pode suportar."
    }
]

export function SectionContact() {
    return (
        <section id="contato" className="py-24 bg-white px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">

                {/* Left: Transformation Context & FAQ */}
                <div className="space-y-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-5xl font-heading font-bold text-zinc-900 mb-6">
                            Vamos transformar sua referência em <span className="text-primary">arte realista.</span>
                        </h2>
                        <div className="space-y-4 text-neutral-600">
                            <p><strong>O que acontece quando você chama no WhatsApp:</strong></p>
                            <ul className="list-disc list-inside space-y-2 ml-2">
                                <li>Você manda referência + local + tamanho</li>
                                <li>Eu te respondo com orientação + valor aproximado + prazo</li>
                                <li>Se fizer sentido, agendamos consulta/sessão e fechamos detalhes</li>
                            </ul>
                        </div>
                    </motion.div>

                    {/* FAQ */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-zinc-900">Dúvidas Frequentes</h3>
                        <Accordion type="single" collapsible className="w-full">
                            {faqItems.map((item, i) => (
                                <AccordionItem key={i} value={`item-${i}`} className="border-zinc-200">
                                    <AccordionTrigger className="text-left text-zinc-800 hover:text-black hover:no-underline">
                                        {item.q}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-neutral-600 font-light">
                                        {item.a}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>

                {/* Right: Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-zinc-50 p-6 md:p-10 rounded-3xl border border-zinc-200 shadow-xl"
                >
                    <div className="mb-8">
                        <h3 className="text-2xl font-bold text-zinc-900 mb-2">Pedir orçamento agora</h3>
                        <p className="text-sm text-neutral-500">Atendimento direto. Sem enrolação. Sem surpresa no final.</p>
                    </div>

                    <ContactForm />

                </motion.div>

            </div>

            {/* Footer Simple */}
            <footer className="mt-24 border-t border-zinc-200 pt-8 text-center text-neutral-500 text-sm">
                <p>© {new Date().getFullYear()} Felipe Tatuador. Todos os direitos reservados.</p>
                <p className="mt-2 text-xs opacity-50">Desenvolvido com foco em Realismo.</p>
            </footer>
        </section>
    )
}
