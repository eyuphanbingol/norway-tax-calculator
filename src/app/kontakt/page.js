export default function ContactPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-3xl text-center">
      <h1 className="text-3xl font-bold mb-6 text-slate-800">Kontakt Oss</h1>
      
      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 inline-block max-w-lg w-full">
        <p className="text-lg text-slate-600 mb-6">
          Har du spørsmål om kalkulatoren, tilbakemeldinger eller forslag til forbedringer? Vi setter pris på å høre fra deg.
        </p>
        
        <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100 mb-4">
          <p className="text-sm text-slate-500 mb-1 uppercase tracking-wider font-semibold">Send oss en e-post</p>
          <a href="mailto:kontakt@skattekalkulator.com" className="text-2xl font-bold text-emerald-700 hover:underline">
            kontakt@skattekalkulator.com
          </a>
        </div>

        <p className="text-sm text-slate-400 mt-6">
          Vi svarer vanligvis innen 24 timer på virkedager.
        </p>
      </div>
    </main>
  );
}