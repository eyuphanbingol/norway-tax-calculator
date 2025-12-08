import AITool from '../../../components/AITool';
export default function NavPage() {
  return (
    <div className="py-12 px-4 bg-slate-50 min-h-screen">
       <AITool 
         mode="nav" 
         title="NAV-veilederen" 
         placeholder="Eks: Jeg har akkurat mistet jobben etter 5 år. Jeg har to barn og kona jobber deltid. Hva har jeg krav på?"
         buttonText="Sjekk rettigheter"
       />
    </div>
  );
}