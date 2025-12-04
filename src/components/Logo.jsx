import { Calculator } from 'lucide-react';

export default function Logo({ color = "text-white" }) {
  return (
    <div className="flex items-center gap-2 font-bold tracking-tight">
      <div className="bg-emerald-500 p-1.5 rounded-lg text-white">
        <Calculator size={20} strokeWidth={3} />
      </div>
      <div className={`text-xl flex flex-col leading-none ${color}`}>
        <span>Skatte<span className="text-emerald-500">kalkulator</span></span>
        <span className="text-[9px] opacity-70 uppercase tracking-widest font-medium">Norge 2025</span>
      </div>
    </div>
  );
}