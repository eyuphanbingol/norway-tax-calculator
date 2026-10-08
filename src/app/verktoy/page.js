import Link from 'next/link';
import { DOMAIN } from '../../lib/constants';

export const metadata = {
  title: 'Verktøy: kalkulatorer for lønn, skatt og fradrag',
  description: 'Gratis kalkulatorer for 2026: skattekalkulator, skatt 2027, månedslønn etter skatt, timelønn etter skatt, feriepenger og reisefradrag.',
  alternates: { canonical: `${DOMAIN}/verktoy` },
};

const tools = [
  { href: '/', title: 'Skattekalkulator 2026', text: 'Lønn etter skatt per år og måned med 2026-satsene.' },
  { href: '/skattekalkulator-2027', title: 'Skattekalkulator 2027', text: 'Se skatten neste år med regjeringens forslag til statsbudsjett.' },
  { href: '/manedslonn', title: 'Månedslønn etter skatt', text: 'Hva får du utbetalt av 30 000 til 100 000 kr i måneden?' },
  { href: '/pensjon-etter-skatt', title: 'Pensjon etter skatt', text: 'Alderspensjon etter skatt med skattefradraget for pensjonister.' },
  { href: '/timelonn-etter-skatt', title: 'Timelønn etter skatt', text: 'Regn om timelønn til års- og månedslønn etter skatt.' },
  { href: '/feriepenger-kalkulator', title: 'Feriepengekalkulator', text: '10,2 %, 12 % og tillegg for deg over 60 år.' },
  { href: '/reisefradrag-kalkulator', title: 'Reisefradrag-kalkulator', text: 'Fradrag for reiser mellom hjem og jobb med 2026-reglene.' },
  { href: '/lonn', title: 'Lønn etter skatt-tabell', text: 'Netto årslønn og månedslønn for 300 000 til 2 000 000 kr.' },
  { href: '/del-kalkulatoren', title: 'Kalkulator til din nettside', text: 'Legg inn en gratis skattekalkulator på bloggen eller nettsiden din.' },
];

export default function Verktoy() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="display text-3xl font-extrabold mb-2">Verktøy og kalkulatorer</h1>
      <p className="text-fjord/80 mb-8">Gratis kalkulatorer for lønn, skatt og fradrag – oppdatert med satsene for 2026.</p>
      <div className="grid sm:grid-cols-2 gap-4">
        {tools.map((t) => (
          <Link key={t.href} href={t.href} className="block bg-white border border-mist rounded-2xl p-5 hover:border-netto transition">
            <h2 className="display font-bold text-lg mb-1">{t.title}</h2>
            <p className="text-sm text-fjord/75 leading-relaxed">{t.text}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
