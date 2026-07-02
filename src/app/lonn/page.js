import Link from 'next/link';
import { SALARY_PAGES, salarySlug, beregnSkatt, fmt } from '../../lib/tax';
import { DOMAIN } from '../../lib/constants';

export const metadata = {
  title: 'Lønn etter skatt-tabell 2026: alle lønnsnivåer',
  description: 'Komplett tabell over lønn etter skatt i 2026, fra 300 000 til 2 000 000 kr. Se netto årslønn, månedslønn og skatteprosent for hvert nivå.',
  alternates: { canonical: `${DOMAIN}/lonn` },
};

export default function LonnIndex() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="display text-3xl font-extrabold mb-2">Lønn etter skatt 2026 – tabell</h1>
      <p className="text-fjord/80 mb-8">
        Oversikten viser hva ulike årslønner gir utbetalt med 2026-satsene og standard fradrag.
        Klikk på et lønnsnivå for full beregning, marginalskatt og fradragstips.
      </p>
      <div className="bg-white border border-mist rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-mist/60">
            <tr>
              <th className="text-left px-4 py-3">Bruttolønn</th>
              <th className="text-right px-4 py-3">Netto per år</th>
              <th className="text-right px-4 py-3 hidden sm:table-cell">Netto per mnd</th>
              <th className="text-right px-4 py-3">Skatt</th>
            </tr>
          </thead>
          <tbody>
            {SALARY_PAGES.map((g) => {
              const r = beregnSkatt(g);
              return (
                <tr key={g} className="border-t border-mist hover:bg-netto-soft/50">
                  <td className="px-4 py-2.5">
                    <Link href={`/lonn/${salarySlug(g)}`} className="tnum font-semibold text-netto hover:underline">
                      {fmt(g)} kr
                    </Link>
                  </td>
                  <td className="tnum text-right px-4 py-2.5">{fmt(r.netto)} kr</td>
                  <td className="tnum text-right px-4 py-2.5 hidden sm:table-cell">{fmt(r.nettoMnd)} kr</td>
                  <td className="tnum text-right px-4 py-2.5">{r.skattProsent} %</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
