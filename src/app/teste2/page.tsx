"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ContactForm } from "@/components/contact-form"

export default function Teste2Page() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-primary selection:text-black font-sans">

            {/* Hero Section with Background Image */}
            <section className="relative h-auto py-24 md:py-32 flex flex-col justify-center items-center overflow-hidden bg-black">

                {/* Background Image Container */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/IMG_2317.jpg"
                        alt="Background Tattoo Art"
                        className="w-full h-full object-cover object-center opacity-70 md:opacity-60"
                    />
                    {/* Gradient Overlay - Stronger on mobile for readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/40 md:from-black md:via-black/50 md:to-black/30" />
                </div>

                {/* Content Container */}
                <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center space-y-6 md:space-y-8">

                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="inline-flex items-center gap-1.5 px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-black/40 border border-amber-500/30 backdrop-blur-md"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 md:w-4 md:h-4 text-amber-500">
                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                        </svg>
                        <span className="text-amber-500 text-xs md:text-sm font-medium tracking-wide">
                            Seu realismo começa na escolha do profissional.
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-3xl md:text-6xl font-heading font-extrabold tracking-tight text-white leading-tight max-w-5xl drop-shadow-xl"
                    >
                        Não é "parecido". É <span className="text-primary">realismo</span>: <br className="hidden md:block" />
                        profundidade, textura e presença na pele.
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-base md:text-xl text-neutral-200 font-light max-w-3xl mx-auto drop-shadow-md pb-4"
                    >
                        Se você quer realismo, você precisa de um tatuador que trabalha com método: avaliação, encaixe, execução por camadas e orientação de cicatrização.
                    </motion.p>

                    {/* CTA Button */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <Button asChild size="lg" className="text-base md:text-xl px-8 md:px-12 py-6 md:py-8 rounded-full bg-green-600 hover:bg-green-500 text-white font-bold transition-all hover:scale-105 shadow-[0_0_40px_-5px_var(--green-500)] animate-pulse border-2 border-green-400/20">
                            <Link href="#contato">
                                ✅ Quero Uma Tattoo Realista
                            </Link>
                        </Button>
                    </motion.div>

                    {/* Trust Seals - Below CTA */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="flex flex-wrap justify-center gap-x-4 gap-y-2 md:gap-x-6 md:gap-y-3 text-xs md:text-sm text-neutral-300 font-medium pt-4 md:pt-8"
                    >
                        <span className="flex items-center gap-2 bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
                            <span className="text-yellow-500">⭐</span> Provas Sociais Reais
                        </span>
                        <span className="flex items-center gap-2 bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
                            <span className="text-blue-400">🛡️</span> Cicatrização Guiada
                        </span>
                        <span className="flex items-center gap-2 bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
                            <span className="text-purple-400">🖼️</span> Projeto Exclusivo
                        </span>
                    </motion.div>

                </div>
            </section>

            {/* Meet The Artist Section */}
            <section className="pb-12 pt-4 md:pb-24 md:pt-8 bg-zinc-950 px-4 md:px-8">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left: Artist Image */}
                    <div className="relative">
                        <div className="relative rounded-2xl overflow-hidden border-4 border-zinc-800 shadow-2xl">
                            <img
                                src="/clientehero.png"
                                alt="Felipe Tatuador"
                                className="w-full h-auto object-cover"
                            />
                            {/* Name Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                                <h3 className="text-4xl md:text-5xl font-heading font-bold text-white tracking-wide">Felipe Matias</h3>
                            </div>
                        </div>
                    </div>

                    {/* Right: Artist Info */}
                    <div className="space-y-8">
                        <h2 className="text-4xl md:text-6xl font-heading font-light text-zinc-300">
                            Conheça<br /><span className="font-bold text-white">O Artista</span>
                        </h2>

                        <div className="space-y-6 text-neutral-400">
                            <p className="flex items-start gap-3">
                                <span className="text-amber-500 text-xl mt-1">★</span>
                                <span>Meu nome é Felipe, tenho 28 anos e sou de São José dos Campos. Venho de uma família criativa — mãe professora de artes e avô arquiteto. Desenho desde os 3 anos e cheguei a cursar 3 anos de Arquitetura, mas a paixão pela arte falou mais alto.</span>
                            </p>
                            <p className="flex items-start gap-3">
                                <span className="text-amber-500 text-xl mt-1">★</span>
                                <span>Migrei do papel para a pele influenciado por amigos e pelo meu mentor de desenho. Comecei aos 20 anos, "na cara e na coragem", treinando em conhecidos. A arquitetura me deu noção de projeto, mas a tatuagem me deu propósito.</span>
                            </p>
                            <p className="flex items-start gap-3">
                                <span className="text-amber-500 text-xl mt-1">★</span>
                                <span>Hoje, com 8 anos de experiência e 7 anos de estúdio próprio, foco no Realismo Preto e Cinza. Busco não só a técnica perfeita, mas um olhar cuidadoso e clínico para entregar uma arte que dure a vida toda.</span>
                            </p>
                        </div>

                        {/* Experience Badge */}
                        <div className="inline-flex items-center gap-3 bg-zinc-900 border border-zinc-700 rounded-xl px-5 py-3">
                            <span className="text-3xl font-bold text-primary">8+</span>
                            <span className="text-sm text-neutral-400">Anos de<br />Experiência</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Philosophy Section - "Ilusão Óptica" */}
            <section className="py-12 md:py-24 bg-zinc-900 px-4 md:px-8">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                    {/* Left: Impact Headline */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <h2 className="text-3xl md:text-5xl font-heading font-bold text-white leading-tight">
                            A tatuagem de realismo é, no fundo, uma <span className="text-neutral-500">"ilusão óptica"</span> aplicada na pele.
                        </h2>
                    </motion.div>

                    {/* Right: Detailed Copy */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6 text-lg text-neutral-400 font-light leading-relaxed"
                    >
                        <p>
                            Em vez de depender de contornos fortes, ela depende de valores (escala de claro/escuro), transições suaves, texturas e controle de contraste para parecer tridimensional.
                        </p>
                        <p>
                            Por isso ela é uma das vertentes mais exigentes — tanto no fazer quanto no manter bonito ao longo dos anos.
                        </p>

                        <div className="border-l-4 border-red-600 pl-6 py-2">
                            <p className="text-white font-medium">
                                O erro não é querer realismo. O erro é escolher pelo "mais barato" ou pelo "mais perto".
                            </p>
                        </div>

                        <p>
                            No realismo, o detalhe é tudo. E quando o detalhe falha… não vira "mais ou menos". Vira frustração.
                        </p>

                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                            <li className="flex items-center gap-3 text-red-500">
                                <span className="text-lg font-bold">✕</span> "Não ficou parecido"
                            </li>
                            <li className="flex items-center gap-3 text-red-500">
                                <span className="text-lg font-bold">✕</span> "Virou mancha depois de cicatrizar"
                            </li>
                            <li className="flex items-center gap-3 text-red-500">
                                <span className="text-lg font-bold">✕</span> "O sombreado matou o desenho"
                            </li>
                            <li className="flex items-center gap-3 text-red-500">
                                <span className="text-lg font-bold">✕</span> "O rosto perdeu expressão"
                            </li>
                        </ul>
                    </motion.div>

                </div>
            </section>

            {/* Technical Section - "Como nasce o Realismo" */}
            <section className="py-12 md:py-24 bg-zinc-950 px-4">
                <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left: Content */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
                                Como nasce o Realismo
                            </h2>
                            <div className="h-1 w-20 bg-primary rounded-full" />
                        </div>

                        <div className="space-y-6">
                            {[
                                { title: "Referência excelente", desc: "Boa luz, boa resolução, foco claro." },
                                { title: "Edição para tatuagem", desc: "Aumentar contraste local, reduzir 'ruído' (pele porosa demais), separar planos." },
                                { title: "Mapa de valores", desc: "Pensar em entre 5 e 7 níveis de cinza (do quase preto ao quase pele)." },
                                { title: "Decidir o 'ponto de foco'", desc: "Onde vai ter mais detalhe e nitidez." },
                                { title: "Definir tamanho mínimo e local", desc: "Áreas de muita fricção e sol tendem a perder nitidez mais rápido." },
                            ].map((step, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex gap-4"
                                >
                                    <span className="text-primary shrink-0 mt-1">✓</span>
                                    <div>
                                        <h4 className="text-white font-bold">{step.title}</h4>
                                        <p className="text-neutral-500 text-sm mt-1">{step.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <Button asChild size="lg" className="text-sm md:text-lg px-6 md:px-8 py-5 md:py-6 rounded-full bg-white text-black font-bold hover:bg-neutral-200 transition-all">
                            <Link href="#contato">
                                📩 Quero Minha Tattoo
                            </Link>
                        </Button>
                    </div>

                    {/* Right: Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative aspect-square rounded-2xl overflow-hidden border border-zinc-800 shadow-xl"
                    >
                        <img src="/IMG_6194.jpg" alt="Processo Técnico" className="object-cover w-full h-full" />
                    </motion.div>

                </div>
            </section>



            {/* On The Board - Polaroid Gallery */}
            <section className="py-12 md:py-24 bg-zinc-950 px-4 relative overflow-hidden">
                <div className="max-w-6xl mx-auto">

                    {/* Portfolio Header */}
                    <div className="text-center mb-16 space-y-6">
                        <span className="text-amber-500 font-bold tracking-widest text-sm uppercase">Portfolio</span>
                        <h2 className="text-4xl md:text-6xl font-heading font-bold text-white leading-tight">
                            O realismo não depende de sorte.<br />
                            Depende de método.
                        </h2>
                        <p className="text-neutral-400 text-lg md:text-xl max-w-3xl mx-auto font-light">
                            Esse estilo busca replicar a imagem com nível de detalhe "quase fotográfico", exigindo técnica avançada.
                        </p>
                    </div>

                    {/* Polaroid Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-12">

                        {/* Polaroid 1 */}
                        <div className="relative transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                            <div className="bg-white p-2 pb-10 rounded-sm shadow-2xl">
                                <img src="/tatoohero1.jpg" alt="Tattoo 1" className="w-full aspect-[3/4] object-cover" />
                            </div>
                            {/* Tape - thicker, more visible */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-8 bg-gradient-to-b from-stone-200 to-stone-300/80 rounded-[2px] rotate-3 shadow-md" style={{ clipPath: 'polygon(5% 0%, 95% 5%, 100% 100%, 0% 95%)' }} />
                        </div>

                        {/* Polaroid 2 */}
                        <div className="relative transform rotate-2 hover:rotate-0 transition-transform duration-300 mt-8">
                            <div className="bg-white p-2 pb-10 rounded-sm shadow-2xl">
                                <img src="/tatoohero2.jpg" alt="Tattoo 2" className="w-full aspect-[3/4] object-cover" />
                            </div>
                            <div className="absolute top-0 right-4 -translate-y-1/2 w-16 h-7 bg-gradient-to-b from-stone-200 to-stone-300/80 rounded-[2px] -rotate-6 shadow-md" style={{ clipPath: 'polygon(0% 10%, 100% 0%, 95% 100%, 5% 90%)' }} />
                            {/* Sticky Note */}
                            <div className="absolute -top-4 -right-2 md:-right-4 bg-yellow-300 text-black text-[9px] md:text-[10px] font-bold px-2 py-1 rotate-12 shadow-md">
                                INCRÍVEL!
                            </div>
                        </div>

                        {/* Polaroid 3 */}
                        <div className="relative transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                            <div className="bg-white p-2 pb-10 rounded-sm shadow-2xl">
                                <img src="/tatoohero3.jpg" alt="Tattoo 3" className="w-full aspect-[3/4] object-cover" />
                            </div>
                            <div className="absolute top-0 left-4 -translate-y-1/2 w-18 h-7 bg-gradient-to-b from-stone-200 to-stone-300/80 rounded-[2px] rotate-2 shadow-md" style={{ clipPath: 'polygon(3% 5%, 97% 0%, 100% 95%, 0% 100%)' }} />
                        </div>

                        {/* Polaroid 4 */}
                        <div className="relative transform rotate-3 hover:rotate-0 transition-transform duration-300 -mt-4">
                            <div className="bg-white p-2 pb-10 rounded-sm shadow-2xl">
                                <img src="/APC_0221.jpg" alt="Tattoo 4" className="w-full aspect-[3/4] object-cover" />
                            </div>
                            <div className="absolute bottom-8 right-0 translate-x-1/4 w-20 h-8 bg-gradient-to-b from-stone-200 to-stone-300/80 rounded-[2px] -rotate-45 shadow-md" style={{ clipPath: 'polygon(0% 0%, 100% 10%, 95% 100%, 5% 90%)' }} />
                        </div>

                        {/* Polaroid 5 */}
                        <div className="relative transform -rotate-2 hover:rotate-0 transition-transform duration-300 mt-6">
                            <div className="bg-white p-2 pb-10 rounded-sm shadow-2xl">
                                <img src="/APC_0531.jpg" alt="Tattoo 5" className="w-full aspect-[3/4] object-cover" />
                            </div>
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-18 h-7 bg-gradient-to-b from-stone-200 to-stone-300/80 rounded-[2px] rotate-1 shadow-md" style={{ clipPath: 'polygon(5% 0%, 95% 5%, 100% 100%, 0% 95%)' }} />
                            <div className="absolute -top-6 left-0 md:left-2 bg-yellow-300 text-black text-[9px] md:text-[10px] font-bold px-2 py-1 -rotate-6 shadow-md">
                                PERFEITO!
                            </div>
                        </div>

                        {/* Polaroid 6 */}
                        <div className="relative transform rotate-1 hover:rotate-0 transition-transform duration-300">
                            <div className="bg-white p-2 pb-10 rounded-sm shadow-2xl">
                                <img src="/IMG_5694_jpg.jpg" alt="Tattoo 6" className="w-full aspect-[3/4] object-cover" />
                            </div>
                            <div className="absolute bottom-8 left-0 -translate-x-1/4 w-20 h-8 bg-gradient-to-b from-stone-200 to-stone-300/80 rounded-[2px] rotate-45 shadow-md" style={{ clipPath: 'polygon(5% 10%, 95% 0%, 100% 90%, 0% 100%)' }} />
                            <div className="absolute bottom-6 right-4 bg-yellow-300 text-black text-[9px] md:text-[10px] font-bold px-2 py-1 rotate-6 shadow-md">
                                OBRIGADO!
                            </div>
                        </div>

                        {/* Polaroid 7 */}
                        <div className="relative transform -rotate-4 hover:rotate-0 transition-transform duration-300 mt-4">
                            <div className="bg-white p-2 pb-10 rounded-sm shadow-2xl">
                                <img src="/tatoohero4.jpg" alt="Tattoo 7" className="w-full aspect-[3/4] object-cover" />
                            </div>
                            <div className="absolute top-0 right-6 -translate-y-1/2 w-16 h-7 bg-gradient-to-b from-stone-200 to-stone-300/80 rounded-[2px] rotate-3 shadow-md" style={{ clipPath: 'polygon(0% 5%, 100% 0%, 95% 95%, 5% 100%)' }} />
                        </div>

                        {/* Polaroid 8 */}
                        <div className="relative transform rotate-2 hover:rotate-0 transition-transform duration-300 -mt-2">
                            <div className="bg-white p-2 pb-10 rounded-sm shadow-2xl">
                                <img src="/tatoohero5.JPG" alt="Tattoo 8" className="w-full aspect-[3/4] object-cover" />
                            </div>
                            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 translate-y-1/2 w-20 h-8 bg-gradient-to-b from-stone-200 to-stone-300/80 rounded-[2px] -rotate-2 shadow-md" style={{ clipPath: 'polygon(5% 0%, 95% 5%, 100% 100%, 0% 95%)' }} />
                            <div className="absolute -top-4 -left-1 md:-left-2 bg-yellow-300 text-black text-[9px] md:text-[10px] font-bold px-2 py-1 -rotate-12 shadow-md">
                                TOP!
                            </div>
                        </div>

                        {/* Polaroid 9 */}
                        <div className="relative transform -rotate-1 hover:rotate-0 transition-transform duration-300 mt-8">
                            <div className="bg-white p-2 pb-10 rounded-sm shadow-2xl">
                                <img src="/IMG_7776.jpg" alt="Tattoo 9" className="w-full aspect-[3/4] object-cover" />
                            </div>
                            <div className="absolute top-0 left-4 -translate-y-1/2 w-18 h-7 bg-gradient-to-b from-stone-200 to-stone-300/80 rounded-[2px] rotate-6 shadow-md" style={{ clipPath: 'polygon(3% 0%, 97% 10%, 100% 100%, 0% 90%)' }} />
                            <div className="absolute -bottom-2 -right-1 md:-right-3 bg-yellow-300 text-black text-[9px] md:text-[10px] font-bold px-2 py-1 rotate-8 shadow-md">
                                🔥
                            </div>
                        </div>

                    </div>

                    {/* CTA Button after Gallery */}
                    <div className="flex justify-center mt-16">
                        <Button asChild size="lg" className="text-base md:text-xl px-8 md:px-12 py-6 md:py-8 rounded-full bg-white text-black font-bold hover:bg-neutral-200 transition-all shadow-lg animate-pulse">
                            <Link href="#contato">
                                🖼️ Quero um projeto exclusivo
                            </Link>
                        </Button>
                    </div>

                </div>
            </section>

            {/* Da Ideia À Tinta - Process Section (Zigzag Layout) */}
            <section className="py-12 md:py-24 bg-zinc-950 px-4 relative overflow-hidden">
                <div className="max-w-5xl mx-auto">

                    {/* Header */}
                    <div className="text-center mb-12 lg:mb-20">
                        <h2 className="text-3xl md:text-5xl font-heading font-bold text-white leading-tight">
                            O realismo não depende de sorte.<br />
                            Depende de 4 etapas.
                        </h2>
                    </div>

                    {/* Zigzag Steps Container */}
                    <div className="relative">



                        {/* Connection Lines (Desktop only) - Pin to Pin */}
                        <svg
                            className="absolute inset-0 w-full h-full hidden lg:block pointer-events-none"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                            style={{ zIndex: 1 }}
                        >
                            {/* Line 1: Card 1 pin (right, ~95%) → Card 2 pin (center-right, ~48%) */}
                            <path
                                d="M 92 12 C 70 18, 52 18, 48 26"
                                stroke="#dc2626"
                                strokeWidth="0.4"
                                fill="none"
                                opacity="0.85"
                            />
                            {/* Line 2: Card 2 pin (~48%) → Card 3 pin (right, ~92%) */}
                            <path
                                d="M 48 36 C 52 44, 70 44, 92 50"
                                stroke="#dc2626"
                                strokeWidth="0.4"
                                fill="none"
                                opacity="0.85"
                            />
                            {/* Line 3: Card 3 pin (right, ~92%) → Card 4 pin (center-right, ~48%) */}
                            <path
                                d="M 92 60 C 70 68, 52 68, 48 76"
                                stroke="#dc2626"
                                strokeWidth="0.4"
                                fill="none"
                                opacity="0.85"
                            />
                        </svg>

                        {/* Step 1 - Right aligned */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex justify-end mb-12 lg:mb-20 relative z-10"
                        >
                            <div className="relative w-full lg:w-[50%] bg-stone-200 rounded-xl p-6 shadow-2xl">
                                {/* Thumbtack - 3D Push Pin */}
                                <div className="absolute -top-3 right-8">
                                    <div className="w-7 h-7 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.4),inset_0_-2px_4px_rgba(0,0,0,0.3),inset_0_2px_4px_rgba(255,255,255,0.3)]" style={{ background: 'radial-gradient(circle at 35% 30%, #ff7b7b, #dc2626 45%, #991b1b 75%, #7f1d1d)' }} />
                                </div>
                                {/* Number */}
                                <span className="text-6xl font-light text-stone-300/60 absolute top-4 right-6 font-heading">01</span>
                                {/* Content */}
                                <div className="relative z-10 pt-6 pr-16">
                                    <h3 className="text-xl font-bold text-zinc-900 mb-3 font-heading">Avaliação e encaixe</h3>
                                    <p className="text-zinc-600 text-sm leading-relaxed">
                                        Antes de falar em preço, eu avalio: local, tamanho mínimo pro nível de detalhe, e o que funciona na sua pele. Realismo precisa de espaço e leitura.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Step 2 - Left aligned */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="flex justify-start mb-12 lg:mb-20 relative z-10"
                        >
                            <div className="relative w-full lg:w-[50%] bg-stone-200 rounded-xl p-6 shadow-2xl">
                                {/* Thumbtack - 3D Push Pin */}
                                <div className="absolute -top-3 right-8">
                                    <div className="w-7 h-7 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.4),inset_0_-2px_4px_rgba(0,0,0,0.3),inset_0_2px_4px_rgba(255,255,255,0.3)]" style={{ background: 'radial-gradient(circle at 35% 30%, #ff7b7b, #dc2626 45%, #991b1b 75%, #7f1d1d)' }} />
                                </div>
                                {/* Number */}
                                <span className="text-6xl font-light text-stone-300/60 absolute top-4 right-6 font-heading">02</span>
                                {/* Content */}
                                <div className="relative z-10 pt-6 pr-16">
                                    <h3 className="text-xl font-bold text-zinc-900 mb-3 font-heading">Construção da arte</h3>
                                    <p className="text-zinc-600 text-sm leading-relaxed">
                                        A arte é montada respeitando proporção, luz/sombra e pontos de foco pra não "achatar" depois de cicatrizado.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Step 3 - Right aligned */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="flex justify-end mb-12 lg:mb-20 relative z-10"
                        >
                            <div className="relative w-full lg:w-[50%] bg-stone-200 rounded-xl p-6 shadow-2xl">
                                {/* Thumbtack - 3D Push Pin */}
                                <div className="absolute -top-3 right-8">
                                    <div className="w-7 h-7 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.4),inset_0_-2px_4px_rgba(0,0,0,0.3),inset_0_2px_4px_rgba(255,255,255,0.3)]" style={{ background: 'radial-gradient(circle at 35% 30%, #ff7b7b, #dc2626 45%, #991b1b 75%, #7f1d1d)' }} />
                                </div>
                                {/* Number */}
                                <span className="text-6xl font-light text-stone-300/60 absolute top-4 right-6 font-heading">03</span>
                                {/* Content */}
                                <div className="relative z-10 pt-6 pr-16">
                                    <h3 className="text-xl font-bold text-zinc-900 mb-3 font-heading">Execução por camadas</h3>
                                    <p className="text-zinc-600 text-sm leading-relaxed">
                                        Realismo é camada: o que dá "vida" é a relação entre contraste, transição e textura.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Step 4 - Left aligned */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="flex justify-start relative z-10"
                        >
                            <div className="relative w-full lg:w-[50%] bg-stone-200 rounded-xl p-6 shadow-2xl">
                                {/* Thumbtack - 3D Push Pin */}
                                <div className="absolute -top-3 right-8">
                                    <div className="w-7 h-7 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.4),inset_0_-2px_4px_rgba(0,0,0,0.3),inset_0_2px_4px_rgba(255,255,255,0.3)]" style={{ background: 'radial-gradient(circle at 35% 30%, #ff7b7b, #dc2626 45%, #991b1b 75%, #7f1d1d)' }} />
                                </div>
                                {/* Number */}
                                <span className="text-6xl font-light text-stone-300/60 absolute top-4 right-6 font-heading">04</span>
                                {/* Content */}
                                <div className="relative z-10 pt-6 pr-16">
                                    <h3 className="text-xl font-bold text-zinc-900 mb-3 font-heading">Pós e cicatrização guiada</h3>
                                    <p className="text-zinc-600 text-sm leading-relaxed">
                                        Você recebe orientação de cuidados e acompanhamento (principalmente em peças maiores). Diferencial premium.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-12 md:py-24 bg-zinc-900 px-4">
                <div className="max-w-7xl mx-auto">

                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
                            Realismo bom não gera "alívio". <br /> <span className="text-primary">Gera orgulho.</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            {
                                name: "Arthur",
                                text: "'Mano, bom dia! Passando para agradecer pelo trampo. O resultado ficou incrível e a qualidade superou o que eu esperava. Estou muito animado para os próximos episódios e para fecharmos mais projetos juntos. Parabéns pelo trabalho excepcional!'",
                                role: "Realismo"
                            },
                            {
                                name: "Daniel",
                                text: "'Thanks a lot, it was really wonderful. The session was great and you made the whole process very easy. I really appreciate your professional approach and the high quality of your work. I'm super happy with it! 👍🏻'",
                                role: "Realismo Preto e Cinza"
                            },
                            {
                                name: "Eduardo",
                                text: "'Valeuu meu bom! Gratidão! Fiquei muito feliz com o resultado, as tattoos ficaram animais e o atendimento sempre nota mil. Já estou pensando nas próximas!'",
                                role: "Microrealismo"
                            },
                            {
                                name: "Caio",
                                text: "'O trampo fala por si só, ficou bom demais! Teve gente perguntando se era real de tão bem feito que ficou. Postei no Instagram e só recebi elogios dos parceiros. Ficou surreal, mano. Trabalho muito bem feito mesmo, nível diferenciado.'",
                                role: "Fechamento de Braço"
                            }
                        ].map((t, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-zinc-800/50 p-8 rounded-2xl border border-zinc-700"
                            >
                                <div className="flex gap-1 text-yellow-500 mb-4">
                                    {[...Array(5)].map((_, j) => (
                                        <span key={j}>★</span>
                                    ))}
                                </div>
                                <p className="text-lg text-neutral-300 italic mb-6">
                                    {t.text}
                                </p>
                                <div>
                                    <h4 className="text-white font-bold">{t.name}</h4>
                                    <span className="text-xs text-neutral-500 uppercase tracking-wider">{t.role}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </section>

            {/* Contact Section (Moved Before FAQ) */}
            <section id="contato" className="py-12 md:py-24 bg-zinc-900 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                        {/* Left: Title & Info */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-4xl md:text-5xl font-heading font-light text-zinc-300 mb-6">
                                    Vamos transformar sua referência em <span className="font-bold text-white">arte realista.</span>
                                </h2>
                                <div className="space-y-4 text-neutral-500">
                                    <p><strong className="text-white">O que acontece quando você chama no WhatsApp:</strong></p>
                                    <ul className="list-disc list-inside space-y-2 ml-2">
                                        <li>Você manda referência + local + tamanho</li>
                                        <li>Eu te respondo com orientação + valor aproximado + prazo</li>
                                        <li>Se fizer sentido, agendamos consulta/sessão e fechamos detalhes</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="space-y-4 text-sm pt-4">
                                <div className="flex items-center gap-3 text-neutral-400">
                                    <span className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-white">📧</span>
                                    <span>contato@felipetattoo.com</span>
                                </div>
                                <div className="flex items-center gap-3 text-neutral-400">
                                    <span className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-white">📍</span>
                                    <span>Avenida Andrômeda número 1280, 1º andar, sala 3<br />Jardim Satélite, São José dos Campos<br />Cep 12230-000</span>
                                </div>
                                <div className="flex items-center gap-3 text-neutral-400">
                                    <span className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-white">📱</span>
                                    <span>@felipetattoo</span>
                                </div>
                            </div>
                        </div>

                        {/* Right: Form */}
                        <div className="bg-zinc-800/50 border border-zinc-700 rounded-2xl p-6 md:p-8">
                            {/* Using the updated ContactForm component which has the logic and improved styling */}
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-12 md:py-24 bg-zinc-900 px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                        {/* Left: Title */}
                        <div>
                            <h2 className="text-4xl md:text-5xl font-heading font-light text-zinc-300 mb-4">
                                Dúvidas<br /><span className="font-bold text-white">Frequentes</span>
                            </h2>
                            <p className="text-neutral-500">
                                Algumas coisas que você pode querer saber antes de agendar.
                            </p>
                        </div>

                        {/* Right: FAQ Items */}
                        <div className="space-y-4">
                            {[
                                { q: "Quanto tempo leva pra cicatrizar?", a: "Em geral, 2–4 semanas para sinais iniciais. O processo completo varia conforme tamanho, local e cuidados." },
                                { q: "Realismo desbota?", a: "Toda tattoo envelhece, mas a preservação do detalhe depende de aplicação correta, contraste bem construído e proteção solar." },
                                { q: "Dói muito?", a: "Depende do local e da sua tolerância. Na avaliação eu te digo o que esperar." },
                                { q: "Dá pra fazer igual à foto?", a: "O objetivo é fidelidade realista, mas a pele não é papel. Eu ajusto para ficar bonito na pele." },
                                { q: "Vocês fazem orçamento online?", a: "Sim, envio valor aproximado com base nas informações e depois confirmo ao avaliar o projeto." },
                                { q: "Minha pele serve? (melasma, cicatriz, etc)", a: "Serve, mas pode exigir adaptação (tamanho, contraste, menos microdetalhe)." },
                                { q: "Quantas sessões?", a: "A quantidade de sessões depende de dois fatores, o tamanho da tatuagem, mas o principal é o limiar de dor que você pode suportar." },
                            ].map((item, i) => (
                                <details key={i} className="group bg-zinc-800/50 border border-zinc-700 rounded-xl overflow-hidden">
                                    <summary className="flex items-center justify-between p-4 cursor-pointer text-white font-medium hover:bg-zinc-800 transition-colors">
                                        {item.q}
                                        <span className="text-neutral-500 group-open:rotate-45 transition-transform">+</span>
                                    </summary>
                                    <div className="px-4 pb-4 text-neutral-400 text-sm">
                                        {item.a}
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>

                    {/* CTA Button after FAQ */}
                    <div className="flex justify-center mt-12 pt-8 border-t border-zinc-800">
                        <Button asChild size="lg" className="text-base md:text-lg px-8 md:px-10 py-6 rounded-full bg-white text-black font-bold hover:bg-neutral-200 transition-all shadow-lg animate-pulse">
                            <Link href="#contato">
                                📩 Pedir Orçamento Agora
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Quote Section */}
            <section className="py-12 md:py-24 bg-zinc-950 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <blockquote className="text-2xl md:text-3xl font-heading font-light text-zinc-300 leading-relaxed italic">
                        "Tinta preta é atemporal — não segue tendências nem sai de moda. <br className="hidden md:block" />
                        É sobre <span className="text-white font-medium not-italic">ousadia, permanência</span> e criar arte que resiste ao tempo."
                    </blockquote>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 bg-black border-t border-zinc-800 px-4">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-500">
                    <p>© {new Date().getFullYear()} Felipe Tatuador. Todos os direitos reservados.</p>
                    <p className="text-xs opacity-50">Desenvolvido com foco em Realismo.</p>
                </div>
            </footer>

        </main>
    )
}
