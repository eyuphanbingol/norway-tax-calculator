import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Bileşenlerimizi çağırıyoruz
import Footer from "../components/Footer";
import CookieBanner from "../components/CookieBanner";
import GoogleAnalytics from "../components/GoogleAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Site geneli SEO ayarları
export const metadata = {
  title: "Lønn etter skatt 2025 - Skattekalkulator Norge",
  description: "Beregn din nettolønn enkelt med vår skattekalkulator for 2025. Se hva du får utbetalt etter skatt.",
  verification: {
    // Google Search Console kodunu buraya yapıştırabilirsin
    // google: 'senin-kodun',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="no">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Analytics Kodunu buraya GA-ID olarak girebilirsin, yoksa boş kalsın */}
        <GoogleAnalytics ga_id="" />
        
        {/* Sayfa İçeriği */}
        {children}
        
        {/* Sabit Alt Bileşenler */}
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}