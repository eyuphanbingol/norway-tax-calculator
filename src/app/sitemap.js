import salaryData from '../data/data.json';
import professionData from '../data/professions.json';
import cityData from '../data/cities.json';
import blogData from '../data/blog.json';

export default function sitemap() {
  // DİKKAT: Pazar günü Domain aldığında burayı güncellemelisin (Örn: https://skattekalkulator.com)
  const baseUrl = 'https://norway-tax-calculator.vercel.app';

  // 1. Maaş Sayfaları (/lonn/...)
  const salaryUrls = salaryData.map((item) => ({
    url: `${baseUrl}/lonn/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // 2. Meslek Sayfaları (/yrke/...)
  const professionUrls = professionData.map((item) => ({
    url: `${baseUrl}/yrke/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.9, // Meslek sayfaları değerlidir
  }));

  // 3. Şehir Sayfaları (/sted/...)
  const cityUrls = cityData.map((item) => ({
    url: `${baseUrl}/sted/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  // 4. Statik Sayfalar ve İngilizce Sayfa (/en)
  const routes = [
    '',
    '/om-oss',
    '/kontakt',
    '/personvern',
    '/cookies',
    '/en',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.5,
  }));

  // 5. Blog Yazıları
  const blogUrls = blogData.map((item) => ({
    url: `${baseUrl}/blog/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));
  // Hepsini birleştirip Google'a sunuyoruz
  return [...routes, ...salaryUrls, ...professionUrls, ...cityUrls,...blogUrls];
}