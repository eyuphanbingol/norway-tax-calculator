import Link from 'next/link';
import Logo from './Logo';

export default function Footer() {
  // Eğer yıl 2026'dan küçükse (2025 ise) otomatik 2026 göster, yoksa güncel yılı al.
  const currentYear = new Date().getFullYear() < 2026 ? 2026 : new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 py-12 mt-20 border-t border-slate-800">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Sol Taraf: Marka ve Açıklama */}
        <div className="flex flex-col items-center md:items-start">
          <div className="mb-4 scale-110 origin-left">
             <Logo color="text-white" />
          </div>
          <p className="text-sm text-slate-400 max-w-xs">
            Norges mest nøyaktige skattekalkulator. 
            Oppdatert med offisielle satser fra Statsbudsjettet for {currentYear}.
          </p>
        </div>

        {/* Orta: Hızlı Linkler */}
        <div>
          <h4 className="text-white font-bold mb-6 text-lg">Snarveier</h4>
          <ul className="space-y-3 text-sm font-medium">
            <li>
              <Link href="/" className="hover:text-emerald-400 transition flex items-center justify-center md:justify-start gap-2">
                <span>🏠</span> Hjem
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-emerald-400 hover:text-emerald-300 transition flex items-center justify-center md:justify-start gap-2">
                <span>📰</span> Blogg & Tips
              </Link>
            </li>
            <li>
              <Link href="/verktoy" className="hover:text-emerald-400 transition flex items-center justify-center md:justify-start gap-2">
                <span>🧮</span> Verktøy
              </Link>
            </li>
            <li>
              <Link href="/om-oss" className="hover:text-emerald-400 transition flex items-center justify-center md:justify-start gap-2">
                <span>👥</span> Om oss
              </Link>
            </li>
            <li>
              <Link href="/kontakt" className="hover:text-emerald-400 transition flex items-center justify-center md:justify-start gap-2">
                <span>✉️</span> Kontakt oss
              </Link>
            </li>
          </ul>
        </div>

        {/* Sağ: Yasal */}
        <div>
          <h4 className="text-white font-bold mb-6 text-lg">Juridisk</h4>
          <ul className="space-y-3 text-sm font-medium">
            <li>
              <Link href="/personvern" className="hover:text-emerald-400 transition">
                Personvernerklæring
              </Link>
            </li>
            <li>
              <Link href="/cookies" className="hover:text-emerald-400 transition">
                Informasjonskapsler
              </Link>
            </li>
          </ul>
          
          <div className="mt-8 pt-6 border-t border-slate-800">
             <p className="text-xs text-slate-500">
               Utviklet med ❤️ for Norge.
             </p>
          </div>
        </div>

      </div>
      
      {/* En Alt: Copyright */}
      <div className="text-center text-xs text-slate-600 mt-12 pt-8 border-t border-slate-800">
        <p>© {currentYear} Skattekalkulator.com - Alle rettigheter reservert.</p>
      </div>
    </footer>
  );
}