import { ImageResponse } from 'next/og';
import blogData from '../../../data/blog.json';

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }) {
  const resolvedParams = await params;
  const post = blogData.find((p) => p.slug === resolvedParams.slug);
  
  const title = post ? post.title : 'Skattebloggen';

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom, #0f172a, #005c45)', // Koyu ve Şık Tema
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
          textAlign: 'center',
        }}
      >
        {/* Marka */}
        <div style={{ 
          color: '#34d399', 
          fontSize: 30, 
          fontWeight: 'bold', 
          marginBottom: 40,
          textTransform: 'uppercase',
          letterSpacing: '4px'
        }}>
          Skattekalkulator Norge
        </div>

        {/* Makale Başlığı */}
        <div style={{ 
          fontSize: 70, 
          fontWeight: 'bold', 
          color: 'white', 
          lineHeight: 1.1,
          textShadow: '0 4px 10px rgba(0,0,0,0.5)',
        }}>
          {title}
        </div>

        {/* Alt Bilgi */}
        <div style={{ 
          marginTop: 50,
          fontSize: 24,
          color: '#cbd5e1',
          background: 'rgba(255,255,255,0.1)',
          padding: '10px 30px',
          borderRadius: '50px',
        }}>
          Les mer på skattekalkulator.com
        </div>
      </div>
    ),
    { ...size }
  );
}