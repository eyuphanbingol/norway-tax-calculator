import { notFound } from 'next/navigation';
import Link from 'next/link';
import AdSlot from '../../../../components/AdSlot';
import Block from '../../../../components/ArticleBlock';
import { guidesEn, getGuideEn } from '../../../../data/guides-en';
import { DOMAIN } from '../../../../lib/constants';

export const dynamicParams = false;

export async function generateStaticParams() {
  return guidesEn.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const g = getGuideEn(slug);
  if (!g) return { title: 'Not found' };
  return {
    title: { absolute: g.title },
    description: g.description,
    alternates: { canonical: `${DOMAIN}/en/guides/${slug}` },
    openGraph: { title: g.title, description: g.description, type: 'article', locale: 'en_GB' },
  };
}

export default async function GuidePage({ params }) {
  const { slug } = await params;
  const g = getGuideEn(slug);
  if (!g) return notFound();
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: g.title,
    description: g.description,
    inLanguage: 'en',
    datePublished: g.date,
    author: { '@type': 'Organization', name: 'Skattekalkulator Norge' },
    mainEntityOfPage: `${DOMAIN}/en/guides/${g.slug}`,
  };
  const mid = Math.floor(g.body.length / 2);
  return (
    <main lang="en" className="max-w-3xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="text-sm text-fjord/60 mb-4">
        <Link href="/en" className="hover:underline">Norway Tax Calculator</Link>{' / '}Guides
      </nav>
      <h1 className="display text-3xl sm:text-4xl font-extrabold mb-2">{g.title}</h1>
      <p className="text-sm text-fjord/50 mb-8">Updated 8 October 2026 · 2026 rules</p>
      <article className="prose-no">
        {g.body.slice(0, mid).map((b, i) => <Block key={i} b={b} />)}
        <AdSlot type="content" />
        {g.body.slice(mid).map((b, i) => <Block key={mid + i} b={b} />)}
      </article>
      <aside className="mt-10">
        <h2 className="display text-xl font-bold mb-3">More guides for working in Norway</h2>
        <ul className="space-y-2">
          {guidesEn.filter((x) => x.slug !== g.slug).map((x) => (
            <li key={x.slug}><Link href={`/en/guides/${x.slug}`} className="text-netto font-semibold hover:underline">{x.title}</Link></li>
          ))}
          <li><Link href="/en/paye-scheme-norway" className="text-netto font-semibold hover:underline">PAYE scheme in Norway 2026</Link></li>
          <li><Link href="/en/salary-after-tax" className="text-netto font-semibold hover:underline">Salary after tax in Norway – table</Link></li>
        </ul>
      </aside>
      <div className="mt-10 bg-netto-soft rounded-2xl p-6 text-center">
        <p className="font-semibold mb-2">How much will you take home after tax?</p>
        <Link href="/en" className="inline-block bg-netto text-white font-bold px-6 py-3 rounded-xl hover:opacity-90">Try the Norway tax calculator →</Link>
      </div>
    </main>
  );
}
