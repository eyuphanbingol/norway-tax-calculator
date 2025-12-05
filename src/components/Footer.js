import Link from 'next/link';
import Logo from './Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 py-10 mt-20 border-t border-slate-800">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Sol Taraf: Marka */}
        <div className="flex flex-col items-center md:items-start">
          <div className="mb-4">
             <Logo color="text-white" />
          </div>
          <p className="text-sm text-slate-400">
            Enkelt verktøy for å beregne lønn etter skatt i Norge. 
            Oppdatert for {currentYear}.
          </p>
        </div>

        {/* Orta: Hızlı Linkler */}
        <div>
          <h4 className="text-white font-semibold mb-4">Snarveier</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-emerald-400 transition">Hjem </Link>
            </li>
            <li>
              <Link href="/blog" className="text-emerald-400 font-bold hover:text-emerald-300 transition">Blogg & Tips </Link>
            </li>
            <li>
              <Link href="/om-oss" className="hover:text-emerald-400 transition">Om Oss </Link>
            </li>
            <li>
              <Link href="/kontakt" className="hover:text-emerald-400 transition">Kontakt Oss </Link>
            </li>
          </ul>
        </div>

        {/* Sağ: Yasal */}
        <div>
          <h4 className="text-white font-semibold mb-4">Juridisk </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/personvern" className="hover:text-emerald-400 transition">Personvernerklæring </Link>
            </li>
            <li>
              <Link href="/cookies" className="hover:text-emerald-400 transition">Informasjonskapsler </Link>
            </li>
          </ul>
        </div>

      </div>
      
      <div className="text-center text-xs text-slate-600 mt-10 pt-6 border-t border-slate-800">
        © {currentYear} Skattekalkulator Norge. Alle rettigheter reservert.
      </div>
    </footer>
  );
}