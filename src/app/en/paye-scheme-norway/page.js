import Link from 'next/link';
import AdSlot from '../../../components/AdSlot';
import { beregnSkatt } from '../../../lib/tax';
import { DOMAIN } from '../../../lib/constants';

const TITLE = 'PAYE Scheme in Norway 2026: 25% Flat Tax for Foreign Workers';
const DESC =
  'How the PAYE scheme works in Norway in 2026: the 25% flat rate, the NOK 725,050 income limit, who can use it, and when the ordinary tax rules are cheaper.';

export const metadata = {
  title: { absolute: 'PAYE in Norway 2026: 25% Flat Tax for Foreign Workers' },
  description: DESC,
  alternates: { canonical: `${DOMAIN}/en/paye-scheme-norway` },
  openGraph: { locale: 'en_GB', title: TITLE, description: DESC, type: 'article' },
};

const nok = (n) => `NOK ${Math.round(n).toLocaleString('en-US')}`;

export default function Paye() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: TITLE,
    description: DESC,
    inLanguage: 'en',
    datePublished: '2026-10-08',
    author: { '@type': 'Organization', name: 'Skattekalkulator Norge' },
    mainEntityOfPage: `${DOMAIN}/en/paye-scheme-norway`,
  };

  return (
    <main lang="en" className="max-w-3xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="text-sm text-fjord/60 mb-4">
        <Link href="/en" className="hover:underline">Norway Tax Calculator</Link>{' / '}PAYE scheme
      </nav>
      <h1 className="display text-3xl sm:text-4xl font-extrabold mb-2">{TITLE}</h1>
      <p className="text-sm text-fjord/50 mb-8">Updated 8 October 2026 · 2026 rules</p>

      <article className="prose-no">
        <p>
          The PAYE scheme (Pay As You Earn) is a simplified tax scheme for some foreign workers in
          Norway. Instead of the ordinary progressive tax, your employer withholds a flat
          percentage of your salary, and you do not have to file a Norwegian tax return.
        </p>

        <h2>PAYE rates 2026</h2>
        <table>
          <thead><tr><th>Situation</th><th>Rate</th></tr></thead>
          <tbody>
            <tr><td>Standard PAYE rate (incl. social security)</td><td>25%</td></tr>
            <tr><td>Exempt from Norwegian social security</td><td>17.4%</td></tr>
          </tbody>
        </table>
        <p>
          The tax is a final tax: there are no deductions, and no tax assessment afterwards.
        </p>

        <h2>Who can use the PAYE scheme?</h2>
        <p>According to the Norwegian Tax Administration (Skatteetaten), PAYE can apply if you:</p>
        <ul>
          <li>are not tax resident in Norway, for example because you stay less than 183 days in a 12-month period (or 270 days in a 36-month period), or</li>
          <li>are in your first year of tax residence in Norway,</li>
          <li>and expect to earn less than <strong>NOK 725,050</strong> in 2026 (NOK 697,150 in 2025).</li>
        </ul>
        <p>
          PAYE does not fit if you earn more than the limit, have been tax resident for more than a
          year, or have certain other taxable income, such as some benefits from NAV. The scheme is
          voluntary, and you can opt out and be taxed under the ordinary rules instead.
        </p>

        <h2>PAYE or ordinary tax – which is cheaper?</h2>
        <p>
          The table compares 25% PAYE with the ordinary 2026 rules for someone who gets the full
          standard deductions (minimum deduction and personal allowance). If you are not tax
          resident, you may only get part of the personal allowance under the ordinary rules, so
          check your own case.
        </p>
        <table>
          <thead><tr><th>Annual salary</th><th>PAYE 25%</th><th>Ordinary rules</th></tr></thead>
          <tbody>
            {[300000, 400000, 500000, 600000, 700000].map((g) => (
              <tr key={g}>
                <td>{nok(g)}</td><td>{nok(g * 0.25)}</td><td>{nok(beregnSkatt(g).totalSkatt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          With the full standard deductions, the ordinary rules give lower tax for most incomes
          under the PAYE limit. PAYE is simpler, however, and can be the better choice if you only
          qualify for a reduced personal allowance or work in Norway for a short period.
        </p>

        <h2>How to get a tax deduction card</h2>
        <p>
          You need a tax deduction card (skattekort) before you start working. Without one, your
          employer must withhold 50% tax. Foreign workers apply through Skatteetaten, usually after
          an ID check. The card tells your employer whether to use PAYE or ordinary withholding.
        </p>

        <h2>Calculate your salary after tax</h2>
        <p>
          Under the ordinary rules, use our <Link href="/en">Norway tax calculator</Link> to see
          your take-home pay per year and per month. For official and binding information, see{' '}
          <a href="https://www.skatteetaten.no/en/person/foreign/are-you-intending-to-work-in-norway/tax-deduction-cards/paye/" rel="nofollow">
            Skatteetaten: PAYE for foreign workers
          </a>.
        </p>
      </article>

      <AdSlot type="content" />
    </main>
  );
}
