import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Bileşenleri çağırıyoruz
import Header from "../components/Header";
import Footer from "../components/Footer";
import CookieBanner from "../components/CookieBanner";
import GoogleAnalytics from "../components/GoogleAnalytics";

// Domain sabitini çekiyoruz
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

// Site geneli SEO ayarları
export const metadata = {
  metadataBase: new URL(DOMAIN || 'https://skattekalkulator.com'), 
  title: "Lønn etter skatt 2025 - Skattekalkulator Norge",
  description: "Beregn din nettolønn enkelt med vår skattekalkulator for 2025. Se hva du får utbetalt etter skatt.",
  
  // DOĞRULAMA KODLARI BURAYA EKLENİR
  verification: {
    // Pinterest Doğrulaması (Senin Kodun)
    other: {
      "p:domain_verify": "eac11eb209626dedeaf51af4773f4f43",
    },
  },

  // Google Discover Ayarları
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
    title: "Lønn etter skatt 2025 - Skattekalkulator Norge",
    description: "Beregn din nettolønn enkelt med vår skattekalkulator for 2025.",
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