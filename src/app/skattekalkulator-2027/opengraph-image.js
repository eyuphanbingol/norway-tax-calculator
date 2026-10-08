import { ogImage, ogSize } from '../../lib/og';

export const size = ogSize;
export const contentType = 'image/png';
export const alt = 'Skattekalkulator 2027';

export default function Image() {
  return ogImage({ kicker: 'Statsbudsjettet 2027', title: 'Skattekalkulator 2027', sub: 'Se hvor mye mindre skatt du betaler neste år' });
}
