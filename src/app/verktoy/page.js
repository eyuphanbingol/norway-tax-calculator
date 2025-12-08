import Link from 'next/link';
import { Wallet, Home, HeartHandshake, ArrowRight } from 'lucide-react';
import AdSlot from '../../components/AdSlot';

export const metadata = {
  title: 'AI Verktøy - Din økonomiske assistent i Norge',
  description: 'Gratis AI-verktøy for budsjett, boligleie og NAV-hjelp. Få personlige råd basert på din situasjon.',
};

export default function ToolsPage() {
  const tools = [
    {
      id: 'budget',
      title: 'Budsjett-hjelpen',
      desc: 'Få kontroll på økonomien. Vår AI analyserer forbruket ditt og gir deg konkrete sparetips basert på SIFO-tall.',
      icon: <Wallet size={40} className="text-blue-500" />,
      link: '/verktoy/budsjett',
      color: 'hover:border-blue-500'
    },
    {
      id: 'rental',
      title: 'Leiebolig-assistenten',
      desc: 'Ny i Norge eller på flyttefot? Finn ut hvor du har råd til å bo og unngå de vanligste leiefellene.',
      icon: <Home size={40} className="text-emerald-500" />,
      link: '/verktoy/leiebolig',
      color: 'hover:border-emerald-500'
    },
    {
      id: 'nav',
      title: 'NAV-veilederen',
      desc: 'Usikker på hvilke rettigheter du har? Fortell oss din situasjon, så lister vi opp støtteordninger du kan søke på.',
      icon: <HeartHandshake size={40} className="text-red-500" />,
      link: '/verktoy/nav-hjelp',
      color: 'hover:border-red-500'
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-[#005c45] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-black mb-4">Smarte Verktøy</h1>
          <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
            Bruk kunstig intelligens til å ta bedre økonomiske valg i hverdagen.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-10 relative z-10">
        <div className="grid md:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link key={tool.id} href={tool.link} className="group">
              <div className={`bg-white p-8 rounded-2xl shadow-lg border-2 border-transparent ${tool.color} transition duration-300 h-full flex flex-col`}>
                <div className="mb-6 bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition">
                  {tool.icon}
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-3">{tool.title}</h2>
                <p className="text-slate-600 mb-6 flex-grow">{tool.desc}</p>
                <div className="flex items-center font-bold text-slate-900 group-hover:gap-2 transition-all">
                  Prøv verktøyet <ArrowRight size={20} className="ml-2" />
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-12">
           <AdSlot type="header" />
        </div>
      </div>
    </main>
  );
}