import { ogImage, ogSize } from '../../../lib/og';
import { beregnSkatt, fmt, slugToMonthly } from '../../../lib/tax';

export const size = ogSize;
export const contentType = 'image/png';
export const alt = 'Månedslønn etter skatt 2026';

export default async function Image({ params }) {
  const { slug } = await params;
  const m = slugToMonthly(slug) || 50000;
  const r = beregnSkatt(m * 12);
  return ogImage({
    kicker: 'Månedslønn etter skatt 2026',
    title: `${fmt(m)} kr i måneden`,
    big: `ca. ${fmt(r.nettoMnd)} kr`,
    sub: 'utbetalt i snitt per måned',
  });
}
