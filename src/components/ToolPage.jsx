import Link from 'next/link';
import AdSlot from './AdSlot';

// Felles oppsett for verktøysidene: tittel, kalkulator, forklaring og FAQ
export default function ToolPage({ title, intro, children, faq = [], url }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebApplication', name: title, url, applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'NOK' } },
      ...(faq.length ? [{ '@type': 'FAQPage', mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }] : []),
    ],
  };
  const [calc, ...content] = Array.isArray(children) ? children : [children];
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="text-sm text-fjord/60 mb-4">
        <Link href="/verktoy" className="hover:underline">Verktøy</Link>{' / '}{title}
      </nav>
      <h1 className="display text-3xl sm:text-4xl font-extrabold mb-2">{title}</h1>
      <p className="text-lg text-fjord/80 mb-8">{intro}</p>
      {calc}
      <div className="prose-no mt-10">{content}</div>
      <AdSlot type="content" />
      {faq.length > 0 && (
        <section className="mt-10">
          <h2 className="display text-2xl font-bold mb-4">Ofte stilte spørsmål</h2>
          <div className="space-y-3">
            {faq.map((f) => (
              <details key={f.q} className="bg-white border border-mist rounded-xl p-4">
                <summary className="font-semibold cursor-pointer">{f.q}</summary>
                <p className="mt-2 text-fjord/80 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
