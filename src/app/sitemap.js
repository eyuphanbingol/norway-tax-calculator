import { SALARY_PAGES, salarySlug, MONTHLY_PAGES, monthlySlug, EN_SALARY_PAGES, enSalarySlug } from '../lib/tax';
import { guidesEn } from '../data/guides-en';
import { articles } from '../data/articles';
import { DOMAIN } from '../lib/constants';

// Sabit tarih: her deploy'da lastmod değişmesin (Google güvenini korur).
// İçerik gerçekten güncellendiğinde bu tarihi elle ileri al.
const SITE_UPDATED = new Date('2026-10-08');

export default function sitemap() {
  const now = SITE_UPDATED;
  const statics = [
    '', '/skattekalkulator-2027', '/verktoy', '/lonn', '/manedslonn', '/timelonn-etter-skatt', '/pensjon-etter-skatt',
    '/feriepenger-kalkulator', '/reisefradrag-kalkulator', '/del-kalkulatoren', '/blog',
    '/en', '/en/paye-scheme-norway', '/en/salary-after-tax', '/om-oss', '/kontakt', '/personvern',
  ].map((r) => ({
    url: `${DOMAIN}${r}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: r === '' ? 1 : 0.7,
  }));
  const salaries = SALARY_PAGES.map((g) => ({
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
  const monthly = MONTHLY_PAGES.map((m) => ({
    url: `${DOMAIN}/manedslonn/${monthlySlug(m)}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));
  const en = [
    ...EN_SALARY_PAGES.map((g) => `/en/salary-after-tax/${enSalarySlug(g)}`),
    ...guidesEn.map((x) => `/en/guides/${x.slug}`),
  ].map((r) => ({ url: `${DOMAIN}${r}`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 }));
  return [...statics, ...salaries, ...monthly, ...blog, ...en];
}
