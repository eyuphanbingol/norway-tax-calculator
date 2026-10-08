'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { beregnSkatt, marginalskatt, fmt, pct, RATES, SALARY_PAGES, salarySlug } from '../lib/tax';

const T = {
  no: {
    year: 'År',
    yearly: 'Årslønn', monthly: 'Månedslønn',
    labelY: 'Årslønn før skatt (brutto)', labelM: 'Månedslønn før skatt (brutto)',
    proposal: 'forslag',
    netTitle: (y) => `Utbetalt etter skatt i ${y}`,
    perMonth: 'kr per måned i snitt', perYear: 'kr per år',
    total: '% skatt totalt',
    parts: ['Inntektsskatt (22 %)', 'Trygdeavgift', 'Trinnskatt', 'Utbetalt (netto)'],
    marginal: 'Marginalskatt', marginalText: 'Av de neste 1 000 kronene du tjener, sitter du igjen med',
    ariaRange: 'Juster lønn', ariaBar: (g, s, n) => `Av ${g} kr går ${s} kr til skatt og ${n} kr utbetales`,
    note: (y) => `Beregnet for lønnsinntekt med standard minstefradrag og personfradrag for ${y} (gjelder ikke Finnmark/Nord-Troms). Individuelle fradrag (renter, pendling, fagforening m.m.) kan gi lavere skatt. Tallene er veiledende.`,
    note2027: 'Satsene for 2027 er regjeringens forslag fra oktober 2026 og kan endres når Stortinget vedtar budsjettet i desember.',
    monthNote: 'Månedslønn regnes om til årslønn (× 12). Feriepenger er ikke med.',
    seeFull: (g) => `Se full oversikt for ${g} kr →`,
  },
  en: {
    year: 'Year',
    yearly: 'Annual', monthly: 'Monthly',
    labelY: 'Annual salary before tax (gross)', labelM: 'Monthly salary before tax (gross)',
    proposal: 'proposal',
    netTitle: (y) => `Take-home pay after tax in ${y}`,
    perMonth: 'NOK per month on average', perYear: 'NOK per year',
    total: '% total tax',
    parts: ['Income tax (22%)', 'Social security', 'Bracket tax', 'Take-home (net)'],
    marginal: 'Marginal tax rate', marginalText: 'Of the next NOK 1,000 you earn, you keep',
    ariaRange: 'Adjust salary', ariaBar: (g, s, n) => `Of NOK ${g}, NOK ${s} goes to tax and NOK ${n} is paid out`,
    note: (y) => `Calculated for employment income with the standard deductions for ${y} (not Finnmark/Nord-Troms, not the PAYE scheme). Individual deductions (interest, commuting, union fees etc.) can lower your tax. Figures are estimates.`,
    note2027: 'The 2027 rates are the government’s proposal from October 2026 and may change when Parliament adopts the budget in December.',
    monthNote: 'Monthly salary is converted to annual salary (× 12). Holiday pay is not included.',
    seeFull: null,
  },
};

