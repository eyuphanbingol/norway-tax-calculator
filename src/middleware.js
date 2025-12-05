import { NextResponse } from 'next/server';

export function middleware(request) {
  const response = NextResponse.next();

  // Statik dosyalar ve görseller için uzun süreli önbellek (1 yıl)
  if (request.nextUrl.pathname.match(/\.(jpg|jpeg|gif|png|svg|ico|webp|js|css|woff2)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }

  // HTML sayfaları için kısa süreli önbellek (1 saat), sonra yeniden doğrula
  // Bu, sitenin hızlı açılmasını sağlar
  if (!request.nextUrl.pathname.match(/\./)) { // Uzantısı olmayanlar (sayfalar)
     response.headers.set('X-Frame-Options', 'DENY'); // Güvenlik
     response.headers.set('X-Content-Type-Options', 'nosniff');
  }

  return response;
}

export const config = {
  matcher: '/:path*',
};