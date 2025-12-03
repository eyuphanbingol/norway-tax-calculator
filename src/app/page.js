'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [salary, setSalary] = useState(550000); // Varsayılan maaş
  const [data, setData] = useState([]);
  const [result, setResult] = useState(null);

  // 1. Adım: Python'un ürettiği veriyi çek
  useEffect(() => {
    fetch('/tax_data.json')
      .then((res) => res.json())
      .then((jsonData) => {
        setData(jsonData);
        // İlk açılışta hesaplama yap
        findAndSetResult(550000, jsonData);
      });
  }, []);

  // Hesaplama Fonksiyonu (JSON'dan en yakın veriyi bulur)
  const findAndSetResult = (val, dataset) => {
    if (!dataset || dataset.length === 0) return;
    
    // Veri setinden en yakın maaşı bul
    const closest = dataset.reduce((prev, curr) => {
      return (Math.abs(curr.data.gross_yearly - val) < Math.abs(prev.data.gross_yearly - val) ? curr : prev);
    }, dataset[0]);

    setResult(closest.data);
  };

  const handleInputChange = (val) => {
    setSalary(val);
    findAndSetResult(val, data);
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      
      {/* --- HEADER (Güven Veren Tasarım) --- */}
      <header className="bg-[#005c45] text-white py-10 shadow-lg">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-3">
            🇳🇴 Skattekalkulator 2025
          </h1>
          <p className="text-emerald-100 text-lg">
            Beregn lønn etter skatt i Norge. (Norveç Maaş Hesaplayıcı)
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 mt-[-40px] flex flex-col lg:flex-row gap-8">
        
        {/* --- SOL KOLON: HESAP MAKİNESİ --- */}
        <div className="w-full lg:w-2/3">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 p-6 md:p-8">
            
            {/* Input Alanı */}
            <div className="mb-8">
              <label className="block text-slate-600 font-bold mb-2">Din Årslønn (Yıllık Brüt Maaş)</label>
              <div className="flex items-center gap-2 mb-4">
                <input 
                  type="number" 
                  value={salary}
                  onChange={(e) => handleInputChange(Number(e.target.value))}
                  className="w-full text-3xl font-bold p-3 border-2 border-slate-200 rounded-lg focus:border-emerald-500 focus:outline-none transition"
                />
                <span className="text-xl font-bold text-slate-400">NOK</span>
              </div>
              <input 
                type="range" 
                min="300000" max="2000000" step="5000"
                value={salary}
                onChange={(e) => handleInputChange(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>

            {/* Sonuç Kartı */}
            {result && (
              <div className="bg-emerald-50 rounded-xl border border-emerald-100 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
                  <div>
                    <p className="text-sm uppercase tracking-wider text-slate-500 font-semibold">Utbetalt (Aylık Net)</p>
                    <p className="text-4xl md:text-5xl font-extrabold text-emerald-700 mt-1">
                      {result.net_monthly.toLocaleString()} kr
                    </p>
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-wider text-slate-500 font-semibold">Skatt (Vergi %)</p>
                    <p className="text-4xl md:text-5xl font-extrabold text-slate-700 mt-1">
                      %{result.tax_percentage}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-emerald-200 space-y-2 text-sm md:text-base">
                  <div className="flex justify-between">
                    <span>Brutto årslønn:</span>
                    <span className="font-bold">{result.gross_yearly.toLocaleString()} kr</span>
                  </div>
                  <div className="flex justify-between text-red-600">
                    <span>Skatt totalt (Yıllık Vergi):</span>
                    <span className="font-bold">-{result.tax_yearly.toLocaleString()} kr</span>
                  </div>
                  <div className="flex justify-between text-emerald-800 font-bold text-lg pt-2 border-t border-dashed border-emerald-300">
                    <span>Årslønn etter skatt:</span>
                    <span>{result.net_yearly.toLocaleString()} kr</span>
                  </div>
                </div>

                {/* --- ADSENSE YERİ (NATIVE GÖRÜNÜM) --- */}
                <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center cursor-pointer hover:bg-yellow-100 transition">
                  <p className="text-xs text-gray-400 mb-1">Annonse (Reklam)</p>
                  <p className="text-slate-800 font-semibold">
                    📈 Få bedre rente på boliglånet ditt? Sjekk tilbud her.
                    <br/>(Daha iyi kredi faizi mi arıyorsunuz? Tıklayın.)
                  </p>
                </div>

              </div>
            )}
          </div>

          {/* --- PROGRAMMATIC SEO LİNKLERİ --- */}
          <div className="mt-12">
            <h3 className="text-xl font-bold mb-4 text-slate-800 border-l-4 border-emerald-500 pl-3">
              Populære lønnsnivåer (Popüler Maaşlar)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {/* İlk 40 tanesini gösterelim, sayfa çok uzamasın */}
              {data.slice(0, 40).map((item) => (
                <button 
                  key={item.slug}
                  onClick={() => {
                    setSalary(item.data.gross_yearly);
                    findAndSetResult(item.data.gross_yearly, data);
                    window.scrollTo({top: 0, behavior: 'smooth'});
                  }}
                  className="text-left text-sm p-3 bg-white border rounded hover:border-emerald-500 hover:text-emerald-700 transition"
                >
                  Lønn: <strong>{item.data.gross_yearly.toLocaleString()}</strong>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* --- SAĞ KOLON (STICKY REKLAM ALANI) --- */}
        <div className="w-full lg:w-1/3">
          <div className="sticky top-6">
            <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl h-[600px] flex flex-col items-center justify-center text-gray-400">
              <span className="font-bold text-lg">ADSENSE ALANI</span>
              <span>300 x 600</span>
              <span className="text-xs mt-2">(Dikey Gökdelen Reklam)</span>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}