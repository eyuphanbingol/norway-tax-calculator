export default function PrivacyPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-slate-800">Personvernerklæring (Gizlilik Politikası)</h1>
      
      <div className="prose prose-slate text-slate-600">
        <p className="mb-4">Sist oppdatert: Desember 2025</p>
        
        <h2 className="text-xl font-semibold text-slate-800 mt-6 mb-2">1. Innledning</h2>
        <p>
          Velkommen til Skattekalkulator. Vi tar ditt personvern på alvor. 
          Denne erklæringen forklarer hvordan vi samler inn og bruker informasjon.
          (Gizliliğinizi ciddiye alıyoruz. Bu bildirim verileri nasıl kullandığımızı açıklar.)
        </p>

        <h2 className="text-xl font-semibold text-slate-800 mt-6 mb-2">2. Informasjonskapsler (Cookies)</h2>
        <p>
          Vi bruker informasjonskapsler for å forbedre brukeropplevelsen og vise relevante annonser via Google AdSense. 
          Google, som en tredjepartsleverandør, bruker informasjonskapsler for å vise annonser på nettstedet vårt.
          (Google AdSense aracılığıyla reklam göstermek için çerez kullanıyoruz.)
        </p>

        <h2 className="text-xl font-semibold text-slate-800 mt-6 mb-2">3. Datainnsamling</h2>
        <p>
          Vi lagrer ingen personlig informasjon om lønnen du legger inn i kalkulatoren. 
          Alle beregninger skjer lokalt eller anonymt.
          (Girdiğiniz maaş verisini kaydetmiyoruz. Hesaplamalar anonimdir.)
        </p>

        <h2 className="text-xl font-semibold text-slate-800 mt-6 mb-2">4. Kontakt</h2>
        <p>
          Hvis du har spørsmål om denne personvernerklæringen, vennligst kontakt oss via vår kontaktside.
        </p>
      </div>
    </main>
  );
}