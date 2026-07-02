'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { beregnSkatt, marginalskatt, fmt, SALARY_PAGES, salarySlug } from '../lib/tax';

export default function Calculator({ initial = 600000 }) {
  const [gross, setGross] = useState(initial);
  const r = useMemo(() => beregnSkatt(gross), [gross]);
  const marginal = useMemo(() => marginalskatt(gross), [gross]);

  const parts = [
    { label: 'Inntektsskatt (22 %)', value: r.inntektsskatt, cls: 'bg-skatt' },
    { label: 'Trygdeavgift (7,6 %)', value: r.trygdeavgift, cls: 'bg-skatt/70' },
    { label: 'Trinnskatt', value: r.trinnskatt, cls: 'bg-krone' },
    { label: 'Utbetalt (netto)', value: r.netto, cls: 'bg-netto' },
  ];

  const nearest = SALARY_PAGES.reduce((a, b) =>
    Math.abs(b - gross) < Math.abs(a - gross) ? b : a, SALARY_PAGES[0]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-mist p-6 sm:p-8">
      <label htmlFor="gross" className="block text-sm font-semibold mb-2">
        Årslønn før skatt (brutto)
      </label>
      <div className="flex items-center gap-3 mb-2">
        <input
          id="gross"
          type="number"
          inputMode="numeric"
          min="0"
          step="1000"
          value={gross}
          onChange={(e) => setGross(Math.max(0, Number(e.target.value) || 0))}
          className="tnum w-full text-2xl font-bold border-2 border-mist rounded-xl px-4 py-3 focus:border-netto outline-none"
        />
        <span className="text-lg font-semibold text-fjord/60">kr</span>
      </div>
      <input
        type="range"
        min="200000"
        max="2000000"
        step="5000"
        value={Math.min(Math.max(gross, 200000), 2000000)}
        onChange={(e) => setGross(Number(e.target.value))}
        aria-label="Juster årslønn"
        className="w-full accent-[#1e8a5a] mb-6"
      />

      {/* Signatur: det store netto-tallet */}
      <div className="text-center mb-6">
        <p className="text-sm uppercase tracking-wide text-fjord/60">Utbetalt etter skatt i 2026</p>
        <p className="tnum display text-5xl sm:text-6xl font-bold text-netto leading-tight">
          {fmt(r.netto)} kr
        </p>
        <p className="tnum text-fjord/70 mt-1">
          {fmt(r.nettoMnd)} kr per måned · {r.skattProsent} % skatt totalt
        </p>
      </div>

      {/* Fordelingsstolpe: hvor blir bruttolønnen av? */}
      <div
        className="flex h-9 w-full rounded-lg overflow-hidden mb-3"
        role="img"
        aria-label={`Av ${fmt(gross)} kr går ${fmt(r.totalSkatt)} kr til skatt og ${fmt(r.netto)} kr utbetales`}
      >
        {parts.map((p) =>
          p.value > 0 ? (
            <div key={p.label} className={p.cls} style={{ width: `${(p.value / (gross || 1)) * 100}%` }} />
          ) : null
        )}
      </div>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm mb-6">
        {parts.map((p) => (
          <li key={p.label} className="flex items-center gap-2">
            <span className={`inline-block w-3 h-3 rounded-sm ${p.cls}`} />
            <span className="text-fjord/80">{p.label}:</span>
            <span className="tnum font-semibold ml-auto">{fmt(p.value)} kr</span>
          </li>
        ))}
      </ul>

      <div className="bg-netto-soft rounded-xl p-4 text-sm text-fjord">
        <p>
          <strong>Marginalskatt: {marginal} %.</strong>{' '}
          Av de neste 1 000 kronene du tjener, sitter du igjen med{' '}
          <span className="tnum font-semibold">{fmt(1000 - marginal * 10)} kr</span>.
        </p>
      </div>

      <p className="text-xs text-fjord/50 mt-4">
        Beregnet med standard minstefradrag og personfradrag for 2026. Individuelle fradrag
        (renter, pendling, fagforening m.m.) kan gi lavere skatt.{' '}
        <Link href={`/lonn/${salarySlug(nearest)}`} className="underline text-netto">
          Se full oversikt for {fmt(nearest)} kr →
        </Link>
      </p>
    </div>
  );
}
