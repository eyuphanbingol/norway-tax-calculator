import { notFound } from 'next/navigation';
import Link from 'next/link';
import Calculator from '../../../components/Calculator';
import AdSlot from '../../../components/AdSlot';
import {
  beregnSkatt, marginalskatt, fmt, pct, MONTHLY_PAGES, monthlySlug, slugToMonthly, SALARY_PAGES, salarySlug, RATES_2027_FORSLAG,
} from '../../../lib/tax';
import { DOMAIN } from '../../../lib/constants';

export const dynamicParams = false;

export async function generateStaticParams() {
  return MONTHLY_PAGES.map((m) => ({ slug: monthlySlug(m) }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const m = slugToMonthly(slug);
  if (!m || !MONTHLY_PAGES.includes(m)) return { title: 'Side ikke funnet' };
  const r = beregnSkatt(m * 12);
  return {
    title: `${fmt(m)} kr i måneden etter skatt 2026 – ca. ${fmt(r.nettoMnd)} kr utbetalt`,
    description: `Tjener du ${fmt(m)} kr i måneden i 2026? Da får du utbetalt ca. ${fmt(r.nettoMnd)} kr i snitt per måned etter skatt. Se vanlig trekk, halv skatt i desember og full beregning.`,
    alternates: { canonical: `${DOMAIN}/manedslonn/${slug}` },
  };
}

export default async function MonthlyPage({ params }) {
  const { slug } = await params;
  const m = slugToMonthly(slug);
  if (!m || !MONTHLY_PAGES.includes(m)) return notFound();

  const aar = m * 12;
  const r = beregnSkatt(aar);
  const marginal = marginalskatt(aar);
  const trekk = r.totalSkatt / 10.5;
  const raises = [1000, 2500, 5000].map((d) => ({ d, n: (beregnSkatt((m + d) * 12).netto - r.netto) / 12 }));
  const r27 = beregnSkatt(aar, RATES_2027_FORSLAG);
  const idx = MONTHLY_PAGES.indexOf(m);
  const prev = idx > 0 ? MONTHLY_PAGES[idx - 1] : null;
  const next = idx < MONTHLY_PAGES.length - 1 ? MONTHLY_PAGES[idx + 1] : null;
  const nearestYear = SALARY_PAGES.reduce((a, b) => (Math.abs(b - aar) < Math.abs(a - aar) ? b : a), SALARY_PAGES[0]);

  const faq = [
    { q: `Hvor mye er ${fmt(m)} kr i måneden etter skatt?`, a: `Med ${fmt(m)} kr i månedslønn (${fmt(aar)} kr i året) betaler du ca. ${fmt(r.totalSkatt)} kr i skatt i 2026. Det gir ca. ${fmt(r.nettoMnd)} kr i snitt per måned etter skatt, eller ${fmt(r.netto)} kr i året.` },
    { q: `Hvor mye trekkes i skatt av ${fmt(m)} kr i måneden?`, a: `Med standard fradrag og tabelltrekk trekkes det omtrent ${fmt(trekk)} kr i en vanlig måned, slik at du får rundt ${fmt(m - trekk)} kr utbetalt. Det nøyaktige trekket avhenger av tabellnummeret på skattekortet ditt.` },
    { q: `Hva er årslønnen når månedslønnen er ${fmt(m)} kr?`, a: `${fmt(m)} kr × 12 = ${fmt(aar)} kr i årslønn, uten feriepenger og overtid.` },
  ];
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="text-sm text-fjord/60 mb-4">
        <Link href="/" className="hover:underline">Kalkulator</Link>{' / '}
        <Link href="/manedslonn" className="hover:underline">Månedslønn</Link>{' / '}{fmt(m)} kr
      </nav>
      <h1 className="display text-3xl sm:text-4xl font-extrabold mb-2">{fmt(m)} kr i måneden etter skatt 2026</h1>
      <p className="text-lg text-fjord/80 mb-8">
        Utbetalt: <strong className="tnum text-netto">ca. {fmt(r.nettoMnd)} kr</strong> i snitt per måned
        · {pct(r.skattProsent)} % skatt
      </p>

      <Calculator initial={aar} monthly />

      <AdSlot type="content" />

      <div className="prose-no mt-10">
        <h2>Hva får du utbetalt de ulike månedene?</h2>
        <p>
          Skatten trekkes over ti og en halv måned. Derfor er trekket i en vanlig måned høyere enn
          snittet, mens juni (feriepenger) normalt er trekkfri og desember har halvt trekk.
          Tallene under er anslag med standard fradrag.
        </p>
        <table>
          <thead><tr><th>Måned</th><th>Skattetrekk (ca.)</th><th>Utbetalt (ca.)</th></tr></thead>
          <tbody>
            <tr><td>Vanlig måned</td><td>{fmt(trekk)} kr</td><td>{fmt(m - trekk)} kr</td></tr>
            <tr><td>Desember (halvt trekk)</td><td>{fmt(trekk / 2)} kr</td><td>{fmt(m - trekk / 2)} kr</td></tr>
            <tr><td>Snitt over året</td><td>{fmt(r.totalSkatt / 12)} kr</td><td>{fmt(r.nettoMnd)} kr</td></tr>
          </tbody>
        </table>

        <h2>Slik fordeler skatten seg på et år</h2>
        <table>
          <thead><tr><th>Post</th><th>Per år</th><th>Per måned</th></tr></thead>
          <tbody>
            <tr><td>Bruttolønn</td><td>{fmt(aar)} kr</td><td>{fmt(m)} kr</td></tr>
            <tr><td>Skatt på alminnelig inntekt (22 %)</td><td>{fmt(r.inntektsskatt)} kr</td><td>{fmt(r.inntektsskatt / 12)} kr</td></tr>
            <tr><td>Trygdeavgift (7,6 %)</td><td>{fmt(r.trygdeavgift)} kr</td><td>{fmt(r.trygdeavgift / 12)} kr</td></tr>
            <tr><td>Trinnskatt</td><td>{fmt(r.trinnskatt)} kr</td><td>{fmt(r.trinnskatt / 12)} kr</td></tr>
            <tr><td><strong>Utbetalt</strong></td><td><strong>{fmt(r.netto)} kr</strong></td><td><strong>{fmt(r.nettoMnd)} kr</strong></td></tr>
          </tbody>
        </table>
        <h2>Hva er et lønnstillegg verdt?</h2>
        <table>
          <thead><tr><th>Tillegg per måned</th><th>Mer utbetalt per måned (snitt)</th></tr></thead>
          <tbody>
            {raises.map((x) => (
              <tr key={x.d}><td>+{fmt(x.d)} kr</td><td>{fmt(x.n)} kr</td></tr>
            ))}
          </tbody>
        </table>
        <p>
          I 2027 blir skatten på samme lønn ca. {fmt((r.totalSkatt - r27.totalSkatt) / 12)} kr lavere per
          måned med regjeringens forslag til statsbudsjett (ikke vedtatt ennå) – se{' '}
          <Link href="/skattekalkulator-2027">skattekalkulatoren for 2027</Link>.
        </p>
        <p>
          Marginalskatten din er <strong>{pct(marginal)} prosent</strong>: av en lønnsøkning på 1 000 kr i
          måneden sitter du igjen med ca. {fmt(1000 - marginal * 10)} kr. Se også{' '}
          <Link href={`/lonn/${salarySlug(nearestYear)}`}>full oversikt for {fmt(nearestYear)} kr i årslønn</Link>,{' '}
          <Link href="/blog/halv-skatt-i-desember-2026">halv skatt i desember</Link> og{' '}
          <Link href="/blog/skattetabell-2026-tabelltrekk">tabelltrekk og skattekort</Link>.
        </p>
      </div>

      <div className="flex justify-between mt-10 text-sm font-semibold">
        {prev ? <Link href={`/manedslonn/${monthlySlug(prev)}`} className="text-netto hover:underline">← {fmt(prev)} kr</Link> : <span />}
        {next ? <Link href={`/manedslonn/${monthlySlug(next)}`} className="text-netto hover:underline">{fmt(next)} kr →</Link> : <span />}
      </div>
    </main>
  );
}
