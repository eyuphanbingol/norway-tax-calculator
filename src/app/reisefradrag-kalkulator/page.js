import Link from 'next/link';
import ToolPage from '../../components/ToolPage';
import ReisefradragCalc from '../../components/tools/ReisefradragCalc';
import { DOMAIN } from '../../lib/constants';
import { beregnReisefradrag, REISE_2026, fmt } from '../../lib/tax';

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

// Regneeksempel: 25 km hver vei, 230 reisedager (kilde for satser: skatteetaten.no/satser/fradrag-for-reiser-mellom-hjem-og-arbeid/?year=2026)
const enVei = 25;
const dager = 230;
const ex = beregnReisefradrag(enVei * 2, dager);
const feilEnVei = beregnReisefradrag(enVei, dager);
const hjemmeDager = Math.round((dager * 3) / 5); // to hjemmekontordager i uka
const exHjemme = beregnReisefradrag(enVei * 2, hjemmeDager);
const grenseKm = REISE_2026.bunnfradrag / (REISE_2026.kmSats * dager);

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

      <h2>Regneeksempel: {enVei} km hver vei til jobben</h2>
      <p>
        Med reisefradrag menes her fradrag for arbeidsreiser, altså reiser mellom hjemmet og det faste
        arbeidsstedet ditt. Reiser du i jobben, for eksempel til kunder, er det en yrkesreise, og den
        følger andre regler. Avstanden regnes tur/retur for hver dag du faktisk reiser.
      </p>
      <p>
        Bor du {enVei} km fra jobben og reiser {dager} dager i året, blir regnestykket {enVei * 2} km ×{' '}
        {dager} dager × {REISE_2026.kmSats.toFixed(2).replace('.', ',')} kr = {fmt(ex.kostnad)} kr. Etter egenandelen på{' '}
        {fmt(REISE_2026.bunnfradrag)} kr får du {fmt(ex.fradrag)} kr i fradrag. Fradraget føres i alminnelig
        inntekt og gir {fmt(ex.skatteverdi)} kr lavere skatt.
      </p>
      <table>
        <thead><tr><th>Situasjon</th><th>Beregnet kostnad</th><th>Fradrag</th><th>Spart skatt</th></tr></thead>
        <tbody>
          <tr><td>{enVei * 2} km tur/retur, {dager} dager</td><td>{fmt(ex.kostnad)} kr</td><td>{fmt(ex.fradrag)} kr</td><td>{fmt(ex.skatteverdi)} kr</td></tr>
          <tr><td>To hjemmekontordager i uka ({hjemmeDager} dager)</td><td>{fmt(exHjemme.kostnad)} kr</td><td>{fmt(exHjemme.fradrag)} kr</td><td>{fmt(exHjemme.skatteverdi)} kr</td></tr>
          <tr><td>Feil: bare én vei ({enVei} km)</td><td>{fmt(feilEnVei.kostnad)} kr</td><td>{fmt(feilEnVei.fradrag)} kr</td><td>{fmt(feilEnVei.skatteverdi)} kr</td></tr>
        </tbody>
      </table>
      <p>
        Med {dager} reisedager må reiseveien tur/retur være over ca. {fmt(grenseKm)} km per dag før du
        passerer egenandelen. Reiser du sjeldnere, må avstanden være tilsvarende lengre.
      </p>

      <h2>Vanlige feil med reisefradraget</h2>
      <ul>
        <li>
          <strong>Regne bare én vei.</strong> Kilometerne skal regnes tur/retur. Som tabellen viser, kan
          det være forskjellen på {fmt(ex.fradrag)} kr og null i fradrag.
        </li>
        <li>
          <strong>Ta med dager du ikke reiste.</strong> Hjemmekontor, ferie og lengre fravær er ikke
          reisedager. Med mye hjemmekontor kan fradraget falle bort.
        </li>
        <li>
          <strong>Bruke de faktiske utgiftene.</strong> Fradraget beregnes med kilometersats for korteste
          vanlige reisevei, uansett om du kjører bil, tar buss eller sykler. Bompenger og ferje har egne
          regler – sjekk dem hos Skatteetaten.
        </li>
        <li>
          <strong>Tro at fradraget gir 22 % av hele reisekostnaden.</strong> Egenandelen trekkes fra
          først, og bare resten gir lavere skatt.
        </li>
      </ul>
      <p>
        Vil du se hva fradraget betyr for lønnen din totalt, kan du bruke{' '}
        <Link href="/">skattekalkulatoren</Link>. Fradraget gir lavere skatt i{' '}
        <Link href="/blog/skatteoppgjor-og-restskatt-2026">skatteoppgjøret</Link>, og du kan også legge det
        inn i <Link href="/blog/skattekort-2027">skattekortet</Link> for å få det med i trekket underveis.
        Flere verktøy finner du under <Link href="/verktoy">verktøy</Link>.
      </p>
    </ToolPage>
  );
}
