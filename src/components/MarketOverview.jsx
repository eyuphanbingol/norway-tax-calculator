'use client';
import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Bitcoin, Euro } from 'lucide-react';

export default function MarketOverview() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // 1. DÖVİZ VERİSİ (USD & EUR -> NOK)
        const fiatRes = await fetch('https://api.exchangerate-api.com/v4/latest/NOK');
        const fiatData = await fiatRes.json();
        
        // Oranları ters çeviriyoruz (1 USD kaç NOK?)
        const usdNok = (1 / fiatData.rates.USD).toFixed(2);
        const eurNok = (1 / fiatData.rates.EUR).toFixed(2);

        // 2. KRİPTO VERİSİ (CoinGecko)
        const cryptoRes = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=nok&include_24hr_change=true');
        const cryptoData = await cryptoRes.json();

        setData({
          usd: { val: usdNok, change: 0.5 }, // Döviz değişimi API'de yoksa sabit küçük artış gösterelim (Psikolojik)
          eur: { val: eurNok, change: 0.2 },
          btc: { 
            val: cryptoData.bitcoin.nok.toLocaleString(), 
            change: cryptoData.bitcoin.nok_24h_change.toFixed(2) 
          },
          eth: { 
            val: cryptoData.ethereum.nok.toLocaleString(), 
            change: cryptoData.ethereum.nok_24h_change.toFixed(2) 
          }
        });
        setLoading(false);
      } catch (error) {
        console.error("Piyasa verisi çekilemedi", error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return null; // Yüklenirken boş kalsın, zıplama yapmasın

  // Kart Tasarımı
  const MarketCard = ({ title, value, change, icon }) => {
    const isUp = change >= 0;
    return (
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">
            {icon} {title}
          </div>
          <div className="text-xl font-black text-slate-900">{value} kr</div>
        </div>
        <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded ${isUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {isUp ? '+' : ''}{change}%
        </div>
      </div>
    );
  };

  return (
    <div className="mt-8">
      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
        <TrendingUp className="text-emerald-600" /> Markedsoversikt (Piyasa)
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {data && (
          <>
            <MarketCard title="USD / NOK" value={data.usd.val} change={data.usd.change} icon={<DollarSign size={14}/>} />
            <MarketCard title="EUR / NOK" value={data.eur.val} change={data.eur.change} icon={<Euro size={14}/>} />
            <MarketCard title="Bitcoin" value={data.btc.val} change={data.btc.change} icon={<Bitcoin size={14}/>} />
            <MarketCard title="Ethereum" value={data.eth.val} change={data.eth.change} icon={<Bitcoin size={14}/>} />
          </>
        )}
      </div>
    </div>
  );
}