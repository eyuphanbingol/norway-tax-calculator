import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req) {
  try {
    // API Anahtarı Kontrolü (Vercel'den çeker)
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API anahtarı eksik." }, { status: 500 });
    }

    const openai = new OpenAI({ apiKey: apiKey });
    const { mode, inputData } = await req.json();

    // Modlara göre Yapay Zeka Kişilikleri
    let systemPrompt = "";

    if (mode === 'budget') {
      systemPrompt = `Du er en streng, men hjelpsom økonomisk rådgiver i Norge. 
      Brukeren gir deg sine inntekter og utgifter. 
      Din jobb:
      1. Analyser budsjettet.
      2. Sammenlign med SIFO-budsjettet (norske standardtall).
      3. Gi 3 konkrete sparetips for Norge (f.eks. bytte strømleverandør, matbutikker, skattefradrag).
      Svar kort, strukturert og på norsk.`;
    } 
    else if (mode === 'rental') {
      systemPrompt = `Du er en ekspert eiendomsmegler og leie-assistent i Norge, spesielt Oslo og storbyene.
      Brukeren forteller om sitt budsjett og behov.
      Din jobb:
      1. Anbefal områder/bydeler som passer budsjettet.
      2. Advar om vanlige feller (fuktskader, depositumskonto, strøm inkludert?).
      3. Gi et estimat på hva de kan forvente å få for pengene.
      Svar på norsk.`;
    }
    else if (mode === 'nav') {
      systemPrompt = `Du er en ekspert på det norske velferdssystemet (NAV).
      Brukeren beskriver sin livssituasjon (f.eks. mistet jobb, fått barn, syk).
      Din jobb:
      1. List opp hvilke støtteordninger de sannsynligvis har krav på (Dagpenger, Foreldrepenger, AAP osv.).
      2. Forklar kort hva kravene er.
      3. Be dem alltid sjekke nav.no for endelig bekreftelse.
      Svar empatisk og tydelig på norsk.`;
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
    return NextResponse.json({ error: "Tjenesten er midlertidig utilgjengelig." }, { status: 500 });
  }
}