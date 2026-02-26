import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Felipe Tatuador - Especialista em Realismo | São José dos Campos",
  description: "Tatuador especialista em Realismo e Blackwork em São José dos Campos. Arte exclusiva, técnica refinada e cicatrização guiada. Agende seu projeto.",
  keywords: ["tatuagem realista", "tattoo realismo", "tatuagem são josé dos campos", "sjc tattoo", "felipe matias", "realismo preto e cinza", "tatuagens masculinas", "cobertura tatuagem sjc"],
  authors: [{ name: "Felipe Matias" }],
  creator: "Felipe Matias",
  publisher: "Felipe Matias",
  robots: "index, follow",
  metadataBase: new URL("https://www.felptattoo.com"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/flavicon.ico",
  },
  other: {
    "geo.region": "BR-SP",
    "geo.placename": "São José dos Campos",
    "geo.position": "-23.2237;-45.9009",
    "ICBM": "-23.2237, -45.9009"
  }
};

const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || "2249538802207120";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <head>
        {/* ===== META PIXEL - In <head> as required by Meta documentation ===== */}
        <script
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
              fbq('init', '${FB_PIXEL_ID}', {
                external_id: (document.cookie.match('(^|;)\\s*_ext_id\\s*=\\s*([^;]+)')?.pop() || undefined)
              });
              fbq('track', 'PageView');
            `,
          }}
        />
        {/* Noscript fallback */}
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
        {/* ===== END META PIXEL ===== */}
      </head>
      <body className={`${inter.variable} ${outfit.variable} antialiased bg-background text-foreground selection:bg-primary selection:text-primary-foreground`}>

        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TKD989PL"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        {/* Google Tag Manager - Next.js Script handling */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-TKD989PL');`}
        </Script>

        {children}
      </body>
    </html>
  );
}
