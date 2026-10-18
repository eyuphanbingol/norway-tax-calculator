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
      <p className="text-sm text-fjord/75 mt-4">Ordinary tax rules, standard deductions, not Finnmark/Nord-Troms and not PAYE.</p>

      <section className="prose-no mt-12">
        <h2>How the figures are calculated</h2>
        <p>
          Every row uses the same tax engine as our <Link href="/en">Norway tax calculator</Link>: 22%
          tax on ordinary income after the minimum standard deduction and the personal allowance, a 7.6%
          social security contribution and the progressive bracket tax (trinnskatt), all with the rates
          adopted by the Norwegian Parliament for 2026.
        </p>
        <h2>Why your payslip looks different</h2>
        <p>
          The monthly figure is an average over the year. With a standard tax deduction card, tax is
          withheld over 10.5 months: normally there is no tax deduction on your salary in June, when
          holiday pay is paid, and only half tax in December. In the other months, the deduction is a bit
          higher than the average. Overtime and bonuses are often taxed at the percentage rate on your
          tax deduction card, so a month with extra pay can show a high deduction.
        </p>
        <h2>Who the table does not fit</h2>
        <p>
          If you are on the PAYE scheme for foreign workers, you pay a flat rate instead – see{' '}
          <Link href="/en/paye-scheme-norway">PAYE in Norway</Link>. Residents of Finnmark and
          Nord-Troms pay 18.5% instead of 22% on ordinary income. Deductions such as mortgage interest
          and union fees lower your tax. Read more about your{' '}
          <Link href="/en/guides/tax-deduction-card-norway">tax deduction card</Link>,{' '}
          <Link href="/en/guides/holiday-pay-norway">holiday pay</Link> and the{' '}
          <Link href="/en/guides/tax-return-norway">tax return</Link>.
        </p>
      </section>
    </main>
  );
}
