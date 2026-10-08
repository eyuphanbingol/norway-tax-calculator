import Link from 'next/link';
import ConsentLink from './ConsentLink';

export default function Footer() {
  return (
    <footer className="bg-fjord-deep text-white/70 mt-16">
      <div className="max-w-5xl mx-auto px-4 py-10 grid gap-8 sm:grid-cols-3 text-sm">
        <div>
          <p className="display text-white font-bold mb-2">Skattekalkulator Norge</p>
          <p>Uavhengig kalkulator for lønn etter skatt, oppdatert med satsene for 2026 vedtatt av Stortinget. Drives av Eyüp Bingöl.</p>
        </div>
        <div>
          <p className="text-white font-semibold mb-2">Innhold</p>
          <ul className="space-y-1">
            <li><Link href="/skattekalkulator-2027" className="hover:text-white">Skattekalkulator 2027</Link></li>
            <li><Link href="/lonn" className="hover:text-white">Lønn etter skatt-tabell</Link></li>
            <li><Link href="/manedslonn" className="hover:text-white">Månedslønn etter skatt</Link></li>
            <li><Link href="/pensjon-etter-skatt" className="hover:text-white">Pensjon etter skatt</Link></li>
            <li><Link href="/verktoy" className="hover:text-white">Alle kalkulatorer</Link></li>
            <li><Link href="/del-kalkulatoren" className="hover:text-white">Kalkulator til din nettside</Link></li>
            <li><Link href="/en" className="hover:text-white" hrefLang="en">Norway tax calculator (English)</Link></li>
            <li><Link href="/blog" className="hover:text-white">Guider og artikler</Link></li>
            <li><Link href="/blog/trinnskatt-2026" className="hover:text-white">Trinnskatt 2026</Link></li>
            <li><Link href="/blog/skatteendringer-2026-guide" className="hover:text-white">Skatteendringer 2026</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-white font-semibold mb-2">Om siden</p>
          <ul className="space-y-1">
            <li><Link href="/om-oss" className="hover:text-white">Om oss</Link></li>
            <li><Link href="/kontakt" className="hover:text-white">Kontakt</Link></li>
            <li><Link href="/personvern" className="hover:text-white">Personvern og cookies</Link></li>
            <li><ConsentLink className="hover:text-white text-left cursor-pointer" /></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50 px-4">
        Beregningene er veiledende og erstatter ikke tall fra Skatteetaten. © {new Date().getFullYear()} skattekalkulator.com
      </div>
    </footer>
  );
}
