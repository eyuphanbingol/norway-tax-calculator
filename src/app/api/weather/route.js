import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { lat, lon } = await req.json();

    // Yr.no (MET Norway) API Adresi
    const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`;

    const response = await fetch(url, {
      headers: {
        // YR.no kuralı: Kendi User-Agent'ını vermen şart (Yoksa engellerler)
        'User-Agent': 'Skattekalkulator.com contact@skattekalkulator.com',
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Meteoroloji servisine ulaşılamadı." }, { status: 500 });
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    return NextResponse.json({ error: "Sunucu hatası oluştu." }, { status: 500 });
  }
}