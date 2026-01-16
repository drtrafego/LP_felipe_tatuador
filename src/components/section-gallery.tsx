"use client"

import { motion } from "framer-motion"

// Placeholder images
const galleryImages = [
    "/tatoohero1.jpg",
    "/tatoohero2.jpg",
    "/tatoohero3.jpg",
    "/tatoohero4.jpg",
    "/tatoohero5.JPG",
    "/tatoohero6.jpg",
]

export function SectionGallery() {
    return (
        <section className="py-24 bg-zinc-50 px-4">
            <div className="max-w-7xl mx-auto space-y-16">

                {/* Header */}
                <div className="text-center space-y-4 max-w-3xl mx-auto">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-primary tracking-widest uppercase text-sm font-bold"
                    >
                        Portfolio
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-heading font-bold text-zinc-900"
                    >
                        O realismo não depende de sorte. <br />
                        Depende de método.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-neutral-600 text-lg"
                    >
                        Esse estilo busca replicar a imagem com nível de detalhe “quase fotográfico”, exigindo técnica avançada.
                    </motion.p>
                </div>

                {/* Grid Gallery */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {galleryImages.map((src, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="relative group aspect-[3/4] overflow-hidden rounded-xl bg-white shadow-md border border-zinc-200"
                        >
                            <img
                                src={src}
                                alt={`Trabalho Realista ${index + 1}`}
                                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110 grayscale-[10%] group-hover:grayscale-0"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                <span className="text-white font-medium">Ver Detalhes</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    )
}
