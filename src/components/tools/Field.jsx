'use client';
import { useState } from 'react';
import { fmt, parseAmount } from '../../lib/tax';

// Tallfelt med tusenskille, brukt av verktøyene.
// decimals: tillat øre (f.eks. timelønn 287,50). Feltet viser da det brukeren skriver.
export function NumberField({ id, label, value, onChange, suffix = 'kr', max = 100000000, decimals = false }) {
  const [text, setText] = useState(null);
  if (decimals) {
    return (
      <div className="mb-4">
        <label htmlFor={id} className="block text-sm font-semibold mb-1.5">{label}</label>
        <div className="flex items-center gap-3">
          <input
            id={id}
            type="text"
            inputMode="decimal"
            autoComplete="off"
            value={text ?? (value ? String(value).replace('.', ',') : '')}
            onChange={(e) => {
              const raw = e.target.value.replace(/[^\d.,\s]/g, '');
              // Komma er desimalskille; punktum og mellomrom er tusenskille («1.000,50» → 1000,5).
              // Står det bare punktum med 1–2 sifre bak («287.5»), leses det som desimal.
              let norm = raw.replace(/\s/g, '');
              if (norm.includes(',')) norm = norm.replace(/\./g, '').replace(',', '.');
              else if (!/\.\d{1,2}$/.test(norm)) norm = norm.replace(/\./g, '');
              const n = Number(norm);
              const v = Number.isFinite(n) ? Math.min(max, Math.round(n * 100) / 100) : 0;
              setText(v === max && n > max ? String(max) : raw);
              onChange(v);
            }}
            onBlur={() => setText(null)}
            className="tnum w-full text-xl font-bold border-2 border-mist rounded-xl px-4 py-2.5 focus:border-netto outline-none"
          />
          {suffix && <span className="font-semibold text-fjord/75 whitespace-nowrap">{suffix}</span>}
        </div>
      </div>
    );
  }
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-semibold mb-1.5">{label}</label>
      <div className="flex items-center gap-3">
        <input
          id={id}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          value={value ? fmt(value) : ''}
          onChange={(e) => onChange(Math.min(max, parseAmount(e.target.value)))}
          className="tnum w-full text-xl font-bold border-2 border-mist rounded-xl px-4 py-2.5 focus:border-netto outline-none"
        />
        {suffix && <span className="font-semibold text-fjord/75 whitespace-nowrap">{suffix}</span>}
      </div>
    </div>
  );
}

export function Result({ label, value, sub }) {
  return (
    <div className="text-center my-6">
      <p className="text-sm uppercase tracking-wide text-fjord/75">{label}</p>
      <p className="tnum display text-4xl sm:text-5xl font-bold text-netto leading-tight">{value}</p>
      {sub && <p className="tnum text-fjord/70 mt-1">{sub}</p>}
    </div>
  );
}

export function Rows({ rows }) {
  return (
    <ul className="text-sm divide-y divide-mist border-t border-b border-mist mb-4">
      {rows.map(([k, v]) => (
        <li key={k} className="flex justify-between gap-4 py-2">
          <span className="text-fjord/80">{k}</span>
          <span className="tnum font-semibold whitespace-nowrap">{v}</span>
        </li>
      ))}
    </ul>
  );
}
