'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Briefcase, MapPin, Calculator } from 'lucide-react';
import professionData from '../data/professions.json';
import cityData from '../data/cities.json';

export default function SearchBox() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (text) => {
    setQuery(text);
    
    if (text.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const searchLower = text.toLowerCase();
    const foundItems = [];

    professionData.forEach(item => {
      if (item.job_title.toLowerCase().includes(searchLower)) {
        foundItems.push({ type: 'yrke', title: item.job_title, slug: item.slug, icon: <Briefcase size={16} className="text-blue-500" /> });
      }
    });

    cityData.forEach(item => {
      if (item.city_name.toLowerCase().includes(searchLower)) {
        foundItems.push({ type: 'sted', title: item.city_name, slug: item.slug, icon: <MapPin size={16} className="text-red-500" /> });
      }
    });

    const num = parseInt(text.replace(/\D/g, ''));
    if (!isNaN(num) && num >= 300000 && num <= 2000000) {
      const rounded = Math.round(num / 5000) * 5000;
      foundItems.push({ type: 'lonn', title: `${rounded.toLocaleString()} kr Lønn`, slug: `lonn-etter-skatt-${rounded}-nok`, icon: <Calculator size={16} className="text-emerald-500" /> });
    }

    setResults(foundItems.slice(0, 6));
    setIsOpen(true);
  };

  const handleSelect = (item) => {
    setQuery(item.title);
    setIsOpen(false);
    if (item.type === 'lonn') router.push(`/lonn/${item.slug}`);
    else if (item.type === 'yrke') router.push(`/yrke/${item.slug}`);
    else if (item.type === 'sted') router.push(`/sted/${item.slug}`);
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-lg mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {/* İkon rengini text-slate-500 olarak sabitledim, tutarlılık için */}
          <Search className="text-slate-500" size={20} />
        </div>
        <input
          type="text"
          className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-emerald-100 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 outline-none transition shadow-sm text-slate-900 placeholder-slate-500 font-medium"
          placeholder="Søk etter yrke, by eller lønn (f.eks. Sykepleier, Oslo)"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          aria-label="Søk i kalkulatoren"
        />
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          <ul>
            {results.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => handleSelect(item)}
                  className="w-full text-left px-4 py-3 hover:bg-slate-50 flex items-center gap-3 transition border-b border-slate-50 last:border-0"
                >
                  <div className="bg-slate-100 p-2 rounded-full">
                    {item.icon}
                  </div>
                  <div>
                    <span className="block font-semibold text-slate-700">{item.title}</span>
                    <span className="text-xs text-slate-500 uppercase tracking-wider font-medium">
                      {item.type === 'yrke' ? 'Yrke' : item.type === 'sted' ? 'Sted' : 'Beregning'}
                    </span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}