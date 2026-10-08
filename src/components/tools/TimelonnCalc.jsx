'use client';
import { useState } from 'react';
import { beregnSkatt, fmt, pct } from '../../lib/tax';
import { NumberField, Result, Rows } from './Field';

export default function TimelonnCalc() {
  const [time, setTime] = useState(300);
  const [timer, setTimer] = useState(37.5);
  const aar = Math.round(time * timer * 52);
  const r = beregnSkatt(aar);
  const nettoTime = timer > 0 ? r.netto / (timer * 52) : 0;
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-mist p-6 sm:p-8">
      <NumberField id="time" label="Timelønn før skatt" value={time} onChange={setTime} suffix="kr/time" max={10000} />
      <div className="mb-4">
        <label htmlFor="timer" className="block text-sm font-semibold mb-1.5">Timer per uke: {String(timer).replace('.', ',')}</label>
        <input id="timer" type="range" min="5" max="45" step="2.5" value={timer}
          onChange={(e) => setTimer(Number(e.target.value))} className="w-full accent-[#1e8a5a]" />
        <p className="text-xs text-fjord/50 mt-1">Full stilling er vanligvis 37,5 timer per uke.</p>
      </div>
      <Result label="Timelønn etter skatt (snitt)" value={`${fmt(nettoTime)} kr/time`}
        sub={`ca. ${fmt(r.nettoMnd)} kr per måned · ${pct(r.skattProsent)} % skatt`} />
      <Rows rows={[
        ['Årslønn brutto (timelønn × timer × 52 uker)', `${fmt(aar)} kr`],
        ['Skatt per år', `${fmt(r.totalSkatt)} kr`],
        ['Utbetalt per år', `${fmt(r.netto)} kr`],
        ['Utbetalt per måned (snitt)', `${fmt(r.nettoMnd)} kr`],
      ]} />
      <p className="text-xs text-fjord/50">
        Beregnet med 2026-satsene og standard fradrag, som om lønnen var din eneste inntekt i hele året.
        Får du feriepenger i stedet for lønn i ferien, blir årslønnen omtrent den samme. Tallene er veiledende.
      </p>
    </div>
  );
}
