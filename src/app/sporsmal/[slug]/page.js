import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calculator, ArrowLeft, CheckCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import AdSlot from '../../../components/AdSlot';
import ResultCard from '../../../components/ResultCard'; // Hesaplama sonucunu göstermek için

import qaData from '../../../data/qa.json';

// Build hatası olmasın diye dinamik yapıyoruz
export const dynamicParams = true; 

export async function generateStaticParams() {
  return qaData.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const data = qaData.find((d) => d.slug === resolvedParams.slug);
  
  if (!data) return { title: 'Spørsmål ikke funnet' };

  return {
    title: data.title,
    description: `Lurer du på "${data.title}"? Her ser du nøyaktig utregning for 2025 med alle fradrag og satser.`,
  };
}

export default async function QuestionPage({ params }) {
  const resolvedParams = await params;
  const data = qaData.find((d) => d.slug === resolvedParams.slug);

  if (!data) return notFound();

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4">
          <AdSlot type="header" />
        </div>
      </div>

      <div className="bg-[#005c45] text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <Link href="/" className="inline-flex items-center text-emerald-200 hover:text-white mb-4 transition text-sm font-medium">
            <ArrowLeft size={16} className="mr-1" /> Tilbake til kalkulator
          </Link>
          <h1 className="text-2xl md:text-4xl font-black mb-2">
            {data.title}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="max-w-3xl mx-auto">
          
          {/* Cevap Kartı */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200 mb-8">
             <div className="prose prose-slate max-w-none prose-headings:text-slate-800 prose-a:text-emerald-600">
               <ReactMarkdown>{data.content}</ReactMarkdown>
             </div>
             
             {/* Görsel Sonuç Kartı (Maaş Verisi Varsa) */}
             {data.salary_data && (
                <div className="mt-8 not-prose">
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <CheckCircle size={16} className="text-emerald-500"/> Visuell Oversikt
                    </h3>
                    <ResultCard result={data.salary_data} />
                </div>
             )}

             <div className="mt-8 pt-8 border-t border-slate-100">
                <Link href="/" className="flex items-center justify-center gap-2 w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition shadow-md">
                    <Calculator size={20} />
                    Prøv kalkulatoren selv med din lønn
                </Link>
             </div>
          </div>

          <AdSlot type="native" />

        </div>
      </div>
    </main>
  );
}