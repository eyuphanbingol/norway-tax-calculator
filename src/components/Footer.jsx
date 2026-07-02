import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-fjord-deep text-white/70 mt-16">
      <div className="max-w-5xl mx-auto px-4 py-10 grid gap-8 sm:grid-cols-3 text-sm">
        <div>
          <p className="display text-white font-bold mb-2">Skattekalkulator Norge</p>
          <p>Uavhengig kalkulator for lønn etter skatt, oppdatert med satsene for 2026 vedtatt av Stortinget.</p>
        </div>
        <div>
          <p className="text-white font-semibold mb-2">Innhold</p>
          <ul className="space-y-1">
            <li><Link href="/lonn" className="hover:text-white">Lønn etter skatt-tabell</Link></li>
            <li><Link href="/blog" className="hover:text-white">Guider og artikler</Link></li>
            <li><Link href="/blog/trinnskatt-2026" className="hover:text-white">Trinnskatt 2026</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-white font-semibold mb-2">Om siden</p>
          <ul className="space-y-1">
            <li><Link href="/om-oss" className="hover:text-white">Om oss</Link></li>
            <li><Link href="/kontakt" className="hover:text-white">Kontakt</Link></li>
            <li><Link href="/personvern" className="hover:text-white">Personvern og cookies</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50 px-4">
        Beregningene er veiledende og erstatter ikke tall fra Skatteetaten. © {new Date().getFullYear()} skattekalkulator.com
      </div>
    </footer>
  );
}
