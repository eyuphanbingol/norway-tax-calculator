'use client';
import { useState } from 'react';
import { beregnPensjonsskatt, fmt, pct } from '../../lib/tax';
import { NumberField, Result, Rows } from './Field';

export default function PensjonCalc({ initial = 350000 }) {
  const [pensjon, setPensjon] = useState(initial);
  const [monthly, setMonthly] = useState(false);
  const r = beregnPensjonsskatt(pensjon);
  const marg = Math.round((beregnPensjonsskatt(pensjon + 1000).totalSkatt - r.totalSkatt) / 10 * 10) / 10;
  const opt = (on) => `px-3 py-1.5 rounded-lg text-sm font-semibold ${on ? 'bg-fjord text-white' : 'text-fjord/70'}`;
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-mist p-6 sm:p-8">
      <div className="inline-flex bg-mist/60 rounded-xl p-1 mb-4" role="group" aria-label="Per år / per måned">
        <button type="button" className={opt(!monthly)} aria-pressed={!monthly} onClick={() => setMonthly(false)}>Per år</button>
        <button type="button" className={opt(monthly)} aria-pressed={monthly} onClick={() => setMonthly(true)}>Per måned</button>
      </div>
      <NumberField
        id="pensjon"
        label={monthly ? 'Pensjon per måned før skatt' : 'Pensjon per år før skatt'}
        value={monthly ? Math.round(pensjon / 12) : pensjon}
        onChange={(v) => setPensjon(monthly ? v * 12 : v)}
      />
      <Result
        label="Pensjon etter skatt i 2026"
        value={`${fmt(monthly ? r.nettoMnd : r.netto)} kr`}
        sub={`${monthly ? `${fmt(r.netto)} kr per år` : `ca. ${fmt(r.nettoMnd)} kr per måned i snitt`} · ${pct(r.skattProsent)} % skatt`}
      />
      <Rows rows={[
        ['Skatt på alminnelig inntekt (22 %)', `${fmt(r.inntektsskatt)} kr`],
        ['Trygdeavgift (5,1 %)', `${fmt(r.trygdeavgift)} kr`],
        ['Trinnskatt', `${fmt(r.trinnskatt)} kr`],
        ['Skattefradrag for pensjonsinntekt', `−${fmt(r.skattefradrag)} kr`],
        ['Sum skatt per år', `${fmt(r.totalSkatt)} kr`],
      ]} />
      <div className="bg-netto-soft rounded-xl p-4 text-sm text-fjord mb-4">
        <strong>Marginalskatt: {pct(marg)} %.</strong> Av de neste 1 000 kronene i pensjon sitter du igjen med ca. {fmt(1000 - marg * 10)} kr.
      </div>
      <p className="text-xs text-fjord/50">
        Gjelder alderspensjon og AFP mottatt hele året med full pensjonsgrad, uten annen inntekt og med
        standard fradrag (ikke Finnmark/Nord-Troms). Uføretrygd skattlegges etter andre regler.
        Tallene er veiledende.
      </p>
    </div>
  );
}
