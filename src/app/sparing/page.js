import { PiggyBank, TrendingDown } from 'lucide-react'; // <-- PiggyBank buraya eklendi
import AdSlot from '../../components/AdSlot';
import DealCard from '../../components/DealCard';
import dealsData from '../../data/deals.json';

export const metadata = {
  title: 'Sparing og Tilbud - Få mer ut av lønnen din',
  description: 'De beste sparetipsene og tilbudene i Norge. Strøm, boliglån, forsikring og dagligvarer.',
};

export default function SparingPage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      
      {/* Hero */}
      <div className="bg-[#005c45] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-4">
             <div className="bg-emerald-400/20 p-4 rounded-full">
                {/* Hata veren bileşen burasıydı, şimdi çalışacak */}
                <PiggyBank size={48} className="text-emerald-300" />
             </div>
          </div>
          <h1 className="text-4xl font-black mb-4">Sparing & Tilbud</h1>
          <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
            Det handler ikke bare om hva du tjener, men hva du beholder. 
            Her er dagens smarteste økonomiske grep.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-10 relative z-10">
        
        {/* Üst Reklam */}
        <div className="mb-8">
           <AdSlot type="header" />
        </div>

        {/* Fırsatlar Grid'i */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dealsData.map((deal, index) => (
            <DealCard key={index} deal={deal} />
          ))}
        </div>

        {/* Bilgi Bölümü */}
        <div className="mt-16 bg-white p-8 rounded-xl border border-slate-200 max-w-3xl mx-auto text-center">
           <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center justify-center gap-2">
             <TrendingDown className="text-emerald-600"/> Hvordan spare i 2025?
           </h2>
           <p className="text-slate-600 mb-6">
             Norske husholdninger bruker mest penger på bolig, strøm og mat. 
             Ved å reforhandle boliglånet, bytte strømavtale og planlegge matinnkjøp, 
             kan en gjennomsnittsfamilie spare over 20.000 kr i året.
           </p>
           <p className="text-sm text-slate-400">
             *Tipsene på denne siden oppdateres jevnlig basert på markedet.
           </p>
        </div>

      </div>
    </main>
  );
}