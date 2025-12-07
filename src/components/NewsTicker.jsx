'use client';
import { TrendingUp, ExternalLink } from 'lucide-react';
import newsData from '../data/news.json'; // Eğer dosya yoksa boş dizi döner

export default function NewsTicker() {
  // Eğer haber yoksa veya dosya boşsa bileşeni gizle
  if (!newsData || newsData.length === 0) return null;

  return (
    <div className="mt-12 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <h3 className="flex items-center gap-2 text-lg font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">
        <TrendingUp className="text-red-500" size={20} />
        Akkurat nå: Økonomiske trender (Gündem)
      </h3>
      
      <div className="space-y-4">
        {newsData.map((news, index) => (
          <div key={index} className="flex justify-between items-start gap-4 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition">
            <div>
              <h4 className="font-semibold text-slate-900 text-sm">
                {news.title}
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                {news.traffic} søk i dag • Kilde: Google Trends
              </p>
            </div>
            <a 
              href={news.link} 
              target="_blank" 
              rel="nofollow noreferrer"
              className="text-emerald-600 hover:text-emerald-700"
              aria-label="Les mer"
            >
              <ExternalLink size={16} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}