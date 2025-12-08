import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Briefcase, ArrowRight } from 'lucide-react';
import AdSlot from '../../../components/AdSlot';
import SalarySlider from '../../../components/SalarySlider'; // Hesaplayıcıyı buraya da koyuyoruz
import ResultCard from '../../../components/ResultCard';
import comboData from '../../../data/combinations.json';

export async function generateStaticParams() {
  return comboData.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const data = comboData.find((d) => d.slug === resolvedParams.slug);
  if (!data) return { title: 'Side ikke funnet' };

  return {
    title: data.title,
    description: data.meta_description,
  };
}

export default async function ComboPage({ params }) {
  const resolvedParams = await params;
  const data = comboData.find((d) => d.slug === resolvedParams.slug);

  if (!data) return notFound();

  // Simüle edilmiş sonuç verisi (Slider için başlangıç)
  const simulatedResult = {
    gross_yearly: data.gross,
    net_yearly: data.net,
    net_monthly: Math.floor(data.net / 12),
    tax_yearly: data.tax,
    tax_percentage: Math.round((data.tax / data.gross) * 1000) / 10
  };

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-[#005c45] text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl md:text-4xl font-black mb-2">
            {data.job} i {data.city}: Lønn & Skatt
          </h1>
          <div className="flex justify-center gap-4 text-emerald-200 text-sm font-medium">
             <span className="flex items-center gap-1"><Briefcase size={14}/> {data.job}</span>
             <span className="flex items-center gap-1"><MapPin size={14}/> {data.city}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
           <div className="w-full lg:w-2/3">
              {/* Buraya ResultCard'ı statik veriyle koyuyoruz, kullanıcı Slider ile oynarsa değişsin diye 
                  State yönetimi yapmak lazım ama SSG için statik gösterim yeterli, altına link verelim */}
              
              <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200 mb-6">
                 <h2 className="text-lg font-bold text-slate-800 mb-4">Gjennomsnittstall for {data.city}</h2>
                 <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-4 bg-slate-50 rounded-lg">
                        <span className="block text-xs text-slate-500 uppercase">Bruttolønn</span>
                        <span className="block text-xl font-bold text-slate-900">{data.gross.toLocaleString()} kr</span>
                    </div>
                    <div className="p-4 bg-emerald-50 rounded-lg">
                        <span className="block text-xs text-emerald-600 uppercase">Utbetalt (Netto)</span>
                        <span className="block text-xl font-bold text-emerald-700">{data.net.toLocaleString()} kr</span>
                    </div>
                 </div>
                 <div className="mt-6">
                    <Link href="/" className="block w-full bg-slate-900 text-white text-center py-3 rounded-lg font-bold hover:bg-slate-800 transition">
                        Gå til detaljert kalkulator
                    </Link>
                 </div>
              </div>

              <div className="prose prose-slate max-w-none bg-white p-6 rounded-xl border border-slate-200">
                 <h3>Hva tjener en {data.job} i {data.city}?</h3>
                 <p>
                    Gjennomsnittslønnen for en <strong>{data.job}</strong> i {data.region}-området ligger på ca. <strong>{data.gross.toLocaleString()} kr</strong> i året.
                 </p>
                 <p>
                    Etter skatt (basert på skattetabell 2025) vil dette gi en utbetaling på ca. <strong>{data.net.toLocaleString()} kr</strong>.
                    Dette kan variere basert på dine fradrag (som boliglån eller BSU).
                 </p>
                 <p>
                    {data.city} er en populær by for {data.job.toLowerCase()}er, men levekostnadene i {data.region} bør også tas med i betraktningen.
                 </p>
              </div>
              
              <div className="my-8"><AdSlot type="native" /></div>
           </div>

           <div className="w-full lg:w-1/3">
              <AdSlot type="sidebar" />
           </div>
        </div>
      </div>
    </main>
  );
}