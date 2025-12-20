'use client';

export default function SalarySlider({ salary, setSalary, label = "Din Årslønn" }) {
  const handleInputChange = (e) => {
    let val = Number(e.target.value);
    if (val > 3000000) val = 3000000;
    setSalary(val);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-6">
      {/* Label rengini koyulaştırdık (text-slate-700) */}
      <label htmlFor="salary-input" className="block text-slate-700 font-bold mb-3 text-sm uppercase tracking-wide">
        {label}
      </label>
      
      <div className="flex items-center gap-3 mb-5">
        <input 
          id="salary-input"
          type="number" 
          value={salary}
          onChange={handleInputChange}
          className="w-full text-3xl md:text-4xl font-extrabold text-slate-900 p-3 border-2 border-slate-200 rounded-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 outline-none transition"
          aria-label="Skriv inn årslønn" // Erişilebilirlik etiketi
        />
        <span className="text-xl font-bold text-slate-500">NOK</span>
      </div>

      <input 
        type="range" 
        min="300000" max="2000000" step="5000"
        value={salary}
        onChange={(e) => setSalary(Number(e.target.value))}
        className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600 hover:accent-emerald-500 transition-all"
        aria-label="Juster årslønn med slider" // Erişilebilirlik etiketi
      />
      <div className="flex justify-between text-xs text-slate-500 mt-2 font-medium">
        <span>300k</span>
        <span>1M</span>
        <span>2M+</span>
      </div>
    </div>
  );
}