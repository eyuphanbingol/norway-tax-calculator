import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 py-10 mt-20 border-t border-slate-800">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Sol Taraf: Marka */}
        <div>
          <h3 className="text-white text-xl font-bold mb-4">🇳🇴 Skattekalkulator</h3>
          <p className="text-sm text-slate-400">
            Enkelt verktøy for å beregne lønn etter skatt i Norge. 
            Oppdatert for {currentYear}.
            <br/>(Norveç için basit vergi hesaplama aracı.)
          </p>
        </div>

        {/* Orta: Hızlı Linkler */}
        <div>
          <h4 className="text-white font-semibold mb-4">Snarveier (Hızlı Linkler)</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-emerald-400 transition">Hjem (Ana Sayfa)</Link>
            </li>
            <li>
              <Link href="/om-oss" className="hover:text-emerald-400 transition">Om Oss (Hakkımızda)</Link>
            </li>
            <li>
              <Link href="/kontakt" className="hover:text-emerald-400 transition">Kontakt Oss (İletişim)</Link>
            </li>
          </ul>
        </div>

        {/* Sağ: Yasal */}
        <div>
          <h4 className="text-white font-semibold mb-4">Juridisk (Yasal)</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/personvern" className="hover:text-emerald-400 transition">Personvernerklæring (Gizlilik)</Link>
            </li>
            <li>
              <Link href="/cookies" className="hover:text-emerald-400 transition">Informasjonskapsler (Çerezler)</Link>
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