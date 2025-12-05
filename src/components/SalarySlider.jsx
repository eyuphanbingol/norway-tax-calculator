'use client';

export default function SalarySlider({ salary, setSalary, label = "Din Årslønn " }) {
  const handleInputChange = (e) => {
    let val = Number(e.target.value);
    if (val > 3000000) val = 3000000;
    setSalary(val);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-6">
      <label className="block text-slate-600 font-bold mb-3 text-sm uppercase tracking-wide">
        {label}
      </label>
      
      <div className="flex items-center gap-3 mb-5">
        <input 
          type="number" 
          value={salary}
          onChange={handleInputChange}
          className="w-full text-3xl md:text-4xl font-extrabold text-slate-800 p-3 border-2 border-slate-200 rounded-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 outline-none transition"
        />
        <span className="text-xl font-bold text-slate-400">NOK</span>
      </div>

      <input 
        type="range" 
        min="300000" max="2000000" step="5000"
        value={salary}
        onChange={(e) => setSalary(Number(e.target.value))}
        className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600 hover:accent-emerald-500 transition-all"
      />
    </div>
  );
}