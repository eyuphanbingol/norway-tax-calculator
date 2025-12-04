import salaryData from '../data/data.json';
import professionData from '../data/professions.json'; // YENİ: Meslek verilerini çekiyoruz

export default function sitemap() {
  // DİKKAT: Buraya kendi Vercel linkini veya aldıysan Domainini yaz
  // Sonunda '/' olmasın.
  const baseUrl = 'https://norway-tax-calculator.vercel.app'; 

  // 1. Maaş Sayfaları Haritası (/lonn/...)
  const salaryUrls = salaryData.map((item) => ({
    url: `${baseUrl}/lonn/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // 2. YENİ: Meslek Sayfaları Haritası (/yrke/...)
  // Bu sayfalar "Hemşire maaşı", "Öğretmen maaşı" gibi aramalar içindir.
  const professionUrls = professionData.map((item) => ({
    url: `${baseUrl}/yrke/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.9, // Meslek sayfaları yüksek dönüşüm getirir, önceliği yüksek tutalım
  }));

  // 3. Ana sayfa ve Statik Sayfalar
  const routes = [
    '',
    '/om-oss',
    '/kontakt',
    '/personvern',
    '/cookies',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.5,
  }));

  // Hepsini tek bir dev listede birleştirip Google'a sunuyoruz
  return [...routes, ...salaryUrls, ...professionUrls];
}