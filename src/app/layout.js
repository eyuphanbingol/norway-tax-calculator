import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import Header from "../components/Header";
import Footer from "../components/Footer";
import CookieBanner from "../components/CookieBanner";
import GoogleAnalytics from "../components/GoogleAnalytics";

import { DOMAIN } from '../lib/constants'; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(DOMAIN || 'https://skattekalkulator.com'), 
  // SEO GÜNCELLEMESİ: 2026 Odaklı Title
  title: "Skattekalkulator 2026 - Beregn lønn etter skatt i Norge",
  description: "Bruk Norges mest oppdaterte skattekalkulator for 2026. Beregn din nettolønn, trinnskatt og utbetaling med de nyeste satsene fra Statsbudsjettet.",
  
  other: {
    "google-adsense-account": "ca-pub-2645631543067545",
  },

  verification: {
    other: {
      "p:domain_verify": "eac11eb209626dedeaf51af4773f4f43",
    },
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  openGraph: {
    title: "Skattekalkulator 2026 - Finn din utbetaling",
    description: "Beregn din nettolønn enkelt med vår skattekalkulator oppdatert for 2026.",
    url: DOMAIN,
    siteName: 'Skattekalkulator Norge',
    locale: 'nb_NO',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="no">
      <head>
        <link rel="preconnect" href="https://api.exchangerate-api.com" />
        <link rel="preconnect" href="https://api.coingecko.com" />
        <link rel="dns-prefetch" href="https://api.exchangerate-api.com" />
        <link rel="dns-prefetch" href="https://api.coingecko.com" />
        
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2645631543067545"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleAnalytics ga_id="G-T4H9Z5KD0T" />
        <Header />
        {children}
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}