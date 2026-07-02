import { notFound } from 'next/navigation';
import Link from 'next/link';
import Calculator from '../../../components/Calculator';
import AdSlot from '../../../components/AdSlot';
import {
  beregnSkatt, marginalskatt, hvilketTrinn, fmt,
  SALARY_PAGES, salarySlug, slugToSalary, AVG_SALARY, RATES_2026,
} from '../../../lib/tax';
import { DOMAIN } from '../../../lib/constants';

export const dynamicParams = false;

export async function generateStaticParams() {
  return SALARY_PAGES.map((g) => ({ slug: salarySlug(g) }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const gross = slugToSalary(slug);
  if (!gross || !SALARY_PAGES.includes(gross)) return { title: 'Side ikke funnet' };
  const r = beregnSkatt(gross);
  return {
    title: `${fmt(gross)} kr lønn etter skatt 2026 – ${fmt(r.netto)} kr utbetalt`,
    description: `Tjener du ${fmt(gross)} kr i 2026? Da får du utbetalt ca. ${fmt(r.netto)} kr etter skatt (${fmt(r.nettoMnd)} kr/mnd). Se full beregning av trinnskatt, trygdeavgift og fradrag.`,
    alternates: { canonical: `${DOMAIN}/lonn/${slug}` },
  };
}

export default async function SalaryPage({ params }) {
  const { slug } = await params;
  const gross = slugToSalary(slug);
  if (!gross || !SALARY_PAGES.includes(gross)) return notFound();

  const r = beregnSkatt(gross);
  const marginal = marginalskatt(gross);
  const trinn = hvilketTrinn(gross);
  const vsAvg = Math.round((gross / AVG_SALARY) * 100);
  const raise = beregnSkatt(gross + 50000);
  const raiseNet = raise.netto - r.netto;

  const idx = SALARY_PAGES.indexOf(gross);
  const prev = idx > 0 ? SALARY_PAGES[idx - 1] : null;
  const next = idx < SALARY_PAGES.length - 1 ? SALARY_PAGES[idx + 1] : null;

  const faq = [
    {
      q: `Hva er lønn etter skatt for ${fmt(gross)} kr i 2026?`,
      a: `Med en årslønn på ${fmt(gross)} kr sitter du igjen med ca. ${fmt(r.netto)} kr etter skatt, som tilsvarer ${fmt(r.nettoMnd)} kr per måned. Total skatt er ${fmt(r.totalSkatt)} kr (${r.skattProsent} %).`,
    },
    {
      q: `Hvor mye skatt betaler man av ${fmt(gross)} kr?`,
      a: `Skatten er ca. ${fmt(r.totalSkatt)} kr: ${fmt(r.inntektsskatt)} kr i skatt på alminnelig inntekt, ${fmt(r.trygdeavgift)} kr i trygdeavgift og ${fmt(r.trinnskatt)} kr i trinnskatt.`,
    },
    {
      q: `Hva er marginalskatten på ${fmt(gross)} kr?`,
      a: `Marginalskatten er ${marginal} prosent. Av en lønnsøkning på 50 000 kr ville du sittet igjen med ca. ${fmt(raiseNet)} kr netto.`,
    },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="text-sm text-fjord/60 mb-4">
        <Link href="/" className="hover:underline">Kalkulator</Link>
        {' / '}
        <Link href="/lonn" className="hover:underline">Lønnstabell</Link>
        {' / '}{fmt(gross)} kr
      </nav>

      <h1 className="display text-3xl sm:text-4xl font-extrabold mb-2">
        {fmt(gross)} kr – lønn etter skatt 2026
      </h1>
      <p className="text-lg text-fjord/80 mb-8">
        Utbetalt: <strong className="tnum text-netto">{fmt(r.netto)} kr</strong> per år
        (<span className="tnum">{fmt(r.nettoMnd)}</span> kr/mnd) · {r.skattProsent} % skatt
      </p>

      <Calculator initial={gross} />

      <AdSlot type="content" />

      <div className="prose-no mt-10">
        <h2>Slik fordeler skatten seg på {fmt(gross)} kr</h2>
        <table>
          <thead>
            <tr><th>Post</th><th>Beløp</th></tr>
          </thead>
          <tbody>
            <tr><td>Bruttolønn</td><td>{fmt(gross)} kr</td></tr>
            <tr><td>Minstefradrag</td><td>−{fmt(r.minstefradrag)} kr</td></tr>
            <tr><td>Personfradrag</td><td>−{fmt(RATES_2026.personfradrag)} kr</td></tr>
            <tr><td>Skatt på alminnelig inntekt (22 %)</td><td>{fmt(r.inntektsskatt)} kr</td></tr>
            <tr><td>Trygdeavgift (7,6 %)</td><td>{fmt(r.trygdeavgift)} kr</td></tr>
            <tr><td>Trinnskatt (trinn {trinn})</td><td>{fmt(r.trinnskatt)} kr</td></tr>
            <tr><td><strong>Sum skatt</strong></td><td><strong>{fmt(r.totalSkatt)} kr</strong></td></tr>
            <tr><td><strong>Utbetalt</strong></td><td><strong>{fmt(r.netto)} kr</strong></td></tr>
          </tbody>
        </table>

        <h2>Hvordan ligger {fmt(gross)} kr an i Norge?</h2>
        <p>
          En årslønn på {fmt(gross)} kr tilsvarer omtrent {vsAvg} prosent av en gjennomsnittlig
          norsk årslønn (rundt {fmt(AVG_SALARY)} kr).{' '}
          {gross < AVG_SALARY
            ? 'Lønnen ligger under gjennomsnittet, noe som er vanlig tidlig i karrieren og i mange service- og omsorgsyrker.'
            : gross < AVG_SALARY * 1.3
            ? 'Lønnen ligger rundt eller noe over gjennomsnittet – typisk for erfarne fagarbeidere, lærere, sykepleiere med tillegg og mange kontoryrker.'
            : 'Lønnen ligger klart over gjennomsnittet – vanlig blant ingeniører, IT-spesialister, ledere og andre med lang erfaring eller høy spesialisering.'}
        </p>
        <p>
          Med dette inntektsnivået er du i {trinn === 0 ? 'ingen trinnskattetrinn ennå' : `trinnskattens trinn ${trinn}`},
          og marginalskatten din er <strong>{marginal} prosent</strong>. Det betyr at en
          lønnsøkning på 50 000 kr ville gitt deg cirka {fmt(raiseNet)} kr mer utbetalt i året.
          Les mer om <Link href="/blog/marginalskatt-2026">marginalskatt og lønnsøkninger her</Link>.
        </p>

        <h2>Kan du betale mindre skatt?</h2>
        <p>
          Beregningen over bruker kun standardfradragene. Har du boliglån, pendler du langt, er du
          fagorganisert eller sparer du i IPS eller BSU, blir skatten lavere.{' '}
          <Link href="/blog/fradrag-du-ikke-ma-glemme-2026">Se fradragene mange glemmer</Link> –
          for en del lønnsmottakere utgjør de 5 000–15 000 kr i spart skatt.
        </p>
      </div>

      <div className="flex justify-between mt-10 text-sm font-semibold">
        {prev ? (
          <Link href={`/lonn/${salarySlug(prev)}`} className="text-netto hover:underline">
            ← {fmt(prev)} kr
          </Link>
        ) : <span />}
        {next ? (
          <Link href={`/lonn/${salarySlug(next)}`} className="text-netto hover:underline">
            {fmt(next)} kr →
          </Link>
        ) : <span />}
      </div>
    </main>
  );
}
