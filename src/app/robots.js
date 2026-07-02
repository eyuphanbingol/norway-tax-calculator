import { DOMAIN } from '../lib/constants';

export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${DOMAIN}/sitemap.xml`,
  };
}
