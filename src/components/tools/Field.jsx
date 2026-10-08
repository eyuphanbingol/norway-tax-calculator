'use client';
import { fmt } from '../../lib/tax';

// Tallfelt med tusenskille, brukt av verktøyene
export function NumberField({ id, label, value, onChange, suffix = 'kr', max = 100000000 }) {
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
          onChange={(e) => onChange(Math.min(max, Number(e.target.value.replace(/\D/g, '')) || 0))}
          className="tnum w-full text-xl font-bold border-2 border-mist rounded-xl px-4 py-2.5 focus:border-netto outline-none"
        />
        {suffix && <span className="font-semibold text-fjord/60 whitespace-nowrap">{suffix}</span>}
      </div>
    </div>
  );
}

export function Result({ label, value, sub }) {
  return (
    <div className="text-center my-6">
      <p className="text-sm uppercase tracking-wide text-fjord/60">{label}</p>
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
