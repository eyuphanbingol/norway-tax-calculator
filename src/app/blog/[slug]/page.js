import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import AdSlot from '../../../components/AdSlot'; // 3 nokta (../../../)
import blogData from '../../../data/blog.json'; // 3 nokta (../../../) - DÜZELTİLEN YER

export async function generateStaticParams() {
  return blogData.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  // Next.js 15 Fix: params bir Promise'dir, await ile çözmeliyiz
  const resolvedParams = await params;
  const post = blogData.find((p) => p.slug === resolvedParams.slug);
  if (!post) return { title: 'Artikkel ikke funnet' };

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPost({ params }) {
  // Next.js 15 Fix
  const resolvedParams = await params;
  const post = blogData.find((p) => p.slug === resolvedParams.slug);

  if (!post) return notFound();

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4">
          <AdSlot type="header" />
        </div>
      </div>

      <article className="container mx-auto px-4 py-12 max-w-3xl">
        <Link href="/blog" className="inline-flex items-center text-sm text-slate-500 hover:text-emerald-600 mb-6 transition">
          <ArrowLeft size={16} className="mr-1" /> Tilbake til bloggen
        </Link>

        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
            <span className="flex items-center gap-1"><Clock size={14} /> {post.readTime}</span>
          </div>
        </header>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 prose prose-slate prose-lg max-w-none">
           {/* Satır başlarını (yeni paragrafları) algılaması için whitespace-pre-line kullanıyoruz */}
           <p className="text-slate-600 leading-relaxed whitespace-pre-line">
             {post.content}
           </p>

           <div className="my-8">
             <AdSlot type="native" />
           </div>
        </div>
      </article>
    </main>
  );
}