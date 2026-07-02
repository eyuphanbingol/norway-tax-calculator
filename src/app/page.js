import Link from 'next/link';
import Calculator from '../components/Calculator';
import AdSlot from '../components/AdSlot';
import { RATES_2026, fmt, SALARY_PAGES, salarySlug, beregnSkatt } from '../lib/tax';
import { DOMAIN } from '../lib/constants';

export const metadata = {
  title: 'Lønn etter skatt 2026 – Skattekalkulator Norge',
  description:
    'Hvor mye får du utbetalt i 2026? Gratis skattekalkulator med vedtatte satser: trinnskatt, trygdeavgift 7,6 %, minstefradrag 95 700 kr og personfradrag 114 540 kr.',
  alternates: { canonical: DOMAIN },
};

const faq = [
  {
    q: 'Hvor mye skatt betaler jeg av lønnen min i 2026?',
    a: 'Det avhenger av inntekten. En årslønn på 600 000 kr gir cirka 144 000 kr i skatt (24 prosent) og 456 000 kr utbetalt. Skatten består av 22 prosent på alminnelig inntekt, 7,6 prosent trygdeavgift og trinnskatt.',
  },
  {
    q: 'Hva er nytt i skatten for 2026?',
    a: 'Trygdeavgiften på lønn er redusert til 7,6 prosent, personfradraget er økt til 114 540 kr, minstefradraget til maks 95 700 kr, og innslagspunktene i trinnskatten er justert opp. I tillegg starter forsøksordningen med arbeidsfradrag for unge.',
  },
  {
    q: 'Er kalkulatoren gratis og nøyaktig?',
    a: 'Kalkulatoren er gratis og bruker satsene vedtatt av Stortinget for 2026. Den beregner med standard fradrag; individuelle fradrag som renter og pendling kan gi lavere skatt. Tallene er veiledende.',
  },
  {
    q: 'Hva er marginalskatt?',
    a: 'Marginalskatt er skatten på den siste kronen du tjener – altså det en lønnsøkning skattlegges med. I 2026 varierer den fra 29,6 prosent på lave inntekter til maksimalt 47,4 prosent på inntekt over 1 467 200 kr.',
  },
];

export default function Home() {
  const example = beregnSkatt(600000);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Skattekalkulator Norge',
        url: DOMAIN,
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'NOK' },
      },
      {
        '@type': 'FAQPage',
        mainEntity: faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero: kalkulatoren ER siden */}
      <section className="bg-fjord text-white">
        <div className="max-w-5xl mx-auto px-4 pt-12 pb-20 text-center">
          <h1 className="display text-3xl sm:text-5xl font-extrabold leading-tight mb-3">
            Lønn etter skatt <span className="text-krone">2026</span>
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            Skriv inn årslønnen din og se nøyaktig hva du får utbetalt – med de vedtatte
            skattesatsene for 2026.
          </p>
        </div>
      </section>
      <section className="max-w-3xl mx-auto px-4 -mt-14">
        <Calculator />
      </section>

      <AdSlot type="header" />

      {/* Populære lønnsnivåer */}
      <section className="max-w-5xl mx-auto px-4 mt-14">
        <h2 className="display text-2xl font-bold mb-4">Populære lønnsnivåer</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[450000, 550000, 600000, 650000, 700000, 750000, 800000, 900000].map((g) => {
            const r = beregnSkatt(g);
            return (
              <Link
                key={g}
                href={`/lonn/${salarySlug(g)}`}
                className="bg-white border border-mist rounded-xl p-4 hover:border-netto transition"
              >
                <p className="tnum font-bold">{fmt(g)} kr</p>
                <p className="tnum text-sm text-netto font-semibold">→ {fmt(r.netto)} kr netto</p>
              </Link>
            );
          })}
        </div>
        <p className="mt-3 text-sm">
          <Link href="/lonn" className="text-netto underline">
            Se hele tabellen fra {fmt(SALARY_PAGES[0])} til {fmt(SALARY_PAGES[SALARY_PAGES.length - 1])} kr →
          </Link>
        </p>
      </section>

      {/* Forklarende innhold */}
      <section className="max-w-3xl mx-auto px-4 mt-14 prose-no">
        <h2>Slik beregnes skatten din i 2026</h2>
        <p>
          Skatten på vanlig lønnsinntekt i Norge består av tre deler. Først betaler du{' '}
          <strong>22 prosent skatt på alminnelig inntekt</strong> – det vil si lønnen din minus
          minstefradraget (46 prosent, maks {fmt(RATES_2026.minstefradragMaks)} kr) og
          personfradraget ({fmt(RATES_2026.personfradrag)} kr). Deretter kommer{' '}
          <strong>trygdeavgiften på 7,6 prosent</strong> av hele bruttolønnen, som finansierer
          folketrygden. Til slutt betaler du <strong>trinnskatt</strong> – en progressiv skatt med
          fem trinn fra 1,7 til 17,8 prosent som bare beregnes av inntekt over innslagspunktene.
        </p>
        <p>
          For en årslønn på 600 000 kr blir totalen {fmt(example.totalSkatt)} kr i skatt – en
          effektiv skattesats på {example.skattProsent} prosent – og {fmt(example.netto)} kr
          utbetalt, eller {fmt(example.nettoMnd)} kr i måneden. Les mer om{' '}
          <Link href="/blog/trinnskatt-2026">hvordan trinnskatten fungerer</Link> og{' '}
          <Link href="/blog/marginalskatt-2026">hva en lønnsøkning faktisk er verdt</Link>.
        </p>
        <h2>Nytt i 2026</h2>
        <ul>
          <li>Trygdeavgiften på lønn er redusert fra 7,7 til 7,6 prosent</li>
          <li>Personfradraget er økt fra 108 550 til 114 540 kr</li>
          <li>Minstefradragets tak er hevet til 95 700 kr</li>
          <li>Reisefradraget er kraftig utvidet: sats 1,90 kr/km og tak 120 000 kr</li>
          <li>
            100 000 tilfeldig utvalgte unge får{' '}
            <Link href="/blog/arbeidsfradrag-for-unge-2026">arbeidsfradrag på inntil 125 000 kr</Link>
          </li>
        </ul>
      </section>

      <AdSlot type="content" />

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 mt-10">
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
    </main>
  );
}
