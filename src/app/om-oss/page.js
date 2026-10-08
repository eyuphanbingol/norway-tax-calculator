import Link from 'next/link';
import { DOMAIN, SITE_NAME, AUTHOR, CONTACT_EMAIL } from '../../lib/constants';

export const metadata = {
  title: 'Om oss – hvem står bak og hvordan vi beregner',
  description: `Skattekalkulator Norge drives av ${AUTHOR}. Les hvordan vi beregner skatten, hvilke offisielle kilder vi bruker, hvordan vi oppdaterer satsene og retter feil.`,
  alternates: { canonical: `${DOMAIN}/om-oss` },
};

export default function OmOss() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Organization', '@id': `${DOMAIN}/#org`, name: SITE_NAME, url: DOMAIN, email: CONTACT_EMAIL, founder: { '@id': `${DOMAIN}/om-oss#person` } },
      { '@type': 'Person', '@id': `${DOMAIN}/om-oss#person`, name: AUTHOR, url: `${DOMAIN}/om-oss` },
      { '@type': 'AboutPage', url: `${DOMAIN}/om-oss`, about: { '@id': `${DOMAIN}/#org` } },
    ],
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-10 prose-no">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1 className="display text-3xl font-extrabold mb-6">Om Skattekalkulator Norge</h1>
      <p>
        <strong>Skattekalkulator.com</strong> er en uavhengig og gratis tjeneste som hjelper
        arbeidstakere og pensjonister i Norge med å forstå hva de faktisk sitter igjen med etter skatt.
        Vi er ikke tilknyttet Skatteetaten, Nav eller andre offentlige organer.
      </p>

      <h2>Hvem står bak?</h2>
      <p>
        Siden er laget og drives av <strong>{AUTHOR}</strong>, som skriver og vedlikeholder både
        kalkulatorene og guidene. Målet er å gjøre norske skatteregler enkle å forstå – med tall du
        kan stole på og kilder du kan sjekke selv. Du når meg direkte på{' '}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>

      <h2>Slik lager vi innholdet</h2>
      <ul>
        <li><strong>Offisielle kilder først.</strong> Alle satser og grenser hentes fra Finansdepartementet, Stortingets skattevedtak og Skatteetaten. Tall fra nyhetssaker eller andre kalkulatorer brukes aldri uten å kontrolleres mot en offisiell kilde.</li>
        <li><strong>Kontrollregning.</strong> Beregningsmotoren testes mot offisielle tall – for eksempel at 600 000 kr i lønn gir 12 835 kr i trinnskatt i 2026, og mot Skatteetatens tabell for skattefradrag for pensjonsinntekt.</li>
        <li><strong>Forslag merkes tydelig.</strong> Regjeringens budsjettforslag (som for 2027) vises alltid som «forslag» til Stortinget har vedtatt satsene.</li>
        <li><strong>Ingen betalt innhold.</strong> Ingen artikler eller kalkulatorer er sponset, og annonsører har ingen innflytelse på innholdet.</li>
      </ul>

      <h2>Oppdateringer</h2>
      <p>
        Skattesatsene endres hvert år. Vi oppdaterer siden når regjeringen legger fram statsbudsjettet
        i oktober, når Stortinget vedtar satsene i desember, og ved endringer i revidert
        nasjonalbudsjett. Hver guide viser når den sist ble oppdatert.
      </p>

      <h2>Retting av feil</h2>
      <p>
        Finner du en feil, setter vi stor pris på en e-post til{' '}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Feil i satser eller beregninger rettes
        så raskt som mulig, og oppdateringsdatoen på siden endres.
      </p>

      <h2>Hvordan beregner vi?</h2>
      <p>
        Lønnskalkulatoren bruker satsene vedtatt av Stortinget for inntektsåret 2026: 22 prosent skatt
        på alminnelig inntekt, trygdeavgift på 7,6 prosent, minstefradrag på inntil 95 700 kr,
        personfradrag på 114 540 kr og trinnskattens fem trinn. Pensjonskalkulatoren bruker i tillegg
        trygdeavgift på 5,1 prosent, minstefradrag for pensjon og skattefradraget for pensjonsinntekt.
        Beregningene forutsetter standard fradrag.
      </p>

      <h2>Hva kalkulatorene ikke dekker</h2>
      <p>
        Individuelle forhold som rentefradrag, pendlerfradrag, formuesskatt, særfradrag og
        næringsinntekt inngår ikke i standardberegningen. Tallene er derfor veiledende og er ikke
        skatterådgivning – det endelige skatteoppgjøret fra Skatteetaten er alltid fasit.
      </p>

      <h2>Kilder</h2>
      <ul>
        <li><a href="https://www.regjeringen.no/no/tema/okonomi-og-budsjett/skatter-og-avgifter/skatte-og-avgiftssatser/skattesatser-2026/id3121978/" rel="nofollow">Finansdepartementet: Skattesatser 2026</a></li>
        <li><a href="https://www.skatteetaten.no/satser/" rel="nofollow">Skatteetaten: Satser</a></li>
        <li><a href="https://www.stortinget.no/" rel="nofollow">Stortingets skattevedtak for inntektsåret 2026</a></li>
        <li><a href="https://www.ssb.no/arbeid-og-lonn/lonn-og-arbeidskraftkostnader/statistikk/lonn" rel="nofollow">SSB: Lønnsstatistikk</a> (median- og gjennomsnittslønn)</li>
      </ul>

      <h2>Finansiering</h2>
      <p>
        Siden er gratis å bruke og finansieres av annonser fra Google AdSense. Les mer om
        informasjonskapsler og personvern i <Link href="/personvern">personvernerklæringen</Link>.
      </p>
    </main>
  );
}
