import Link from 'next/link';
import ToolPage from '../../components/ToolPage';
import ReisefradragCalc from '../../components/tools/ReisefradragCalc';
import { DOMAIN } from '../../lib/constants';

const URL = `${DOMAIN}/reisefradrag-kalkulator`;
export const metadata = {
  title: 'Reisefradrag 2026 – kalkulator for reiser til og fra jobb',
  description: 'Regn ut reisefradraget ditt for 2026 med de nye reglene: 1,90 kr per km, egenandel 12 000 kr og øvre grense 120 000 kr. Se hvor mye du sparer i skatt.',
  alternates: { canonical: URL },
};

const faq = [
  { q: 'Hvor langt må jeg reise for å få reisefradrag i 2026?', a: 'Det avhenger av hvor mange dager du reiser. Med 230 arbeidsdager må reiseveien tur/retur være mer enn rundt 27 km per dag før kostnaden passerer egenandelen på 12 000 kr.' },
  { q: 'Hva er endret i reisefradraget for 2026?', a: 'Egenandelen er redusert fra 15 250 til 12 000 kr, kilometersatsen er økt fra 1,83 til 1,90 kr, og den øvre grensen er hevet til 120 000 kr. Flere får derfor reisefradrag enn før.' },
  { q: 'Hvor mye er reisefradraget verdt?', a: 'Reisefradraget gis i alminnelig inntekt og er verdt 22 prosent av fradragsbeløpet. Et fradrag på 10 000 kr gir altså 2 200 kr lavere skatt.' },
];

export default function Page() {
  return (
    <ToolPage title="Reisefradrag-kalkulator 2026" url={URL} faq={faq}
      intro="Se hvor stort reisefradrag du får for reiser mellom hjem og jobb i 2026, og hvor mye det sparer deg i skatt.">
      <ReisefradragCalc />
      <h2>Slik beregnes reisefradraget</h2>
      <ul>
        <li>Reiseavstand tur/retur × antall reisedager × 1,90 kr per km</li>
        <li>Kostnaden regnes med inntil 120 000 kr</li>
        <li>Deretter trekkes egenandelen på 12 000 kr fra</li>
        <li>Resten er fradraget, som er verdt 22 prosent i spart skatt</li>
      </ul>
      <p>
        Det er den korteste vanlige reiseveien som gjelder, uansett om du kjører bil, tar kollektivt
        eller sykler. Reisefradraget føres i skattemeldingen og er ikke alltid forhåndsutfylt. Les
        også om <Link href="/blog/fradrag-du-ikke-ma-glemme-2026">fradragene mange glemmer</Link>.
      </p>
    </ToolPage>
  );
}
