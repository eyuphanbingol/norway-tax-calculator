'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Kullanıcı daha önce kabul etti mi kontrol et
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'true');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900 text-white p-4 z-50 shadow-2xl border-t border-slate-700">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-slate-300">
          <p>
            Vi bruker informasjonskapsler (cookies) for å gi deg en bedre opplevelse og for å vise annonser. 
            Ved å fortsette godtar du vår bruk av cookies. 
            <Link href="/personvern" className="text-emerald-400 hover:underline ml-1">
              Les mer (Gizlilik Politikası)
            </Link>
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={acceptCookies}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-semibold text-sm transition"
          >
            OK, jeg forstår
          </button>
        </div>
      </div>
    </div>
  );
}