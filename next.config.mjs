import { SALARY_PAGES, salarySlug } from './src/lib/tax.js';

// Eski sitenin (v1) URL'leri. Google'da dizinli/keşfedilmiş olabilecekleri
// kalıcı (308) yönlendirmeyle en yakın yeni sayfaya taşıyoruz.
const nearestSalary = (g) =>
  SALARY_PAGES.reduce((a, b) => (Math.abs(b - g) < Math.abs(a - g) ? b : a), SALARY_PAGES[0]);

// v1'de 300 000–2 000 000 arası her 5 000 kr için bir sayfa vardı.
const oldSalaryRedirects = [];
for (let g = 300000; g <= 2000000; g += 5000) {
  if (SALARY_PAGES.includes(g)) continue;
  oldSalaryRedirects.push({
    source: `/lonn/${salarySlug(g)}`,
    destination: `/lonn/${salarySlug(nearestSalary(g))}`,
    permanent: true,
  });
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      ...oldSalaryRedirects,
      { source: '/sporsmal/hvor-mye-er-:g(\\d+)-etter-skatt', destination: '/lonn/lonn-etter-skatt-:g-nok', permanent: true },
      { source: '/sporsmal', destination: '/blog', permanent: true },
      { source: '/sporsmal/:path*', destination: '/lonn', permanent: true },
      { source: '/yrke/:path*', destination: '/lonn', permanent: true },
      { source: '/sted/:path*', destination: '/lonn', permanent: true },
      { source: '/l/:path*', destination: '/lonn', permanent: true },
      { source: '/I/:path*', destination: '/lonn', permanent: true },
      { source: '/verktoy/:path+', destination: '/verktoy', permanent: true },
      { source: '/cookies', destination: '/personvern', permanent: true },
      { source: '/sparing', destination: '/blog/fradrag-du-ikke-ma-glemme-2026', permanent: true },
      { source: '/no', destination: '/', permanent: true },
      { source: '/sv', destination: '/', permanent: true },
    ];
  },
};

export default nextConfig;
