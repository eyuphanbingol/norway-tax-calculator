import { ogImage, ogSize } from '../lib/og';

export const size = ogSize;
export const contentType = 'image/png';
export const alt = 'Skattekalkulator 2026 – lønn etter skatt';

export default function Image() {
  return ogImage({ kicker: 'Lønn etter skatt', title: 'Skattekalkulator 2026', sub: 'Se hva du får utbetalt per år og måned' });
}
