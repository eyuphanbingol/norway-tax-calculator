'use client';
import { useEffect } from 'react';

// AdSense onayı gelene kadar ADS_ENABLED=false bırak.
// Onaydan sonra panelden reklam birimi oluştur, slot ID'lerini yaz, true yap.
const ADS_ENABLED = false;
const AD_CLIENT = 'ca-pub-2645631543067545';

const SLOTS = {
  header:  { slot: 'SLOT_ID_HEADER',  style: { display: 'block', minHeight: 90 },  format: 'auto' },
  content: { slot: 'SLOT_ID_CONTENT', style: { display: 'block', minHeight: 250 }, format: 'auto' },
};

export default function AdSlot({ type = 'content' }) {
  const cfg = SLOTS[type];
  useEffect(() => {
    if (!ADS_ENABLED || !cfg) return;
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch {}
  }, [cfg]);
  if (!ADS_ENABLED || !cfg) return null;
  return (
    <div className="w-full mx-auto my-8" role="region" aria-label="Annonse">
      <ins className="adsbygoogle" style={cfg.style}
        data-ad-client={AD_CLIENT} data-ad-slot={cfg.slot}
        data-ad-format={cfg.format} data-full-width-responsive="true" />
    </div>
  );
}
