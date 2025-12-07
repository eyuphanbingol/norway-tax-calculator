import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Bileşenleri çağırıyoruz
import Header from "../components/Header";
import Footer from "../components/Footer";
import CookieBanner from "../components/CookieBanner";
import GoogleAnalytics from "../components/GoogleAnalytics";

// Fontları "swap" modunda yükle (Yazılar anında görünür, LCP artar)
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
  title: "Lønn etter skatt 2025 - Skattekalkulator Norge",
  description: "Beregn din nettolønn enkelt med vår skattekalkulator for 2025. Se hva du får utbetalt etter skatt.",
  verification: {},
};

export default function RootLayout({ children }) {
  return (
    <html lang="no">
      <head>
        {/* API Bağlantılarını Hızlandır (Preconnect) */}
        <link rel="preconnect" href="https://api.exchangerate-api.com" />
        <link rel="preconnect" href="https://api.coingecko.com" />
        <link rel="dns-prefetch" href="https://api.exchangerate-api.com" />
        <link rel="dns-prefetch" href="https://api.coingecko.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Analytics Kodu */}
        <GoogleAnalytics ga_id="G-T4H9Z5KD0T" />
        
        <Header />
        
        {children}
        
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}