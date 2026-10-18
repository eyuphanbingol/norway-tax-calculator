import { notFound } from 'next/navigation';
import Link from 'next/link';
import Calculator from '../../../components/Calculator';
import AdSlot from '../../../components/AdSlot';
import {
  beregnSkatt, marginalskatt, hvilketTrinn, fmt,
  SALARY_PAGES, SALARY_PAGES_INDEXED, salarySlug, slugToSalary, AVG_SALARY, MEDIAN_SALARY, MEDIAN_SALARY_MND, AVG_SALARY_MND,
  RATES_2025, RATES_2026, pct, RATES_2027_FORSLAG } from '../../../lib/tax';
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
    // Bare de mest søkte nivåene indekseres; resten er nyttige for brukerne, men ligner hverandre
    ...(SALARY_PAGES_INDEXED.includes(gross) ? {} : { robots: { index: false, follow: true } }),
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
  const r25 = beregnSkatt(gross, RATES_2025);
  const indexed = SALARY_PAGES_INDEXED.includes(gross);

  // Praktiske tall for de indekserte nivåene
  const trekkMnd = r.totalSkatt / 10.5; // skatten trekkes normalt over 10,5 måneder
  const bruttoMnd = gross / 12;
  const nesteTrinn = t.find((x) => x.over > gross);
  const forrigeTrinn = [...t].reverse().find((x) => x.over <= gross);
  const marginalEtter = nesteTrinn ? marginalskatt(nesteTrinn.over + 1000) : null;
  const agaSats = 0.141; // arbeidsgiveravgift sone I
  // Håndskrevet tekst per indeksert lønnsnivå. Alle tall beregnes med skattemotoren.
  const nt = (g) => beregnSkatt(g).netto;
  const andel = (del, av) => pct(Math.round((del / av) * 1000) / 10);
  const beholder = pct(Math.round((100 - marginal) * 10) / 10);
  const T3 = t[2].over;
  const T4 = t[3].over;
  const T5 = t[4].over;
  const satsTxt = (i) => pct(Math.round(t[i].sats * 1000) / 10);
  const fradragsverdi = (8700 + 25000) * RATES_2026.alminnelig; // fagforening + IPS, 22 %
  const tilT3 = nt(T3) - r.netto;
  const forsteDel = T3 - gross; // brukes for 700 000
  const forsteNetto = nt(T3) - r.netto;
  const andreNetto = nt(T3 + forsteDel) - nt(T3);
  const bonus50 = nt(gross + 50000) - r.netto;
  const pluss100 = nt(gross + 100000) - r.netto;
  const motSnitt = Math.round((gross / AVG_SALARY - 1) * 100);

  const HAND = {
    600000: {
      h: `600 000 kr: god avstand til trinn 3`,
      body: (
        <>
          <p>
            Med 600 000 kr i årslønn er du i trinn 2 av trinnskatten. Trinn 3, der satsen hopper fra{' '}
            {satsTxt(1)} til {satsTxt(2)} %, starter først ved {fmt(T3)} kr. Du har altså{' '}
            {fmt(T3 - gross)} kr å gå på før marginalskatten øker. På hele denne strekningen er
            marginalskatten {pct(marginal)} %, og du beholder {beholder} kr av hver hundrelapp du får i
            lønnsøkning.
          </p>
          <p>
            Et konkret regnestykke: Går lønnen fra 600 000 kr helt opp til {fmt(T3)} kr, øker
            utbetalingen med {fmt(tilT3)} kr i året, i snitt {fmt(tilT3 / 12)} kr mer per måned. Mange
            tror at et nytt trinn gjør at hele lønnen blir beskattet hardere. Det stemmer ikke: den høyere
            satsen gjelder bare kronene over grensen.
          </p>
          <p>
            På dette nivået er det ofte fradragene som gjør størst forskjell. Fagforeningskontingent
            (inntil 8 700 kr) og sparing i IPS (inntil 25 000 kr i året, bundet til pensjonsalder) trekkes
            fra i alminnelig inntekt og gir 22 % lavere skatt. Utnytter du begge fullt ut, sparer du{' '}
            {fmt(fradragsverdi)} kr i skatt. For å få like mye mer utbetalt gjennom lønn, måtte du hatt
            omtrent {fmt(fradragsverdi / (1 - marginal / 100))} kr høyere bruttolønn. Se{' '}
            <Link href="/blog/fradrag-du-ikke-ma-glemme-2026">fradragene mange glemmer</Link>.
          </p>
        </>
      ),
    },
    700000: {
      h: `700 000 kr: rett under trinn 3`,
      body: (
        <>
          <p>
            700 000 kr er et interessant lønnsnivå skattemessig, fordi du ligger bare {fmt(forsteDel)} kr
            under innslagspunktet for trinn 3 ({fmt(T3)} kr). Forhandler du lønn eller får bonus, blir de
            neste kronene beskattet ulikt:
          </p>
          <table>
            <thead><tr><th>Lønnstillegg</th><th>Mer utbetalt</th><th>Du beholder</th></tr></thead>
            <tbody>
              <tr><td>De første {fmt(forsteDel)} kr (opp til {fmt(T3)} kr)</td><td>{fmt(forsteNetto)} kr</td><td>{andel(forsteNetto, forsteDel)} %</td></tr>
              <tr><td>De neste {fmt(forsteDel)} kr (over {fmt(T3)} kr)</td><td>{fmt(andreNetto)} kr</td><td>{andel(andreNetto, forsteDel)} %</td></tr>
            </tbody>
          </table>
          <p>
            Selv over grensen beholder du mer enn halvparten, så trinnskatten er aldri en grunn til å si
            nei til mer lønn. En bonus på 50 000 kr gir deg for eksempel {fmt(bonus50)} kr etter skatt
            når året er gjort opp. Les mer om{' '}
            <Link href="/blog/julebonus-og-bonus-skatt">skatt på bonus</Link>.
          </p>
          <p>
            Lønnen ligger mellom SSBs median ({fmt(MEDIAN_SALARY)} kr) og gjennomsnitt ({fmt(AVG_SALARY)}{' '}
            kr) for 2025. At gjennomsnittet er høyere enn medianen, betyr at noen svært høye lønninger
            trekker snittet opp, og over halvparten tjener derfor mindre enn gjennomsnittet. Med 700 000 kr
            tjener du mer enn medianlønnstakeren, men under snittet.
          </p>
        </>
      ),
    },
    750000: {
      h: `750 000 kr: regjeringens eget eksempel`,
      body: (
        <>
          <p>
            Med 750 000 kr har du passert innslagspunktet for trinn 3 ({fmt(T3)} kr) med{' '}
            {fmt(gross - T3)} kr. Det er bare disse kronene som får trinnskatt på {satsTxt(2)} %, til
            sammen {fmt((gross - T3) * t[2].sats)} kr. Resten av lønnen beskattes akkurat som før, men all
            videre lønnsøkning får nå {pct(marginal)} % marginalskatt.
          </p>
          <p>
            750 000 kr er også lønnen regjeringen selv bruker som eksempel i forslaget til statsbudsjett
            for 2027. Ifølge regjeringen får en lønnstaker med 750 000 kr og standard fradrag om lag
            1 800 kr lavere skatt i 2027. Det tallet sammenligner med 2026-reglene justert for forventet
            lønnsvekst. Holder du lønnen helt lik begge år, viser kalkulatoren vår en større nedgang,{' '}
            {fmt(r.totalSkatt - r27.totalSkatt)} kr, fordi fradrag og innslagspunkter justeres opp mens
            lønnen står stille. Forslaget er ikke vedtatt før Stortinget behandler budsjettet i desember.
          </p>
          <p>
            Én ting er lett å misforstå i trinn 3: Fradrag som rentefradrag, IPS og fagforeningskontingent
            trekkes fra i alminnelig inntekt, ikke i lønnen trinnskatten og trygdeavgiften beregnes av. Et
            fradrag er derfor verdt 22 % for deg, ikke {pct(marginal)} %. Lønnen ligger for øvrig rett over
            SSBs gjennomsnitt for 2025 på {fmt(AVG_SALARY)} kr.
          </p>
        </>
      ),
    },
    1000000: {
      h: `1 million kr: trinn 4 og ${beholder} øre per krone`,
      body: (
        <>
          <p>
            En million kroner i årslønn er en milepæl for mange, men skattemessig skjer det viktigste litt
            før: Ved {fmt(T4)} kr starter trinn 4 med {satsTxt(3)} % trinnskatt. Av lønnen din ligger{' '}
            {fmt(gross - T4)} kr i trinn 4, og de gir {fmt((gross - T4) * t[3].sats)} kr i trinnskatt.
          </p>
          <p>
            Marginalskatten er {pct(marginal)} %: 22 % skatt på alminnelig inntekt, 7,6 % trygdeavgift og{' '}
            {satsTxt(3)} % trinnskatt. Av hver ekstra krone beholder du {beholder} øre. En lønnsøkning på
            100 000 kr gir derfor {fmt(pluss100)} kr mer utbetalt i året. Neste trinn ({satsTxt(4)} %)
            starter ved {fmt(T5)} kr, {fmt(T5 - gross)} kr unna.
          </p>
          <p>
            Selv om de siste kronene beskattes hardt, er gjennomsnittsskatten {pct(r.skattProsent)} %. De
            første kronene av lønnen beskattes lavt: personfradraget gjør de første{' '}
            {fmt(RATES_2026.personfradrag)} kr av alminnelig inntekt skattefrie, og trinnskatten starter
            på bare {satsTxt(0)} %. Det er derfor du sitter igjen med {fmt(r.netto)} kr av en million.
          </p>
          <p>
            Lønnen er {motSnitt} % høyere enn SSBs gjennomsnitt for heltidsekvivalenter i 2025. Fradrag er
            verdt 22 % også for deg, ikke {pct(marginal)} %, fordi de ikke reduserer grunnlaget for
            trinnskatt og trygdeavgift. Les mer om <Link href="/blog/trinnskatt-2026">trinnskatt</Link> og{' '}
            <Link href="/blog/marginalskatt-2026">marginalskatt</Link>.
          </p>
        </>
      ),
    },
  };
  const hand = HAND[gross];

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

      <nav className="text-sm text-fjord/75 mb-4">
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
            <tr><td><Link href="/blog/halv-skatt-i-desember-2026">Halv skatt i desember</Link></td><td>ca. {fmt(trekkMnd / 2)} kr mer enn i en vanlig måned</td></tr>
          </tbody>
        </table>

        {!indexed && <h2>Hvordan ligger {fmt(gross)} kr an i Norge?</h2>}
        {!indexed && <p>
          Ifølge SSB var medianlønnen per heltidsekvivalent {fmt(MEDIAN_SALARY_MND)} kr i måneden i
          2025, altså rundt {fmt(MEDIAN_SALARY)} kr i året. Gjennomsnittet var {fmt(AVG_SALARY_MND)} kr
          i måneden (rundt {fmt(AVG_SALARY)} kr i året). Tallene inkluderer bonus og uregelmessige
          tillegg, men ikke overtid. Medianen betyr at halvparten tjener mer og halvparten mindre.{' '}
          {gross < MEDIAN_SALARY * 0.97
            ? `Med ${fmt(gross)} kr ligger du under medianen.`
            : gross <= MEDIAN_SALARY * 1.03
            ? `Med ${fmt(gross)} kr ligger du omtrent på medianen.`
            : gross < AVG_SALARY * 1.05
            ? `Med ${fmt(gross)} kr ligger du over medianen og nær gjennomsnittet.`
            : `Med ${fmt(gross)} kr ligger du over både medianen og gjennomsnittet.`}
        </p>}
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

        {indexed && (
          <>
            {hand && (
              <>
                <h2>{hand.h}</h2>
                {hand.body}
              </>
            )}
            <h2>{fmt(gross)} kr i praksis: lønnsslipp, trinn og arbeidsgiver</h2>
            <p>
              <strong>Lønnsslippen.</strong> Brutto månedslønn er {fmt(bruttoMnd)} kr. Fordi skatten
              normalt trekkes over 10,5 måneder, blir trekket i en vanlig måned omtrent{' '}
              {fmt(trekkMnd)} kr, og du får rundt {fmt(bruttoMnd - trekkMnd)} kr utbetalt – litt mindre
              enn snittet på {fmt(r.nettoMnd)} kr. I desember er trekket halvt (ca. {fmt(trekkMnd / 2)} kr),
              så utbetalingen blir rundt {fmt(bruttoMnd - trekkMnd / 2)} kr – med{' '}
              <Link href="/blog/halv-skatt-i-desember-2026">halv skatt i desember</Link> får du altså ca.{' '}
              {fmt(trekkMnd / 2)} kr mer utbetalt enn i en vanlig måned. Det nøyaktige trekket står i
              skattekortet ditt og kan avvike noe fra dette anslaget.
            </p>
            <p>
              <strong>Trinnskatten.</strong>{' '}
              {forrigeTrinn
                ? `Du er ${fmt(gross - forrigeTrinn.over)} kr over innslagspunktet for trinn ${t.indexOf(forrigeTrinn) + 1} (${fmt(forrigeTrinn.over)} kr). `
                : ''}
              {nesteTrinn
                ? `Neste trinn starter ved ${fmt(nesteTrinn.over)} kr, ${fmt(nesteTrinn.over - gross)} kr unna. Lønn over den grensen beskattes med ${pct(marginalEtter)} % marginalskatt, mot ${pct(marginal)} % i dag.`
                : `Du er i det øverste trinnet, så marginalskatten på ${pct(marginal)} % gjelder all videre lønnsøkning.`}
            </p>
            <p>
              <strong>Sammenlignet med 2025.</strong> Med 2025-satsene ville skatten på samme lønn vært{' '}
              {fmt(r25.totalSkatt)} kr. I 2026 er den {fmt(r.totalSkatt)} kr, altså{' '}
              {fmt(Math.abs(r25.totalSkatt - r.totalSkatt))} kr {r25.totalSkatt >= r.totalSkatt ? 'mindre' : 'mer'},
              mest fordi personfradraget, minstefradraget og trinnskattgrensene ble oppjustert og
              trygdeavgiften satt ned fra 7,7 til 7,6 %.
            </p>
            <p>
              <strong>Hva du koster arbeidsgiveren.</strong> I sone I betaler arbeidsgiveren 14,1 %
              arbeidsgiveravgift, rundt {fmt(gross * agaSats)} kr i året på denne lønnen. I tillegg kommer
              blant annet feriepenger og obligatorisk tjenestepensjon.
            </p>
          </>
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
