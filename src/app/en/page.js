'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calculator, Globe, Info } from 'lucide-react';
import SalarySlider from '../../components/SalarySlider';
import ResultCard from '../../components/ResultCard';
import AdSlot from '../../components/AdSlot';
import salaryData from '../../data/data.json';

export default function EnglishHome() {
  const [salary, setSalary] = useState(600000);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const closest = salaryData.reduce((prev, curr) => {
      return (Math.abs(curr.gross_yearly - salary) < Math.abs(prev.gross_yearly - salary) ? curr : prev);
    }, salaryData[0]);
    setResult(closest);
  }, [salary]);

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4">
          <AdSlot type="header" />
        </div>
      </div>

      <div className="bg-blue-900 text-white pt-12 pb-24">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4 opacity-80">
            <Globe size={24} />
            <span className="font-semibold tracking-wide uppercase text-sm">Expat Tax Calculator Norway</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            Norway Tax Calculator 2025
          </h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto font-light leading-relaxed mb-8">
            Moving to Norway? Estimate your net income after tax with the most accurate calculator for 2025.
          </p>
          <div className="flex justify-center gap-4">
             <Link href="/" className="text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition">
                Bytt til Norsk 🇳🇴
             </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-16 flex flex-col lg:flex-row gap-8 relative z-10">
        <div className="w-full lg:w-2/3">
          {/* İngilizce Props Gönderiyoruz */}
          <SalarySlider salary={salary} setSalary={setSalary} label="Annual Gross Salary (NOK)" />
          <ResultCard result={result} lang="en" />

          <div className="mt-12 bg-white p-8 rounded-xl shadow-sm border border-slate-200 prose prose-slate max-w-none">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-800">
              <Info className="text-blue-600" />
              How does the Norwegian tax system work?
            </h2>
            <p>
              Norway uses a progressive tax system. This means higher earners pay a higher percentage. 
              As an employee in Norway, your tax deduction typically includes:
            </p>
            <ul>
                <li><strong>Trygdeavgift (National Insurance):</strong> 7.8% of your gross income.</li>
                <li><strong>Trinnskatt (Bracket Tax):</strong> A progressive tax on higher incomes.</li>
                <li><strong>Fellesskatt:</strong> A general tax on your net income after deductions.</li>
            </ul>
            <p>
              <strong>Good to know:</strong> Most expats are eligible for a standard deduction (Minifrådrag) which is automatically calculated in our tool.
            </p>
          </div>
        </div>

        <div className="w-full lg:w-1/3">
           <AdSlot type="sidebar" />
        </div>
      </div>
    </main>
  );
}