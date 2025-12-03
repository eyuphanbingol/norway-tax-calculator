'use client'; 
import { useEffect } from 'react';
import { RefreshCcw } from 'lucide-react';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 text-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 max-w-md w-full">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Noe gikk galt (Bir şeyler ters gitti)</h2>
        <p className="text-slate-600 mb-6">
          Vi beklager, det oppstod en teknisk feil. Vennligst prøv igjen.
        </p>
        <button
          onClick={() => reset()}
          className="flex items-center justify-center gap-2 w-full py-3 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-lg transition"
        >
          <RefreshCcw size={18} />
          Prøv på nytt (Tekrar Dene)
        </button>
      </div>
    </div>
  );
}