export default function AdSlot({ type }) {
  // 1. HEADER REKLAMI (728x90) - En tepe
  if (type === 'header') {
    return (
      <div className="w-full max-w-[728px] h-[90px] mx-auto my-6 bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400 text-sm overflow-hidden">
        {/* AdSense kodu buraya gelecek */}
        <span className="font-semibold">ADSENSE (Header 728x90)</span>
      </div>
    );
  }

  // 2. SIDEBAR GÖKDELEN (300x600) - Sağ taraf yapışkan
  if (type === 'sidebar') {
    return (
      <div className="sticky top-4 w-[300px] h-[600px] bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 mx-auto">
         <span className="font-bold">ADSENSE (Sticky)</span>
         <span className="text-xs">300 x 600</span>
      </div>
    );
  }

  // 3. NATIVE / KUTU İÇİ (Responsive) - Sonuç kartının içi
  if (type === 'native') {
    return (
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-center cursor-pointer hover:bg-yellow-100 transition">
        <p className="text-[10px] text-gray-400 uppercase mb-1">Annonse</p>
        <p className="text-slate-800 font-medium text-sm">
          📉 <strong>Beste boliglånsrente?</strong> Sjekk hvor mye du kan spare på å bytte bank.
          <br/><span className="text-emerald-600 text-xs underline">Se tilbud her</span>
        </p>
      </div>
    );
  }

  return null;
}