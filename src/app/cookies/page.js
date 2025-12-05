export default function CookiesPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-slate-800">
        Informasjonskapsler (Cookies)
      </h1>
      
      <div className="prose prose-slate text-slate-600 space-y-6">
        <p className="text-sm text-slate-400">Sist oppdatert: Desember 2025</p>

        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-2">1. Hva er en cookie?</h2>
          <p>
            En informasjonskapsel (cookie) er en liten tekstfil som lagres på din datamaskin eller mobil når du besøker et nettsted. 
            Den hjelper nettstedet å huske dine handlinger og preferanser over tid.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-2">2. Hvorfor bruker vi cookies?</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Nødvendige cookies:</strong> For at nettsiden skal fungere teknisk (f.eks. huske dine valg i kalkulatoren mens du navigerer).
            </li>
            <li>
              <strong>Analyse (Google Analytics):</strong> Vi bruker dette for å se hvor mange som besøker siden, hvilke byer de kommer fra og hvilke sider som er populære. Dataene er anonymisert.
            </li>
            <li>
              <strong>Annonsering (Google AdSense):</strong> Vi bruker tredjepartscookies fra Google for å vise relevante annonser basert på dine interesser. Dette hjelper oss å holde tjenesten gratis for deg.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-2">3. Google AdSense og Personvern</h2>
          <p>
            Som en tredjeparts leverandør bruker Google informasjonskapsler for å vise annonser på nettstedet vårt. 
            Googles bruk av informasjonskapsler (f.eks. DART-informasjonskapselen) gjør at de kan vise annonser til brukerne basert på deres besøk på nettstedet vårt og andre nettsteder på Internett.
          </p>
          <p>
            Du kan velge bort bruken av DART-informasjonskapselen ved å gå til <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-emerald-600 underline">Googles personvernregler for annonsering</a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-2">4. Kontakt</h2>
          <p>
            Har du spørsmål om vår bruk av cookies? Send oss gjerne en e-post på:
            <br/>
            <a href="mailto:kontakt@skattekalkulator.com" className="font-bold text-emerald-600 hover:underline">kontakt@skattekalkulator.com</a>
          </p>
        </section>
      </div>
    </main>
  );
}