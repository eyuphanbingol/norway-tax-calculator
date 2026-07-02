import Script from 'next/script';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { DOMAIN, SITE_NAME } from '../lib/constants';

export const metadata = {
  metadataBase: new URL(DOMAIN),
  title: {
    default: 'Lønn etter skatt 2026 – Skattekalkulator Norge',
    template: '%s | Skattekalkulator Norge',
  },
  description:
    'Beregn hva du får utbetalt etter skatt i 2026. Gratis skattekalkulator med oppdaterte satser for trinnskatt, trygdeavgift, minstefradrag og personfradrag.',
  other: { 'google-adsense-account': 'ca-pub-2645631543067545' },
  robots: { index: true, follow: true },
  openGraph: {
    siteName: SITE_NAME,
    locale: 'nb_NO',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="no">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2645631543067545"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
