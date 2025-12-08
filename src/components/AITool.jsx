'use client';
import { useState, useEffect } from 'react';
import { Send, Loader2, Sparkles, BrainCircuit } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function AITool({ mode, title, placeholder, buttonText }) {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Hydration hatasını önlemek için
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  const handleSubmit = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResponse(''); // Önceki cevabı temizle
    setError('');

    try {
      const res = await fetch('/api/ai-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode, inputData: input }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Bir hata oluştu.");
      }

      setResponse(data.result);
    } catch (err) {
      setError(err.message || "Beklenmedik bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  if (!isMounted) return null;

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
      <div className="bg-slate-900 p-6 text-white flex items-center gap-3">
        <Sparkles className="text-emerald-400" />
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      
      <div className="p-6 md:p-8">
        <div className="mb-6">
          <label className="block text-slate-700 font-medium mb-2">Beskriv din situasjon (Anlatın):</label>
          <textarea
            className="w-full p-4 border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 outline-none transition min-h-[150px] text-slate-800 placeholder-slate-400"
            placeholder={placeholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm font-medium">
            ❌ {error}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading || !input}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform active:scale-[0.99]"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" />
              Jobber med saken... (Çalışıyor...)
            </>
          ) : (
            <>
              <Send size={20} />
              {buttonText}
            </>
          )}
        </button>

        {/* --- YENİ EKLENEN KISIM: YÜKLENİYOR ANİMASYONU --- */}
        {loading && (
          <div className="mt-8 bg-slate-50 p-8 rounded-xl border-2 border-dashed border-emerald-200 animate-pulse flex flex-col items-center justify-center text-center min-h-[200px]">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-400 rounded-full blur-xl opacity-20 animate-ping"></div>
              <BrainCircuit className="text-emerald-600 w-12 h-12 mb-4 relative z-10 animate-bounce" />
            </div>
            <h3 className="text-lg font-bold text-slate-700 mb-1">
              AI-en analyserer tallene dine...
            </h3>
            <p className="text-slate-500 text-sm">
              Dette kan ta noen sekunder. Vi finner de beste rådene for deg.
              <br/>(Verileriniz analiz ediliyor, lütfen bekleyin...)
            </p>
          </div>
        )}

        {/* --- CEVAP KISMI --- */}
        {response && !loading && (
          <div className="mt-8 bg-emerald-50/50 p-6 rounded-xl border border-emerald-100 animate-in fade-in slide-in-from-bottom-4 shadow-sm">
             <div className="prose prose-slate max-w-none prose-headings:text-slate-800 prose-a:text-emerald-600 prose-strong:text-emerald-800">
               <ReactMarkdown>{response}</ReactMarkdown>
             </div>
             
             <div className="mt-6 pt-4 border-t border-emerald-200/50 text-center">
                <p className="text-xs text-slate-400 italic">
                  * Dette er AI-genererte råd. Sjekk alltid offisielle kilder som Skatteetaten eller NAV.
                </p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}