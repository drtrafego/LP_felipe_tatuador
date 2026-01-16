import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Obrigado() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-6 text-center">
            <div className="space-y-6 max-w-lg anim-fade-in-up">
                <h1 className="text-5xl md:text-7xl font-bold text-primary font-heading tracking-tighter">Obrigado!</h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                    Recebemos o seu contato com sucesso.
                    <br />
                    <span className="text-foreground font-medium">Em breve, Felipe entrará em contato</span> pelo WhatsApp ou e-mail para discutir os detalhes da sua nova tatuagem.
                </p>
                <div className="pt-8">
                    <Link href="/">
                        <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                            Voltar ao Início
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
