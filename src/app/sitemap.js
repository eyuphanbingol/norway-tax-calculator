import { SALARY_PAGES, salarySlug } from '../lib/tax';
import { articles } from '../data/articles';
import { DOMAIN } from '../lib/constants';

// Sabit tarih: her deploy'da lastmod değişmesin (Google güvenini korur).
// İçerik gerçekten güncellendiğinde bu tarihi elle ileri al.
const SITE_UPDATED = new Date('2026-10-08');

export default function sitemap() {
  const now = SITE_UPDATED;
  const statics = ['', '/lonn', '/blog', '/om-oss', '/kontakt', '/personvern'].map((r) => ({
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
  return [...statics, ...salaries, ...blog];
}
