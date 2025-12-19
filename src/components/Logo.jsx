export default function Footer() {
  // Dinamik yıl: 2026'ya girince otomatik değişir ama biz şimdiden 2026 yapabiliriz
  const currentYear = new Date().getFullYear() < 2026 ? 2026 : new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-6">
          <h2 className="text-white font-bold text-xl mb-2">Skattekalkulator Norge</h2>
          <p className="text-sm max-w-md mx-auto">
            Norges mest nøyaktige og oppdaterte skattekalkulator for 2025 ve 2026. 
            Vi hjelper deg med å forstå din personlige økonomi.
          </p>
        </div>
        
        <div className="flex justify-center gap-6 mb-8 text-sm font-medium">
          <a href="/personvern" className="hover:text-emerald-400 transition">Personvern</a>
          <a href="/om-oss" className="hover:text-emerald-400 transition">Om oss</a>
          <a href="/kontakt" className="hover:text-emerald-400 transition">Kontakt</a>
          <a href="/blog" className="hover:text-emerald-400 transition">Blogg</a>
        </div>

        <div className="pt-8 border-t border-slate-800 text-xs">
          <p>© {currentYear} Skattekalkulator.com - Alle rettigheter reservert.</p>
          <p className="mt-2 text-slate-600 italic">Oppdatert i henhold til Statsbudsjettet 2026.</p>
        </div>
      </div>
    </footer>
  );
}