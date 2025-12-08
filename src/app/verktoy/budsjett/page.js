import AITool from '../../../components/AITool';
export default function BudgetPage() {
  return (
    <div className="py-12 px-4 bg-slate-50 min-h-screen">
       <AITool 
         mode="budget" 
         title="AI Budsjett-hjelpen" 
         placeholder="Eks: Jeg tjener 35.000 netto. Husleie er 12.000, strøm 1500, mat 4000. Jeg har også billån på 3000. Hvordan kan jeg spare mer?"
         buttonText="Få sparetips"
       />
    </div>
  );
}