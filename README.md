# Skattekalkulator Norge — v2

Norveç 2026 vergi hesaplayıcısı. Next.js 15 + Tailwind 4.

## Deploy (Vercel)
1. Bu klasörü GitHub repo'na push'la (eski repo'nun içeriğini tamamen bununla değiştirebilirsin).
2. Vercel projesi zaten repo'ya bağlıysa otomatik deploy olur. Domain: skattekalkulator.com.

## Eski URL'ler (dizini korumak için)
`next.config.mjs` içinde eski sitenin adresleri kalıcı yönlendirmeyle yeni sayfalara gider:
eski maaş sayfaları (her 5 000 kr) → en yakın maaş sayfası, `/sporsmal/hvor-mye-er-X-etter-skatt` → ilgili maaş sayfası,
`/yrke`, `/sted`, `/l` → `/lonn`, `/verktoy*` → `/`, `/cookies` → `/personvern`.
Eski haber/kopya blog yazıları bilerek 404 bırakıldı (AdSense için zararlı içerik).
**Dizindeki bir slug'ı asla silme veya değiştirme.**

## Deploy SONRASI yapılacaklar (sırayla)
1. **Search Console:** sitemap'i yeniden gönder → https://skattekalkulator.com/sitemap.xml
   - "Sayfa dizine ekleme" raporunda *Bulunamadı (404)* ve *Yönlendirmeli sayfa* için "Düzeltmeyi doğrula"ya bas.
2. **Search Console → URL denetimi:** ana sayfa + 3-5 lonn sayfası için "Dizine eklenmesini iste".
3. **AdSense → Privacy & Messaging:** GDPR mesajı (Google CMP) oluştur ve YAYINLA. Norveç trafiği için zorunlu.
4. 1-2 hafta bekle, sonra AdSense'te "Yeniden gönder".

## AdSense onayı GELDİKTEN sonra
1. AdSense panelinde 2 reklam birimi oluştur (display).
2. `src/components/AdSlot.jsx` içinde SLOT_ID_HEADER ve SLOT_ID_CONTENT değerlerini gerçek ID'lerle değiştir.
3. Aynı dosyada `ADS_ENABLED = true` yap, push'la.

## İçerik büyütme
- Yeni makale eklemek için `src/data/articles.js` dosyasına yeni obje ekle — sayfa, sitemap ve blog listesi otomatik oluşur.
- Yeni maaş sayfası: `src/lib/tax.js` içindeki SALARY_PAGES listesine rakam ekle.
- **Aralık 2026 (Stortinget bütçeyi onaylayınca):** `src/lib/tax.js` içindeki `RATES_2027_FORSLAG` değerlerini kesinleşen rakamlarla kontrol et, `/skattekalkulator-2027` sayfasındaki "forslag" ifadelerini "vedtatt" yap.
- **Ocak 2027:** Ana hesaplayıcının varsayılan yılını 2027'ye çevir, 2026 sayfalarını koru (URL'leri değiştirme).

## Doğrulama
Vergi motoru resmi kontrol rakamıyla test edildi: 600.000 kr brüt → 12.835 kr trinnskatt (SNL/Skatteetaten 2026). 
