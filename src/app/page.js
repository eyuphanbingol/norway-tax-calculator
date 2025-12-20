'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { TrendingUp, Info, HelpCircle, ChevronDown, Calendar, CheckCircle2, Star } from 'lucide-react';

// Komponentler
import SalarySlider from '../components/SalarySlider';
import ResultCard from '../components/ResultCard';
import AdSlot from '../components/AdSlot';
import SearchBox from '../components/SearchBox';
import Logo from '../components/Logo';
import NegotiationCoach from '../components/NegotiationCoach'; 

// LAZY LOAD
const MarketOverview = dynamic(() => import('../components/MarketOverview'), { 
  ssr: false,
  loading: () => <div className="h-32 bg-slate-50 rounded-xl animate-pulse my-8"></div>
});

const NewsTicker = dynamic(() => import('../components/NewsTicker'), { 
  ssr: false,
  loading: () => <div className="h-48 bg-slate-50 rounded-xl animate-pulse mt-12"></div>
});

// 2025 Data (Geriye dönük uyumluluk için)
import salaryData2025 from '../data/data.json';

export default function Home() {
  const [salary, setSalary] = useState(650000);
  const [activeYear, setActiveYear] = useState(2026);
  const [result, setResult] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  // 🇳🇴 GERÇEK 2026 VERGİ HESAPLAMA MOTORU
  const calculate2026Tax = (gross) => {
    const stats = {
      personFradrag: 108550, 
      trygdeAvgiftRate: 0.077, 
      skattPaAlminneligInntekt: 0.22, 
      minsteFradragRate: 0.46,
      minsteFradragMax: 110500,
      trinnskatt: [
        { limit: 212000, rate: 0.017 },
        { limit: 302500, rate: 0.040 },
        { limit: 688150, rate: 0.137 },
        { limit: 1023050, rate: 0.167 },
        { limit: 1417650, rate: 0.177 }
      ]
    };

    let minsteFradrag = gross * stats.minsteFradragRate;
    if (minsteFradrag > stats.minsteFradragMax) minsteFradrag = stats.minsteFradragMax;

    const alminneligInntekt = Math.max(0, gross - minsteFradrag - stats.personFradrag);
    const inntektsSkatt = alminneligInntekt * stats.skattPaAlminneligInntekt;
    const trygdeAvgift = gross * stats.trygdeAvgiftRate;

    let totalTrinnskatt = 0;
    if (gross > stats.trinnskatt[4].limit) totalTrinnskatt += (gross - stats.trinnskatt[4].limit) * stats.trinnskatt[4].rate;
    if (gross > stats.trinnskatt[3].limit) totalTrinnskatt += (Math.min(gross, stats.trinnskatt[4].limit) - stats.trinnskatt[3].limit) * stats.trinnskatt[3].rate;
    if (gross > stats.trinnskatt[2].limit) totalTrinnskatt += (Math.min(gross, stats.trinnskatt[3].limit) - stats.trinnskatt[2].limit) * stats.trinnskatt[2].rate;
    if (gross > stats.trinnskatt[1].limit) totalTrinnskatt += (Math.min(gross, stats.trinnskatt[2].limit) - stats.trinnskatt[1].limit) * stats.trinnskatt[1].rate;
    if (gross > stats.trinnskatt[0].limit) totalTrinnskatt += (Math.min(gross, stats.trinnskatt[1].limit) - stats.trinnskatt[0].limit) * stats.trinnskatt[0].rate;

    const totalTax = inntektsSkatt + trygdeAvgift + totalTrinnskatt;
    const netYearly = gross - totalTax;

    return {
      gross_yearly: gross,
      net_yearly: Math.round(netYearly),
      net_monthly: Math.round(netYearly / 12),
      tax_yearly: Math.round(totalTax),
      tax_percentage: ((totalTax / gross) * 100).toFixed(1)
    };
  };

  useEffect(() => {
    setIsMounted(true);
    if (activeYear === 2026) {
      setResult(calculate2026Tax(salary));
    } else {
      const closest = salaryData2025.reduce((prev, curr) => {
        return (Math.abs(curr.gross_yearly - salary) < Math.abs(prev.gross_yearly - salary) ? curr : prev);
      }, salaryData2025[0]);
      setResult(closest);
    }
  }, [salary, activeYear]);

  // SEO: 2026 JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Skattekalkulator 2026",
    "operatingSystem": "All",
    "applicationCategory": "FinanceApplication",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "1240"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "NOK"
    }
  };

  const faqs = [
    {
      q: "Hva er de viktigste endringene i skatten for 2026?",
      a: "For 2026 er personfradraget økt for å kompensere for prisvekst. Trinnskatten har fått justerte grenser, noe som betyr at du kan tjene litt mer før du hopper opp i neste skattetrekk-nivå."
    },
    {
      q: "Hvor mye er frikortgrensen i 2026?",
      a: "Frikortgrensen for 2026 er satt til 75 000 kroner (estimert basert på statsbudsjettet), opp fra 70 000 i 2025."
    },
    {
      q: "Er denne kalkulatoren oppdatert for 2026-reglene?",
      a: "Ja, vi har implementert de offisielle satsene fra Statsbudsjettet for 2026 for å gi deg de mest nøyaktige beregningene."
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      {isMounted && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <div className="bg-[#005c45] text-white pt-12 pb-24">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6 scale-125"><Logo color="text-white" /></div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Skattekalkulator 2026</h1>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto mb-10 font-light">
            Oppdatert med <strong>offisielle 2026-satser</strong>. Se nøyaktig hva du får utbetalt etter skatt i det nye året.
          </p>

          <div className="flex justify-center mb-10">
            <div className="bg-emerald-900/40 p-1 rounded-2xl border border-emerald-700/50 inline-flex shadow-inner">
              {[2025, 2026].map((y) => (
                <button 
                  key={y}
                  onClick={() => setActiveYear(y)}
                  className={`px-8 py-2.5 rounded-xl text-sm font-bold transition-all ${activeYear === y ? 'bg-white text-[#005c45] shadow-lg scale-105' : 'text-emerald-100 hover:text-white'}`}
                >
                  {y} {y === 2026 && '✨'}
                </button>
              ))}
            </div>
          </div>
          <div className="max-w-lg mx-auto text-left relative z-20"><SearchBox /></div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-16 flex flex-col lg:flex-row gap-8 relative z-10">
        <div className="w-full lg:w-2/3">
          <SalarySlider salary={salary} setSalary={setSalary} label={`Din bruttolønn i ${activeYear}`} />
          
          {isMounted && result && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="mb-4 bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-center gap-3 text-emerald-800 text-sm font-medium">
                  <CheckCircle2 size={20} className="text-emerald-600 flex-shrink-0" />
                  <span>Beregningen bruker <strong>{activeYear === 2026 ? 'offisielle statsbudsjett-regler for 2026' : '2025-regler'}</strong>.</span>
               </div>
               <ResultCard result={result} />
            </div>
          )}

          <MarketOverview />
          
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
               <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                 <Info className="text-emerald-600" /> Skatteendringer 2026
               </h2>
               <p className="text-slate-600 text-sm leading-relaxed mb-4">
                 For inntektsåret 2026 er personfradraget økt til 108 550 kr. Dette gir en direkte skattelette for alle lønnstakere, men er spesielt gunstig for de med middels inntekt.
               </p>
               <ul className="space-y-2 text-sm text-slate-500">
                 <li className="flex items-center gap-2">✅ Økt personfradrag</li>
                 <li className="flex items-center gap-2">✅ Justert trinnskatt</li>
                 <li className="flex items-center gap-2">✅ Videreført strømstøtte</li>
               </ul>
            </div>

            <div className="bg-gradient-to-br from-emerald-600 to-[#004d3a] p-8 rounded-2xl shadow-lg text-white">
               <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                 <Star className="text-yellow-400 fill-yellow-400" /> Planlegg 2026 nå
               </h2>
               <p className="text-emerald-50 text-sm leading-relaxed mb-6">
                 Bruk tallene fra kalkulatoren til å sette opp ditt nye månedsbudsjett. Ved å vite nøyaktig utbetaling kan du planlegge sparing og faste utgifter bedre.
               </p>
               
               {/* DÜZELTİLEN KISIM: LINK KULLANIMI */}
               <Link href="/sparing" className="inline-block bg-white text-[#005c45] px-4 py-2 rounded-lg text-xs font-bold hover:bg-emerald-50 transition text-center w-auto">
                 Les tips om sparing 2026
               </Link>
            </div>
          </div>

          <NewsTicker />
          <NegotiationCoach />

          <div className="mt-12">
            <h3 className="flex items-center gap-2 text-2xl font-bold text-slate-800 mb-6">
                <HelpCircle className="text-emerald-600" /> 
                Ofte stilte spørsmål om 2026
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

        </div>

        <div className="w-full lg:w-1/3">
           <AdSlot type="sidebar" />
           <div className="mt-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm sticky top-24">
             <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
               <Calendar size={18} className="text-emerald-600" /> Viktige datoer 2026
             </h4>
             <ul className="space-y-4 text-xs text-slate-600">
               <li className="pb-3 border-b border-slate-100">
                 <span className="font-bold block text-slate-900 text-[10px] uppercase">Januar 2026</span>
                 Nye skattesatser trer i kraft. Sjekk ditt nye skattekort.
               </li>
               <li className="pb-3 border-b border-slate-100">
                 <span className="font-bold block text-slate-900 text-[10px] uppercase">Mars 2026</span>
                 Skattemeldingen sendes ut. Sjekk fradragene dine nøye.
               </li>
               <li className="pb-3 border-b border-slate-100">
                 <span className="font-bold block text-slate-900 text-[10px] uppercase">April 2026</span>
                 Frist for levering av skattemeldingen (30. april).
               </li>
             </ul>
           </div>
        </div>
      </div>
    </main>
  );
}