import Link from 'next/link';
import Calculator from '../../components/Calculator';
import AdSlot from '../../components/AdSlot';
import { RATES_2026, beregnSkatt } from '../../lib/tax';
import { DOMAIN } from '../../lib/constants';

export const metadata = {
  title: { absolute: 'Norway Tax Calculator 2026 – Salary After Tax in Norway' },
  description:
    'Free Norway tax calculator for 2026: see your take-home pay per year and month with the official rates for income tax, social security and bracket tax. Includes the 2027 budget proposal.',
  alternates: {
    canonical: `${DOMAIN}/en`,
    languages: { 'nb-NO': DOMAIN, en: `${DOMAIN}/en`, 'x-default': DOMAIN },
  },
  openGraph: { locale: 'en_GB', title: 'Norway Tax Calculator 2026 – Salary After Tax' },
};

const nok = (n) => `NOK ${Math.round(n).toLocaleString('en-US')}`;
const r = RATES_2026;

const faq = [
  {
    q: 'How much tax do you pay in Norway?',
    a: `It depends on your income. On an annual salary of NOK 600,000 you pay about ${nok(beregnSkatt(600000).totalSkatt)} in tax in 2026 (about 24%), leaving ${nok(beregnSkatt(600000).netto)} after tax. The tax is made up of 22% tax on ordinary income, 7.6% social security contribution and a progressive bracket tax.`,
  },
  {
    q: 'What is the highest tax rate in Norway?',
    a: 'The highest marginal tax rate on salary in 2026 is 47.4%, which applies to income above NOK 1,467,200. Your average tax rate is always lower than your marginal rate.',
  },
  {
    q: 'Does this calculator work for foreign workers?',
    a: 'Yes, if you are taxed under the ordinary Norwegian rules. If you are on the PAYE scheme (a flat 25% tax for some foreign workers), your tax is calculated differently – see our PAYE guide.',
  },
  {
    q: 'Is the monthly figure what I will see on my payslip?',
    a: 'Not exactly. The monthly figure is an average over the year. In Norway, tax is normally withheld over 10.5 months: there is usually no tax deduction in June (holiday pay) and half deduction in December.',
  },
];

export default function English() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Norway Tax Calculator',
        url: `${DOMAIN}/en`,
        inLanguage: 'en',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'NOK' },
      },
      {
        '@type': 'FAQPage',
        mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
    ],
  };

  return (
    <main lang="en">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="bg-fjord text-white">
        <div className="max-w-5xl mx-auto px-4 pt-12 pb-20 text-center">
          <h1 className="display text-3xl sm:text-5xl font-extrabold leading-tight mb-3">
            Norway Tax Calculator <span className="text-krone">2026</span>
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            Enter your annual or monthly salary and see your take-home pay after tax in Norway,
            using the rates adopted by the Norwegian Parliament for 2026.
          </p>
        </div>
      </section>
      <section className="max-w-3xl mx-auto px-4 -mt-14">
        <Calculator lang="en" />
      </section>

      <section className="max-w-3xl mx-auto px-4 mt-12 prose-no">
        <h2>How income tax works in Norway</h2>
        <p>
          If you are an employee in Norway, your tax on salary consists of three parts:
        </p>
        <ul>
          <li>
            <strong>22% tax on ordinary income</strong> – your salary minus the minimum standard
            deduction (46% of salary, max {nok(r.minstefradragMaks)}) and the personal allowance
            ({nok(r.personfradrag)}).
          </li>
          <li>
            <strong>7.6% social security contribution</strong> (trygdeavgift) on your gross salary,
            if your income is above {nok(r.trygdeNedreGrense)}.
          </li>
          <li>
            <strong>Bracket tax</strong> (trinnskatt) – a progressive tax on gross salary above
            {' '}{nok(r.trinnskatt[0].over)}.
          </li>
        </ul>

        <h2>Bracket tax rates 2026</h2>
        <table>
          <thead><tr><th>Bracket</th><th>Income above</th><th>Rate</th></tr></thead>
          <tbody>
            {r.trinnskatt.map((t, i) => (
              <tr key={t.over}><td>Step {i + 1}</td><td>{nok(t.over)}</td><td>{(t.sats * 100).toFixed(1)}%</td></tr>
            ))}
          </tbody>
        </table>
        <p>
          You only pay the higher rate on the part of your income above each threshold – crossing a
          threshold never makes you worse off.
        </p>

        <h2>Salary after tax in Norway – examples</h2>
        <table>
          <thead><tr><th>Annual salary</th><th>Tax</th><th>After tax</th><th>Per month</th></tr></thead>
          <tbody>
            {[400000, 500000, 600000, 700000, 800000, 1000000].map((g) => {
              const x = beregnSkatt(g);
              return (
                <tr key={g}>
                  <td>{nok(g)}</td><td>{nok(x.totalSkatt)} ({x.skattProsent}%)</td>
                  <td>{nok(x.netto)}</td><td>{nok(x.nettoMnd)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <h2>Who is this calculator for?</h2>
        <p>
          The calculator assumes you are taxed under the ordinary rules with the standard
          deductions. Extra deductions – such as interest on loans, commuting or union fees – will
          lower your tax. If you live in Finnmark or Nord-Troms, the tax rate on ordinary income is
          18.5% instead of 22%. Foreign workers on the PAYE scheme pay a flat rate instead:{' '}
          <Link href="/en/paye-scheme-norway">read our PAYE guide</Link>.
        </p>
        <p>
          More for foreign workers: <Link href="/en/salary-after-tax">salary after tax table</Link>,{' '}
          <Link href="/en/guides/tax-deduction-card-norway">tax deduction card</Link>,{' '}
          <Link href="/en/guides/holiday-pay-norway">holiday pay</Link> and{' '}
          <Link href="/en/guides/tax-return-norway">tax return</Link>.
        </p>
        <p>
          Want to see next year? Switch to <strong>2027 (proposal)</strong> in the calculator to use
          the government’s budget proposal for 2027. Norwegian speakers can find more guides on
          our <Link href="/">Norwegian pages</Link>.
        </p>
      </section>

      <AdSlot type="content" />

      <section className="max-w-3xl mx-auto px-4 mt-10">
        <h2 className="display text-2xl font-bold mb-4">Frequently asked questions</h2>
        <div className="space-y-3">
          {faq.map((f) => (
            <details key={f.q} className="bg-white border border-mist rounded-xl p-4">
              <summary className="font-semibold cursor-pointer">{f.q}</summary>
              <p className="mt-2 text-fjord/80 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
        <p className="text-xs text-fjord/50 mt-6">
          Sources: Norwegian Ministry of Finance (tax rates 2026) and the Norwegian Tax
          Administration (Skatteetaten). Figures are estimates and do not replace your tax
          assessment.
        </p>
      </section>
    </main>
  );
}
