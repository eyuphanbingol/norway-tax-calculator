import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Bileşenleri çağırıyoruz
import Header from "../components/Header";
import Footer from "../components/Footer";
import CookieBanner from "../components/CookieBanner";
import GoogleAnalytics from "../components/GoogleAnalytics";

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
  title: "Lønn etter skatt 2025 - Skattekalkulator Norge",
  description: "Beregn din nettolønn enkelt med vår skattekalkulator for 2025. Se hva du får utbetalt etter skatt.",
  verification: {
    // Google Search Console doğrulama kodu varsa buraya eklenebilir
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="no">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Analytics Kodu - SENİN ID'N EKLENDİ ✅ */}
        <GoogleAnalytics ga_id="G-T4H9Z5KD0T" />
        
        {/* ÜST MENÜ (NAVBAR) */}
        <Header />
        
        {/* Sayfa İçeriği */}
        {children}
        
        {/* Sabit Alt Bileşenler */}
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}