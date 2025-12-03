import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// Footer bileşenini içe aktarıyoruz
import Footer from "../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// SEO için Başlık ve Açıklama (Norveççe)
export const metadata = {
  title: "Lønn etter skatt 2025 - Skattekalkulator Norge",
  description: "Beregn din nettolønn enkelt med vår skattekalkulator for 2025. Se hva du får utbetalt etter skatt.",
};

export default function RootLayout({ children }) {
  return (
    // Dili 'no' (Norveççe) yapıyoruz ki Google yerel site olduğunu anlasın
    <html lang="no">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Ana İçerik */}
        {children}
        
        {/* Her sayfanın altında görünecek Footer */}
        <Footer />
      </body>
    </html>
  );
}