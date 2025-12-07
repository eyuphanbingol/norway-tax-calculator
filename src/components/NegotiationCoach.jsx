'use client';
import { useState } from 'react';
import { Sparkles, Send, Copy, Check } from 'lucide-react';

export default function NegotiationCoach() {
  const [job, setJob] = useState('');
  const [experience, setExperience] = useState('');
  const [salary, setSalary] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!job || !salary) return;
    setLoading(true);
    setResult('');

    try {
      const res = await fetch('/api/negotiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ job, experience, currentSalary: salary }),
      });
      const data = await res.json();
      setResult(data.result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-16 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-8 shadow-2xl border border-slate-700 relative overflow-hidden">
      
      {/* Arka Plan Efekti */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

      <div className="relative z-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-2">
          <Sparkles className="text-emerald-400" />
          AI Lønnsforhandler (Maaş Pazarlıkçısı)
        </h2>
        <p className="text-slate-300 mb-8 max-w-xl">
          Tjener du for lite? La vår kunstige intelligens skrive den perfekte e-posten til sjefen din for å be om høyere lønn.
        </p>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            placeholder="Ditt yrke (f.eks. Sykepleier)"
            className="bg-slate-700/50 border border-slate-600 rounded-lg p-3 text-white placeholder-slate-400 focus:border-emerald-500 outline-none transition"
            value={job}
            onChange={(e) => setJob(e.target.value)}
          />
          <input
            type="number"
            placeholder="Nåværende lønn (NOK)"
            className="bg-slate-700/50 border border-slate-600 rounded-lg p-3 text-white placeholder-slate-400 focus:border-emerald-500 outline-none transition"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
          <input
            type="number"
            placeholder="Erfaring (År)"
            className="bg-slate-700/50 border border-slate-600 rounded-lg p-3 text-white placeholder-slate-400 focus:border-emerald-500 outline-none transition"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading || !job}
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-900/20"
        >
          {loading ? (
            <span className="animate-pulse">Skriver e-post... (Yazıyor...)</span>
          ) : (
            <>
              <Send size={20} />
              Generer forslag til lønnssamtale (Oluştur)
            </>
          )}
        </button>

        {result && (
          <div className="mt-8 bg-white/5 border border-white/10 rounded-xl p-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-emerald-400 uppercase tracking-wider text-xs">Ditt utkast:</h3>
              <button 
                onClick={copyToClipboard}
                className="text-xs flex items-center gap-1 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded transition"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Kopiert' : 'Kopier tekst'}
              </button>
            </div>
            <div className="prose prose-invert prose-sm max-w-none whitespace-pre-line text-slate-200 leading-relaxed">
              {result}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}