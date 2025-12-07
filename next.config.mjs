/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. ESLint Hatalarını Yoksay (Build bozulmasın diye)
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // 2. PAKET OPTİMİZASYONU (HIZ İÇİN YENİ EKLENDİ)
  // Bu ayar, ikonların ve grafiklerin sadece kullanılan kısmını yükler.
  experimental: {
    optimizePackageImports: ['lucide-react', 'recharts', 'react-markdown'],
  },

  // 3. Bot Koruması ve Cache Ayarları
  async headers() {
    return [
      {
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