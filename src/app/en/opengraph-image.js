import { ogImage, ogSize } from '../../lib/og';

export const size = ogSize;
export const contentType = 'image/png';
export const alt = 'Norway Tax Calculator 2026';

export default function Image() {
  return ogImage({ kicker: 'Salary after tax in Norway', title: 'Norway Tax Calculator 2026', sub: 'Take-home pay per year and month' });
}
