import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Building2, Info } from 'lucide-react';

// Bileşenler (Ana sayfadaki hesaplayıcıyı buraya da koyuyoruz!)
import SalarySlider from '../../../components/SalarySlider'; // Slider'ı kullanacağız ama state'i burada yöneteceğiz
import CityCalculatorWrapper from '../../../components/CityCalculatorWrapper'; // Birazdan oluşturacağız
import AdSlot from '../../../components/AdSlot';

// Veri
import cityData from '../../../data/cities.json';

// 1. STATİK SAYFA ÜRETİMİ
export async function generateStaticParams() {
  return cityData.map((item) => ({
    slug: item.slug,
  }));
}

// 2. SEO
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const data = cityData.find((d) => d.slug === slug);

  if (!data) return { title: 'Sted ikke funnet' };

  const siteUrl = 'https://norway-tax-calculator.vercel.app'; 
  const canonicalUrl = `${siteUrl}/sted/${slug}`;

  return {
    title: data.title,
    description: data.meta_description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: data.title,
      description: data.meta_description,
      url: canonicalUrl,
      type: 'article',
    },
  };
}

// 3. SAYFA İÇERİĞİ
export default async function CityPage({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const data = cityData.find((d) => d.slug === slug);

  if (!data) return notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: data.city_name,
    address: {
      '@type': 'PostalAddress',
      addressRegion: data.region,
      addressCountry: 'NO'
    },
    mainEntity: {
        '@type': 'FAQPage',
        mainEntity: data.faq_schema.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer }
        }))
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HEADER REKLAM */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4">
          <AdSlot type="header" />
        </div>
      </div>

      <div className="bg-[#005c45] text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2 opacity-90">
             <MapPin size={20} />
             <span className="uppercase tracking-widest text-sm font-semibold">{data.region}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black mb-4">
            Lønn etter skatt i {data.city_name}
          </h1>
          <p className="text-emerald-100 max-w-2xl mx-auto">
            Bor og jobber du i {data.city_name}? Bruk vår lokale kalkulator for å se din utbetaling.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* SOL: HESAPLAYICI (Client Component) */}
          <div className="w-full lg:w-2/3">
             {/* Buraya Client Component Çağırıyoruz */}
             <CityCalculatorWrapper cityName={data.city_name} />

             {/* SEO İçerik */}
             <div className="mt-12 bg-white p-8 rounded-xl border border-slate-200 prose prose-slate max-w-none">
                <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-800">
                  <Building2 className="text-emerald-600" />
                  Skatt og Lønn i {data.city_name}
                </h2>
                <p>
                  For innbyggere i <strong>{data.city_name}</strong> gjelder de nasjonale skattereglene for 2025. 
                  Dette inkluderer inntektsskatt til kommune ({data.city_name}) og fylkeskommune.
                </p>
                <p>
                  Selv om skattesatsen er lik i store deler av Norge, kan lokale forhold som boligpriser i {data.region} påvirke din disponible inntekt.
                </p>
             </div>

             <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">Andre byer i nærheten</h3>
                <div className="flex flex-wrap gap-2">
                    {cityData.filter(c => c.region === data.region && c.name !== data.city_name).map(c => (
                        <Link key={c.slug} href={`/sted/${c.slug}`} className="bg-white px-4 py-2 rounded-full border hover:border-emerald-500 text-sm font-medium">
                            {c.city_name}
                        </Link>
                    ))}
                    <Link href="/" className="bg-slate-100 px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-200">
                        Se alle steder
                    </Link>
                </div>
             </div>
          </div>

          {/* SAĞ: SIDEBAR */}
          <div className="w-full lg:w-1/3 mt-8 lg:mt-0">
            <AdSlot type="sidebar" />
          </div>

        </div>
      </div>
    </main>
  );
}