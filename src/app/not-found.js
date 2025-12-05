import Link from 'next/link';
import { Home, AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 text-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 max-w-md w-full">
        <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle size={32} />
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-2">404</h2>
        <h3 className="text-xl font-bold text-slate-800 mb-4">Side ikke funnet</h3>
        <p className="text-slate-600 mb-8">
          Beklager, siden du leter etter finnes ikke eller har blitt flyttet.
        </p>
        
        <Link 
          href="/"
          className="flex items-center justify-center gap-2 w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition"
        >
          <Home size={20} />
          Gå til forsiden
        </Link>
      </div>
    </div>
  );
}