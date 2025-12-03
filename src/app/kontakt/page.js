export default function ContactPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-3xl text-center">
      <h1 className="text-3xl font-bold mb-6 text-slate-800">Kontakt Oss</h1>
      
      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 inline-block">
        <p className="text-lg text-slate-600 mb-4">
          Har du spørsmål, tilbakemeldinger eller forslag til forbedringer?
          (Sorunuz veya öneriniz mi var?)
        </p>
        <p className="text-xl font-bold text-emerald-700">
          post@skattekalkulator.no
        </p>
        <p className="text-sm text-slate-400 mt-4">
          (Dette er en eksempel-epost / Bu örnek bir maildir, domain alınca aktif olur)
        </p>
      </div>
    </main>
  );
}