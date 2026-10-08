'use client';
import { useState } from 'react';
import { beregnFeriepenger, fmt, G_2026 } from '../../lib/tax';
import { NumberField, Result, Rows } from './Field';

export default function FeriepengerCalc() {
  const [grunnlag, setGrunnlag] = useState(550000);
  const [femUker, setFemUker] = useState(true);
  const [over60, setOver60] = useState(false);
  const r = beregnFeriepenger(grunnlag, { femUker, over60 });
  const opt = (on) => `px-3 py-1.5 rounded-lg text-sm font-semibold ${on ? 'bg-fjord text-white' : 'text-fjord/70'}`;
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-mist p-6 sm:p-8">
      <NumberField id="grunnlag" label="Feriepengegrunnlag (lønn i fjor, brutto)" value={grunnlag} onChange={setGrunnlag} />
      <div className="flex flex-wrap gap-2 mb-2">
        <div className="inline-flex bg-mist/60 rounded-xl p-1" role="group" aria-label="Ferie">
          <button type="button" className={opt(!femUker)} aria-pressed={!femUker} onClick={() => setFemUker(false)}>4 uker + 1 dag (10,2 %)</button>
          <button type="button" className={opt(femUker)} aria-pressed={femUker} onClick={() => setFemUker(true)}>5 uker (12 %)</button>
        </div>
        <label className="inline-flex items-center gap-2 text-sm font-semibold px-2">
          <input type="checkbox" checked={over60} onChange={(e) => setOver60(e.target.checked)} className="w-4 h-4 accent-[#1e8a5a]" />
          Fyller 60 år eller mer i år
        </label>
      </div>
      <Result label="Feriepenger" value={`${fmt(r.total)} kr`} />
      <Rows rows={[
        [`Feriepenger (${femUker ? '12' : '10,2'} %)`, `${fmt(r.ordinaer)} kr`],
        ...(over60 ? [['Tillegg over 60 år (2,3 % av inntil 6G)', `${fmt(r.tillegg)} kr`]] : []),
      ]} />
      <p className="text-xs text-fjord/50">
        Tillegget for over 60 år beregnes av grunnlag opptil 6G ({fmt(6 * G_2026)} kr med grunnbeløpet fra 1. mai 2026).
        Feriepengene er skattepliktige, men det trekkes normalt ikke skatt av ordinære feriepenger ved utbetaling.
        Arbeidsgiveren kan ha bedre ordninger enn loven. Tallene er veiledende.
      </p>
    </div>
  );
}
