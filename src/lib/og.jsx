import { ImageResponse } from 'next/og';

// Delingsbilde (1200×630) for Facebook, Messenger, WhatsApp m.fl.
export const ogSize = { width: 1200, height: 630 };

export function ogImage({ kicker, title, big, sub }) {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#10394e', color: '#fff', padding: '64px 72px', fontFamily: 'sans-serif' }}>
        <div style={{ display: 'flex', fontSize: 34, fontWeight: 700 }}>
          skatte<span style={{ color: '#d9a441' }}>kalkulator</span>.com
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {kicker && <div style={{ fontSize: 30, color: '#d9a441', marginBottom: 12 }}>{kicker}</div>}
          <div style={{ fontSize: 60, fontWeight: 800, lineHeight: 1.1 }}>{title}</div>
          {big && <div style={{ fontSize: 96, fontWeight: 800, color: '#5fd39b', marginTop: 18 }}>{big}</div>}
          {sub && <div style={{ fontSize: 32, color: 'rgba(255,255,255,0.8)', marginTop: 8 }}>{sub}</div>}
        </div>
        <div style={{ display: 'flex', fontSize: 24, color: 'rgba(255,255,255,0.6)' }}>Gratis skattekalkulator · oppdatert med 2026-satser</div>
      </div>
    ),
    ogSize,
  );
}
