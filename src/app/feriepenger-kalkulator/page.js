import Link from 'next/link';
import ToolPage from '../../components/ToolPage';
import FeriepengerCalc from '../../components/tools/FeriepengerCalc';
import { DOMAIN } from '../../lib/constants';
import { fmt, G_2026 } from '../../lib/tax';

const URL = `${DOMAIN}/feriepenger-kalkulator`;
export const metadata = {
  title: 'Feriepengekalkulator 2026 – regn ut feriepengene dine',
  description: 'Regn ut feriepengene dine for 2026: 10,2 % etter ferieloven, 12 % med fem ukers ferie, og 2,3 % ekstra fra året du fyller 60. Gratis feriepengekalkulator.',
  alternates: { canonical: URL },
};

const faq = [
  { q: 'Hvor mye får jeg i feriepenger?', a: 'Etter ferieloven får du 10,2 prosent av feriepengegrunnlaget, som i praksis er lønnen du tjente året før. Har du fem ukers ferie gjennom tariff eller arbeidsavtale, er satsen 12 prosent. Med 550 000 kr i fjor og fem ukers ferie blir feriepengene 66 000 kr.' },
  { q: 'Trekkes det skatt av feriepenger?', a: 'Feriepenger er skattepliktige, men det trekkes normalt ikke skatt av de ordinære feriepengene ved utbetaling. Skatten på dem er fordelt på trekket i resten av året. Tillegget på 2,3 prosent for arbeidstakere over 60 år er derimot trekkpliktig.' },
  { q: 'Hva er feriepenger for de over 60 år?', a: `Fra og med året du fyller 60, har du rett på en ekstra ferieuke og 2,3 prosent ekstra feriepenger. Tillegget beregnes av feriepengegrunnlag opptil 6G, som er ${fmt(6 * G_2026)} kr med grunnbeløpet fra 1. mai 2026.` },
  { q: 'Når utbetales feriepengene?', a: 'De fleste arbeidsgivere utbetaler feriepenger i juni. Samtidig trekkes det vanligvis lønn for ferien, så det du får utbetalt i juni er feriepengene minus ferietrekket.' },
];

export default function Page() {
  return (
    <ToolPage title="Feriepengekalkulator 2026" url={URL} faq={faq}
      intro="Regn ut hvor mye du får i feriepenger – med 10,2 eller 12 prosent, og med tillegget for deg over 60 år.">
      <FeriepengerCalc />
      <h2>Slik beregnes feriepenger</h2>
      <p>
        Feriepenger opptjenes året før du tar ut ferien. Grunnlaget er det du fikk i arbeidsvederlag
        i opptjeningsåret – i hovedsak lønn, overtid og bonus, men ikke for eksempel utgiftsgodtgjørelser.
        Har du vært syk eller i foreldrepermisjon, kan Nav ha betalt feriepenger for deler av perioden.
      </p>
      <table>
        <thead><tr><th>Situasjon</th><th>Sats</th></tr></thead>
        <tbody>
          <tr><td>Ferieloven (4 uker + 1 dag)</td><td>10,2 %</td></tr>
          <tr><td>Fem ukers ferie (tariff/avtale)</td><td>12 %</td></tr>
          <tr><td>Over 60 år, ferieloven</td><td>12,5 %</td></tr>
          <tr><td>Over 60 år, fem ukers ferie</td><td>14,3 %</td></tr>
        </tbody>
      </table>
      <p>
        Vil du vite hvorfor det ikke trekkes skatt av feriepengene i juni? Les{' '}
        <Link href="/blog/feriepenger-og-skatt">feriepenger og skatt</Link>.
      </p>
    </ToolPage>
  );
}
