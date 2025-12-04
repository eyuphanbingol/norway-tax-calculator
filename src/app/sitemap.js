import salaryData from '../data/data.json';
import professionData from '../data/professions.json';
import cityData from '../data/cities.json'; // YENİ

export default function sitemap() {
  const baseUrl = 'https://norway-tax-calculator.vercel.app'; 

  // 1. Maaşlar
  const salaryUrls = salaryData.map((item) => ({
    url: `${baseUrl}/lonn/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // 2. Meslekler
  const professionUrls = professionData.map((item) => ({
    url: `${baseUrl}/yrke/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  // 3. YENİ: Şehirler
  const cityUrls = cityData.map((item) => ({
    url: `${baseUrl}/sted/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.85, 
  }));

  // 4. Statik
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

  return [...routes, ...salaryUrls, ...professionUrls, ...cityUrls];
}