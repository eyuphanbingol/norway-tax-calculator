import TaxPieChart from './TaxPieChart';
import AdSlot from './AdSlot';

export default function ResultCard({ result, lang = 'no' }) {
  if (!result) return null;

  // Dil Sözlüğü
  const t = {
    no: {
      monthly: 'Utbetalt hver måned',
      dist: 'Skattefordeling',
      gross: 'Brutto årslønn',
      tax: 'Skatt totalt',
      perc: 'Skatteprosent',
      netYear: 'Årslønn etter skatt'
    },
    en: {
      monthly: 'Monthly Net Income',
      dist: 'Tax Distribution',
      gross: 'Gross Yearly Salary',
      tax: 'Total Tax',
      perc: 'Tax Rate',
      netYear: 'Yearly Net Income'
    }
  };

  const txt = t[lang] || t.no;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
      <div className="bg-emerald-50 p-6 md:p-8 text-center border-b border-emerald-100">
        <p className="text-sm font-bold text-emerald-800 uppercase tracking-widest mb-2">
          {txt.monthly}
        </p>
        <h2 className="text-5xl md:text-6xl font-black text-emerald-600 tracking-tight">
          {result.net_monthly.toLocaleString()} <span className="text-2xl md:text-3xl font-bold text-emerald-400">kr</span>
        </h2>
      </div>

      <div className="p-6 md:p-8">
        <div className="mb-8 flex flex-col items-center">
          <h3 className="text-sm font-semibold text-slate-500 mb-2">{txt.dist}</h3>
          <TaxPieChart tax={result.tax_yearly} net={result.net_yearly} />
        </div>

        <div className="space-y-3 text-sm md:text-base">
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="text-slate-500">{txt.gross}:</span>
            <span className="font-bold text-slate-800">{result.gross_yearly.toLocaleString()} kr</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="text-slate-500">{txt.tax}:</span>
            <span className="font-bold text-red-500">-{result.tax_yearly.toLocaleString()} kr</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-100 bg-slate-50 px-2 rounded">
            <span className="text-slate-500 font-medium">{txt.perc}:</span>
            <span className="font-bold text-slate-800">{result.tax_percentage}%</span>
          </div>
          <div className="flex justify-between py-3 font-bold text-lg text-emerald-700 mt-2">
            <span>{txt.netYear}:</span>
            <span>{result.net_yearly.toLocaleString()} kr</span>
          </div>
        </div>
        <AdSlot type="native" />
      </div>
    </div>
  );
}