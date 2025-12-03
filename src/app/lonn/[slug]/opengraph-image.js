import { ImageResponse } from 'next/og';
import salaryData from '../../../data/data.json';

// Resim Boyutları (Standart OG)
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image({ params }) {
  // Slug'dan veriyi bul
  const resolvedParams = await params;
  const data = salaryData.find((d) => d.slug === resolvedParams.slug);
  
  // Veri yoksa varsayılan metin
  const salaryText = data ? `${data.gross_yearly.toLocaleString()} NOK` : 'Skattekalkulator';
  const netText = data ? `Utbetalt: ${data.net_yearly.toLocaleString()} kr` : 'Beregning 2025';

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #064e3b, #10b981)', // Koyu yeşilden açığa
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          {/* Üst Başlık */}
          <div style={{ fontSize: 30, marginBottom: 20, opacity: 0.9 }}>LØNN ETTER SKATT 2025</div>
          
          {/* Ana Maaş Rakamı */}
          <div style={{ fontSize: 90, fontWeight: 'bold', marginBottom: 20, textShadow: '0 4px 8px rgba(0,0,0,0.2)' }}>
            {salaryText}
          </div>

          {/* Alt Bilgi Kutusu */}
          <div style={{ 
            backgroundColor: 'rgba(255,255,255,0.2)', 
            padding: '10px 40px', 
            borderRadius: 20, 
            fontSize: 40,
            display: 'flex'
          }}>
            {netText}
          </div>
        </div>
        
        {/* Marka Adı (En Altta) */}
        <div style={{ position: 'absolute', bottom: 40, fontSize: 24, opacity: 0.8 }}>
          skattekalkulator.com
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}