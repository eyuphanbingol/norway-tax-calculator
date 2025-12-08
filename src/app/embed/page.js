'use client';
import { useState, useEffect } from 'react';
import SalarySlider from '../../components/SalarySlider';
import ResultCard from '../../components/ResultCard';
import salaryData from '../../data/data.json';

export default function EmbedPage() {
  const [salary, setSalary] = useState(600000);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const closest = salaryData.reduce((prev, curr) => {
      return (Math.abs(curr.gross_yearly - salary) < Math.abs(prev.gross_yearly - salary) ? curr : prev);
    }, salaryData[0]);
    setResult(closest);
  }, [salary]);

  return (
    <div className="min-h-screen bg-white p-4">
       <div className="max-w-md mx-auto border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          <div className="bg-[#005c45] p-3 text-center text-white font-bold text-sm">
             Skattekalkulator 2025
          </div>
          <div className="p-4">
             <SalarySlider salary={salary} setSalary={setSalary} label="Årslønn" />
             <ResultCard result={result} />
          </div>
          <div className="bg-slate-50 p-2 text-center text-[10px] text-slate-400">
             Levert av <a href="https://skattekalkulator.com" target="_blank" className="underline hover:text-slate-600">Skattekalkulator.com</a>
          </div>
       </div>
    </div>
  );
}