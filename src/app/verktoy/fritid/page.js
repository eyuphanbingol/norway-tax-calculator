import OutdoorDashboard from '../../../components/OutdoorDashboard';
import AdSlot from '../../../components/AdSlot';

export const metadata = {
  title: 'Vær, Nordlys og Skiføre - Skattekalkulator.com',
  description: 'Sjekk været, nordlys-sjansen og skiføret i Norge. Live data fra Yr.no for Oslo, Tromsø, Trysil og mer.',
};

export default function FritidPage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-black mb-4">Norge Live: Vær & Fritid</h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Planlegger du helgen? Sjekk nordlysvarselet i nord eller skiføret på fjellet.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-10 relative z-10">
        
        {/* OUTDOOR DASHBOARD BİLEŞENİ */}
        <OutdoorDashboard />

        <div className="mt-12 bg-white p-8 rounded-xl shadow-sm border border-slate-200 max-w-3xl mx-auto prose prose-slate">
           <h2>Hvorfor sjekke forholdene her?</h2>
           <p>
             Vi henter data direkte fra <strong>Meteorologisk institutt (Yr.no)</strong> i sanntid. 
             Vår algoritme analyserer skydekket for å gi deg den beste indikasjonen på om du kan se nordlyset i kveld, 
             eller om snøen i bakken er perfekt for ski.
           </p>
           <ul>
             <li><strong>Nordlys (Aurora):</strong> Krever mørke og lite skyer. Sjekk Tromsø eller Lofoten.</li>
             <li><strong>Ski:</strong> Sjekk Trysil eller Hemsedal for minusgrader og nysnø.</li>
           </ul>
        </div>

        <div className="mt-12">
           <AdSlot type="header" />
        </div>
      </div>
    </div>
  );
}