import Link from 'next/link';
import ToolPage from '../../components/ToolPage';
import TimelonnCalc from '../../components/tools/TimelonnCalc';
import { DOMAIN } from '../../lib/constants';
import { beregnSkatt, marginalskatt, fmt, pct } from '../../lib/tax';

const URL = `${DOMAIN}/timelonn-etter-skatt`;
export const metadata = {
  title: 'Timelønn etter skatt 2026 – kalkulator for timelønn',
  description: 'Regn om timelønn til års- og månedslønn, og se timelønnen din etter skatt i 2026. Gratis kalkulator for deg med timelønn, deltid eller full stilling.',
  alternates: { canonical: URL },
};

const ex = [200, 250, 300, 350, 400, 500];
const faq = [
  { q: 'Hvor mye er 300 kr i timen etter skatt?', a: `Med 300 kr i timen og full stilling (37,5 timer i uken) blir årslønnen ${fmt(300 * 37.5 * 52)} kr. Med standard fradrag i 2026 sitter du igjen med ca. ${fmt(beregnSkatt(300 * 37.5 * 52).netto / (37.5 * 52))} kr i timen etter skatt.` },
  { q: 'Hvordan regner jeg om timelønn til årslønn?', a: 'Gang timelønnen med antall timer per uke og med 52 uker. Med 37,5 timer i uken tilsvarer det 1 950 timer i året.' },
  { q: 'Betaler jeg mindre skatt hvis jeg jobber deltid?', a: 'Ja, prosentvis. Skatten i Norge er progressiv, og fradragene utgjør en større del av en lav inntekt.' },
];

// Regneeksempel med 250 kr i timen
const sats = 250;
const timerFull = 37.5 * 52; // 1 950 timer
const full = beregnSkatt(sats * timerFull);
const halv = beregnSkatt((sats * timerFull) / 2);
const marg = marginalskatt(sats * timerFull);
const overtid = sats * 1.4; // minst 40 % tillegg etter arbeidsmiljøloven § 10-6
const overtidNetto = overtid * (1 - marg / 100);
const ferieUker = 5;
const arbeidUker = 52 - ferieUker;
const lonnUtenFerie = sats * 37.5 * arbeidUker;
const feriepenger = lonnUtenFerie * 0.102; // 10,2 % av fjorårets lønn (ferieloven)

export default function Page() {
  return (
    <ToolPage title="Timelønn etter skatt 2026" url={URL} faq={faq}
      intro="Skriv inn timelønnen og hvor mange timer du jobber i uken, og se hva du sitter igjen med per time, måned og år.">
      <TimelonnCalc />
      <h2>Timelønn etter skatt – eksempler (full stilling)</h2>
      <table>
        <thead><tr><th>Timelønn</th><th>Årslønn</th><th>Etter skatt per time</th><th>Per måned</th></tr></thead>
        <tbody>
          {ex.map((t) => {
            const g = t * 37.5 * 52;
            const r = beregnSkatt(g);
            return (
              <tr key={t}>
                <td>{t} kr</td><td>{fmt(g)} kr</td><td>{fmt(r.netto / 1950)} kr</td><td>{fmt(r.nettoMnd)} kr</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p>
        Eksemplene forutsetter 37,5 timer i uken hele året og standard fradrag. Jobber du færre timer,
        blir skatten prosentvis lavere. Vil du regne med årslønn eller månedslønn direkte, bruk{' '}
        <Link href="/">skattekalkulatoren</Link>.
      </p>

      <h2>Regneeksempel: {sats} kr i timen</h2>
      <p>
        Jobber du full stilling (37,5 timer i uka) til {sats} kr timen, blir årslønnen {fmt(full.gross)} kr.
        Skatten blir {fmt(full.totalSkatt)} kr ({pct(full.skattProsent)} %), og du sitter igjen med{' '}
        {fmt(full.netto / timerFull)} kr per time, eller {fmt(full.nettoMnd)} kr i snitt per måned. Jobber du halv stilling med samme timelønn, er skatten
        bare {pct(halv.skattProsent)} %, og du beholder {fmt(halv.netto / (timerFull / 2))} kr per time.
        Det skyldes at fradragene utgjør en større del av en lav inntekt.
      </p>
      <p>
        Overtid betales med minst 40 % tillegg, altså minst {fmt(overtid)} kr i timen her. Den timen
        kommer på toppen av lønnen din og beskattes med marginalskatten på {pct(marg)} %, ikke med
        gjennomsnittsskatten. Du sitter igjen med rundt {fmt(overtidNetto)} kr per overtidstime. Tar du en
        ekstravakt på 7,5 timer til vanlig sats, beholder du ca. {fmt(sats * 7.5 * (1 - marg / 100))} kr av{' '}
        {fmt(sats * 7.5)} kr. Les mer
        om <Link href="/blog/marginalskatt-2026">marginalskatt</Link>.
      </p>

      <h2>Vanlige feil når du regner om timelønn</h2>
      <ul>
        <li>
          <strong>Regne med lønn alle 52 ukene.</strong> Med timelønn får du ofte ikke lønn i ferien, men
          feriepenger året etter. Med {ferieUker} ukers ferie blir lønnen for {arbeidUker} uker{' '}
          {fmt(lonnUtenFerie)} kr. Feriepengene på 10,2 % av samme beløp er {fmt(feriepenger)} kr, men de
          kommer først neste år. Første år i jobb blir inntekten derfor lavere. Regn ut dine med{' '}
          <Link href="/feriepenger-kalkulator">feriepengekalkulatoren</Link>.
        </li>
        <li>
          <strong>Bruke snittskatten på ekstravakter.</strong> Ekstra timer beskattes med marginalskatten,
          som er høyere enn snittet.
        </li>
        <li>
          <strong>Glemme skattekortet når du har flere jobber.</strong> Har du en ekstra jobb, må
          skattekortet dekke all inntekten, ellers kan du få restskatt. Se{' '}
          <Link href="/blog/bijobb-og-julejobb-skatt">skatt på bijobb og julejobb</Link>.
        </li>
        <li>
          <strong>Sammenligne timelønn med månedslønn direkte.</strong> Med 1 950 timer i året tilsvarer{' '}
          {sats} kr timen {fmt((sats * timerFull) / 12)} kr i måneden. Bruk{' '}
          <Link href="/manedslonn">månedslønnkalkulatoren</Link> for å se hva det blir etter skatt.
        </li>
      </ul>
    </ToolPage>
  );
}
