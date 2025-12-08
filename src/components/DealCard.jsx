import { ArrowUpRight, Tag } from 'lucide-react';

export default function DealCard({ deal }) {
  return (
    <a 
      href={deal.link} 
      target={deal.link.startsWith('http') ? "_blank" : "_self"}
      className="block group h-full"
    >
      <div className="bg-white rounded-xl border border-slate-200 p-6 h-full transition hover:shadow-lg hover:border-emerald-500 relative overflow-hidden">
        
        <div className="flex justify-between items-start mb-4">
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${deal.color}`}>
            {deal.category}
          </span>
          <ArrowUpRight size={20} className="text-slate-300 group-hover:text-emerald-500 transition" />
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-700">
          {deal.title}
        </h3>
        
        <p className="text-sm text-slate-600 mb-4 line-clamp-3">
          {deal.desc}
        </p>

        <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm mt-auto">
          <Tag size={16} />
          <span>{deal.tag}</span>
        </div>
      </div>
    </a>
  );
}