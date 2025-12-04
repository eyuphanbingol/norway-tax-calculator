import { ImageResponse } from 'next/og';

// İkon Boyutu
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// Favicon Oluşturucu
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          background: '#10b981', // Emerald-500
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '8px', // Hafif yuvarlak köşe
          fontWeight: 'bold',
        }}
      >
        kr
      </div>
    ),
    { ...size }
  );
}