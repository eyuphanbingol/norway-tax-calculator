import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Building2, TrendingUp, ArrowRight, Search } from 'lucide-react';
import CityCalculatorWrapper from '../../../components/CityCalculatorWrapper';
import AdSlot from '../../../components/AdSlot';
import cityData from '../../../data/cities.json';
import professionData from '../../../data/professions.json';

export async function generateStaticParams() {
  return cityData.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const data = cityData.find((d) => d.slug === resolvedParams.slug);
  if (!data) return { title: 'Sted ikke funnet' };
  const canonicalUrl = `https://norway-tax-calculator.vercel.app/sted/${resolvedParams.slug}`;
  return {
    title: data.title,
    description: data.meta_description,
    alternates: { canonical: canonicalUrl },
    openGraph: { title: data.title, description: data.meta_description, url: canonicalUrl, type: 'article' },
  };
}

export default async function CityPage({ params }) {
  const resolvedParams = await params;
  const data = cityData.find((d) => d.slug === resolvedParams.slug);
  if (!data) return notFound();

  const randomProfessions = professionData.sort(() => 0.5 - Math.random()).slice(0, 6);
  const cityLower = data.city_name.toLowerCase();

  // --- ANAHTAR KELİME LİSTESİ ---
  const keywords = [
    `${cityLower} lønn`, `skatt i ${cityLower}`, `snittlønn ${cityLower}`, 
    `jobber i ${cityLower}`, `levekostnader ${cityLower}`, `${cityLower} kommune skatt`,
    `inntekt ${cityLower} 2025`, `flytte til ${cityLower}`
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: data.city_name,
    address: { '@type': 'PostalAddress', addressRegion: data.region, addressCountry: 'NO' },
    mainEntity: { '@type': 'FAQPage', mainEntity: data.faq_schema.map(faq => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) }
  };

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="bg-white border-b border-slate-200"><div className="container mx-auto px-4"><AdSlot type="header" /></div></div>

      <div className="bg-[#005c45] text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2 opacity-90"><MapPin size={20} /><span className="uppercase tracking-widest text-sm font-semibold">{data.region}</span></div>
          <h1 className="text-3xl md:text-5xl font-black mb-4">Lønn etter skatt i {data.city_name}</h1>
          <p className="text-emerald-100 max-w-2xl mx-auto">Bor og jobber du i {data.city_name}? Bruk vår lokale kalkulator for å se din utbetaling.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-2/3">
             <CityCalculatorWrapper cityName={data.city_name} />
             
             <div className="mt-12 bg-white p-8 rounded-xl border border-slate-200 prose prose-slate max-w-none">
                <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-800"><Building2 className="text-emerald-600" /> Skatt og Lønn i {data.city_name}</h2>
                <p>For innbyggere i <strong>{data.city_name}</strong> gjelder de nasjonale skattereglene for 2025.</p>
                <div className="not-prose mt-6 bg-slate-50 p-6 rounded-lg">
                    <h3 className="font-bold text-slate-800 mb-4">Ofte stilte spørsmål om {data.city_name}</h3>
                    <div className="space-y-4">
                        {data.faq_schema.map((faq, i) => (
                            <div key={i}>
                                <p className="font-semibold text-sm text-slate-900">{faq.question}</p>
                                <p className="text-sm text-slate-600">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
             </div>

             <div className="mt-8"><h3 className="flex items-center gap-2 text-lg font-bold text-slate-800 mb-4"><TrendingUp size={18} className="text-emerald-600"/> Populære yrker i {data.city_name}</h3><div className="grid grid-cols-2 gap-3">{randomProfessions.map(job => (<Link key={job.slug} href={`/yrke/${job.slug}`} className="flex justify-between items-center p-3 bg-white border border-slate-200 rounded hover:border-emerald-500 hover:text-emerald-700 transition"><span className="text-sm font-medium">{job.job_title}</span><ArrowRight size={14} className="text-slate-300" /></Link>))}</div></div>

             {/* --- YENİ: KEYWORD CLOUD (Relaterte søk) --- */}
             <div className="mt-12 pt-8 border-t border-slate-200">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Search size={14}/> Relaterte søk
                </h4>
                <div className="flex flex-wrap gap-2">
                    {keywords.map((kw, i) => (
                        <span key={i} className="px-3 py-1 bg-slate-100 text-slate-500 text-xs rounded-full border border-slate-200">
                            {kw}
                        </span>
                    ))}
                </div>
             </div>
          </div>
          <div className="w-full lg:w-1/3 mt-8 lg:mt-0"><AdSlot type="sidebar" /></div>
        </div>
      </div>
    </main>
  );
}