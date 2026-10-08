import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-fjord-deep text-white">
      <div className="max-w-5xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-3">
        <Link href="/" className="display text-lg font-bold tracking-tight">
          skatte<span className="text-krone">kalkulator</span>.com
        </Link>
        <nav className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-white/85 whitespace-nowrap">
          <Link href="/" className="hover:text-white">Kalkulator</Link>
          <Link href="/skattekalkulator-2027" className="hover:text-white">2027</Link>
          <Link href="/lonn" className="hover:text-white">Lønnstabell</Link>
          <Link href="/blog" className="hover:text-white">Guider</Link>
          <Link href="/om-oss" className="hover:text-white">Om oss</Link>
          <Link href="/kontakt" className="hover:text-white">Kontakt</Link>
          <Link href="/en" className="hover:text-white" hrefLang="en">English</Link>
        </nav>
      </div>
    </header>
  );
}
