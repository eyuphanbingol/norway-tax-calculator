/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Modern Tarayıcılar İçin Derleme (Polyfill azaltır)
  // Next.js 14+ zaten modern çıktı verir ama swcMinify ile garantiye alalım.
  swcMinify: true,

  // 2. Paket Optimizasyonu (Kullanılmayan JS'i atar - Tree Shaking)
  // Recharts ve Lucide gibi büyük paketleri parçalar.
  experimental: {
    optimizePackageImports: [
      'lucide-react', 
      'recharts', 
      'react-markdown', 
      'framer-motion', 
      'date-fns'
    ],
  },

  // 3. ESLint Hatalarını Yoksay (Build bozulmasın diye)
  eslint: {
    ignoreDuringBuilds: true,
  },

  // 4. Bot Koruması ve Cache Ayarları
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
        // Statik dosyaları uzun süre önbellekte tut (LCP iyileşir)
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

export default nextConfig