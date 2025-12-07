'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { TrendingUp, Info, HelpCircle, ChevronDown } from 'lucide-react';

// Bileşenleri çağırıyoruz
import SalarySlider from '../components/SalarySlider';
import ResultCard from '../components/ResultCard';
import AdSlot from '../components/AdSlot';
import SearchBox from '../components/SearchBox';
import Logo from '../components/Logo';
import NewsTicker from '../components/NewsTicker'; // YENİ: Haber Bandı Eklendi

// Veriyi direkt import ediyoruz
import salaryData from '../data/data.json';

export default function Home() {
  const [salary, setSalary] = useState(600000); // Varsayılan: 600k
  const [result, setResult] = useState(null);

  // FAQ Verisi (Ana Sayfa İçin Sabit Sorular)
  const faqs = [
    {
      q: "Hvor mye kan jeg tjene skattefritt i 2025?",
      a: "For inntektsåret 2025 er frikortgrensen 70 000 kroner. Tjener du under dette, betaler du ingen skatt. Tjener du over, må du bestille skattekort."
    },
    {
      q: "Når utbetales skattepengene?",
      a: "De fleste lønnstakere og pensjonister får skatteoppgjøret (tilgodebeløp) mellom april og juni. Noen kan få det senere, løpende frem til oktober."
    },
    {
      q: "Hva er trinnskatt?",
      a: "Trinnskatt er en progressiv bruttoskatt som beregnes av personinntekt. Jo mer du tjener, desto høyere sats betaler du på den delen av inntekten som overstiger trinnene."
    },
    {
      q: "Er feriepenger skattefrie?",
      a: "Nei, feriepenger er skattepliktig inntekt. Men det trekkes ikke skatt av dem i utbetalingsmåneden (vanligvis juni). Skattetrekket fordeles heller litt ekstra på de andre 10,5 månedene i året."
    },
    {
      q: "Hva er minstefradrag?",
      a: "Minstefradrag er et standardfradrag som trekkes fra lønnsinntekten din før skatten beregnes. Du trenger ikke søke om dette, det gis automatisk til alle lønnstakere."
    }
  ];

  // FAQ Schema (Google İçin)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };

  // Maaş değiştikçe en yakın veriyi bul
  useEffect(() => {
    const closest = salaryData.reduce((prev, curr) => {
      return (Math.abs(curr.gross_yearly - salary) < Math.abs(prev.gross_yearly - salary) ? curr : prev);
    }, salaryData[0]);

    setResult(closest);
  }, [salary]);

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      
      {/* Schema Verisini Sayfaya Göm */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 1. HEADER REKLAMI (En Tepe) */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4">
          <AdSlot type="header" />
        </div>
      </div>

      {/* 2. HERO BÖLÜMÜ (Başlık, Logo ve Arama) */}
      <div className="bg-[#005c45] text-white pt-12 pb-24">
        <div className="container mx-auto px-4 text-center">
          
          {/* LOGO */}
          <div className="flex justify-center mb-6">
             <div className="scale-125">
                <Logo color="text-white" />
             </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            Hva blir lønnen etter skatt?
          </h1>
          
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto font-light leading-relaxed mb-8">
            Beregn din nøyaktige utbetaling, skattetrekk og feriepenger med Norges mest oppdaterte verktøy for 2025.
          </p>

          {/* AKILLI ARAMA KUTUSU */}
          <div className="max-w-lg mx-auto text-left relative z-20">
             <SearchBox />
          </div>

        </div>
      </div>

      <div className="container mx-auto px-4 -mt-16 flex flex-col lg:flex-row gap-8 relative z-10">
        
        {/* --- SOL KOLON (Hesaplama) --- */}
        <div className="w-full lg:w-2/3">
          
          {/* SLIDER BİLEŞENİ */}
          <SalarySlider salary={salary} setSalary={setSalary} />

          {/* SONUÇ KARTI BİLEŞENİ */}
          <ResultCard result={result} />

          {/* YENİ: HABER BANDI (TRENDLER) */}
          {/* Eğer news.json boşsa bu bileşen kendini otomatik gizler */}
          <NewsTicker />

          {/* SEO İÇERİK BLOĞU (Ana Sayfa İçin) */}
          <div className="mt-12 bg-white p-8 rounded-xl shadow-sm border border-slate-200 prose prose-slate max-w-none">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-800">
              <Info className="text-emerald-600" />
              Hvordan fungerer skattesystemet i 2025?
            </h2>
            <p>
              I Norge er skattesystemet progressivt. Det betyr at jo mer du tjener, desto høyere prosentandel betaler du i skatt. 
              Vår kalkulator tar hensyn til <strong>Trinnskatt</strong>, <strong>Trygdeavgift</strong> (7.8%) og <strong>Personfradrag</strong>.
            </p>
            <p>
              Mange lurer på "hvor mye får jeg utbetalt?". Svaret avhenger av om du har andre fradrag (som boliglånsrente), men denne kalkulatoren gir deg et nøyaktig estimat basert på standardreglene.
            </p>
          </div>

          {/* FAQ BÖLÜMÜ */}
          <div className="mt-12">
            <h3 className="flex items-center gap-2 text-2xl font-bold text-slate-800 mb-6">
                <HelpCircle className="text-emerald-600" /> 
                Ofte stilte spørsmål (FAQ)
            </h3>
            <div className="space-y-4">
                {faqs.map((faq, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-emerald-300 transition">
                        <h4 className="font-bold text-slate-900 mb-2 flex justify-between items-center">
                            {faq.q}
                            <ChevronDown size={16} className="text-slate-400" />
                        </h4>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            {faq.a}
                        </p>
                    </div>
                ))}
            </div>
          </div>

          {/* PROGRAMMATIC SEO LİNKLERİ */}
          <div className="mt-16 pt-8 border-t border-slate-200">
            <h3 className="flex items-center gap-2 text-xl font-bold mb-6 text-slate-800">
              <TrendingUp className="text-emerald-600" />
              Populære Lønnsberegninger
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {salaryData.filter(d => d.gross_yearly >= 350000 && d.gross_yearly <= 900000 && d.gross_yearly % 50000 === 0).map((item) => (
                <Link 
                  key={item.slug}
                  href={`/lonn/${item.slug}`} // Dinamik link
                  className="group flex flex-col p-3 bg-white border border-slate-200 rounded hover:border-emerald-500 hover:shadow-md transition text-center"
                >
                  <span className="text-sm text-slate-500 group-hover:text-emerald-600">Årslønn</span>
                  <span className="font-bold text-slate-800 text-lg group-hover:text-emerald-700">
                    {item.gross_yearly.toLocaleString()} kr
                  </span>
                </Link>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Link href="/lonn/lonn-etter-skatt-500000-nok" className="text-emerald-600 font-semibold hover:underline">
                Se alle lønnsnivåer →
              </Link>
            </div>
          </div>

        </div>

        {/* --- SAĞ KOLON (STICKY REKLAM) --- */}
        <div className="w-full lg:w-1/3">
           <AdSlot type="sidebar" />
           
           {/* Ekstra Bilgi Kutusu (Sidebar Doluluğu İçin) */}
           <div className="mt-6 bg-blue-50 p-6 rounded-xl border border-blue-100">
             <h4 className="font-bold text-blue-900 mb-2">Visste du at?</h4>
             <p className="text-sm text-blue-800">
               Gjennomsnittslønnen i Norge i 2024 var ca. 668 400 kr. 
               Bruk kalkulatoren for å se hvordan din lønn sammenlignes.
             </p>
           </div>
        </div>

      </div>
    </main>
  );
}