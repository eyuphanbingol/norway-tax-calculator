import Link from 'next/link';
import { articles } from '../../data/articles';
import { DOMAIN } from '../../lib/constants';

export const metadata = {
  title: 'Guider: skatt, fradrag og lønn i 2026',
  description: 'Praktiske guider om norsk skatt i 2026: trinnskatt, marginalskatt, feriepenger, fradrag og den nye ordningen med arbeidsfradrag for unge.',
  alternates: { canonical: `${DOMAIN}/blog` },
};

export default function BlogIndex() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="display text-3xl font-extrabold mb-8">Guider om skatt og lønn</h1>
      <div className="space-y-4">
        {articles.map((a) => (
          <Link key={a.slug} href={`/blog/${a.slug}`}
            className="block bg-white border border-mist rounded-2xl p-5 hover:border-netto transition">
            <p className="text-xs text-fjord/50 mb-1">{new Date(a.date).toLocaleDateString('nb-NO', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            <h2 className="display font-bold text-lg mb-1">{a.title}</h2>
            <p className="text-sm text-fjord/75 leading-relaxed">{a.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
