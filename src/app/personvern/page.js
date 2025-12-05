export default function PrivacyPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-slate-800">Personvernerklæring</h1>
      
      <div className="prose prose-slate text-slate-600">
        <p className="mb-4">Sist oppdatert: Desember 2025</p>
        
        <h2 className="text-xl font-semibold text-slate-800 mt-6 mb-2">1. Innledning</h2>
        <p>
          Velkommen til Skattekalkulator. Vi tar ditt personvern på alvor. 
          Denne erklæringen forklarer hvordan vi samler inn og bruker informasjon når du bruker vår nettside.
        </p>

        <h2 className="text-xl font-semibold text-slate-800 mt-6 mb-2">2. Informasjonskapsler (Cookies) og Annonsering</h2>
        <p>
          Vi bruker informasjonskapsler for å forbedre brukeropplevelsen, analysere trafikk og vise relevante annonser.
        </p>
        <p>
          <strong>Google AdSense:</strong> Vi bruker Google AdSense for å vise annonser. Google og deres partnere bruker informasjonskapsler for å vise annonser basert på dine tidligere besøk på vårt nettsted eller andre nettsteder. Du kan lese mer om hvordan Google bruker data her: <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">Googles personvernregler</a>.
        </p>

        <h2 className="text-xl font-semibold text-slate-800 mt-6 mb-2">3. Datainnsamling og Bruk</h2>
        <p>
          Vi lagrer ingen personlig informasjon om lønnen eller tallene du legger inn i kalkulatoren. 
          Alle beregninger skjer lokalt i din nettleser eller anonymt for statistikkformål. Vi vet ikke hvem du er, og vi lagrer ikke IP-adressen din knyttet til beregningene.
        </p>

        <h2 className="text-xl font-semibold text-slate-800 mt-6 mb-2">4. Kontakt Oss</h2>
        <p>
          Behandlingsansvarlig for denne nettsiden er Skattekalkulator Norge Team.
          Hvis du har spørsmål om denne personvernerklæringen eller hvordan vi behandler data, vennligst kontakt oss på:
        </p>
        <p className="font-bold text-slate-800 mt-2">
          E-post: <a href="mailto:kontakt@skattekalkulator.com" className="text-emerald-600 hover:underline">kontakt@skattekalkulator.com</a>
        </p>
      </div>
    </main>
  );
}