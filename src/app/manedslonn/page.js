import Link from 'next/link';
import { MONTHLY_PAGES, monthlySlug, beregnSkatt, fmt, pct } from '../../lib/tax';
import { DOMAIN } from '../../lib/constants';

export const metadata = {
  title: 'Månedslønn etter skatt 2026 – tabell fra 30 000 til 100 000 kr',
  description: 'Se hva du får utbetalt av månedslønnen din i 2026: tabell over månedslønn etter skatt fra 30 000 til 100 000 kr, med vanlig trekk og halv skatt i desember.',
  alternates: { canonical: `${DOMAIN}/manedslonn` },
};

export default function ManedslonnIndex() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="display text-3xl font-extrabold mb-2">Månedslønn etter skatt 2026</h1>
      <p className="text-fjord/80 mb-8">
        Tabellen viser hva ulike månedslønner gir utbetalt i snitt per måned med 2026-satsene og
        standard fradrag. Klikk på en lønn for vanlig månedstrekk, desember og full beregning.
      </p>
      <div className="bg-white border border-mist rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-mist/60">
            <tr>
              <th className="text-left px-4 py-3">Månedslønn</th>
              <th className="text-right px-4 py-3">Netto per mnd (snitt)</th>
              <th className="text-right px-4 py-3">Skatt</th>
            </tr>
          </thead>
          <tbody>
            {MONTHLY_PAGES.map((m) => {
              const r = beregnSkatt(m * 12);
              return (
                <tr key={m} className="border-t border-mist hover:bg-netto-soft/50">
                  <td className="px-4 py-2.5">
                    <Link href={`/manedslonn/${monthlySlug(m)}`} className="tnum font-semibold text-netto hover:underline">{fmt(m)} kr</Link>
                  </td>
                  <td className="tnum text-right px-4 py-2.5">{fmt(r.nettoMnd)} kr</td>
                  <td className="tnum text-right px-4 py-2.5">{pct(r.skattProsent)} %</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-sm text-fjord/60 mt-4">
        Månedslønn × 12, uten feriepenger og overtid. Se også{' '}
        <Link href="/lonn" className="text-netto underline">tabellen for årslønn</Link>.
      </p>
    </main>
  );
}
