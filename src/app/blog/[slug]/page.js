import { notFound } from 'next/navigation';
import Link from 'next/link';
import AdSlot from '../../../components/AdSlot';
import { articles, getArticle } from '../../../data/articles';
import { DOMAIN } from '../../../lib/constants';

export const dynamicParams = false;

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return { title: 'Side ikke funnet' };
  return {
    title: a.title,
    description: a.description,
    alternates: { canonical: `${DOMAIN}/blog/${slug}` },
    openGraph: { title: a.title, description: a.description, type: 'article' },
  };
}

function Block({ b }) {
  if (b.type === 'h2') return <h2>{b.text}</h2>;
  if (b.type === 'p') return <p>{b.text}</p>;
  if (b.type === 'ul') return <ul>{b.items.map((i) => <li key={i}>{i}</li>)}</ul>;
  if (b.type === 'table')
    return (
      <table>
        <thead><tr>{b.head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
        <tbody>{b.rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody>
      </table>
    );
  return null;
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.title,
    description: a.description,
    datePublished: a.date,
    author: { '@type': 'Organization', name: 'Skattekalkulator Norge' },
    mainEntityOfPage: `${DOMAIN}/blog/${a.slug}`,
  };

  const mid = Math.floor(a.body.length / 2);

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="text-sm text-fjord/60 mb-4">
        <Link href="/blog" className="hover:underline">Guider</Link>{' / '}{a.title}
      </nav>
      <h1 className="display text-3xl sm:text-4xl font-extrabold mb-2">{a.title}</h1>
      <p className="text-sm text-fjord/50 mb-8">
        Oppdatert {new Date(a.date).toLocaleDateString('nb-NO', { day: 'numeric', month: 'long', year: 'numeric' })} · 2026-satser
      </p>
      <article className="prose-no">
        {a.body.slice(0, mid).map((b, i) => <Block key={i} b={b} />)}
        <AdSlot type="content" />
        {a.body.slice(mid).map((b, i) => <Block key={mid + i} b={b} />)}
      </article>
      <div className="mt-10 bg-netto-soft rounded-2xl p-6 text-center">
        <p className="font-semibold mb-2">Hva sitter du igjen med av lønnen din?</p>
        <Link href="/" className="inline-block bg-netto text-white font-bold px-6 py-3 rounded-xl hover:opacity-90">
          Prøv skattekalkulatoren for 2026 →
        </Link>
      </div>
    </main>
  );
}
