// English guides for foreign workers in Norway (2026 rules). Block types: h2, h3, p, ul, table
// Text may contain links: [text](/path). Example numbers are computed with the site's tax engine.

import { beregnSkatt, marginalskatt, beregnFeriepenger, beregnReisefradrag, G_2026, RATES_2026 } from '../lib/tax.js';

// English number format: 600000 -> "600,000"
const en = (n) => new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(Math.round(n));
const pctEn = (n) => String(n);
const round100 = (n) => Math.round(n / 100) * 100;

// --- Tax deduction card: worked example (NOK 600,000, table deduction over 10.5 months) ---
const card = beregnSkatt(600000);
const cardMonth = card.totalSkatt / 10.5;
const cardGrossMonth = 600000 / 12;
const paye500 = { ordinary: beregnSkatt(500000).totalSkatt, paye: 500000 * 0.25 };

// --- Holiday pay: computed examples ---
const holidayRows = [400000, 550000, 700000, 900000].map((g) => [
  `NOK ${en(g)}`,
  `NOK ${en(beregnFeriepenger(g, { femUker: false }).total)}`,
  `NOK ${en(beregnFeriepenger(g).total)}`,
  `NOK ${en(beregnFeriepenger(g, { over60: true }).total)}`,
]);
const hp550 = beregnFeriepenger(550000);
const hp550over60 = beregnFeriepenger(550000, { over60: true });
const hpMarginal = marginalskatt(550000);

// --- Tax return: commuter deduction and back-tax examples ---
const commute = beregnReisefradrag(80, 220); // 40 km each way, 220 working days
const unionFee = 8700;
const sideJob = 60000;
const sideJobTax = beregnSkatt(600000 + sideJob).totalSkatt - beregnSkatt(600000).totalSkatt;
const sideJobWithheld = Math.round(sideJob * beregnSkatt(600000).skattProsent / 100);

