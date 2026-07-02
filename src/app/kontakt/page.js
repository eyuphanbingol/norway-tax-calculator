import { DOMAIN } from '../../lib/constants';

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
        <p className="text-sm text-fjord/50 uppercase tracking-wide font-semibold mb-1">E-post</p>
        <a href="mailto:kontakt@skattekalkulator.com" className="text-xl font-bold text-netto hover:underline">
          kontakt@skattekalkulator.com
        </a>
        <p className="text-sm text-fjord/60 mt-6">
          Merk: vi kan ikke gi individuell skatterådgivning. For spørsmål om din skattemelding,
          kontakt Skatteetaten.
        </p>
      </div>
    </main>
  );
}
