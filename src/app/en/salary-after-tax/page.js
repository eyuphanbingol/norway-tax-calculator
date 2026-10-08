import Link from 'next/link';
import { EN_SALARY_PAGES, enSalarySlug, beregnSkatt } from '../../../lib/tax';
import { DOMAIN } from '../../../lib/constants';

export const metadata = {
  title: { absolute: 'Salary After Tax in Norway 2026 – Table for All Income Levels' },
  description: 'See your take-home pay in Norway in 2026 for annual salaries from NOK 300,000 to 1,500,000: net per year, per month and total tax rate.',
  alternates: { canonical: `${DOMAIN}/en/salary-after-tax` },
};

const nok = (n) => `NOK ${Math.round(n).toLocaleString('en-US')}`;

export default function EnSalaryIndex() {
  return (
    <main lang="en" className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="display text-3xl font-extrabold mb-2">Salary after tax in Norway 2026</h1>
      <p className="text-fjord/80 mb-8">
        Take-home pay for common annual salaries with the 2026 tax rates and standard deductions.
        Click a salary for the full breakdown.
      </p>
      <div className="bg-white border border-mist rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-mist/60">
            <tr>
              <th className="text-left px-4 py-3">Gross salary</th>
              <th className="text-right px-4 py-3">Net per year</th>
              <th className="text-right px-4 py-3 hidden sm:table-cell">Net per month</th>
              <th className="text-right px-4 py-3">Tax</th>
            </tr>
          </thead>
          <tbody>
            {EN_SALARY_PAGES.map((g) => {
              const r = beregnSkatt(g);
              return (
                <tr key={g} className="border-t border-mist hover:bg-netto-soft/50">
                  <td className="px-4 py-2.5"><Link href={`/en/salary-after-tax/${enSalarySlug(g)}`} className="tnum font-semibold text-netto hover:underline">{nok(g)}</Link></td>
                  <td className="tnum text-right px-4 py-2.5">{nok(r.netto)}</td>
                  <td className="tnum text-right px-4 py-2.5 hidden sm:table-cell">{nok(r.nettoMnd)}</td>
                  <td className="tnum text-right px-4 py-2.5">{r.skattProsent}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-sm text-fjord/60 mt-4">Ordinary tax rules, standard deductions, not Finnmark/Nord-Troms and not PAYE.</p>
    </main>
  );
}
