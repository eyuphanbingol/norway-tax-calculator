import { notFound } from 'next/navigation';
import Link from 'next/link';
import Calculator from '../../../components/Calculator';
import AdSlot from '../../../components/AdSlot';
import {
  beregnSkatt, marginalskatt, hvilketTrinn, fmt,
  SALARY_PAGES, salarySlug, slugToSalary, AVG_SALARY, MEDIAN_SALARY, RATES_2026, pct, RATES_2027_FORSLAG } from '../../../lib/tax';
import { DOMAIN } from '../../../lib/constants';
import { articles } from '../../../data/articles';

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
  const raise = beregnSkatt(gross + 50000);
  const raiseNet = raise.netto - r.netto;

  // Unikt innhold per lønnsnivå: trinnskatt trinn for trinn, lønnsøkning og 2027
  const t = RATES_2026.trinnskatt;
  const trinnRows = t
    .map((x, i) => {
      const to = i + 1 < t.length ? t[i + 1].over : Infinity;
      if (gross <= x.over) return null;
      const del = Math.min(gross, to) - x.over;
      return { i: i + 1, sats: x.sats, del, skatt: del * x.sats };
    })
    .filter(Boolean);
  const raises = [25000, 50000, 100000].map((d) => {
    const n = beregnSkatt(gross + d).netto - r.netto;
    return { d, n, keep: Math.round((n / d) * 1000) / 10 };
  });
  const r27 = beregnSkatt(gross, RATES_2027_FORSLAG);

  const idx = SALARY_PAGES.indexOf(gross);
  const prev = idx > 0 ? SALARY_PAGES[idx - 1] : null;
  const next = idx < SALARY_PAGES.length - 1 ? SALARY_PAGES[idx + 1] : null;

  const faq = [
    {
      q: `Hva er lønn etter skatt for ${fmt(gross)} kr i 2026?`,
      a: `Med en årslønn på ${fmt(gross)} kr sitter du igjen med ca. ${fmt(r.netto)} kr etter skatt, som tilsvarer ${fmt(r.nettoMnd)} kr per måned. Total skatt er ${fmt(r.totalSkatt)} kr (${pct(r.skattProsent)} %).`,
    },
    {
      q: `Hvor mye skatt betaler man av ${fmt(gross)} kr?`,
      a: `Skatten er ca. ${fmt(r.totalSkatt)} kr: ${fmt(r.inntektsskatt)} kr i skatt på alminnelig inntekt, ${fmt(r.trygdeavgift)} kr i trygdeavgift og ${fmt(r.trinnskatt)} kr i trinnskatt.`,
    },
    {
      q: `Hva er marginalskatten på ${fmt(gross)} kr?`,
      a: `Marginalskatten er ${pct(marginal)} prosent. Av en lønnsøkning på 50 000 kr ville du sittet igjen med ca. ${fmt(raiseNet)} kr netto.`,
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
        (<span className="tnum">{fmt(r.nettoMnd)}</span> kr/mnd) · {pct(r.skattProsent)} % skatt
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
            <tr><td>Gjennomsnitt per måned</td><td>{fmt(r.nettoMnd)} kr</td></tr>
          </tbody>
        </table>

        <h2>Hvordan ligger {fmt(gross)} kr an i Norge?</h2>
        <p>
          Ifølge SSB var medianlønnen for heltidsansatte i 2025 rundt {fmt(MEDIAN_SALARY)} kr i året,
          og gjennomsnittet rundt {fmt(AVG_SALARY)} kr (uten overtid). Medianen betyr at halvparten
          tjener mer og halvparten mindre.{' '}
          {gross < MEDIAN_SALARY * 0.97
            ? `Med ${fmt(gross)} kr ligger du under medianen – vanlig tidlig i karrieren og i mange service- og omsorgsyrker.`
            : gross <= MEDIAN_SALARY * 1.03
            ? `Med ${fmt(gross)} kr ligger du omtrent på medianen for heltidsansatte.`
            : gross < AVG_SALARY * 1.15
            ? `Med ${fmt(gross)} kr ligger du over medianen og nær gjennomsnittet – typisk for mange erfarne fagarbeidere og kontoryrker.`
            : `Med ${fmt(gross)} kr ligger du klart over både median og gjennomsnitt – vanlig blant ingeniører, IT-spesialister, ledere og andre med lang erfaring eller høy spesialisering.`}
        </p>
        <p>
          Med dette inntektsnivået er du i {trinn === 0 ? 'ingen trinnskattetrinn ennå' : `trinnskattens trinn ${trinn}`},
          og marginalskatten din er <strong>{pct(marginal)} prosent</strong>. Det betyr at en
          lønnsøkning på 50 000 kr ville gitt deg cirka {fmt(raiseNet)} kr mer utbetalt i året.
          Les mer om <Link href="/blog/marginalskatt-2026">marginalskatt og lønnsøkninger her</Link>.
        </p>

        <p>
          Merk at månedsbeløpet er et snitt over året. I praksis er trekket litt høyere i de vanlige
          månedene, mens juni (feriepenger) normalt er trekkfri og desember har halvt trekk.{' '}
          <Link href="/blog/feriepenger-og-skatt">Les hvorfor</Link>.
        </p>

        <h2>Trinnskatten på {fmt(gross)} kr trinn for trinn</h2>
        {trinnRows.length === 0 ? (
          <p>Med {fmt(gross)} kr er inntekten under første innslagspunkt ({fmt(t[0].over)} kr), så du betaler ingen trinnskatt.</p>
        ) : (
          <table>
            <thead><tr><th>Trinn</th><th>Inntekt i trinnet</th><th>Skatt</th></tr></thead>
            <tbody>
              {trinnRows.map((x) => (
                <tr key={x.i}>
                  <td>Trinn {x.i} ({pct(Math.round(x.sats * 1000) / 10)} %)</td>
                  <td>{fmt(x.del)} kr</td>
                  <td>{fmt(x.skatt)} kr</td>
                </tr>
              ))}
              <tr><td><strong>Sum trinnskatt</strong></td><td></td><td><strong>{fmt(r.trinnskatt)} kr</strong></td></tr>
            </tbody>
          </table>
        )}

        <h2>Hva er en lønnsøkning verdt fra {fmt(gross)} kr?</h2>
        <table>
          <thead><tr><th>Lønnsøkning</th><th>Mer utbetalt per år</th><th>Per måned</th><th>Du beholder</th></tr></thead>
          <tbody>
            {raises.map((x) => (
              <tr key={x.d}>
                <td>+{fmt(x.d)} kr</td><td>{fmt(x.n)} kr</td><td>{fmt(x.n / 12)} kr</td><td>{pct(x.keep)} %</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Skatten på {fmt(gross)} kr i 2027</h2>
        <p>
          Med regjeringens forslag til statsbudsjett for 2027 blir skatten på samme lønn ca.{' '}
          {fmt(r27.totalSkatt)} kr, altså {fmt(r.totalSkatt - r27.totalSkatt)} kr mindre enn i 2026, og
          du får ca. {fmt(r27.netto)} kr utbetalt. Forslaget er ikke vedtatt ennå. Se{' '}
          <Link href="/skattekalkulator-2027">skattekalkulatoren for 2027</Link>.
        </p>

        <h2>Kan du betale mindre skatt?</h2>
        <p>
          Beregningen over bruker kun standardfradragene. Har du boliglån, pendler du langt, er du
          fagorganisert eller sparer du i IPS eller BSU, blir skatten lavere.{' '}
          <Link href="/blog/fradrag-du-ikke-ma-glemme-2026">Se fradragene mange glemmer</Link> –
          for mange utgjør de flere tusen kroner i spart skatt i året.
        </p>
      </div>

      <aside className="mt-10">
        <h2 className="display text-xl font-bold mb-3">Guider om skatt i 2026</h2>
        <ul className="space-y-2">
          {articles.slice(0, 5).map((x) => (
            <li key={x.slug}>
              <Link href={`/blog/${x.slug}`} className="text-netto font-semibold hover:underline">{x.title}</Link>
            </li>
          ))}
        </ul>
      </aside>

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
