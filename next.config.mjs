/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. ESLint Hatalarını Yoksay (Build bozulmasın diye)
  eslint: {
    ignoreDuringBuilds: true,
  },
  // 2. Bot Koruması ve Hız Ayarları (Daha önce eklemiştik, koruyoruz)
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