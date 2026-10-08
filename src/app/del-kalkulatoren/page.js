import { DOMAIN } from '../../lib/constants';

export const metadata = {
  title: 'Gratis skattekalkulator til din nettside',
  description: 'Legg inn en gratis skattekalkulator for lønn etter skatt 2026 på bloggen eller nettsiden din. Kopier koden – den oppdateres automatisk med nye satser.',
  alternates: { canonical: `${DOMAIN}/del-kalkulatoren` },
};

const code = `<iframe src="${DOMAIN}/embed" title="Skattekalkulator 2026" width="100%" height="440" style="border:0;max-width:480px" loading="lazy"></iframe>
<p style="font-size:12px">Skattekalkulator fra <a href="${DOMAIN}/">Skattekalkulator.com</a></p>`;

export default function DelKalkulatoren() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10 prose-no">
      <h1 className="display text-3xl font-extrabold mb-4">Gratis skattekalkulator til din nettside</h1>
      <p>
        Driver du en blogg, et forum eller en nettside om økonomi, jobb eller bolig? Da kan du legge
        inn skattekalkulatoren vår gratis. Leserne dine kan regne ut lønn etter skatt for 2026 uten å
        forlate siden din, og kalkulatoren oppdateres automatisk når satsene endres.
      </p>
      <h2>Slik ser den ut</h2>
      <iframe src="/embed" title="Skattekalkulator 2026" width="100%" height="440" style={{ border: 0, maxWidth: 480 }} loading="lazy" />
      <h2>Kopier koden</h2>
      <p>Lim inn denne koden der du vil at kalkulatoren skal vises:</p>
      <pre className="bg-white border border-mist rounded-xl p-4 text-xs overflow-x-auto whitespace-pre-wrap break-all"><code>{code}</code></pre>
      <h2>Vilkår</h2>
      <ul>
        <li>Kalkulatoren er gratis å bruke, også på kommersielle nettsider.</li>
        <li>Behold lenken til Skattekalkulator.com under kalkulatoren.</li>
        <li>Kalkulatoren viser ingen annonser og setter ingen informasjonskapsler.</li>
        <li>Beregningene er veiledende og bruker standard fradrag.</li>
      </ul>
      <p>Spørsmål eller ønsker? Ta kontakt på kontakt@skattekalkulator.com.</p>
    </main>
  );
}
