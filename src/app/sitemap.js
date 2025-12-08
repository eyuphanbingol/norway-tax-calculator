import salaryData from '../data/data.json';
import professionData from '../data/professions.json';
import cityData from '../data/cities.json';
import blogData from '../data/blog.json';

import { DOMAIN } from '../lib/constants'; 

export default function sitemap() {
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

  // 4. Statik Sayfalar (YENİ LİNKLER EKLENDİ)
  const routes = [
    '',
    '/blog',
    '/verktoy',        // Araçlar Ana Sayfası
    '/verktoy/fritid', // Yeni Outdoor Aracı
    '/om-oss',
    '/kontakt',
    '/personvern',
    '/cookies',
    '/en',
    '/no',
    '/sv',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : (route === '/blog' || route === '/verktoy' ? 0.9 : 0.5),
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