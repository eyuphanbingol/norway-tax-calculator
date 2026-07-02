import { SALARY_PAGES, salarySlug } from '../lib/tax';
import { articles } from '../data/articles';
import { DOMAIN } from '../lib/constants';

export default function sitemap() {
  const now = new Date();
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
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.75,
  }));
  return [...statics, ...salaries, ...blog];
}
