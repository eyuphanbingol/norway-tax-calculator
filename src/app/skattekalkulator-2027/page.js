import Link from 'next/link';
import Calculator from '../../components/Calculator';
import AdSlot from '../../components/AdSlot';
import { RATES_2026, RATES_2027_FORSLAG, beregnSkatt, fmt, pct } from '../../lib/tax';
import { DOMAIN } from '../../lib/constants';

export const metadata = {
  title: { absolute: 'Skattekalkulator 2027 – se skatten din med statsbudsjettet' },
  description:
    'Beregn lønn etter skatt i 2027 med regjeringens forslag: trygdeavgift 7,4 %, personfradrag 120 180 kr og nye trinnskattgrenser. Se hvor mye mindre skatt du betaler enn i 2026.',
  alternates: { canonical: `${DOMAIN}/skattekalkulator-2027` },
};

const a = RATES_2026;
const b = RATES_2027_FORSLAG;
const kr = (n) => `${fmt(n)} kr`;
const p = (x) => `${pct(Math.round(x * 1000) / 10)} %`;

const changes = [
  ['Trygdeavgift på lønn', p(a.trygdeavgift), p(b.trygdeavgift)],
  ['Personfradrag', kr(a.personfradrag), kr(b.personfradrag)],
  ['Minstefradrag, øvre grense', kr(a.minstefradragMaks), kr(b.minstefradragMaks)],
  ...a.trinnskatt.map((t, i) => [`Trinnskatt trinn ${i + 1} (${p(t.sats)}) fra`, kr(t.over), kr(b.trinnskatt[i].over)]),
  ['Skatt på alminnelig inntekt', p(a.alminnelig), p(b.alminnelig)],
];

const levels = [400000, 500000, 600000, 700000, 800000, 1000000, 1500000];

const faq = [
  {
    q: 'Hvor mye skatt betaler jeg i 2027?',
    a: 'Med regjeringens forslag til statsbudsjett 2027 betaler en lønnsmottaker med 600 000 kr i årslønn rundt ' + fmt(beregnSkatt(600000, b).totalSkatt) + ' kr i skatt, mot ' + fmt(beregnSkatt(600000, a).totalSkatt) + ' kr med 2026-reglene og samme lønn. Bruk kalkulatoren over for din lønn.',
  },
  {
    q: 'Er skattesatsene for 2027 vedtatt?',
    a: 'Nei. Regjeringen la fram forslaget 7. oktober 2026. Stortinget vedtar de endelige satsene i desember 2026, og satsene kan bli endret i budsjettforhandlingene. Vi oppdaterer kalkulatoren når vedtaket er klart.',
  },
  {
    q: 'Hva er de viktigste skatteendringene i 2027?',
    a: 'Trygdeavgiften på lønn foreslås redusert fra 7,6 til 7,4 prosent, personfradraget økes til 120 180 kr, minstefradragets tak til 99 550 kr, og innslagspunktene i trinnskatten justeres opp med rundt 4 prosent. Satsene i trinnskatten og skatten på alminnelig inntekt på 22 prosent er uendret.',
  },
  {
    q: 'Når får jeg nytt skattekort for 2027?',
    a: 'Skatteetaten sender ut skattekort for neste år i desember, basert på satsene Stortinget vedtar. Skattekortet gjelder fra januar 2027.',
  },
];

