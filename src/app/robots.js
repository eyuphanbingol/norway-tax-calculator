export default function robots() {
  // Pazar günü domain alınca burayı güncelle: https://seninsiten.com
  const baseUrl = 'https://skattekalkulator.com/'; 

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/', // (Varsa gizli klasörler, şu an yok ama kalsın)
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}