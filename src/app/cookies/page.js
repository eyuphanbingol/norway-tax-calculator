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
            En informasjonskapsel (cookie) er en liten tekstfil som lagres på enheten din når du besøker et nettsted. 
            Informasjonskapsler brukes blant annet for å huske innstillinger, forbedre brukeropplevelsen og levere relevante annonser.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-2">2. Hvorfor bruker vi cookies?</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Nødvendige cookies:</strong> Disse er nødvendige for at nettsiden skal fungere teknisk, for eksempel for å huske dine midlertidige valg i kalkulatoren.
            </li>
            <li>
              <strong>Analyse (Google Analytics):</strong> Vi bruker Google Analytics for å forstå hvordan nettsiden brukes – hvor mange som besøker den, hvilke sider som er mest populære og generell trafikkstatistikk. Dataene behandles anonymt (IP-maskering aktivert).
            </li>
            <li>
              <strong>Annonsering (Google AdSense):</strong> Vi bruker tredjepartscookies fra Google for å vise annonser som er relevante for deg. Dette bidrar til at tjenesten kan være gratis. Google kan bruke cookies til å tilpasse og måle annonser basert på din nettaktivitet.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-2">3. Google AdSense og personvern</h2>
          <p>
            Google fungerer som en tredjeparts leverandør av annonser. Google og deres partnere kan bruke informasjonskapsler for å:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>vise relevante annonser</li>
            <li>måle annonseytelse</li>
            <li>begrense hvor ofte en annonse vises</li>
            <li>bruke tidligere nettaktivitet for personaliserte annonser (dersom du har gitt samtykke)</li>
          </ul>
          
          <p className="mt-4">
            Du kan lese mer om hvordan Google bruker data her i deres <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">personvernregler for annonsering</a>.
          </p>

          <h3 className="text-lg font-semibold text-slate-700 mt-4 mb-2">Valg og kontroll:</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Ved første besøk får du muligheten til å godta eller avslå bruk av informasjonskapsler (samtykke).
            </li>
            <li>
              Du kan når som helst endre eller trekke tilbake ditt samtykke via nettleserinnstillingene dine.
            </li>
            <li>
              Du kan velge bort personlig tilpassede annonser på <a href="https://adssettings.google.com/authenticated" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">Google Ads Settings</a>.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-2">4. Kontakt</h2>
          <p>
            Har du spørsmål om vår bruk av cookies?
            <br/>
            Kontakt oss gjerne på: <a href="mailto:kontakt@skattekalkulator.com" className="font-bold text-emerald-600 hover:underline">kontakt@skattekalkulator.com</a>
          </p>
        </section>
      </div>
    </main>
  );
}