export default function Skatt2027() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Skattekalkulator 2027',
        url: `${DOMAIN}/skattekalkulator-2027`,
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'NOK' },
      },
      {
        '@type': 'FAQPage',
        mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
    ],
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="bg-fjord text-white">
        <div className="max-w-5xl mx-auto px-4 pt-12 pb-20 text-center">
          <h1 className="display text-3xl sm:text-5xl font-extrabold leading-tight mb-3">
            Skattekalkulator <span className="text-krone">2027</span>
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            Se hva du får utbetalt i 2027 med regjeringens forslag til statsbudsjett – og hvor mye
            mindre skatt du betaler enn i 2026.
          </p>
        </div>
      </section>
      <section className="max-w-3xl mx-auto px-4 -mt-14">
        <Calculator year={2027} />
      </section>

      <section className="max-w-3xl mx-auto px-4 mt-12 prose-no">
        <p>
          <strong>Merk:</strong> Satsene for 2027 er regjeringens forslag, lagt fram 7. oktober 2026.
          Stortinget vedtar de endelige satsene i desember, og vi oppdaterer kalkulatoren når vedtaket
          er klart. Satsene for 2026 finner du i{' '}
          <Link href="/">skattekalkulatoren for 2026</Link>.
        </p>

        <h2>Skatteendringene fra 2026 til 2027</h2>
        <table>
          <thead><tr><th>Sats</th><th>2026</th><th>2027 (forslag)</th></tr></thead>
          <tbody>
            {changes.map((c) => <tr key={c[0]}>{c.map((x, i) => <td key={i}>{x}</td>)}</tr>)}
          </tbody>
        </table>
        <p>
          Nedre grense for trygdeavgift ({kr(b.trygdeNedreGrense)}) og satsen for minstefradraget
          ({p(b.minstefradragSats)}) foreslås uendret. Forsøket med arbeidsfradrag for unge
          videreføres, og maksimalt fradrag foreslås økt fra 125 000 til 130 000 kr.
        </p>

        <h2>Hvor mye mindre skatt med samme lønn?</h2>
        <p>
          Tabellen viser skatten med 2026-reglene og med forslaget for 2027 for samme lønn i kroner.
          Får du lønnsøkning i 2027, blir besparelsen mindre, fordi en del av lettelsen bare
          kompenserer for at innslagspunktene følger lønnsveksten.
        </p>
        <table>
          <thead><tr><th>Årslønn</th><th>Skatt 2026</th><th>Skatt 2027</th><th>Forskjell</th></tr></thead>
          <tbody>
            {levels.map((g) => {
              const x = beregnSkatt(g, a);
              const y = beregnSkatt(g, b);
              return (
                <tr key={g}>
                  <td>{kr(g)}</td><td>{kr(x.totalSkatt)}</td><td>{kr(y.totalSkatt)}</td>
                  <td>−{kr(x.totalSkatt - y.totalSkatt)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p>
          Regjeringen oppgir selv at en lønnsmottaker med 750 000 kr får om lag 1 800 kr lavere skatt
          i 2027. Det tallet tar hensyn til forventet lønnsvekst, altså at du tjener mer i 2027 enn i
          2026. Holder lønnen seg uendret, blir forskjellen større, som i tabellen over.
        </p>

        <h2>Hva skjer videre?</h2>
        <ul>
          <li>Oktober–november 2026: budsjettforhandlinger på Stortinget</li>
          <li>Desember 2026: Stortinget vedtar skattesatsene for 2027</li>
          <li>Desember 2026: Skatteetaten sender ut skattekort for 2027 – <Link href="/blog/skattekort-2027">slik sjekker du det</Link></li>
          <li>Januar 2027: nytt skattetrekk på lønnsslippen</li>
        </ul>
        <p>
          Les mer om <Link href="/blog/trinnskatt-2026">trinnskatten</Link>,{' '}
          <Link href="/blog/marginalskatt-2026">marginalskatt</Link> og{' '}
          <Link href="/blog/skattetabell-2026-tabelltrekk">tabelltrekk og skattekort</Link>.
        </p>
      </section>

      <AdSlot type="content" />

      <section className="max-w-3xl mx-auto px-4 mt-10">
        <h2 className="display text-2xl font-bold mb-4">Ofte stilte spørsmål om skatt i 2027</h2>
        <div className="space-y-3">
          {faq.map((f) => (
            <details key={f.q} className="bg-white border border-mist rounded-xl p-4">
              <summary className="font-semibold cursor-pointer">{f.q}</summary>
              <p className="mt-2 text-fjord/80 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
        <p className="text-xs text-fjord/50 mt-6">
          Kilde: Finansdepartementet, «Skattesatser 2027» og Prop. 1 LS (2026–2027).
        </p>
      </section>
    </main>
  );
}
