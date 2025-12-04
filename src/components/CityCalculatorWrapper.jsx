'use client';
import { useState, useEffect } from 'react';
import SalarySlider from './SalarySlider';
import ResultCard from './ResultCard';
import salaryData from '../data/data.json'; // Ana veri setini kullanıyoruz hesaplama için

export default function CityCalculatorWrapper({ cityName }) {
  const [salary, setSalary] = useState(650000); // Şehirler için varsayılan biraz yüksek olsun
  const [result, setResult] = useState(null);

  useEffect(() => {
    // Maaş verisini bul
    const closest = salaryData.reduce((prev, curr) => {
      return (Math.abs(curr.gross_yearly - salary) < Math.abs(prev.gross_yearly - salary) ? curr : prev);
    }, salaryData[0]);

    setResult(closest);
  }, [salary]);

  return (
    <div>
      <div className="bg-white p-6 rounded-t-xl border border-slate-200 border-b-0 shadow-sm">
        <p className="text-sm font-bold text-emerald-600 uppercase tracking-wider mb-4">
          Beregning for {cityName}
        </p>
        <SalarySlider salary={salary} setSalary={setSalary} />
      </div>
      
      {/* ResultCard'ın üst kenarlarını düzeltmek için -mt-2 ve rounded ayarı */}
      <div className="-mt-2 relative z-10">
         <ResultCard result={result} />
      </div>
    </div>
  );
}