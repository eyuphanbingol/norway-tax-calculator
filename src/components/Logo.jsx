import { Calculator } from 'lucide-react';

export default function Logo({ color = "text-white" }) {
  return (
    <div className="flex items-center gap-2 font-bold tracking-tight" aria-label="Skattekalkulator Norge Logo">
      <div className="bg-emerald-500 p-1.5 rounded-lg text-white" aria-hidden="true">
        <Calculator size={20} strokeWidth={3} />
      </div>
      <div className={`text-xl flex flex-col leading-none ${color}`}>
        <span>Skatte<span className="text-emerald-500">kalkulator</span></span>
        {/* SEO & MARKA: 2026 GÜNCELLEMESİ */}
        <span className="text-[9px] opacity-70 uppercase tracking-widest font-medium">Norge 2026</span>
      </div>
    </div>
  );
}