'use client';
import { useState, useEffect } from 'react';
import { Cloud, Sun, Snowflake, Wind, Star, MapPin, Loader2, Thermometer } from 'lucide-react';

const LOCATIONS = [
  { name: "Oslo", lat: 59.91, lon: 10.75, type: "city" },
  { name: "Tromsø (Nordlys)", lat: 69.64, lon: 18.95, type: "aurora" },
  { name: "Bergen", lat: 60.39, lon: 5.32, type: "city" },
  { name: "Trysil (Ski)", lat: 61.31, lon: 12.26, type: "ski" },
  { name: "Hemsedal (Ski)", lat: 60.86, lon: 8.55, type: "ski" },
  { name: "Lofoten", lat: 68.23, lon: 13.63, type: "aurora" },
  { name: "Trondheim", lat: 63.43, lon: 10.39, type: "city" },
];

export default function OutdoorDashboard() {
  const [selectedLoc, setSelectedLoc] = useState(LOCATIONS[0]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchWeather(loc) {
    setLoading(true);
    try {
      const res = await fetch('/api/weather', {
        method: 'POST',
        body: JSON.stringify({ lat: loc.lat, lon: loc.lon }),
      });
      const json = await res.json();
      setData(json.properties.timeseries[0].data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchWeather(selectedLoc);
  }, [selectedLoc]);

  // Aurora Analizi (Bulut oranı düşükse ve kuzeydeyse şans yüksek)
  const getAuroraChance = (clouds, lat) => {
    if (lat < 64) return { text: "For langt sør (Çok güneyde)", color: "text-gray-400" };
    if (clouds > 50) return { text: "Lav (Overskyet - Bulutlu)", color: "text-red-400" };
    if (clouds > 20) return { text: "Medium (Mulighet - Orta)", color: "text-yellow-400" };
    return { text: "HØY (Klar himmel! - Yüksek)", color: "text-emerald-400 font-bold animate-pulse" };
  };

  // Kayak Analizi
  const getSkiCondition = (temp) => {
    if (temp > 5) return { text: "Dårlig (Slush - Erimiş)", color: "text-red-500" };
    if (temp > 0) return { text: "Mykt føre (Yumuşak)", color: "text-yellow-500" };
    return { text: "Perfekt (Pudder/Hardt - Mükemmel)", color: "text-blue-500 font-bold" };
  };

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-2xl border border-slate-700 mt-12 relative overflow-hidden">
      {/* Arka Plan Efekti */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 relative z-10">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Cloud className="text-blue-400" /> Norsk Friluftspanel
          </h2>
          <p className="text-slate-400 text-sm">Live vær, nordlys og skiføre</p>
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
          {LOCATIONS.map(loc => (
            <button
              key={loc.name}
              onClick={() => setSelectedLoc(loc)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition border ${selectedLoc.name === loc.name ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'}`}
            >
              {loc.name}
            </button>
          ))}
        </div>
      </div>

      {loading || !data ? (
        <div className="h-48 flex items-center justify-center text-slate-500">
          <Loader2 className="animate-spin mr-2" /> Henter data fra Yr.no...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          
          {/* 1. HAVA KARTI */}
          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
            <h3 className="text-slate-400 text-xs font-bold uppercase mb-2 flex items-center gap-2">
              <Sun size={14} /> Været nå
            </h3>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-black">{data.instant.details.air_temperature}°</span>
              <span className="text-sm text-slate-400 mb-1">C</span>
            </div>
            <div className="mt-4 space-y-1 text-sm text-slate-300">
              <div className="flex justify-between">
                <span>Vind:</span> 
                <span>{data.instant.details.wind_speed} m/s</span>
              </div>
              <div className="flex justify-between">
                <span>Nedbør (1t):</span> 
                <span>{data.next_1_hours?.details?.precipitation_amount || 0} mm</span>
              </div>
            </div>
          </div>

          {/* 2. AURORA KARTI */}
          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
            <h3 className="text-slate-400 text-xs font-bold uppercase mb-2 flex items-center gap-2">
              <Star size={14} /> Nordlys-sjansen
            </h3>
            <div className="text-3xl mb-1">
               {getAuroraChance(data.instant.details.cloud_area_fraction, selectedLoc.lat).text}
            </div>
            <p className="text-xs text-slate-500">
              Skydekke: {data.instant.details.cloud_area_fraction}%
            </p>
            <p className="text-[10px] text-slate-500 mt-2">
              *Basert på skydekke og breddegrad.
            </p>
          </div>

          {/* 3. KAYAK KARTI */}
          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
            <h3 className="text-slate-400 text-xs font-bold uppercase mb-2 flex items-center gap-2">
              <Snowflake size={14} /> Skiføre
            </h3>
            <div className="text-2xl font-bold mb-1">
               {getSkiCondition(data.instant.details.air_temperature).text}
            </div>
            <div className={`h-2 w-full bg-slate-700 rounded-full mt-3 overflow-hidden`}>
              <div 
                className="h-full bg-blue-400" 
                style={{ width: `${Math.max(0, 100 - (data.instant.details.air_temperature * 5))}%` }}
              ></div>
            </div>
            <p className="text-xs text-slate-500 mt-2 flex justify-between">
              <span>Slush (+5°)</span>
              <span>Pudder (-10°)</span>
            </p>
          </div>

        </div>
      )}
      
      <div className="text-center mt-6">
        <a href="https://www.yr.no/" target="_blank" rel="nofollow" className="text-[10px] text-slate-500 hover:text-slate-300">
          Data levert av MET Norway (Yr.no)
        </a>
      </div>
    </div>
  );
}