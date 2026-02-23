"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect, useState } from "react";
import { getCookie, setCookie } from "@/lib/cookies";

const PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || "2249538802207120";

declare global {
    interface Window {
        fbq: any;
        _fbq: any;
    }
}

export const FacebookPixel = () => {
    const pathname = usePathname();
    const [hasScrolled75, setHasScrolled75] = useState(false);

    // 1. External ID Management & PageView Tracking
    useEffect(() => {
        // Ensure External ID exists
        let externalId = getCookie("_ext_id");
        if (!externalId) {
            externalId = crypto.randomUUID();
            setCookie("_ext_id", externalId, 365); // 1 year
        }

        if (typeof window.fbq === "function") {
            window.fbq("track", "PageView", { external_id: externalId });
        }
    }, [pathname]);

    // 2. Scroll Tracking (75%)
    useEffect(() => {
        const handleScroll = () => {
            if (hasScrolled75) return;

            const scrollTop = window.scrollY;
            const winHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;
            const totalScroll = docHeight - winHeight;

            if (totalScroll <= 0) return; // Short page

            const scrollPercent = (scrollTop / totalScroll) * 100;

            if (scrollPercent >= 75) {
                setHasScrolled75(true);
                if (typeof window.fbq === "function") {
                    console.log("🔥 Facebook Pixel: Scroll 75% Triggered");
                    window.fbq("trackCustom", "Scroll75");
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [hasScrolled75]);

    return (
        <>
            <Script
                id="fb-pixel"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${PIXEL_ID}', {
              external_id: typeof document !== 'undefined' ? (document.cookie.match('(^|;)\\\\s*_ext_id\\\\s*=\\\\s*([^;]+)')?.pop() || undefined) : undefined
            });
            fbq('track', 'PageView');
          `,
                }}
            />
            {/* Noscript fallback currently handled by custom component or we can omit since GTM is also there, but pixel specific noscript is good practice */}
            <noscript>
                <img
                    height="1"
                    width="1"
                    style={{ display: "none" }}
                    src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
                    alt=""
                />
            </noscript>
        </>
    );
};
