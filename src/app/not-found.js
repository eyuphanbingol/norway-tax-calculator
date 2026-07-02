import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-20 text-center">
      <h1 className="display text-4xl font-extrabold mb-3">Siden finnes ikke</h1>
      <p className="text-fjord/70 mb-6">Lenken kan være utdatert. Prøv kalkulatoren i stedet.</p>
      <Link href="/" className="inline-block bg-netto text-white font-bold px-6 py-3 rounded-xl">
        Til skattekalkulatoren →
      </Link>
    </main>
  );
}
