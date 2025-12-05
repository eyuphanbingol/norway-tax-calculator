import Link from 'next/link';
import Logo from './Logo';

export default function Header() {
  return (
    <header className="bg-[#005c45] border-b border-emerald-800/30 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Sol: Logo */}
        <Link href="/" className="hover:opacity-90 transition">
          <Logo color="text-white" />
        </Link>

        {/* Sağ: Menü Linkleri */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-emerald-50">
          <Link href="/" className="hover:text-white transition">Hjem</Link>
          <Link href="/blog" className="hover:text-white transition">Blogg</Link>
          <Link href="/om-oss" className="hover:text-white transition">Om oss</Link>
          
          {/* İngilizce Geçiş */}
          <Link href="/en" className="bg-emerald-900/50 hover:bg-emerald-900 text-white px-3 py-1.5 rounded-full text-xs transition border border-emerald-700/50">
            English 🇬🇧
          </Link>
        </nav>

        {/* Mobil İçin Basit Menü (Sadece EN butonu ve Blog) */}
        <div className="flex md:hidden items-center gap-3">
           <Link href="/blog" className="text-sm text-emerald-50 font-medium">Blogg</Link>
           <Link href="/en" className="text-xl">🇬🇧</Link>
        </div>
      </div>
    </header>
  );
}