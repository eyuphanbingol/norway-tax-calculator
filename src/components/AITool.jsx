'use client';
import { useState, useEffect } from 'react';
import { Send, Loader2, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function AITool({ mode, title, placeholder, buttonText }) {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Hydration hatasını önlemek için (Sadece tarayıcıda göster)
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  const handleSubmit = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResponse('');
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

  if (!isMounted) return null; // Sunucuda render etme

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
      <div className="bg-slate-900 p-6 text-white flex items-center gap-3">
        <Sparkles className="text-emerald-400" />
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      
      <div className="p-6 md:p-8">
        <div className="mb-6">
          <label className="block text-slate-700 font-medium mb-2">Beskriv din situasjon:</label>
          <textarea
            className="w-full p-4 border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 outline-none transition min-h-[150px] text-slate-800"
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
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Send size={20} />}
          {loading ? 'Analyserer...' : buttonText}
        </button>

        {response && (
          <div className="mt-8 bg-slate-50 p-6 rounded-xl border border-slate-200 animate-in fade-in slide-in-from-bottom-4">
             <div className="prose prose-slate max-w-none prose-headings:text-slate-800 prose-a:text-emerald-600">
               <ReactMarkdown>{response}</ReactMarkdown>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}