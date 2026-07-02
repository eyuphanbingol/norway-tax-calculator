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
      <p>Sist oppdatert: januar 2026. Denne erklæringen forklarer hvilke opplysninger som behandles når du bruker skattekalkulator.com, og hvilke valg du har.</p>

      <h2>Beregningene dine lagres ikke</h2>
      <p>Alle skatteberegninger skjer lokalt i nettleseren din. Lønnstall du skriver inn i kalkulatoren sendes ikke til oss og lagres ikke på våre servere.</p>

      <h2>Analyse</h2>
      <p>Vi bruker Google Analytics for å forstå hvordan siden brukes (besøkstall, hvilke sider som leses, omtrentlig geografi). Dataene er aggregerte og brukes kun til å forbedre innholdet. IP-adresser behandles i anonymisert form.</p>

      <h2>Annonser og informasjonskapsler</h2>
      <p>Siden finansieres av annonser levert av Google AdSense. Google og deres partnere kan bruke informasjonskapsler (cookies) for å vise annonser basert på tidligere besøk på denne og andre nettsider. Ved første besøk får du et samtykkevalg der du kan godta eller avslå bruk av cookies til personaliserte annonser. Du kan når som helst endre valget ditt, og du kan administrere Googles annonseinnstillinger på <a href="https://adssettings.google.com" rel="nofollow">adssettings.google.com</a>.</p>

      <h2>Behandlingsgrunnlag og rettigheter</h2>
      <p>Behandlingen av analysedata bygger på berettiget interesse i å drifte og forbedre tjenesten; personaliserte annonser vises kun med ditt samtykke (GDPR art. 6). Du har rett til innsyn, retting og sletting av opplysninger, og du kan klage til Datatilsynet.</p>

      <h2>Kontakt</h2>
      <p>Spørsmål om personvern kan sendes til kontakt@skattekalkulator.com.</p>
    </main>
  );
}
