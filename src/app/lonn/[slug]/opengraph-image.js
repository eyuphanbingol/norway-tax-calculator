import { ogImage, ogSize } from '../../../lib/og';
import { beregnSkatt, fmt, slugToSalary } from '../../../lib/tax';

export const size = ogSize;
export const contentType = 'image/png';
export const alt = 'Lønn etter skatt 2026';

export default async function Image({ params }) {
  const { slug } = await params;
  const g = slugToSalary(slug) || 600000;
  const r = beregnSkatt(g);
  return ogImage({
    kicker: 'Lønn etter skatt 2026',
    title: `${fmt(g)} kr i årslønn`,
    big: `${fmt(r.netto)} kr`,
    sub: `utbetalt · ca. ${fmt(r.nettoMnd)} kr/mnd`,
  });
}
