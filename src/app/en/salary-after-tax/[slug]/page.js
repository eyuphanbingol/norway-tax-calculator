import { notFound } from 'next/navigation';
import Link from 'next/link';
import Calculator from '../../../../components/Calculator';
import AdSlot from '../../../../components/AdSlot';
import {
  beregnSkatt, marginalskatt, EN_SALARY_PAGES, enSalarySlug, enSlugToSalary, salarySlug, MEDIAN_SALARY, RATES_2026,
} from '../../../../lib/tax';
import { DOMAIN } from '../../../../lib/constants';

export const dynamicParams = false;
const nok = (n) => `NOK ${Math.round(n).toLocaleString('en-US')}`;

export async function generateStaticParams() {
  return EN_SALARY_PAGES.map((g) => ({ slug: enSalarySlug(g) }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const g = enSlugToSalary(slug);
  if (!g || !EN_SALARY_PAGES.includes(g)) return { title: 'Not found' };
  const r = beregnSkatt(g);
  return {
    title: { absolute: `${nok(g)} Salary After Tax in Norway 2026 – ${nok(r.netto)} Net` },
    description: `Earning ${nok(g)} a year in Norway? In 2026 you take home about ${nok(r.netto)} after tax (${nok(r.nettoMnd)} per month). See the full tax breakdown.`,
    alternates: {
      canonical: `${DOMAIN}/en/salary-after-tax/${slug}`,
      languages: { en: `${DOMAIN}/en/salary-after-tax/${slug}`, 'nb-NO': `${DOMAIN}/lonn/${salarySlug(g)}` },
    },
  };
}

export default async function EnSalaryPage({ params }) {
  const { slug } = await params;
  const g = enSlugToSalary(slug);
  if (!g || !EN_SALARY_PAGES.includes(g)) return notFound();
  const r = beregnSkatt(g);
  const marginal = marginalskatt(g);
  const paye = g <= 725050;
  const faq = [
    { q: `What is ${nok(g)} after tax in Norway?`, a: `With an annual salary of ${nok(g)}, you take home about ${nok(r.netto)} after tax in 2026, or ${nok(r.nettoMnd)} per month on average. Total tax is ${nok(r.totalSkatt)} (${r.skattProsent}%).` },
    { q: `What is the marginal tax rate on ${nok(g)}?`, a: `The marginal tax rate is ${marginal}%. Of a NOK 1,000 raise, you would keep about ${nok(1000 - marginal * 10)}.` },
  ];
  const jsonLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };
  return (
    <main lang="en" className="max-w-3xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="text-sm text-fjord/60 mb-4">
        <Link href="/en" className="hover:underline">Calculator</Link>{' / '}
        <Link href="/en/salary-after-tax" className="hover:underline">Salary table</Link>{' / '}{nok(g)}
      </nav>
      <h1 className="display text-3xl sm:text-4xl font-extrabold mb-2">{nok(g)} salary after tax in Norway (2026)</h1>
      <p className="text-lg text-fjord/80 mb-8">
        Take-home: <strong className="tnum text-netto">{nok(r.netto)}</strong> per year ({nok(r.nettoMnd)}/month) · {r.skattProsent}% tax
      </p>
      <Calculator initial={g} lang="en" />
      <AdSlot type="content" />
      <div className="prose-no mt-10">
        <h2>Tax breakdown for {nok(g)}</h2>
        <table>
          <thead><tr><th>Item</th><th>Amount</th></tr></thead>
          <tbody>
            <tr><td>Gross salary</td><td>{nok(g)}</td></tr>
            <tr><td>Minimum standard deduction</td><td>−{nok(r.minstefradrag)}</td></tr>
            <tr><td>Personal allowance</td><td>−{nok(RATES_2026.personfradrag)}</td></tr>
            <tr><td>Tax on ordinary income (22%)</td><td>{nok(r.inntektsskatt)}</td></tr>
            <tr><td>Social security contribution (7.6%)</td><td>{nok(r.trygdeavgift)}</td></tr>
            <tr><td>Bracket tax</td><td>{nok(r.trinnskatt)}</td></tr>
            <tr><td><strong>Total tax</strong></td><td><strong>{nok(r.totalSkatt)}</strong></td></tr>
            <tr><td><strong>Take-home pay</strong></td><td><strong>{nok(r.netto)}</strong></td></tr>
          </tbody>
        </table>
        <h2>How does {nok(g)} compare in Norway?</h2>
        <p>
          The median annual salary for full-time employees in Norway was about {nok(MEDIAN_SALARY)} in
          2025 (Statistics Norway). Your marginal tax rate at this income is <strong>{marginal}%</strong>.
        </p>
        <p>
          {paye
            ? <>This salary is below the PAYE limit of NOK 725,050. If you are a foreign worker on the PAYE scheme, you pay a flat 25% ({nok(g * 0.25)}) instead – see <Link href="/en/paye-scheme-norway">PAYE in Norway</Link>.</>
            : <>This salary is above the PAYE limit of NOK 725,050, so the ordinary tax rules apply.</>}{' '}
          Also read about your <Link href="/en/guides/tax-deduction-card-norway">tax deduction card</Link> and{' '}
          <Link href="/en/guides/holiday-pay-norway">holiday pay</Link>.
        </p>
      </div>
    </main>
  );
}
