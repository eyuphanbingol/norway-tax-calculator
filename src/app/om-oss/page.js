import { DOMAIN } from '../../lib/constants';

export const metadata = {
  title: 'Om oss',
  description: 'Om Skattekalkulator Norge: en uavhengig og gratis tjeneste for beregning av lønn etter skatt, basert på offisielle satser fra Stortingets skattevedtak.',
  alternates: { canonical: `${DOMAIN}/om-oss` },
};

export default function OmOss() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10 prose-no">
      <h1 className="display text-3xl font-extrabold mb-6">Om Skattekalkulator Norge</h1>
      <p><strong>Skattekalkulator.com</strong> er en uavhengig, gratis tjeneste som hjelper arbeidstakere i Norge med å forstå hva de faktisk sitter igjen med av lønnen sin. Vi er ikke tilknyttet Skatteetaten eller andre offentlige organer.</p>
      <h2>Hvordan beregner vi?</h2>
      <p>Kalkulatoren bruker skattesatsene vedtatt av Stortinget for inntektsåret 2026: 22 prosent skatt på alminnelig inntekt, trygdeavgift på 7,6 prosent, minstefradrag på inntil 95 700 kr, personfradrag på 114 540 kr og trinnskattens fem trinn. Beregningene forutsetter standard fradrag for en vanlig lønnsmottaker og er kvalitetssikret mot offisielle regneeksempler.</p>
      <h2>Hva kalkulatoren ikke dekker</h2>
      <p>Individuelle forhold som rentefradrag, pendlerfradrag, formuesskatt, særfradrag og næringsinntekt inngår ikke i standardberegningen. Tallene er derfor veiledende – det endelige skatteoppgjøret fra Skatteetaten er alltid fasit.</p>
      <h2>Hvem står bak?</h2>
      <p>Siden drives av en liten uavhengig utgiver med interesse for personlig økonomi. Innholdet oppdateres når nye satser vedtas i statsbudsjettet hver høst. Finner du feil, setter vi stor pris på en e-post via kontaktsiden.</p>
    </main>
  );
}
