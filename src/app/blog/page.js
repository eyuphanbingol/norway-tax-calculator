import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import AdSlot from '../../components/AdSlot';
import blogData from '../../data/blog.json';

export const metadata = {
  title: 'Blogg - Skattetips og Økonomi i Norge',
  description: 'Les våre nyeste artikler om lønn, skatt, feriepenger og økonomi i Norge.',
};

export default function BlogIndex() {
  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4">
          <AdSlot type="header" />
        </div>
      </div>

      <div className="bg-[#005c45] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-black mb-4">Skattebloggen</h1>
          <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
            Nyttige artikler om norsk økonomi, lønn og skatteregler.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-10 relative z-10">
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {blogData.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 h-full hover:shadow-md hover:border-emerald-500 transition duration-300">
                <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                </div>
                <h2 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-emerald-700 transition">
                  {post.title}
                </h2>
                <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center text-emerald-600 font-semibold text-sm group-hover:underline">
                  Les artikkel <ArrowRight size={16} className="ml-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}