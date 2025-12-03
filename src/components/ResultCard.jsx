import TaxPieChart from './TaxPieChart';
import AdSlot from './AdSlot';

export default function ResultCard({ result }) {
  if (!result) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
      
      {/* Üst Kısım: Net Maaş Vurgusu */}
      <div className="bg-emerald-50 p-6 md:p-8 text-center border-b border-emerald-100">
        <p className="text-sm font-bold text-emerald-800 uppercase tracking-widest mb-2">
          Utbetalt hver måned (Aylık Net)
        </p>
        <h2 className="text-5xl md:text-6xl font-black text-emerald-600 tracking-tight">
          {result.net_monthly.toLocaleString()} <span className="text-2xl md:text-3xl font-bold text-emerald-400">kr</span>
        </h2>
      </div>

      {/* Detaylar ve Grafik */}
      <div className="p-6 md:p-8">
        
        {/* Grafik Alanı */}
        <div className="mb-8 flex flex-col items-center">
          <h3 className="text-sm font-semibold text-slate-500 mb-2">Skattefordeling (Vergi Dağılımı)</h3>
          <TaxPieChart tax={result.tax_yearly} net={result.net_yearly} />
        </div>

        {/* Tablo Verileri */}
        <div className="space-y-3 text-sm md:text-base">
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="text-slate-500">Brutto årslønn (Brüt):</span>
            <span className="font-bold text-slate-800">{result.gross_yearly.toLocaleString()} kr</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="text-slate-500">Skatt totalt (Vergi):</span>
            <span className="font-bold text-red-500">-{result.tax_yearly.toLocaleString()} kr</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-100 bg-slate-50 px-2 rounded">
            <span className="text-slate-500 font-medium">Skatteprosent:</span>
            <span className="font-bold text-slate-800">{result.tax_percentage}%</span>
          </div>
          <div className="flex justify-between py-3 font-bold text-lg text-emerald-700 mt-2">
            <span>Årslønn etter skatt (Yıllık Net):</span>
            <span>{result.net_yearly.toLocaleString()} kr</span>
          </div>
        </div>

        {/* NATIVE REKLAM ALANI */}
        <AdSlot type="native" />

      </div>
    </div>
  );
}