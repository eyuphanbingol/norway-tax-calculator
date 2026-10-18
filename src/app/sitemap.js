import { SALARY_PAGES_INDEXED, salarySlug } from '../lib/tax';
import { guidesEn } from '../data/guides-en';
import { articles } from '../data/articles';
import { DOMAIN } from '../lib/constants';

// Sabit tarih: her deploy'da lastmod değişmesin (Google güvenini korur).
// İçerik gerçekten güncellendiğinde bu tarihi elle ileri al.
const SITE_UPDATED = new Date('2026-10-18');

export default function sitemap() {
  const now = SITE_UPDATED;
  const statics = [
    '', '/skattekalkulator-2027', '/verktoy', '/lonn', '/manedslonn', '/timelonn-etter-skatt', '/pensjon-etter-skatt',
    '/feriepenger-kalkulator', '/reisefradrag-kalkulator', '/blog',
    '/en', '/en/paye-scheme-norway', '/en/salary-after-tax', '/om-oss', '/kontakt', '/personvern',
  ].map((r) => ({
    url: `${DOMAIN}${r}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: r === '' ? 1 : 0.7,
  }));
  const salaries = SALARY_PAGES_INDEXED.map((g) => ({
    url: `${DOMAIN}/lonn/${salarySlug(g)}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));
  const blog = articles.map((a) => ({
    url: `${DOMAIN}/blog/${a.slug}`,
    lastModified: new Date(a.updated || a.date),
    changeFrequency: 'monthly',
    priority: 0.75,
  }));
  const en = [
    ...guidesEn.map((x) => `/en/guides/${x.slug}`),
  ].map((r) => ({ url: `${DOMAIN}${r}`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 }));
  return [...statics, ...salaries, ...blog, ...en];
}
