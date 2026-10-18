import { notFound } from 'next/navigation';
import Link from 'next/link';
import AdSlot from '../../../components/AdSlot';
import Block, { Sources } from '../../../components/ArticleBlock';
import AffiliateBox from '../../../components/AffiliateBox';
import { hellosafeNo } from '../../../lib/affiliates';
import { articles, getArticle } from '../../../data/articles';
import { DOMAIN, AUTHOR, SITE_NAME } from '../../../lib/constants';

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
    openGraph: {
      title: a.title,
      description: a.description,
      type: 'article',
      url: `${DOMAIN}/blog/${slug}`,
      siteName: SITE_NAME,
      locale: 'nb_NO',
      publishedTime: a.date,
      modifiedTime: a.updated || a.date,
    },
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return notFound();

  const url = `${DOMAIN}/blog/${a.slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: a.title,
        description: a.description,
        inLanguage: 'nb',
        datePublished: a.date,
        dateModified: a.updated || a.date,
        image: `${DOMAIN}/opengraph-image`,
        author: { '@type': 'Person', name: AUTHOR, url: `${DOMAIN}/om-oss` },
        publisher: { '@type': 'Organization', '@id': `${DOMAIN}/#org`, name: 'Skattekalkulator Norge', url: DOMAIN, logo: { '@type': 'ImageObject', url: `${DOMAIN}/icon.svg` } },
        mainEntityOfPage: url,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Guider', item: `${DOMAIN}/blog` },
          { '@type': 'ListItem', position: 2, name: a.title, item: url },
        ],
      },
    ],
  };
  // Sesongaktuelle guider først i «Les også»
  const PINNED = ['halv-skatt-i-desember-2026', 'skattekort-2027'];
  const related = [
    ...PINNED.map((s) => articles.find((x) => x.slug === s)).filter(Boolean),
    ...articles.filter((x) => !PINNED.includes(x.slug)),
  ].filter((x) => x.slug !== a.slug).slice(0, 4);

  const mid = Math.floor(a.body.length / 2);

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="text-sm text-fjord/75 mb-4">
        <Link href="/blog" className="hover:underline">Guider</Link>{' / '}{a.title}
      </nav>
      <h1 className="display text-3xl sm:text-4xl font-extrabold mb-2">{a.title}</h1>
      <p className="text-sm text-fjord/75 mb-8">
        Skrevet av <Link href="/om-oss" className="underline">{AUTHOR}</Link> · Oppdatert {new Date(a.updated || a.date).toLocaleDateString('nb-NO', { day: 'numeric', month: 'long', year: 'numeric' })} · {a.rates || '2026-satser'}
      </p>
      <article className="prose-no">
        {a.body.slice(0, mid).map((b, i) => <Block key={i} b={b} />)}
        <AdSlot type="content" />
        {a.body.slice(mid).map((b, i) => <Block key={mid + i} b={b} />)}
        <Sources sources={a.sources} />
      </article>
      <aside className="mt-10">
        <h2 className="display text-xl font-bold mb-3">Les også</h2>
        <ul className="space-y-2">
          {related.map((x) => (
            <li key={x.slug}>
              <Link href={`/blog/${x.slug}`} className="text-netto font-semibold hover:underline">{x.title}</Link>
            </li>
          ))}
        </ul>
      </aside>
      {a.slug === 'feriepenger-og-skatt' && (
        <AffiliateBox
        title="Skal du ut og reise for feriepengene?"
        text="Sjekk først om du allerede har reiseforsikring gjennom innboforsikringen, bankkortet eller kredittkortet. Trenger du egen forsikring – for eksempel for en lang reise eller aktiviteter som ikke dekkes – kan du sammenligne reiseforsikringer hos HelloSafe."
        cta="Sammenlign reiseforsikring hos HelloSafe →"
        href={hellosafeNo('feriepenger-artikkel')}
      />
      )}
      <div className="mt-10 bg-netto-soft rounded-2xl p-6 text-center">
        <p className="font-semibold mb-2">Hva sitter du igjen med av lønnen din?</p>
        <Link href="/" className="inline-block bg-netto text-white font-bold px-6 py-3 rounded-xl hover:opacity-90">
          Prøv skattekalkulatoren for 2026 →
        </Link>
      </div>
    </main>
  );
}
