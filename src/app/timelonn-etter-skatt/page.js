import Link from 'next/link';
import ToolPage from '../../components/ToolPage';
import TimelonnCalc from '../../components/tools/TimelonnCalc';
import { DOMAIN } from '../../lib/constants';
import { beregnSkatt, fmt } from '../../lib/tax';

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
    </ToolPage>
  );
}
