import AITool from '../../../components/AITool';
export default function RentalPage() {
  return (
    <div className="py-12 px-4 bg-slate-50 min-h-screen">
       <AITool 
         mode="rental" 
         title="Leiebolig-assistenten" 
         placeholder="Eks: Vi er et par som vil bo i Oslo. Budsjettet er maks 18.000 kr. Vi vil ha kort vei til sentrum men stille område. Hvor bør vi lete?"
         buttonText="Finn områder"
       />
    </div>
  );
}