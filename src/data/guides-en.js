// English guides for foreign workers in Norway (2026 rules). Block types: h2, p, ul, table

export const guidesEn = [
  {
    slug: 'tax-deduction-card-norway',
    title: 'Tax Deduction Card in Norway (Skattekort): How It Works in 2026',
    description: 'What the Norwegian tax deduction card (skattekort) is, how foreign workers get one, table vs percentage deduction, and why you may be taxed 50% without it.',
    date: '2026-10-08',
    body: [
      { type: 'p', text: 'In Norway, your employer deducts tax from your salary every month based on your tax deduction card – in Norwegian, skattekort. The card is issued by the Norwegian Tax Administration (Skatteetaten) and sent digitally to your employer. You never have to hand it in yourself.' },
      { type: 'h2', text: 'Do I need a tax deduction card?' },
      { type: 'p', text: 'Yes, if you work in Norway. If your employer does not have a tax deduction card for you, they may have to withhold 50% tax. You should therefore get the card before your first payday.' },
      { type: 'h2', text: 'How foreign workers get a tax deduction card' },
      { type: 'ul', items: [
        'Apply on skatteetaten.no. Many foreign workers must also attend an ID check at a tax office.',
        'You will get a Norwegian identification number (a national ID number or a D number) if you do not already have one.',
        'Once the card is issued, your employer can fetch it electronically.',
        'Some foreign workers are placed on the PAYE scheme with a flat tax rate instead of ordinary tax.',
      ]},
      { type: 'h2', text: 'Table deduction or percentage deduction?' },
      { type: 'table', head: ['Type', 'What it means'], rows: [
        ['Table deduction (tabelltrekk)', 'A table number decides how much tax is deducted from each salary payment. Usually used by your main employer.'],
        ['Percentage deduction (prosenttrekk)', 'A fixed percentage is deducted. Used for second jobs, bonuses and other payments.'],
        ['PAYE', 'A flat 25% (17.4% without Norwegian social security) for some foreign workers.'],
      ]},
      { type: 'h2', text: 'Why is there no tax in June and half tax in December?' },
      { type: 'p', text: 'With table deduction, the annual tax is spread over 10.5 months. Normally no tax is deducted in the month your holiday pay is paid out (usually June), and only half tax is deducted in December. The other months have slightly higher deductions to make up for it.' },
      { type: 'h2', text: 'Check and change your card' },
      { type: 'p', text: 'The card is based on an estimate of your income and deductions. If your salary changes, you start a new job or take out a loan, you can change the card on skatteetaten.no. Too little tax deducted means you will have to pay back tax (restskatt) after the tax assessment the following year.' },
    ],
  },
  {
    slug: 'holiday-pay-norway',
    title: 'Holiday Pay in Norway (Feriepenger) 2026: Rates and Tax',
    description: 'How holiday pay works in Norway: 10.2% or 12% of last year’s salary, 2.3% extra from the year you turn 60, when it is paid, and why no tax is deducted in June.',
    date: '2026-10-08',
    body: [
      { type: 'p', text: 'In Norway you do not get regular salary during your holiday. Instead you earn holiday pay (feriepenger) during the year, which is paid out the following year – usually in June.' },
      { type: 'h2', text: 'Holiday pay rates' },
      { type: 'table', head: ['Situation', 'Rate'], rows: [
        ['Holiday Act (4 weeks + 1 day)', '10.2%'],
        ['5 weeks holiday (collective or individual agreement)', '12%'],
        ['Age 60+, Holiday Act', '12.5%'],
        ['Age 60+, 5 weeks holiday', '14.3%'],
      ]},
      { type: 'p', text: 'The rate is applied to your holiday pay basis, which is mainly the salary you earned the previous year. From the year you turn 60, you get an extra week of holiday and 2.3% extra holiday pay, calculated on a basis up to 6 times the National Insurance basic amount (6G).' },
      { type: 'h2', text: 'Example' },
      { type: 'p', text: 'If you earned NOK 550,000 last year and have five weeks holiday, your holiday pay is 12% of NOK 550,000 = NOK 66,000.' },
      { type: 'h2', text: 'Is holiday pay taxed?' },
      { type: 'p', text: 'Holiday pay is taxable income, but normally no tax is deducted when the ordinary holiday pay is paid out. The tax on it is spread over the other months of the year through your tax deduction card. The extra 2.3% for workers over 60 is subject to tax deduction.' },
      { type: 'h2', text: 'Your first year in Norway' },
      { type: 'p', text: 'Because holiday pay is earned the year before, many people in their first year of work in Norway have little or no holiday pay. You are still entitled to time off, but it may be unpaid. When you leave a job, your earned holiday pay is paid out in the final settlement.' },
    ],
  },
  {
    slug: 'tax-return-norway',
    title: 'Tax Return in Norway (Skattemelding) for Foreigners: A Simple Guide',
    description: 'How the Norwegian tax return (skattemelding) works: deadline 30 April, pre-filled information, deductions to check, tax assessment, back tax and refunds.',
    date: '2026-10-08',
    body: [
      { type: 'p', text: 'Every spring, everyone with income in Norway gets a tax return (skattemelding) for the previous year. Most of it is already filled in by the Norwegian Tax Administration, using information from your employer, bank and others.' },
      { type: 'h2', text: 'Key dates' },
      { type: 'table', head: ['What', 'When'], rows: [
        ['Tax return available', 'March'],
        ['Deadline for employees and pensioners', '30 April'],
        ['Deadline for self-employed', '31 May / 1 June'],
        ['Tax assessment (skatteoppgjør)', 'From June to late autumn'],
      ]},
      { type: 'h2', text: 'Do I need to do anything?' },
      { type: 'p', text: 'You must check that the information is correct and add anything that is missing. If everything is correct, the return is considered delivered automatically when the deadline passes. If you are on the PAYE scheme, you normally do not need to file a tax return.' },
      { type: 'h2', text: 'Deductions foreigners often miss' },
      { type: 'ul', items: [
        'Travel between home and work (commuter deduction), if your daily trip is long',
        'Union fees (up to NOK 8,700 in 2026)',
        'Interest on loans, including loans in your home country',
        'Parental deduction for childcare costs',
        'Travel expenses to your home country for some commuters (special rules apply)',
      ]},
      { type: 'h2', text: 'Back tax or refund' },
      { type: 'p', text: 'After the tax return is processed, you get a tax assessment. If too little tax was deducted during the year, you must pay back tax (restskatt), usually in two instalments. If too much was deducted, you get a refund to your registered bank account. Make sure Skatteetaten has your correct account number.' },
      { type: 'h2', text: 'Leaving Norway?' },
      { type: 'p', text: 'If you move away from Norway, you must still file a tax return for the years you had income in Norway. Notify the Norwegian authorities that you are moving, and keep access to your Norwegian ID login if possible.' },
    ],
  },
];

export const getGuideEn = (slug) => guidesEn.find((g) => g.slug === slug);
