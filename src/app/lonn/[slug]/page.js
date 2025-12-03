import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle, HelpCircle } from 'lucide-react';

// Bileşenler
import ResultCard from '../../../components/ResultCard';
import AdSlot from '../../../components/AdSlot';

// Veri
import salaryData from '../../../data/data.json';
export const dynamicParams = false;

// 1. STATİK SAYFA ÜRETİMİ (SSG)
export async function generateStaticParams() {
  return salaryData.map((item) => ({
    slug: item.slug,
  }));
}

// 2. DİNAMİK META ETİKETLERİ (GELİŞMİŞ SEO + NEXT.JS 15 FIX)
export async function generateMetadata({ params }) {
  // Next.js 15: params bir Promise'dir, await ile çözülür.
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  
  const data = salaryData.find((d) => d.slug === slug);

  if (!data) return { title: 'Side ikke funnet' };

  // DİKKAT: Domain aldığında burayı güncelle! (örn: https://skattkalkulator.com)
  const siteUrl = 'https://norway-tax-calculator.vercel.app'; 
  const canonicalUrl = `${siteUrl}/lonn/${slug}`;
  
  // Eğer JSON'da meta_description varsa onu kullan, yoksa oluştur
  const description = data.meta_description || `Se hvor mye du får utbetalt av ${data.gross_yearly.toLocaleString()} kr i lønn etter skatt i 2025.`;

  return {
    title: `${data.gross_yearly.toLocaleString()} kr Lønn etter skatt 2025 - Hvor mye utbetalt?`,
    description: description,
    
    // CANONICAL URL (Kopya içerik riskini önler)
    alternates: {
      canonical: canonicalUrl,
    },

    // OPEN GRAPH (Sosyal Medya Paylaşım Kartı)
    openGraph: {
      title: `${data.gross_yearly.toLocaleString()} kr Lønn etter skatt`,
      description: description,
      url: canonicalUrl,
      siteName: 'Skattekalkulator Norge',
      locale: 'nb_NO',
      type: 'article',
    },
  };
}

// 3. SAYFA İÇERİĞİ (NEXT.JS 15 FIX)
export default async function SalaryPage({ params }) {
  // Next.js 15: params'ı await ile bekliyoruz
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const data = salaryData.find((d) => d.slug === slug);

  if (!data) return notFound();

  // JSON-LD Schema (Google Snippet için)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faq_schema.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      
      {/* Schema verisini sayfaya gömüyoruz */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HEADER REKLAMI */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4">
          <AdSlot type="header" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        
        {/* BREADCRUMB (Navigasyon Yolu) */}
        <nav className="text-sm text-slate-500 mb-6">
          <Link href="/" className="hover:text-emerald-600">Hjem</Link> 
          <span className="mx-2">/</span> 
          <span className="text-emerald-800 font-semibold">{data.gross_yearly.toLocaleString()} kr lønn</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* --- SOL İÇERİK --- */}
          <div className="w-full lg:w-2/3">
            
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              Lønn etter skatt: <span className="text-emerald-600">{data.gross_yearly.toLocaleString()} kr</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Tjener du <strong>{data.gross_yearly.toLocaleString()} kroner</strong> i året? 
              Her ser du nøyaktig hvor mye du får utbetalt i 2025 etter skatt og fradrag.
            </p>

            {/* SONUÇ KARTI */}
            <ResultCard result={data} />

            {/* İÇERİK ve REKLAMLAR */}
            <div className="mt-12 space-y-8">
              
              {/* Bölüm 1: Genel Bilgi */}
              <div className="bg-white p-6 md:p-8 rounded-xl border border-slate-200 prose prose-slate max-w-none">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <CheckCircle className="text-emerald-500" size={20} />
                  Oversikt over skattetrekk
                </h2>
                <p>
                  Med en bruttolønn på {data.gross_yearly.toLocaleString()} kr vil du i 2025 betale totalt ca. 
                  <strong> {data.tax_yearly.toLocaleString()} kr</strong> i skatt.
                </p>
                <p>
                  Dette gir deg en <strong>skatteprosent på {data.tax_percentage}%</strong>. 
                  Mange glemmer at dette inkluderer Trygdeavgift (som dekker pensjon og helse) og Trinnskatt.
                </p>
              </div>

              {/* NATIVE REKLAM */}
              <AdSlot type="native" />

              {/* Bölüm 2: FAQ (Sık Sorulan Sorular) */}
              <div className="bg-white p-6 md:p-8 rounded-xl border border-slate-200">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-6">
                  <HelpCircle className="text-blue-500" size={20} />
                  Vanlige spørsmål om {data.gross_yearly.toLocaleString()} kr lønn
                </h2>
                
                <div className="space-y-4">
                  {data.faq_schema.map((faq, index) => (
                    <div key={index} className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                      <h3 className="font-bold text-slate-900 text-sm md:text-base mb-2">{faq.question}</h3>
                      <p className="text-slate-600 text-sm">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* CROSS-LINKS (Önceki - Sonraki Maaş) */}
            <div className="mt-12 grid grid-cols-2 gap-4">
              {data.links.prev && (
                <Link 
                  href={`/lonn/${data.links.prev}`}
                  className="flex items-center justify-start gap-3 p-4 bg-white border border-slate-200 rounded-lg hover:border-emerald-500 hover:shadow transition group"
                >
                  <ArrowLeft size={20} className="text-slate-400 group-hover:text-emerald-500" />
                  <div className="text-left">
                    <span className="block text-xs text-slate-400">Forrige nivå</span>
                    <span className="block font-bold text-slate-700 group-hover:text-emerald-700">
                      {(data.gross_yearly - 5000).toLocaleString()} kr
                    </span>
                  </div>
                </Link>
              )}

              {data.links.next && (
                <Link 
                  href={`/lonn/${data.links.next}`}
                  className="flex items-center justify-end gap-3 p-4 bg-white border border-slate-200 rounded-lg hover:border-emerald-500 hover:shadow transition group"
                >
                  <div className="text-right">
                    <span className="block text-xs text-slate-400">Neste nivå</span>
                    <span className="block font-bold text-slate-700 group-hover:text-emerald-700">
                      {(data.gross_yearly + 5000).toLocaleString()} kr
                    </span>
                  </div>
                  <ArrowRight size={20} className="text-slate-400 group-hover:text-emerald-500" />
                </Link>
              )}
            </div>

            <div className="mt-8 text-center">
              <Link href="/" className="inline-block px-6 py-3 bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-700 transition">
                Gå tilbake til kalkulatoren (Hesaplayıcıya Dön)
              </Link>
            </div>

          </div>

          {/* --- SAĞ KOLON (SIDEBAR) --- */}
          <div className="w-full lg:w-1/3">
            <AdSlot type="sidebar" />
            <div className="mt-6 sticky top-[640px]">
              <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-xl">
                 <p className="text-emerald-800 text-sm font-medium">
                   <strong>Tips:</strong> Visste du at fagforeningskontingent kan gi deg skattefradrag? Sjekk det på skattemeldingen din.
                 </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}