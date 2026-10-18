import Link from 'next/link';
import { DOMAIN, AUTHOR } from '../../lib/constants';

export const metadata = {
  title: 'Kontakt oss',
  description: 'Kontakt Skattekalkulator Norge med spørsmål, tilbakemeldinger eller feilrapporter.',
  alternates: { canonical: `${DOMAIN}/kontakt` },
};

export default function Kontakt() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="display text-3xl font-extrabold mb-6">Kontakt oss</h1>
      <div className="bg-white border border-mist rounded-2xl p-8 max-w-lg">
        <p className="text-fjord/80 mb-6 leading-relaxed">
          Har du spørsmål om kalkulatoren, funnet en feil eller forslag til forbedringer?
          Vi leser alle henvendelser og svarer vanligvis innen et par virkedager.
        </p>
        <p className="text-sm text-fjord/75 uppercase tracking-wide font-semibold mb-1">E-post</p>
        <a href="mailto:skattekalkulatornorge@gmail.com" className="text-xl font-bold text-netto hover:underline">
          skattekalkulatornorge@gmail.com
        </a>
        <p className="text-sm text-fjord/75 mt-6">
          Merk: vi kan ikke gi individuell skatterådgivning. For spørsmål om din skattemelding,
          kontakt Skatteetaten.
        </p>
      </div>

      <div className="prose-no mt-10">
        <h2>Hva kan du kontakte oss om?</h2>
        <ul>
          <li><strong>Feil i beregninger eller satser.</strong> Oppgi gjerne hvilken side og hvilket tall det gjelder, og hvor du har det riktige tallet fra. Feil rettes så raskt som mulig.</li>
          <li><strong>Forslag til nye kalkulatorer eller guider.</strong> Mange av sidene våre har kommet til etter tips fra lesere.</li>
          <li><strong>Kalkulator til din nettside.</strong> Spørsmål om den gratis kalkulatoren du kan <Link href="/del-kalkulatoren">legge inn på egen nettside</Link>.</li>
          <li><strong>Samarbeid og annonser.</strong> Vi er åpne for samarbeid som er nyttig for leserne. Alle annonser merkes tydelig.</li>
        </ul>
        <h2>Hvem svarer?</h2>
        <p>
          Henvendelser leses og besvares av {AUTHOR}, som driver siden. Les mer om hvordan vi lager
          innholdet på <Link href="/om-oss">om oss</Link>, og hvordan vi behandler opplysninger i{' '}
          <Link href="/personvern">personvernerklæringen</Link>.
        </p>
      </div>
    </main>
  );
}
