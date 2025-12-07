import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// API Key'ini ortam değişkeninden alıyoruz (Güvenli Yöntem)
// Artık kodun içinde şifre görünmüyor.
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

export async function POST(req) {
  try {
    const { job, experience, currentSalary } = await req.json();

    const prompt = `
    Du er en ekspert karriererådgiver i Norge. 
    En bruker trenger hjelp til å skrive en profesjonell e-post for å be om lønnsforhandling.
    
    Brukerens info:
    - Yrke: ${job}
    - Erfaring: ${experience} år
    - Nåværende lønn: ${currentSalary} NOK
    
    Skriv et overbevisende, høflig og profesjonelt utkast til en e-post (på norsk bokmål) som de kan sende til sjefen sin. 
    Teksten skal være selvsikker, men ydmyk, og fokusere på markedsverdi og prestasjoner.
    Ikke skriv noen innledning, bare selve e-postteksten.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful Norwegian career coach." },
        { role: "user", content: prompt },
      ],
    });

    return NextResponse.json({ result: completion.choices[0].message.content });

  } catch (error) {
    console.error("OpenAI Hatası:", error);
    return NextResponse.json({ error: "Noe gikk galt med AI-en." }, { status: 500 });
  }
}