import { DOMAIN } from '../../lib/constants';

export const metadata = {
  title: 'Personvernerklæring og cookies',
  description: 'Hvordan skattekalkulator.com behandler personopplysninger, bruker informasjonskapsler og viser annonser.',
  alternates: { canonical: `${DOMAIN}/personvern` },
};

export default function Personvern() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10 prose-no">
      <h1 className="display text-3xl font-extrabold mb-6">Personvernerklæring</h1>
      <p>Sist oppdatert: oktober 2026. Denne erklæringen forklarer hvilke opplysninger som behandles når du bruker skattekalkulator.com, og hvilke valg du har.</p>

      <h2>Beregningene dine lagres ikke</h2>
      <p>Alle skatteberegninger skjer lokalt i nettleseren din. Lønnstall du skriver inn i kalkulatoren sendes ikke til oss og lagres ikke på våre servere.</p>

      <h2>Analyse</h2>
      <p>Vi bruker ikke egne analyseverktøy som Google Analytics. Vi ser kun aggregert statistikk fra Google Search Console (hvor mange som finner siden via Google-søk), som ikke inneholder opplysninger om enkeltpersoner.</p>

      <h2>Annonser og informasjonskapsler</h2>
      <p>Siden finansieres av annonser levert av Google AdSense. Google og deres partnere kan bruke informasjonskapsler (cookies) for å vise annonser basert på tidligere besøk på denne og andre nettsider. Ved første besøk får du et samtykkevalg fra Googles samtykkeløsning (sertifisert etter IAB TCF), der du kan godta eller avslå bruk av cookies til personaliserte annonser. Avslår du, kan det fortsatt vises ikke-personaliserte annonser. Du kan når som helst endre valget ditt via lenken i samtykkevinduet, og du kan administrere Googles annonseinnstillinger på <a href="https://adssettings.google.com" rel="nofollow">adssettings.google.com</a>.</p>

      <p>Les mer om hvordan Google bruker data fra nettsteder som bruker Googles tjenester på <a href="https://policies.google.com/technologies/partner-sites" rel="nofollow">policies.google.com/technologies/partner-sites</a>.</p>

      <h2>Behandlingsgrunnlag og rettigheter</h2>
      <p>Personaliserte annonser og tilhørende informasjonskapsler brukes kun med ditt samtykke (GDPR art. 6 nr. 1 bokstav a). Teknisk nødvendig drift av nettsiden, som serverlogger hos vår hostingleverandør, bygger på berettiget interesse. Du har rett til innsyn, retting og sletting av opplysninger, og du kan klage til Datatilsynet.</p>

      <h2>Kontakt</h2>
      <p>Spørsmål om personvern kan sendes til kontakt@skattekalkulator.com.</p>
    </main>
  );
}
