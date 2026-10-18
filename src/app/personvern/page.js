import { DOMAIN, AUTHOR, CONTACT_EMAIL } from '../../lib/constants';

export const metadata = {
  title: 'Personvernerklæring og cookies',
  description: 'Hvordan skattekalkulator.com behandler personopplysninger, bruker informasjonskapsler og viser annonser.',
  alternates: { canonical: `${DOMAIN}/personvern` },
};

export default function Personvern() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10 prose-no">
      <h1 className="display text-3xl font-extrabold mb-6">Personvernerklæring</h1>
      <p>Sist oppdatert: 18. oktober 2026. Denne erklæringen forklarer hvilke opplysninger som behandles når du bruker skattekalkulator.com, hvem som mottar dem, og hvilke valg og rettigheter du har.</p>

      <h2>Behandlingsansvarlig</h2>
      <p>Behandlingsansvarlig for skattekalkulator.com er {AUTHOR}. Du når oss på <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>

      <h2>Beregningene dine lagres ikke</h2>
      <p>Alle skatteberegninger skjer lokalt i nettleseren din. Lønnstall du skriver inn i kalkulatorene sendes ikke til oss og lagres ikke på våre servere.</p>

      <h2>Drift og serverlogger</h2>
      <p>Nettsiden driftes hos Vercel Inc. Når du besøker siden, behandler Vercel tekniske opplysninger som IP-adresse, tidspunkt, side og nettlesertype for å levere siden og beskytte den mot misbruk. Loggene lagres i kort tid. Behandlingen bygger på berettiget interesse i å drive en sikker nettside (GDPR art. 6 nr. 1 bokstav f).</p>

      <h2>Analyse</h2>
      <p>Vi bruker Google Analytics 4 for å forstå hvordan siden brukes, for eksempel antall besøk, hvilke sider som leses og omtrentlig land. Vi ser bare samlet statistikk. Vi får ikke navn eller kontaktinformasjon om deg fra Google Analytics, og vi prøver ikke å identifisere enkeltbesøkende.</p>
      <p>Besøker du siden fra EØS (inkludert Norge), Storbritannia eller Sveits, settes ingen analyse-cookies før du har gitt samtykke i samtykkevinduet (GDPR art. 6 nr. 1 bokstav a). Uten samtykke kan Google motta begrensede, cookiefrie signaler etter Googles samtykkemodus. Data i Google Analytics slettes automatisk etter lagringstiden som er valgt i tjenesten (maksimalt 14 måneder). Vi bruker også Google Search Console, som bare viser samlet statistikk over søk som leder til siden.</p>

      <h2>Annonser og informasjonskapsler</h2>
      <p>Siden kan finansieres av annonser levert av Google AdSense. Google og deres partnere kan bruke informasjonskapsler (cookies) for å vise annonser basert på tidligere besøk på denne og andre nettsider. Ved første besøk får du et samtykkevalg fra Googles samtykkeløsning (sertifisert etter IAB TCF), der du kan godta eller avslå bruk av cookies og data, og velge «Administrer valg» for å ta stilling til hvert formål og hver partner. Avslår du, kan det fortsatt vises ikke-personaliserte eller begrensede annonser, som ikke bygger på profilen din.</p>
      <p>Du kan når som helst endre eller trekke tilbake samtykket via lenken «Personvern- og cookie-innstillinger» nederst på hver side. Å trekke samtykket påvirker ikke lovligheten av behandlingen før du trakk det. Du kan også administrere Googles annonseinnstillinger på <a href="https://adssettings.google.com" rel="nofollow">adssettings.google.com</a>, og reservere deg mot personaliserte annonser fra mange annonsenettverk på <a href="https://www.youronlinechoices.eu" rel="nofollow">youronlinechoices.eu</a> og <a href="https://www.aboutads.info" rel="nofollow">aboutads.info</a>.</p>
      <p>Les mer om hvordan Google bruker data fra nettsteder som bruker Googles tjenester på <a href="https://policies.google.com/technologies/partner-sites" rel="nofollow">policies.google.com/technologies/partner-sites</a>.</p>

      <h2>Affiliate-lenker</h2>
      <p>Noen sider inneholder annonselenker merket «Annonse». Klikker du på en slik lenke, sendes du via affiliate-nettverket Awin til annonsørens nettside. Awin og annonsøren kan da registrere klikket og eventuelle kjøp for å beregne provisjon, etter sine egne personvernregler. Vi får ingen personopplysninger om deg fra dette, bare samlet antall klikk og salg.</p>

      <h2>Hvem mottar opplysninger</h2>
      <ul>
        <li><strong>Vercel Inc.</strong> – drift av nettsiden (databehandler).</li>
        <li><strong>Google Ireland Ltd. og Google LLC</strong> – Google Analytics, Google AdSense og samtykkeløsningen.</li>
        <li><strong>Awin og annonsøren</strong> – bare hvis du klikker på en annonselenke.</li>
      </ul>
      <p>Noen av disse selskapene behandler opplysninger i USA. Overføringen skjer på grunnlag av EU–US Data Privacy Framework og/eller EUs standardkontraktsklausuler.</p>

      <h2>Dine rettigheter</h2>
      <p>Du har rett til innsyn i opplysninger om deg, og til å kreve retting, sletting, begrensning av behandlingen og dataportabilitet. Du kan protestere mot behandling som bygger på berettiget interesse, og du kan trekke tilbake samtykke når som helst. Fordi vi selv ikke lagrer opplysninger som identifiserer deg, vil de fleste henvendelser gjelde data hos Google eller Vercel, og vi hjelper deg gjerne videre. Mener du at vi behandler opplysninger i strid med regelverket, kan du klage til <a href="https://www.datatilsynet.no" rel="nofollow">Datatilsynet</a>.</p>

      <h2>Kontakt</h2>
      <p>Spørsmål om personvern kan sendes til <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
    </main>
  );
}
