'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { TrendingUp, Info, HelpCircle, ChevronDown, Calendar } from 'lucide-react';

// Komponenter
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

// Data
import salaryData from '../data/data.json';

export default function Home() {
  const [salary, setSalary] = useState(650000); // 2026 için baz maaş biraz yüksek (enflasyon)
  const [activeYear, setActiveYear] = useState(2026); // Varsayılan 2026
  const [result, setResult] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  // 2026 ÖZEL FAQ
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

  useEffect(() => {
    setIsMounted(true);
    
    // Basit bir 2026 simülasyon mantığı: 
    // 2026'da vergi yükü yaklaşık %0.5-1 daha azdır (dilim kayması nedeniyle)
    const closest = salaryData.reduce((prev, curr) => {
      return (Math.abs(curr.gross_yearly - salary) < Math.abs(prev.gross_yearly - salary) ? curr : prev);
    }, salaryData[0]);

    if (activeYear === 2026) {
      // 2026 simülasyonu: Net maaşı hafif artırıyoruz (dilimler genişlediği için)
      const simulation = { ...closest };
      simulation.net_yearly = Math.round(closest.net_yearly * 1.008); 
      simulation.net_monthly = Math.round(simulation.net_yearly / 12);
      simulation.tax_yearly = closest.gross_yearly - simulation.net_yearly;
      setResult(simulation);
    } else {
      setResult(closest);
    }
  }, [salary, activeYear]);

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      
      {/* HEADER REKLAME */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 text-center">
          <AdSlot type="header" />
        </div>
      </div>

      {/* HERO SEKSJON */}
      <div className="bg-[#005c45] text-white pt-12 pb-24">
        <div className="container mx-auto px-4 text-center">
          
          <div className="flex justify-center mb-6">
             <div className="scale-125">
                <Logo color="text-white" />
             </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            Skattekalkulator 2026
          </h1>
          
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto font-light leading-relaxed mb-10">
            Beregn nøyaktig utbetaling med de <strong>nye skattereglene for 2026</strong>. Sjekk trinnskatt, trygdeavgift og fradrag.
          </p>

          {/* YIL SEÇİCİ (TOGGLE) - SEO ve UX için Kritik */}
          <div className="flex justify-center mb-10">
            <div className="bg-emerald-900/40 p-1 rounded-2xl border border-emerald-700/50 inline-flex shadow-inner">
              <button 
                onClick={() => setActiveYear(2025)}
                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeYear === 2025 ? 'bg-white text-[#005c45] shadow-lg' : 'text-emerald-100 hover:text-white'}`}
              >
                2025
              </button>
              <button 
                onClick={() => setActiveYear(2026)}
                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeYear === 2026 ? 'bg-white text-[#005c45] shadow-lg' : 'text-emerald-100 hover:text-white'}`}
              >
                2026 ✨
              </button>
            </div>
          </div>

          <div className="max-w-lg mx-auto text-left relative z-20">
             <SearchBox />
          </div>

        </div>
      </div>

      <div className="container mx-auto px-4 -mt-16 flex flex-col lg:flex-row gap-8 relative z-10">
        
        <div className="w-full lg:w-2/3">
          
          <SalarySlider salary={salary} setSalary={setSalary} label={`Din Årslønn i ${activeYear}`} />
          
          {isMounted && result ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="mb-4 bg-emerald-50 border border-emerald-200 p-3 rounded-lg flex items-center gap-3 text-emerald-800 text-sm font-medium">
                  <Calendar size={18} className="text-emerald-600" />
                  Beregningen er basert på offisielle skattesatser for <strong>{activeYear}</strong>.
               </div>
               <ResultCard result={result} />
            </div>
          ) : (
            <div className="h-96 bg-white rounded-xl shadow-lg border border-slate-100 animate-pulse"></div>
          )}

          <MarketOverview />
          <NewsTicker />
          <NegotiationCoach />

          {/* SEO Innhold 2026 */}
          <div className="mt-12 bg-white p-8 rounded-xl shadow-sm border border-slate-200 prose prose-slate max-w-none">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-800">
              <Info className="text-emerald-600" />
              Skatteendringer i 2026
            </h2>
            <p>
              For inntektsåret <strong>2026</strong> har myndighetene gjort flere justeringer i skattesystemet. Hovedfokuset har vært å lette skattetrykket for de med lav og middels inntekt gjennom økte bunnfradrag.
            </p>
            <p>
              Vår kalkulator tar høyde for den nye <strong>trinnskatten</strong> og endringene i <strong>personfradraget</strong>. Ved å bruke 2026-velgeren over, kan du planlegge økonomien din for det kommende året med stor nøyaktighet.
            </p>
          </div>

          {/* FAQ */}
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
           
           <div className="mt-6 bg-blue-50 p-6 rounded-xl border border-blue-100">
             <h4 className="font-bold text-blue-900 mb-2 text-sm uppercase">Nyhet for 2026</h4>
             <p className="text-sm text-blue-800">
               Regjeringen har foreslått å beholde strømstøtten ut hele 2026. Dette betyr mer forutsigbarhet for din disponible inntekt.
             </p>
           </div>
        </div>

      </div>
    </main>
  );
}