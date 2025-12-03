export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-slate-800">Om Oss (Hakkımızda)</h1>
      
      <div className="text-slate-600 space-y-4">
        <p>
          <strong>Skattekalkulator Norge</strong> er en uavhengig tjeneste dedikert til å gi nøyaktige og oppdaterte lønnsberegninger for arbeidstakere i Norge.
          (Biz Norveç'teki çalışanlar için doğru maaş hesabı sunmaya adanmış bağımsız bir servisiz.)
        </p>
        <p>
          Vårt mål er å gjøre det kompliserte norske skattesystemet enkelt å forstå for alle. 
          Uansett om du er nyutdannet, expat eller har jobbet i mange år, skal du enkelt kunne se hva du sitter igjen med etter skatt.
        </p>
        <p>
          Våre beregninger er basert på de nyeste skattesatsene fra Skatteetaten for 2024/2025.
        </p>
      </div>
    </main>
  );
}