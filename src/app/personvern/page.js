export default function PrivacyPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-slate-800">Personvernerklæring</h1>
      
      <div className="prose prose-slate text-slate-600">
        <p className="mb-4 text-sm text-slate-400">Sist oppdatert: Desember 2025</p>
        
        <h2 className="text-xl font-semibold text-slate-800 mt-6 mb-2">1. Innledning</h2>
        <p>
          Velkommen til Skattekalkulator. Vi tar personvernet ditt på alvor. 
          Denne erklæringen forklarer hvordan vi samler inn, bruker og beskytter informasjon når du bruker vår nettside.
        </p>

        <h2 className="text-xl font-semibold text-slate-800 mt-6 mb-2">2. Informasjonskapsler (Cookies) og Annonsering</h2>
        <p>
          Vi bruker informasjonskapsler for å forbedre brukeropplevelsen, analysere trafikk og vise relevante annonser.
        </p>
        
        <h3 className="font-bold text-slate-700 mt-4 mb-2">Google AdSense</h3>
        <p>
          Vi benytter Google AdSense for annonsering. Google og deres partnere kan bruke informasjonskapsler for å vise annonser basert på dine tidligere besøk på dette eller andre nettsteder.
        </p>
        <ul className="list-disc pl-5 space-y-2 mt-2">
          <li>
            Du kan lese mer om hvordan Google bruker data her: <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">Googles personvernregler</a>
          </li>
          <li>
            Du kan administrere annonseinnstillinger her: <a href="https://adssettings.google.com/authenticated" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">Google Ads Settings</a>
          </li>
          <li>
            Du kan velge bort personlig tilpassede annonser gjennom EUs tjeneste: <a href="https://www.youronlinechoices.eu/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">Your Online Choices</a>
          </li>
        </ul>
        <p className="mt-4">
          Ved første besøk vil du få et valg om å godta eller avslå bruk av ikke-nødvendige informasjonskapsler (i henhold til TCF 2.2 / GDPR).
        </p>

        <h2 className="text-xl font-semibold text-slate-800 mt-6 mb-2">3. Datainnsamling og Bruk</h2>
        <p>
          Vi lagrer ingen personlig informasjon om lønnen eller tallene du legger inn i kalkulatoren. 
          Alle beregninger skjer lokalt i nettleseren din, eller blir kun brukt anonymt for statistikkformål (f.eks. Google Analytics).
        </p>
        <p>
          Vi lagrer ikke IP-adresse knyttet til de spesifikke beregningene du gjør, og vi kan ikke identifisere hvem du er basert på tallene du taster inn.
        </p>

        <h2 className="text-xl font-semibold text-slate-800 mt-6 mb-2">4. Kontakt Oss</h2>
        <p>
          Behandlingsansvarlig for denne nettsiden er <strong>Skattekalkulator Norge Team</strong>.
          <br/>
          Hvis du har spørsmål om denne personvernerklæringen eller hvordan vi behandler data, vennligst kontakt oss på:
        </p>
        <p className="font-bold text-slate-800 mt-2">
          E-post: <a href="mailto:kontakt@skattekalkulator.com" className="text-emerald-600 hover:underline">kontakt@skattekalkulator.com</a>
        </p>
      </div>
    </main>
  );
}