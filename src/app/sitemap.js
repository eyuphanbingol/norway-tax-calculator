import { promises as fs } from 'fs';
import path from 'path';

// Bu fonksiyon Google'a sitemizdeki tüm linkleri listeleyecek
export default async function sitemap() {
  // 1. Projenin ana URL'si (Vercel'den aldığın linki buraya yazmalısın)
  // Şimdilik örnek olarak vercel linkini koyuyoruz, domain alınca değiştirirsin.
  // ÖRN: https://norway-tax-calculator-xyz.vercel.app
  // DİKKAT: Aşağıdaki 'baseUrl' kısmını kendi Vercel linkinle değiştir!
  const baseUrl = 'https://norway-tax-calculator.vercel.app'; 

  // 2. JSON verisini oku
  const filePath = path.join(process.cwd(), 'public', 'tax_data.json');
  const file = await fs.readFile(filePath, 'utf8');
  const data = JSON.parse(file);

  // 3. Her bir maaş verisi için URL oluştur
  const taxUrls = data.map((item) => ({
    url: `${baseUrl}/?salary=${item.data.gross_yearly}`, // Query parametresi ile yönlendirme
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // 4. Ana sayfa ve diğerlerini birleştirip döndür
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...taxUrls,
  ];
}