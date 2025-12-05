import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, ArrowRight, MapPin, Briefcase, Calculator } from 'lucide-react';
import ReactMarkdown from 'react-markdown'; 
import AdSlot from '../../../components/AdSlot';
import blogData from '../../../data/blog.json';
import cityData from '../../../data/cities.json';
import professionData from '../../../data/professions.json';
import salaryData from '../../../data/data.json';

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

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPost({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const post = blogData.find((p) => p.slug === slug);

  if (!post) return notFound();

  // --- İÇ LİNKLEME PAKETİ OLUŞTURMA ---
  const randomCities = cityData.sort(() => 0.5 - Math.random()).slice(0, 3);
  const randomProfessions = professionData.sort(() => 0.5 - Math.random()).slice(0, 3);
  // Maaşlardan popüler olanları (yuvarlak rakamları) seçelim
  const randomSalaries = salaryData
    .filter(s => s.gross_yearly % 100000 === 0 && s.gross_yearly >= 400000 && s.gross_yearly <= 800000)
    .sort(() => 0.5 - Math.random())
    .slice(0, 2);

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

        <div className="bg-white p-8 md:p-10 rounded-xl shadow-sm border border-slate-200">
           <div className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-headings:text-slate-800 prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline prose-li:marker:text-emerald-500">
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

        {/* --- YENİ: İÇ LİNKLEME PAKETİ (Google Otoritesi İçin) --- */}
        <div className="mt-12">
          <h3 className="text-xl font-bold text-slate-800 mb-6 border-l-4 border-emerald-500 pl-3">
            Utforsk våre verktøy (Keşfedin)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Şehirler */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <h4 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                    <MapPin size={18} className="text-emerald-500"/> Lønn etter sted
                </h4>
                <div className="flex flex-wrap gap-2">
                    {randomCities.map(city => (
                        <Link key={city.slug} href={`/sted/${city.slug}`} className="text-sm bg-slate-50 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 px-3 py-1.5 rounded-md border border-slate-100 transition">
                            {city.city_name}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Meslekler */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <h4 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                    <Briefcase size={18} className="text-blue-500"/> Populære yrker
                </h4>
                <div className="flex flex-wrap gap-2">
                    {randomProfessions.map(job => (
                        <Link key={job.slug} href={`/yrke/${job.slug}`} className="text-sm bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-700 px-3 py-1.5 rounded-md border border-slate-100 transition">
                            {job.job_title}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Maaşlar */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm md:col-span-2">
                <h4 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                    <Calculator size={18} className="text-purple-500"/> Sjekk din lønn
                </h4>
                <div className="flex flex-wrap gap-3">
                    {randomSalaries.map(sal => (
                        <Link key={sal.slug} href={`/lonn/${sal.slug}`} className="flex items-center gap-2 text-sm bg-slate-50 hover:bg-purple-50 text-slate-600 hover:text-purple-700 px-4 py-2 rounded-md border border-slate-100 transition font-medium">
                            {sal.gross_yearly.toLocaleString()} kr <ArrowRight size={14} className="opacity-50"/>
                        </Link>
                    ))}
                </div>
            </div>

          </div>
        </div>

      </article>
    </main>
  );
}