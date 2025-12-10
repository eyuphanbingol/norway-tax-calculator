import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image'; // Resim için gerekli
import { Calendar, Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown'; 
import AdSlot from '../../../components/AdSlot';
import blogData from '../../../data/blog.json';
import { DOMAIN } from '../../../lib/constants'; // Domain sabitini çekiyoruz

// Build hatası olmasın diye dinamik yapıyoruz
export const dynamicParams = true; 

export async function generateStaticParams() {
  return blogData.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const post = blogData.find((p) => p.slug === resolvedParams.slug);
  
  if (!post) return { title: 'Artikkel ikke funnet' };

  // Discover İçin Kritik: Resim URL'si tam yol olmalı
  const ogImageUrl = `${DOMAIN || 'https://skattekalkulator.com'}/blog/${post.slug}/opengraph-image`;

  return {
    title: post.title,
    description: post.excerpt,
    // Discover İçin Kritik: Büyük Resim Tanımlaması
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date, // Tarih sinyali
      authors: ['Skattekalkulator Norge Team'],
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [ogImageUrl],
    },
  };
}

export default async function BlogPost({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const post = blogData.find((p) => p.slug === slug);

  if (!post) return notFound();

  // --- TRAFİK ARTTIRICI: İLGİLİ YAZILARI SEÇ ---
  const relatedPosts = blogData
    .filter(p => p.slug !== slug)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  // Discover İçin Kritik: Resim URL'si
  const ogImageUrl = `${DOMAIN || 'https://skattekalkulator.com'}/blog/${post.slug}/opengraph-image`;

  // --- DISCOVER İÇİN ALTIN VURUŞ: NEWS ARTICLE SCHEMA ---
  // Google'ın makaleyi "Haber/İçerik" olarak anlaması için zorunlu.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle', 
    'headline': post.title,
    'image': [ogImageUrl],
    'datePublished': post.date, 
    'dateModified': post.date,
    'author': [{
        '@type': 'Organization',
        'name': 'Skattekalkulator Norge',
        'url': DOMAIN
    }],
    'publisher': {
        '@type': 'Organization',
        'name': 'Skattekalkulator Norge',
        'logo': {
          '@type': 'ImageObject',
          'url': `${DOMAIN}/favicon.ico` 
        }
    },
    'description': post.excerpt
  };

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      
      {/* Schema Verisini Sayfaya Göm */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Üst Reklam */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4">
          <AdSlot type="header" />
        </div>
      </div>

      <article className="container mx-auto px-4 py-12 max-w-3xl">
        {/* Geri Dön Linki */}
        <Link href="/blog" className="inline-flex items-center text-sm text-slate-500 hover:text-emerald-600 mb-6 transition">
          <ArrowLeft size={16} className="mr-1" /> Tilbake til bloggen
        </Link>

        {/* Başlık */}
        <header className="mb-8 text-center">
           <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
            {post.title}
          </h1>
          
          {/* --- DISCOVER İÇİN GÖRSEL (LCP OPTİMİZE EDİLDİ) --- */}
          <div className="relative w-full h-[300px] md:h-[400px] mb-8 rounded-2xl overflow-hidden shadow-lg border border-slate-200">
             <Image 
               src={`/blog/${slug}/opengraph-image`} // Next.js internal path
               alt={post.title}
               fill
               className="object-cover"
               priority={true} // LCP (Hız) için öncelikli yükle
               sizes="(max-width: 768px) 100vw, 800px" // Mobil için optimize et
             />
          </div>

          <div className="flex justify-center items-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
            <span className="flex items-center gap-1"><Clock size={14} /> {post.readTime}</span>
          </div>
        </header>

        {/* Makale İçeriği */}
        <div className="bg-white p-8 md:p-10 rounded-xl shadow-sm border border-slate-200">
           <div className="text-slate-700 leading-relaxed">
             <ReactMarkdown
               components={{
                 h2: ({node, ...props}) => <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4 border-b pb-2 border-slate-100" {...props} />,
                 h3: ({node, ...props}) => <h3 className="text-xl font-bold text-slate-800 mt-6 mb-3" {...props} />,
                 p: ({node, ...props}) => <p className="mb-4 text-lg leading-8" {...props} />,
                 ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-6 space-y-2 marker:text-emerald-500" {...props} />,
                 li: ({node, ...props}) => <li className="pl-1" {...props} />,
                 strong: ({node, ...props}) => <strong className="font-bold text-slate-900" {...props} />,
                 a: ({node, ...props}) => <a className="text-emerald-600 underline hover:text-emerald-700" {...props} />,
               }}
             >
               {post.content}
             </ReactMarkdown>
           </div>
           
           <div className="mt-12 pt-8 border-t border-slate-100">
             <AdSlot type="native" />
           </div>
        </div>

        {/* --- DWELL TIME BOOST: İLGİLİ YAZILAR --- */}
        <div className="mt-12">
          <h3 className="text-xl font-bold text-slate-800 mb-6 border-l-4 border-emerald-500 pl-3">
            Andre leser også
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {relatedPosts.map((related) => (
              <Link key={related.id} href={`/blog/${related.slug}`} className="group">
                <div className="bg-white p-4 rounded-xl border border-slate-200 h-full hover:border-emerald-500 transition shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mb-1 block">
                      {related.readTime} lesing
                    </span>
                    <h4 className="font-bold text-slate-800 text-sm mb-2 line-clamp-3 group-hover:text-emerald-700">
                      {related.title}
                    </h4>
                  </div>
                  <div className="flex items-center text-xs text-emerald-600 font-medium mt-3">
                    Les nå <ArrowRight size={12} className="ml-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </article>
    </main>
  );
}