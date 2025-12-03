'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calculator, TrendingUp, Info } from 'lucide-react';

// Bileşenleri çağırıyoruz
import SalarySlider from '../components/SalarySlider';
import ResultCard from '../components/ResultCard';
import AdSlot from '../components/AdSlot';

// Veriyi direkt import ediyoruz (Next.js bunu otomatik optimize eder)
import salaryData from '../data/data.json';

export default function Home() {
  const [salary, setSalary] = useState(600000); // Varsayılan: 600k
  const [result, setResult] = useState(null);

  // Maaş değiştikçe en yakın veriyi bul
  useEffect(() => {
    // Veri setinden en yakın maaşı bul (Binary search gerekmez, 300 kayıt hızlıdır)
    const closest = salaryData.reduce((prev, curr) => {
      return (Math.abs(curr.gross_yearly - salary) < Math.abs(prev.gross_yearly - salary) ? curr : prev);
    }, salaryData[0]);

    setResult(closest);
  }, [salary]);

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      
      {/* 1. HEADER REKLAMI (En Tepe) */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4">
          <AdSlot type="header" />
        </div>
      </div>

      {/* 2. HERO BÖLÜMÜ (Başlık) */}
      <div className="bg-[#005c45] text-white pt-12 pb-24">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4 opacity-80">
            <Calculator size={24} />
            <span className="font-semibold tracking-wide uppercase text-sm">Offisiell Skattekalkulator 2025</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            Hva blir lønnen etter skatt?
          </h1>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto font-light leading-relaxed">
            Beregn din nøyaktige utbetaling, skattetrekk og feriepenger med Norges mest oppdaterte verktøy for 2025.
            <br/>(Norveç'in en güncel 2025 aracıyla net maaşını hesapla.)
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-16 flex flex-col lg:flex-row gap-8 relative z-10">
        
        {/* --- SOL KOLON (Hesaplama) --- */}
        <div className="w-full lg:w-2/3">
          
          {/* SLIDER BİLEŞENİ */}
          <SalarySlider salary={salary} setSalary={setSalary} />

          {/* SONUÇ KARTI BİLEŞENİ */}
          <ResultCard result={result} />

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

          {/* PROGRAMMATIC SEO LİNKLERİ */}
          <div className="mt-12">
            <h3 className="flex items-center gap-2 text-xl font-bold mb-6 text-slate-800 border-b pb-2">
              <TrendingUp className="text-emerald-600" />
              Populære Lønnsberegninger
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {/* Sadece popüler aralıkları gösterelim (350k - 900k arası) */}
              {salaryData.filter(d => d.gross_yearly >= 350000 && d.gross_yearly <= 900000 && d.gross_yearly % 50000 === 0).map((item) => (
                <Link 
                  key={item.slug}
                  href={`/lonn/${item.slug}`} // DİKKAT: Artık dinamik sayfaya gidiyor!
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