"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { fbEvent } from "@/lib/tracking"

function ThankYouContent() {
    const searchParams = useSearchParams();
    const leadId = searchParams.get('lid') || '';
    const [countdown, setCountdown] = useState(4);
    const whatsappUrl = "https://wa.me/5512982881280?text=Ol%C3%A1%20acabei%20de%20ver%20o%20site%20e%20queria%20fazer%20um%20or%C3%A7amento.";

    useEffect(() => {
        // Fire Pixel events on thank-you page
        // PageView is already fired in layout head, so we just fire Lead for deduplication
        if (leadId) {
            // Same event_id as CAPI → Meta deduplicates to 1 conversion
            fbEvent('Lead', {}, leadId);
        }

        const timer = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        // 3.5s delay ensures Pixel fires before redirect
        const redirect = setTimeout(() => {
            window.location.href = whatsappUrl;
        }, 3500);

        return () => {
            clearInterval(timer);
            clearTimeout(redirect);
        };
    }, [leadId, whatsappUrl]);

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
                    <a
                        href={whatsappUrl}
                        className="w-full inline-flex items-center justify-center rounded-md bg-green-600 hover:bg-green-500 text-white font-bold shadow-lg animate-pulse px-6 py-3 text-lg"
                    >
                        📱 Falar no WhatsApp agora
                    </a>

                    <a href="/" className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4">
                        Voltar ao site (cancelar redirecionamento)
                    </a>
                </div>
            </div>
        </div>
    );
}

export default function Obrigado() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><span className="text-primary">Carregando...</span></div>}>
            <ThankYouContent />
        </Suspense>
    );
}
