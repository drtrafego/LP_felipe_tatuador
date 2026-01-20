"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export default function Obrigado() {
    const [countdown, setCountdown] = useState(3);
    const whatsappUrl = "https://wa.me/5512982881280?text=Ol%C3%A1%20acabei%20de%20ver%20o%20site%20e%20queria%20fazer%20um%20or%C3%A7amento.";

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        const redirect = setTimeout(() => {
            window.location.href = whatsappUrl;
        }, 3000);

        return () => {
            clearInterval(timer);
            clearTimeout(redirect);
        };
    }, [whatsappUrl]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-6 text-center">
            <div className="space-y-6 max-w-lg anim-fade-in-up">
                <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
                        <span className="text-3xl">✅</span>
                    </div>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-primary font-heading tracking-tighter">Obrigado!</h1>

                <p className="text-lg text-muted-foreground leading-relaxed">
                    Recebemos seu contato. <br />
                    Você será redirecionado para o WhatsApp do Felipe em <span className="font-bold text-foreground">{countdown}s</span>...
                </p>

                <div className="pt-4 flex flex-col gap-4 items-center">
                    <Button
                        asChild
                        size="lg"
                        className="w-full bg-green-600 hover:bg-green-500 text-white font-bold shadow-lg animate-pulse"
                    >
                        <a href={whatsappUrl}>
                            📱 Falar no WhatsApp agora
                        </a>
                    </Button>

                    <Link href="/" className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 pointer-events-auto">
                        Voltar ao site (cancelar redirecionamento)
                    </Link>
                </div>
            </div>
        </div>
    );
}
