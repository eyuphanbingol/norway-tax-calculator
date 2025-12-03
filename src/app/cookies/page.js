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
            (Çerez nedir? Bilgisayarınıza kaydedilen küçük metin dosyasıdır.)
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-2">2. Hvorfor bruker vi cookies?</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Nødvendige cookies:</strong> For at nettsiden skal fungere teknisk (f.eks. huske dine valg i kalkulatoren).
            </li>
            <li>
              <strong>Analyse (Google Analytics):</strong> Vi bruker dette for å se hvor mange som besøker siden og hvilke sider som er populære. Dataene er anonymisert.
            </li>
            <li>
              <strong>Annonsering (Google AdSense):</strong> Vi bruker tredjepartscookies fra Google for å vise relevante annonser basert på dine interesser.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-2">3. Google AdSense og DoubleClick</h2>
          <p>
            Som en tredjeparts leverandør bruker Google informasjonskapsler for å vise annonser på nettstedet vårt. 
            Googles bruk av informasjonskapsler (f.eks. DART-informasjonskapselen) gjør at de kan vise annonser til brukerne basert på deres besøk på nettstedet vårt og andre nettsteder på Internett.
          </p>
          <p>
            Du kan velge bort bruken av DART-informasjonskapselen ved å gå til personvernreglene for Google-annonse- og innholdsnettverk.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-2">4. Hvordan administrere cookies?</h2>
          <p>
            Du kan kontrollere og/eller slette informasjonskapsler som du ønsker. Du kan slette alle informasjonskapsler som allerede er på datamaskinen din, og du kan stille inn de fleste nettlesere for å forhindre at de lagres.
          </p>
        </section>
      </div>
    </main>
  );
}