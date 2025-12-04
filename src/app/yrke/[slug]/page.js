import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Briefcase, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';

// Bileşenler (Mevcut bileşenleri tekrar kullanıyoruz!)
import ResultCard from '../../../components/ResultCard';
import AdSlot from '../../../components/AdSlot';

// Veri (Yeni oluşturduğumuz json)
import professionData from '../../../data/professions.json';

// 1. STATİK SAYFA ÜRETİMİ (SSG)
export async function generateStaticParams() {
  return professionData.map((item) => ({
    slug: item.slug,
  }));
}

// 2. DİNAMİK SEO BAŞLIKLARI
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const data = professionData.find((d) => d.slug === slug);

  if (!data) return { title: 'Yrke ikke funnet' };

  // DİNAMİK URL
  const siteUrl = 'https://norway-tax-calculator.vercel.app'; 
  const canonicalUrl = `${siteUrl}/yrke/${slug}`;

  return {
    title: `${data.title}`, // Örn: Sykepleier Lønn 2025
    description: data.meta_description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: data.title,
      description: data.meta_description,
      url: canonicalUrl,
      type: 'article',
    },
  };
}

// 3. SAYFA İÇERİĞİ
export default async function ProfessionPage({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const data = professionData.find((d) => d.slug === slug);

  if (!data) return notFound();

  // JSON-LD Schema (Meslek Sayfası)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Occupation',
    name: data.job_title,
    estimatedSalary: {
      '@type': 'MonetaryAmountDistribution',
      currency: 'NOK',
      median: data.gross_yearly
    },
    mainEntity: {
      '@type': 'FAQPage',
      mainEntity: data.faq_schema.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        }
      }))
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      
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
        
        {/* Breadcrumb */}
        <nav className="text-sm text-slate-500 mb-6">
          <Link href="/" className="hover:text-emerald-600">Hjem</Link> 
          <span className="mx-2">/</span> 
          <span className="text-emerald-800 font-semibold">{data.job_title} Lønn</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* SOL KOLON */}
          <div className="w-full lg:w-2/3">
            
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-emerald-100 text-emerald-600 rounded-full">
                <Briefcase size={24} />
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900">
                {data.job_title} Lønn 2025
              </h1>
            </div>

            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Lurer du på hva en <strong>{data.job_title}</strong> tjener i Norge? 
              Gjennomsnittslønnen er ca. <strong>{data.gross_yearly.toLocaleString()} kr</strong>. 
              Her ser du hva dette blir utbetalt etter skatt.
            </p>

            {/* SONUÇ KARTI (Mevcut bileşeni kullanıyoruz!) */}
            <ResultCard result={data} />

            {/* İçerik Alanı */}
            <div className="mt-12 space-y-8">
              
              <div className="bg-white p-6 md:p-8 rounded-xl border border-slate-200 prose prose-slate max-w-none">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <TrendingUp className="text-emerald-500" size={20} />
                  Lønnsutvikling for {data.job_title}
                </h2>
                <p>
                  Som {data.job_title.toLowerCase()} i Norge vil lønnen variere basert på erfaring (ansiennitet), 
                  arbeidssted (kommune vs. privat) og utdanning.
                </p>
                <p>
                  Beregningen over viser netto utbetaling basert på en gjennomsnittlig årslønn på {data.gross_yearly.toLocaleString()} kr 
                  uten spesielle fradrag.
                </p>
              </div>

              <AdSlot type="native" />

              <div className="bg-white p-6 md:p-8 rounded-xl border border-slate-200">
                <h2 className="text-xl font-bold text-slate-800 mb-4">Ofte stilte spørsmål (FAQ)</h2>
                <div className="space-y-4">
                  {data.faq_schema.map((faq, index) => (
                    <div key={index} className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                      <h3 className="font-bold text-slate-900 text-sm mb-1">{faq.question}</h3>
                      <p className="text-slate-600 text-sm">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Diğer Mesleklere Yönlendirme */}
            <div className="mt-12">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Sjekk andre yrker</h3>
              <div className="grid grid-cols-2 gap-3">
                {professionData.filter(p => p.slug !== data.slug).slice(0, 6).map(job => (
                  <Link 
                    key={job.slug} 
                    href={`/yrke/${job.slug}`}
                    className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded hover:border-emerald-500 hover:text-emerald-700 transition"
                  >
                    <span className="font-medium">{job.job_title}</span>
                    <ArrowRight size={16} className="text-slate-300" />
                  </Link>
                ))}
              </div>
            </div>

          </div>

          {/* SAĞ KOLON (Sidebar) */}
          <div className="w-full lg:w-1/3">
            <AdSlot type="sidebar" />
          </div>

        </div>
      </div>
    </main>
  );
}