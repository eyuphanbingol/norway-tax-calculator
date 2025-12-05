import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import AdSlot from '../../../components/AdSlot';
import blogData from '../../../data/blog.json';

// BU AYAR ÇOK ÖNEMLİ:
// Sayfa önceden üretilmemiş olsa bile, tıklandığında anında üretilmesini sağlar.
// Bu sayede 404 hatalarını önleriz.
export const dynamicParams = true; 

// 1. Statik Sayfaları Önceden Belirle (Build Hızı İçin)
export async function generateStaticParams() {
  return blogData.map((post) => ({
    slug: post.slug,
  }));
}

// 2. Dinamik SEO Başlıkları ve Açıklamaları
export async function generateMetadata({ params }) {
  // Next.js 15: params bir Promise'dir, await ile çözmeliyiz
  const resolvedParams = await params;
  const post = blogData.find((p) => p.slug === resolvedParams.slug);
  
  if (!post) return { title: 'Artikkel ikke funnet' };

  return {
    title: post.title,
    description: post.excerpt,
  };
}

// 3. Sayfa İçeriği
export default async function BlogPost({ params }) {
  // Next.js 15: params'ı await ile bekliyoruz
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  // Veriyi JSON dosyasından buluyoruz
  const post = blogData.find((p) => p.slug === slug);

  // Eğer yazı bulunamazsa 404 sayfasına yönlendir
  if (!post) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      
      {/* Üst Reklam Alanı */}
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

        {/* Başlık ve Meta Bilgiler */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
            <span className="flex items-center gap-1"><Clock size={14} /> {post.readTime}</span>
          </div>
        </header>

        {/* İçerik Alanı */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 prose prose-slate prose-lg max-w-none">
           {/* whitespace-pre-line: JSON'daki \n karakterlerini yeni satır yapar */}
           <p className="text-slate-600 leading-relaxed whitespace-pre-line">
             {post.content}
           </p>

           {/* İçerik İçi Reklam */}
           <div className="my-8">
             <AdSlot type="native" />
           </div>
        </div>
      </article>
    </main>
  );
}