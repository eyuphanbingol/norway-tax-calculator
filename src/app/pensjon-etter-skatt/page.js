import Link from 'next/link';
import ToolPage from '../../components/ToolPage';
import PensjonCalc from '../../components/tools/PensjonCalc';
import { DOMAIN } from '../../lib/constants';
import { beregnPensjonsskatt, fmt, pct, PENSJON_2026 } from '../../lib/tax';

const URL = `${DOMAIN}/pensjon-etter-skatt`;
export const metadata = {
  title: 'Pensjon etter skatt 2026 – skattekalkulator for pensjonister',
  description: 'Regn ut alderspensjon etter skatt i 2026 med skattefradraget for pensjonsinntekt (inntil 39 100 kr), trygdeavgift 5,1 % og minstefradrag. Se skatt per år og måned.',
  alternates: { canonical: URL },
};

const levels = [250000, 300000, 350000, 400000, 450000, 500000, 600000, 700000];
const p = PENSJON_2026;

const faq = [
  { q: 'Hvor mye skatt betaler pensjonister i 2026?', a: `Det avhenger av pensjonen. Med 350 000 kr i alderspensjon betaler du ca. ${fmt(beregnPensjonsskatt(350000).totalSkatt)} kr i skatt i 2026, og med 500 000 kr ca. ${fmt(beregnPensjonsskatt(500000).totalSkatt)} kr. Pensjonister med lav pensjon betaler normalt ingen skatt, fordi skattefradraget for pensjonsinntekt dekker skatten.` },
  { q: 'Hva er skattefradraget for pensjonsinntekt?', a: `Det er et fradrag direkte i skatten for pensjonister. I 2026 er det inntil ${fmt(p.skattefradragMaks)} kr. Fradraget trappes ned med 16,7 prosent av pensjonsinntekt over 284 950 kr og med 6 prosent over 436 050 kr. Fullt fradrag forutsetter full pensjon i hele året.` },
  { q: 'Hvorfor er marginalskatten så høy for noen pensjonister?', a: 'Mellom 284 950 og 436 050 kr i pensjon reduseres skattefradraget med 16,7 øre for hver krone du får i tillegg. Det kommer på toppen av vanlig skatt, og gir en marginalskatt på rundt 45–48 prosent i dette intervallet.' },
  { q: 'Trekkes det skatt av pensjonen i desember?', a: 'For alderspensjon, AFP og etterlattepensjon trekkes det normalt ikke skatt i desember, mens juni har vanlig trekk. Uføretrygd har halvt trekk i desember.' },
];

export default function Page() {
  return (
    <ToolPage title="Pensjon etter skatt 2026" url={URL} faq={faq}
      intro="Se hva du får utbetalt av alderspensjonen etter skatt i 2026 – per år og per måned.">
      <PensjonCalc />
      <h2>Slik beregnes skatt på pensjon i 2026</h2>
      <ul>
        <li><strong>Minstefradrag:</strong> 40 prosent av pensjonen, maks {fmt(p.minstefradragMaks)} kr</li>
        <li><strong>Personfradrag:</strong> 114 540 kr</li>
        <li><strong>Skatt på alminnelig inntekt:</strong> 22 prosent</li>
        <li><strong>Trygdeavgift:</strong> 5,1 prosent (lavere enn 7,6 prosent på lønn)</li>
        <li><strong>Trinnskatt:</strong> samme trinn som for lønn</li>
        <li><strong>Skattefradrag for pensjonsinntekt:</strong> inntil {fmt(p.skattefradragMaks)} kr trekkes direkte fra skatten</li>
      </ul>

      <h2>Pensjon etter skatt – eksempler 2026</h2>
      <table>
        <thead><tr><th>Pensjon per år</th><th>Skatt</th><th>Etter skatt per år</th><th>Per måned</th></tr></thead>
        <tbody>
          {levels.map((g) => {
            const r = beregnPensjonsskatt(g);
            return (
              <tr key={g}>
                <td>{fmt(g)} kr</td><td>{fmt(r.totalSkatt)} kr ({pct(r.skattProsent)} %)</td>
                <td>{fmt(r.netto)} kr</td><td>{fmt(r.nettoMnd)} kr</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h2>Skattefradraget for pensjonsinntekt 2026</h2>
      <table>
        <thead><tr><th></th><th>2026</th></tr></thead>
        <tbody>
          <tr><td>Maksimalt fradrag</td><td>{fmt(p.skattefradragMaks)} kr</td></tr>
          <tr><td>Nedtrapping trinn 1</td><td>16,7 % over 284 950 kr</td></tr>
          <tr><td>Nedtrapping trinn 2</td><td>6,0 % over 436 050 kr</td></tr>
        </tbody>
      </table>
      <p>
        Fradraget gjelder alderspensjon, AFP og annen pensjonsinntekt. Har du ikke mottatt pensjon i
        hele året, eller har du gradert pensjon, blir fradraget redusert tilsvarende. Har du både lønn
        og pensjon, blir regnestykket annerledes – da gir kalkulatoren bare et grovt anslag.
      </p>
      <p>
        Vil du vite mer om trekket gjennom året? Les om{' '}
        <Link href="/blog/halv-skatt-i-desember-2026">skatt i desember</Link> og{' '}
        <Link href="/blog/skattekort-2027">skattekortet for 2027</Link>. Kilde: Skatteetaten,
        «Skattefradrag for pensjonsinntekt» 2026.
      </p>
    </ToolPage>
  );
}
