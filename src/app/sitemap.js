import salaryData from '../data/data.json';

export default function sitemap() {
  // DİKKAT: Buraya kendi Vercel linkini veya aldıysan Domainini yaz
  // Sonunda '/' olmasın.
  const baseUrl = 'https://norway-tax-calculator.vercel.app'; 

  // Dinamik sayfaların haritasını çıkarıyoruz
  const salaryUrls = salaryData.map((item) => ({
    url: `${baseUrl}/lonn/${item.slug}`, // YENİ YAPI: /lonn/lonn-etter-skatt-...
    lastModified: new Date(),
    changeFrequency: 'monthly', // Maaş verisi her ay değişmez, monthly iyidir
    priority: 0.8,
  }));

  // Ana sayfa ve statik sayfalar
  const routes = [
    '',
    '/om-oss',
    '/kontakt',
    '/personvern',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.5,
  }));

  return [...routes, ...salaryUrls];
}