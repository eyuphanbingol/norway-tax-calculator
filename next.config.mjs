/** @type {import('next').NextConfig} */
const nextConfig = {
  // Görüntü optimizasyonu için (Vercel faturasını şişirmesin diye unoptimized true yapabiliriz, 
  // ama şimdilik standart kalsın).
  
  async headers() {
    return [
      {
        // Tüm yollar için geçerli güvenlik ve önbellek ayarları
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      {
        // JSON Verisi ve Statik dosyalar için uzun süreli Cache
        source: '/data/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;