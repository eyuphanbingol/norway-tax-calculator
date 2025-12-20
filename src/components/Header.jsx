'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-[#005c45] border-b border-emerald-800/30 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* SOL: Logo */}
        <Link href="/" className="hover:opacity-90 transition z-50">
          <Logo color="text-white" />
        </Link>

        {/* ORTA: Desktop Menü */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-emerald-50">
          <Link href="/" className="hover:text-white transition">Hjem</Link>
          <Link href="/verktoy" className="hover:text-white transition">Verktøy 🤖</Link>
          <Link href="/sparing" className="hover:text-white transition">Sparing 🐷</Link>
          <Link href="/blog" className="hover:text-white transition">Blogg</Link>
          <Link href="/om-oss" className="hover:text-white transition">Om oss</Link>
        </nav>

        {/* SAĞ: İngilizce Butonu */}
        <div className="hidden md:block">
          <Link href="/en" className="bg-emerald-900/50 hover:bg-emerald-900 text-white px-3 py-1.5 rounded-full text-xs transition border border-emerald-700/50">
            English 🇬🇧
          </Link>
        </div>

        {/* MOBİL MENÜ BUTONU */}
        <button 
          className="md:hidden text-white p-2 z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Åpne meny"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* MOBİL AÇILIR MENÜ */}
        {isMenuOpen && (
          <div className="absolute top-0 left-0 w-full h-screen bg-[#004d3a] flex flex-col items-center justify-center gap-8 md:hidden animate-in fade-in slide-in-from-top-10 duration-200">
            <nav className="flex flex-col items-center gap-6 text-lg font-bold text-white">
              <Link href="/" onClick={() => setIsMenuOpen(false)}>Hjem</Link>
              <Link href="/verktoy" onClick={() => setIsMenuOpen(false)}>Verktøy & Hjelp</Link>
              <Link href="/sparing" onClick={() => setIsMenuOpen(false)}>Sparing & Tilbud</Link>
              <Link href="/blog" onClick={() => setIsMenuOpen(false)}>Blogg</Link>
              <Link href="/kontakt" onClick={() => setIsMenuOpen(false)}>Kontakt</Link>
              <Link href="/en" onClick={() => setIsMenuOpen(false)} className="bg-emerald-800 px-6 py-2 rounded-full">English 🇬🇧</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}