export const guidesEn = [
  {
    slug: 'tax-deduction-card-norway',
    title: 'Tax Deduction Card in Norway (Skattekort): How It Works in 2026',
    description: 'What the Norwegian tax deduction card (skattekort) is, how foreign workers get one, table vs percentage deduction, frikort, PAYE and why you may be taxed 50% without it.',
    date: '2026-10-08',
    updated: '2026-10-18',
    sources: [
      { name: 'Skatteetaten: Tax deduction cards for foreign employees', url: 'https://www.skatteetaten.no/en/business-and-organisation/foreign/employer/tax-deduction-cards' },
      { name: 'Skatteetaten: PAYE (Pay As You Earn) for foreign workers', url: 'https://www.skatteetaten.no/en/person/taxes/tax-deduction-card-and-advance-tax/i-am-a-foreign-employee/paye/' },
      { name: 'Skatteetaten: Overview of withholding table steps from 2025 (Norwegian)', url: 'https://www.skatteetaten.no/nn/bedrift-og-organisasjon/arbeidsgiver/skattekort-og-skattetrekk/utfore-forskotstrekk/oversikt-over-tabelltrinnene-for-trekktabeller-fra-og-med-2025/' },
    ],
    body: [
      { type: 'p', text: 'In Norway, your employer deducts tax from your salary every month based on your tax deduction card – in Norwegian, skattekort. The card is issued by the Norwegian Tax Administration (Skatteetaten) and sent digitally to your employer. You never have to hand it in yourself.' },
      { type: 'h2', text: 'Do I need a tax deduction card?' },
      { type: 'p', text: 'Yes, if you work in Norway. If your employer does not have a tax deduction card for you, they must withhold 50% tax. The extra tax is refunded after the tax assessment the following year, but that is a long wait, so get the card before your first payday.' },
      { type: 'h2', text: 'How foreign workers get a tax deduction card' },
      { type: 'ul', items: [
        'Apply on skatteetaten.no. Your employer can also apply on your behalf.',
        'If you do not already have a Norwegian national ID number or D number, you will normally have to attend an ID check in person at a tax office that performs ID checks. Bring a valid passport or national ID card and your employment contract.',
        'After the ID check you get a D number (or a national ID number if you are registered as living in Norway), and the card is issued.',
        'Once the card is issued, your employer fetches it electronically.',
      ]},
      { type: 'h2', text: 'The four kinds of tax deduction card' },
      { type: 'table', head: ['Type', 'What it means', 'Typical user'], rows: [
        ['Table deduction (tabellkort)', 'A table number decides how much tax is deducted from each salary payment. The card also shows a percentage rate used by other payers.', 'Employees with a fixed salary from one main employer'],
        ['Percentage deduction (prosentkort)', 'A fixed percentage is deducted from everything you are paid, every month.', 'Variable income, commission, second jobs'],
        ['Exemption card (frikort)', 'No tax is deducted until your total income passes NOK 100,000 in 2026 (holiday pay included). Above that, 50% is deducted unless you order a new card.', 'Students and others with low income'],
        ['PAYE', 'A flat 25% on salary, or 17.4% if you are not a member of the Norwegian National Insurance scheme (25% minus the 7.6% social security contribution).', 'Some foreign workers earning under NOK 725,050 in 2026'],
      ]},
      { type: 'p', text: 'The PAYE scheme is voluntary and mainly for people who are in Norway for a limited period. Its income limit is NOK 725,050 for 2026 (NOK 697,150 for 2025). If you are on PAYE you will not receive a tax return. Read more in our guide to the [PAYE scheme in Norway](/en/paye-scheme-norway).' },
      { type: 'h2', text: 'How to read the table number' },
      { type: 'p', text: 'Since 2025 the tables are numbered in two series. Table 8000 fits a person who only has the standard deductions (the minimum deduction and personal allowance). In the 8000 series, the last three digits show how many thousand kroner of extra deductions the table assumes – table 8030 assumes about NOK 30,000, for example mortgage interest. In the 9000 series, the digits show how much extra income without tax deduction (such as interest income or rental income) is included, so table 9010 assumes about NOK 10,000.' },
      { type: 'h2', text: 'Worked example: NOK 600,000 a year' },
      { type: 'p', text: `With a salary of NOK 600,000 and only standard deductions, the total tax for 2026 is about NOK ${en(card.totalSkatt)}. With table deduction this is spread over 10.5 months, so the normal monthly deduction is roughly NOK ${en(round100(cardMonth))} from a gross monthly salary of NOK ${en(cardGrossMonth)}.` },
      { type: 'table', head: ['Month', 'Tax deducted (approx.)'], rows: [
        ['January–May, July–November', `NOK ${en(round100(cardMonth))}`],
        ['June (holiday pay month)', 'Normally none'],
        ['December', `NOK ${en(round100(cardMonth / 2))} (half)`],
        ['Whole year', `NOK ${en(card.totalSkatt)}`],
      ]},
      { type: 'p', text: `Averaged over the year, your take-home pay is about NOK ${en(card.nettoMnd)} a month. The real tables calculate per payment and can differ slightly from this estimate. Try your own salary in the [salary after tax calculator](/en).` },
      { type: 'h2', text: 'Why is there no tax in June and half tax in December?' },
      { type: 'p', text: 'With table deduction, the annual tax is spread over 10.5 months. Normally no tax is deducted in the month your holiday pay is paid out (usually June), and only half tax is deducted in December. The other months have slightly higher deductions to make up for it. With a percentage card or PAYE, the deduction is the same every month. In your first year in Norway you may have little holiday pay, so June can be a thin month – see our guide to [holiday pay in Norway](/en/guides/holiday-pay-norway).' },
      { type: 'h2', text: 'PAYE or ordinary tax?' },
      { type: 'p', text: `PAYE is simple, but not always cheaper. On a salary of NOK 500,000, PAYE at 25% is NOK ${en(paye500.paye)}, while ordinary tax with standard deductions would be about NOK ${en(paye500.ordinary)}. In return, PAYE means no tax return and no deductions to claim. If you choose the ordinary rules, you cannot rejoin PAYE the same year.` },
      { type: 'h2', text: 'Check and change your card' },
      { type: 'p', text: 'The card is based on an estimate of your income and deductions. If your salary changes, you start a new job, take a second job or take out a loan, you can change the card on skatteetaten.no. Too little tax deducted means you will have to pay back tax (restskatt) after the tax assessment the following year. Our guide to the [tax return in Norway](/en/guides/tax-return-norway) explains how the final settlement works.' },
    ],
  },
  {
    slug: 'holiday-pay-norway',
    title: 'Holiday Pay in Norway (Feriepenger) 2026: Rates and Tax',
    description: 'How holiday pay works in Norway: 10.2% or 12% of last year’s salary, 2.3% extra from age 60, when it is paid, why no tax is deducted in June, with worked examples.',
    date: '2026-10-08',
    updated: '2026-10-18',
    sources: [
      { name: 'Lovdata: Holiday Act (ferieloven, Norwegian)', url: 'https://lovdata.no/dokument/NL/lov/1988-04-29-21' },
      { name: 'Skatteetaten: Holiday pay – tax deduction rules for employers (Norwegian)', url: 'https://www.skatteetaten.no/bedrift-og-organisasjon/arbeidsgiver/a-meldingen/veiledning/lonn-og-ytelser/oversikt-over-lonn-og-andre-ytelser/feriepenger' },
      { name: 'Skatteetaten: Updated National Insurance basic amount from 1 May 2026', url: 'https://www.skatteetaten.no/en/business-and-organisation/employer/the-a-melding/siste-fra-a-ordningen/oppdatert-grunnbelop-i-folketrygden-fra-1.-mai-2026/' },
    ],
    body: [
      { type: 'p', text: 'In Norway you do not get regular salary during your holiday. Instead you earn holiday pay (feriepenger) during the year, which is paid out the following year – usually in June. The employer deducts ordinary salary for the days you are on holiday, and the holiday pay replaces it.' },
      { type: 'h2', text: 'Holiday pay rates' },
      { type: 'table', head: ['Situation', 'Rate'], rows: [
        ['Holiday Act (4 weeks + 1 day)', '10.2%'],
        ['5 weeks holiday (collective or individual agreement)', '12%'],
        ['Age 60+, Holiday Act', '12.5%'],
        ['Age 60+, 5 weeks holiday', '14.3%'],
      ]},
      { type: 'p', text: `The rate is applied to your holiday pay basis, which is mainly the salary you earned the previous year (the earning year). From the year you turn 60, you get an extra week of holiday and 2.3% extra holiday pay. The employer may limit the basis for this extra 2.3% to 6 times the National Insurance basic amount (6G), which is NOK ${en(6 * G_2026)} with the basic amount from 1 May 2026, unless an agreement gives more.` },
      { type: 'h2', text: 'Worked examples' },
      { type: 'p', text: `If you earned NOK 550,000 last year and have five weeks holiday, your holiday pay is 12% of NOK 550,000 = NOK ${en(hp550.total)}. If you are 60 or older, the extra 2.3% adds NOK ${en(hp550over60.tillegg)}, for a total of NOK ${en(hp550over60.total)}.` },
      { type: 'table', head: ['Salary last year', 'Holiday Act (10.2%)', '5 weeks (12%)', '5 weeks, age 60+ (12% + 2.3%)'], rows: holidayRows },
      { type: 'p', text: 'You can calculate your own amount with our [holiday pay calculator](/feriepenger-kalkulator).' },
      { type: 'h2', text: 'When is holiday pay paid?' },
      { type: 'p', text: 'Under the Holiday Act, holiday pay is paid on the last ordinary payday before your main holiday, unless otherwise agreed. In practice most employers pay it in June. In that month you normally get holiday pay instead of part of your ordinary salary, and the result on your payslip depends on how many holiday days are deducted.' },
      { type: 'h2', text: 'Is holiday pay taxed?' },
      { type: 'p', text: 'Holiday pay is taxable income, but no tax is deducted when ordinary holiday pay is paid out in the holiday year (up to 12.34% for agreement-based holiday pay). The tax on it is spread over the other months of the year through your tax deduction card, which deducts tax over 10.5 months. This is why June looks "tax free" and December has half tax. The extra 2.3% for workers aged 60 and over is subject to normal tax deduction.' },
      { type: 'p', text: `In the final tax settlement, holiday pay is taxed like salary at your marginal rate. At a salary of NOK 550,000 the marginal tax rate is ${pctEn(hpMarginal)}%, so roughly NOK ${en(round100(hp550.total * hpMarginal / 100))} of NOK ${en(hp550.total)} in holiday pay goes to tax – but this is already built into the monthly deductions if your tax card is correct. Read more about how the card works in our guide to the [tax deduction card](/en/guides/tax-deduction-card-norway).` },
      { type: 'h2', text: 'Your first year in Norway' },
      { type: 'p', text: 'Because holiday pay is earned the year before, many people in their first year of work in Norway have little or no holiday pay. You are still entitled to time off, but it may be unpaid. If your employer deducts salary for holiday days while you have little holiday pay to replace it, the holiday month can be thin. Plan for this if you start working in Norway mid-year, and ask your employer how they handle holiday in your first year.' },
      { type: 'h2', text: 'Holiday pay from Nav benefits' },
      { type: 'p', text: 'If you receive sickness benefit or parental benefit from Nav, you may also earn holiday pay on these benefits, under separate rules from the ones that apply to salary. Check your payment overview on nav.no if you are unsure what applies to you, and remember that the employer only pays holiday pay on the salary they paid you.' },
      { type: 'h2', text: 'Changing jobs or leaving Norway' },
      { type: 'p', text: 'When you leave a job, the holiday pay you have earned there is paid out in the final settlement. At your new employer you have not earned holiday pay for the first year, so next year’s holiday may be partly unpaid. Holiday pay paid in a final settlement can also lead to too little tax being deducted over the year, so check your tax card after a job change. If you are leaving Norway, you still have to file a tax return for the year – see our guide to the [tax return in Norway](/en/guides/tax-return-norway).' },
      { type: 'p', text: 'Want to see your full salary after tax, including the monthly average? Use the [salary after tax calculator](/en).' },
    ],
  },
  {
    slug: 'tax-return-norway',
    title: 'Tax Return in Norway (Skattemelding) for Foreigners: A Simple Guide',
    description: 'How the Norwegian tax return (skattemelding) works: deadline 30 April, pre-filled information, deductions to check, back tax rules and refunds – with worked examples.',
    date: '2026-10-08',
    updated: '2026-10-18',
    sources: [
      { name: 'Skatteetaten: The tax return – view, edit or submit', url: 'https://www.skatteetaten.no/en/person/taxes/tax-return/tax-return-person/' },
      { name: 'Skatteetaten: PAYE (Pay As You Earn) for foreign workers', url: 'https://www.skatteetaten.no/en/person/taxes/tax-deduction-card-and-advance-tax/i-am-a-foreign-employee/paye/' },
      { name: 'Skatteetaten: Tax Payment Handbook § 10-21 – due date for back tax', url: 'https://www.skatteetaten.no/en/rettskilder/type/handboker/skattebetalingshandboken/gjeldende/kapittel-10.-forfall/ID-10-11.001/' },
      { name: 'Regjeringen: Changes from 1 January 2026 (Norwegian)', url: 'https://www.regjeringen.no/no/dokument/lover_regler/endringer-i-lover-og-regler/endringer-i-lover-og-regler-fra-1.-januar-2026/id3141571/' },
    ],
    body: [
      { type: 'p', text: 'Every spring, everyone with income in Norway (except those on the PAYE scheme) gets a tax return (skattemelding) for the previous year. Most of it is already filled in by the Norwegian Tax Administration, using information from your employer, Nav, your bank and others.' },
      { type: 'h2', text: 'Key dates' },
      { type: 'table', head: ['What', 'When'], rows: [
        ['Tax return available', 'Spring, usually in March'],
        ['Deadline for employees and pensioners', '30 April'],
        ['Deadline for self-employed', '31 May (moved to the next working day if it falls on a weekend)'],
        ['Tax assessment (skatteoppgjør)', 'In batches, most from June, the last by late November'],
      ]},
      { type: 'p', text: 'If you need more time, you can apply for a 30-day extension before the deadline.' },
      { type: 'h2', text: 'Do I need to do anything?' },
      { type: 'p', text: 'You must check that the information is correct and add anything that is missing. If you do not submit by the deadline, the return is considered submitted with the pre-filled information – which is fine only if everything is correct and complete. You can still make changes after submitting, and corrections are allowed for the last three years. If you are on the PAYE scheme, you do not get a tax return or tax assessment at all. Read more about [PAYE in Norway](/en/paye-scheme-norway).' },
      { type: 'h2', text: 'Deductions foreigners often miss' },
      { type: 'ul', items: [
        'Travel between home and work (commuter deduction), if your daily trip is long',
        'Union fees (up to NOK 8,700 in 2026)',
        'Interest on loans – if you are tax resident in Norway, this can include loans in your home country',
        'Parental deduction for childcare costs (up to NOK 15,000 for the first child and NOK 10,000 for each additional child)',
        'Travel expenses for visits home for some commuters (special rules apply)',
      ]},
      { type: 'h3', text: 'Example: commuter deduction' },
      { type: 'p', text: `From 2026 the commuter deduction is NOK 1.90 per km, and only the part of your costs above NOK 12,000 is deductible. If you travel 40 km each way on 220 working days, the cost is 80 km × 220 × 1.90 = NOK ${en(commute.kostnad)}. After the NOK 12,000 threshold, the deduction is NOK ${en(commute.fradrag)}, which lowers your tax by NOK ${en(commute.skatteverdi)} (22%). Union fees of NOK ${en(unionFee)} lower your tax by NOK ${en(unionFee * RATES_2026.alminnelig)}. Check your own trip with the [commuter deduction calculator](/reisefradrag-kalkulator) (in Norwegian).` },
      { type: 'h2', text: 'Back tax or refund' },
      { type: 'p', text: 'After the tax return is processed, you get a tax assessment. If too much was deducted during the year, you get a refund to your registered bank account, with an interest supplement. Refunds under NOK 100 are not paid out. Make sure Skatteetaten has your correct account number.' },
      { type: 'p', text: 'If too little was deducted, you must pay back tax (restskatt). It is due three weeks after the assessment was sent to you, but not earlier than 20 August. If it is NOK 1,000 or more, it is split into two equal instalments, the second due five weeks after the first. Late payment adds interest.' },
      { type: 'h3', text: 'Example: how a second job causes back tax' },
      { type: 'p', text: `Say your main job pays NOK 600,000 and you earn NOK ${en(sideJob)} extra from a second job that deducts a fixed percentage of about ${beregnSkatt(600000).skattProsent}% – close to your average tax rate. That deducts NOK ${en(sideJobWithheld)}. But the extra income is taxed at your marginal rate, which adds NOK ${en(sideJobTax)} in tax. If the second job was not included in your tax card, the gap of about NOK ${en(round100(sideJobTax - sideJobWithheld))} shows up as back tax. Updating your [tax deduction card](/en/guides/tax-deduction-card-norway) when you start a second job avoids this.` },
      { type: 'h2', text: 'Income and assets abroad' },
      { type: 'p', text: 'If you are tax resident in Norway, you are taxed on your worldwide income and wealth, so income, bank accounts and property in your home country must be added to the tax return – they are usually not pre-filled. If you have paid tax abroad on the same income, you can normally claim a deduction for it so you are not taxed twice. Rules depend on the tax treaty with the country in question.' },
      { type: 'h2', text: 'Holiday pay and the tax return' },
      { type: 'p', text: 'Holiday pay is included in your salary on the tax return even though no tax was deducted in June. This is normal and already accounted for in the monthly deductions – see our guide to [holiday pay in Norway](/en/guides/holiday-pay-norway).' },
      { type: 'h2', text: 'Leaving Norway?' },
      { type: 'p', text: 'If you move away from Norway, you must still file a tax return for the years you had income in Norway. Notify the Norwegian authorities that you are moving, keep your Norwegian bank account or register a foreign account for refunds, and keep access to your Norwegian ID login if possible. To estimate what your salary gives after tax, use the [salary after tax calculator](/en).' },
    ],
  },
];

export const getGuideEn = (slug) => guidesEn.find((g) => g.slug === slug);
