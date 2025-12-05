import salaryData from '../data/data.json';
import professionData from '../data/professions.json';
import cityData from '../data/cities.json';
import blogData from '../data/blog.json';

// Pazar günü domaini 'src/lib/constants.js' dosyasından değiştirdiğinde 
// burası da otomatik düzelecek. Eğer constants.js yoksa elle de yazabilirsin.
import { DOMAIN } from '../lib/constants'; 

export default function sitemap() {
  // Eğer constants.js oluşturmadıysan üstteki importu sil ve şu satırı aç:
  // const baseUrl = 'https://norway-tax-calculator.vercel.app';
  
  const baseUrl = DOMAIN;

  // 1. Maaş Sayfaları
  const salaryUrls = salaryData.map((item) => ({
    url: `${baseUrl}/lonn/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // 2. Meslek Sayfaları
  const professionUrls = professionData.map((item) => ({
    url: `${baseUrl}/yrke/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  // 3. Şehir Sayfaları
  const cityUrls = cityData.map((item) => ({
    url: `${baseUrl}/sted/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  // 4. Statik Sayfalar (EKSİK OLAN '/blog' EKLENDİ)
  const routes = [
    '',
    '/blog', // <-- BU ÇOK ÖNEMLİYDİ, EKLENDİ!
    '/om-oss',
    '/kontakt',
    '/personvern',
    '/cookies',
    '/en',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : (route === '/blog' ? 0.9 : 0.5), // Blog sayfası da değerlidir
  }));

  // 5. Blog Detay Sayfaları
  const blogUrls = blogData.map((item) => ({
    url: `${baseUrl}/blog/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...routes, ...salaryUrls, ...professionUrls, ...cityUrls, ...blogUrls];
}