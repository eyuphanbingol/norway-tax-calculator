import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      console.error("API Anahtarı Vercel'de bulunamadı!");
      return NextResponse.json({ error: "Sunucu yapılandırma hatası: API Key eksik." }, { status: 500 });
    }

    // OpenAI'yı sadece istek geldiğinde başlatıyoruz (Daha güvenli)
    const openai = new OpenAI({ apiKey: apiKey });
    
    const body = await req.json();
    const { mode, inputData } = body;

    if (!inputData) {
       return NextResponse.json({ error: "Lütfen bir durum yazın." }, { status: 400 });
    }

    let systemPrompt = "Du er en hjelpsom assistent.";

    if (mode === 'budget') {
      systemPrompt = `Du er en streng økonomisk rådgiver i Norge. Analyser brukerens budsjett, sammenlign med SIFO-tall, og gi 3 konkrete sparetips. Svar på norsk.`;
    } 
    else if (mode === 'rental') {
      systemPrompt = `Du er en eiendomsmegler i Norge. Gi råd om områder og leiepriser basert på brukerens budsjett. Svar på norsk.`;
    }
    else if (mode === 'nav') {
      systemPrompt = `Du er en NAV-ekspert. List opp hvilke støtteordninger brukeren kan ha krav på basert på situasjonen. Svar på norsk.`;
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: inputData },
      ],
    });

    return NextResponse.json({ result: completion.choices[0].message.content });

  } catch (error) {
    console.error("AI Hatası:", error);
    return NextResponse.json({ error: "AI servisinde hata oluştu. Lütfen tekrar deneyin." }, { status: 500 });
  }
}