export default function Calculator({ initial = 600000, lang = 'no', year: initialYear = 2026, showYearToggle = true }) {
  const t = T[lang];
  const [gross, setGross] = useState(initial);
  const [year, setYear] = useState(initialYear);
  const [monthly, setMonthly] = useState(false);
  const r = useMemo(() => beregnSkatt(gross, RATES[year]), [gross, year]);
  const marginal = useMemo(() => marginalskatt(gross, RATES[year]), [gross, year]);
  const trygdePct = pct(Math.round(RATES[year].trygdeavgift * 1000) / 10);
  const shown = monthly ? Math.round(gross / 12) : gross;
  const num = (n) => (lang === 'en' ? Math.round(n).toLocaleString('en-US') : fmt(n));

  const parts = [
    { label: t.parts[0], value: r.inntektsskatt, cls: 'bg-skatt' },
    { label: `${t.parts[1]} (${trygdePct} %)`, value: r.trygdeavgift, cls: 'bg-skatt/70' },
    { label: t.parts[2], value: r.trinnskatt, cls: 'bg-krone' },
    { label: t.parts[3], value: r.netto, cls: 'bg-netto' },
  ];

  const nearest = SALARY_PAGES.reduce((a, b) =>
    Math.abs(b - gross) < Math.abs(a - gross) ? b : a, SALARY_PAGES[0]);

  const toggle = (active) =>
    `px-3 py-1.5 rounded-lg text-sm font-semibold transition ${active ? 'bg-fjord text-white' : 'text-fjord/70 hover:text-fjord'}`;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-mist p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="inline-flex bg-mist/60 rounded-xl p-1" role="group" aria-label={`${t.yearly} / ${t.monthly}`}>
          <button type="button" className={toggle(!monthly)} aria-pressed={!monthly} onClick={() => setMonthly(false)}>{t.yearly}</button>
          <button type="button" className={toggle(monthly)} aria-pressed={monthly} onClick={() => setMonthly(true)}>{t.monthly}</button>
        </div>
        {showYearToggle && (
          <div className="inline-flex bg-mist/60 rounded-xl p-1" role="group" aria-label={t.year}>
            <button type="button" className={toggle(year === 2026)} aria-pressed={year === 2026} onClick={() => setYear(2026)}>2026</button>
            <button type="button" className={toggle(year === 2027)} aria-pressed={year === 2027} onClick={() => setYear(2027)}>
              2027 <span className="font-normal text-xs">({t.proposal})</span>
            </button>
          </div>
        )}
      </div>

      <label htmlFor="gross" className="block text-sm font-semibold mb-2">
        {monthly ? t.labelM : t.labelY}
      </label>
      <div className="flex items-center gap-3 mb-2">
        <input
          id="gross"
          type="text"
          inputMode="numeric"
          autoComplete="off"
          value={shown ? num(shown) : ''}
          onChange={(e) => {
            const v = Math.min(100000000, Number(e.target.value.replace(/\D/g, '')) || 0);
            setGross(monthly ? v * 12 : v);
          }}
          className="tnum w-full text-2xl font-bold border-2 border-mist rounded-xl px-4 py-3 focus:border-netto outline-none"
        />
        <span className="text-lg font-semibold text-fjord/60">{lang === 'en' ? 'NOK' : 'kr'}</span>
      </div>
      <input
        type="range"
        min="200000"
        max="2000000"
        step="5000"
        value={Math.min(Math.max(gross, 200000), 2000000)}
        onChange={(e) => setGross(Number(e.target.value))}
        aria-label={t.ariaRange}
        className="w-full accent-[#1e8a5a] mb-6"
      />

      {/* Signatur: det store netto-tallet */}
      <div className="text-center mb-6">
        <p className="text-sm uppercase tracking-wide text-fjord/60">{t.netTitle(year)}</p>
        <p className="tnum display text-5xl sm:text-6xl font-bold text-netto leading-tight">
          {monthly ? num(r.nettoMnd) : num(r.netto)} {lang === 'en' ? 'NOK' : 'kr'}
        </p>
        <p className="tnum text-fjord/70 mt-1">
          {monthly
            ? `${num(r.netto)} ${t.perYear}`
            : `${lang === 'en' ? '≈' : 'ca.'} ${num(r.nettoMnd)} ${t.perMonth}`}
          {' · '}{lang === 'en' ? r.skattProsent : pct(r.skattProsent)} {t.total}
        </p>
      </div>

      {/* Fordelingsstolpe: hvor blir bruttolønnen av? */}
      <div
        className="flex h-9 w-full rounded-lg overflow-hidden mb-3"
        role="img"
        aria-label={t.ariaBar(num(gross), num(r.totalSkatt), num(r.netto))}
      >
        {parts.map((p) =>
          p.value > 0 ? (
            <div key={p.label} className={p.cls} style={{ width: `${(p.value / (gross || 1)) * 100}%` }} />
          ) : null
        )}
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm mb-6">
        {parts.map((p) => (
          <li key={p.label} className="flex items-center gap-2">
            <span className={`inline-block w-3 h-3 rounded-sm ${p.cls}`} />
            <span className="text-fjord/80">{p.label}:</span>
            <span className="tnum font-semibold ml-auto whitespace-nowrap">
              {num(monthly ? p.value / 12 : p.value)} {lang === 'en' ? 'NOK' : 'kr'}
            </span>
          </li>
        ))}
      </ul>

      <div className="bg-netto-soft rounded-xl p-4 text-sm text-fjord">
        <p>
          <strong>{t.marginal}: {lang === 'en' ? marginal : pct(marginal)} %.</strong>{' '}
          {t.marginalText}{' '}
          <span className="tnum font-semibold">{num(1000 - marginal * 10)} {lang === 'en' ? 'NOK' : 'kr'}</span>.
        </p>
      </div>

      <p className="text-xs text-fjord/50 mt-4">
        {t.note(year)}{' '}
        {year === 2027 && <>{t.note2027}{' '}</>}
        {monthly && <>{t.monthNote}{' '}</>}
        {t.seeFull && year === 2026 && (
          <Link href={`/lonn/${salarySlug(nearest)}`} className="underline text-netto">
            {t.seeFull(fmt(nearest))}
          </Link>
        )}
      </p>
    </div>
  );
}
