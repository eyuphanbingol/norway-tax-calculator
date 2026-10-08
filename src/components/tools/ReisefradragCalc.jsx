'use client';
import { useState } from 'react';
import { beregnReisefradrag, fmt, REISE_2026 } from '../../lib/tax';
import { NumberField, Result, Rows } from './Field';

export default function ReisefradragCalc() {
  const [km, setKm] = useState(30);
  const [dager, setDager] = useState(230);
  const r = beregnReisefradrag(km * 2, dager);
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-mist p-6 sm:p-8">
      <NumberField id="km" label="Avstand hjem–jobb, én vei" value={km} onChange={setKm} suffix="km" max={2000} />
      <NumberField id="dager" label="Antall arbeidsdager du reiser i året" value={dager} onChange={setDager} suffix="dager" max={366} />
      <Result label="Reisefradrag 2026" value={`${fmt(r.fradrag)} kr`}
        sub={`Verdi i spart skatt: ca. ${fmt(r.skatteverdi)} kr`} />
      <Rows rows={[
        [`Reisekostnad (${fmt(km * 2)} km × ${fmt(dager)} dager × 1,90 kr)`, `${fmt(r.kostnad)} kr`],
        ['Minus egenandel (bunnfradrag)', `−${fmt(REISE_2026.bunnfradrag)} kr`],
        ['Reisefradrag', `${fmt(r.fradrag)} kr`],
        ['Spart skatt (22 %)', `${fmt(r.skatteverdi)} kr`],
      ]} />
      <p className="text-xs text-fjord/50">
        Reisekostnaden regnes med inntil {fmt(REISE_2026.ovreGrense)} kr før egenandelen trekkes fra.
        Bompenger og ferge kan gi fradrag i tillegg etter egne regler – se skatteetaten.no.
        Tallene er veiledende.
      </p>
    </div>
  );
}
