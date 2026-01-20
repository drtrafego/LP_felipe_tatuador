import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Tatuagem Realista em SJC | Felipe Matias",
    description: "Especialista em tatuagem realista, realismo 3D e tatuagens masculinas em São José dos Campos. Conheça o método de cicatrização guiada.",
    keywords: ["tatuagem realista", "tattoo realismo", "tatuagens realistas", "tattoo realista", "tattoo realismo", "tatuagem realismo masculina", "tatuagens masculinas realismo", "tatuagem realismo 3d", "tatuagens 3d realistas", "tatuagem nossa senhora aparecida realismo"],
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
