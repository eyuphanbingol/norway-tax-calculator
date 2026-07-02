// ===================================================================
// NORSK SKATTEMOTOR 2026 (lønnsmottaker, standard fradrag)
// Kilder: Stortingets skattevedtak 2026 (vedtatt 22.12.2025),
// Skatteetaten forskuddsutskrivingen 2026.
// Kontrollpunkt: 600 000 kr brutto gir 12 835 kr trinnskatt (SNL 2026). ✓
// ===================================================================

export const YEAR = 2026;

export const RATES_2026 = {
  alminnelig: 0.22,            // skatt på alminnelig inntekt
  trygdeavgift: 0.076,         // lønnsinntekt (redusert fra 7,7 % i 2025)
  trygdeFrikort: 100000,       // frikortgrense
  minstefradragSats: 0.46,
  minstefradragMaks: 95700,
  personfradrag: 114540,
  trinnskatt: [
    { over: 226100, sats: 0.017 },
    { over: 318300, sats: 0.04 },
    { over: 725050, sats: 0.137 },
    { over: 980100, sats: 0.168 },
    { over: 1467200, sats: 0.178 },
  ],
};

export function beregnTrinnskatt(gross, r = RATES_2026) {
  let sum = 0;
  const t = r.trinnskatt;
  for (let i = 0; i < t.length; i++) {
    const from = t[i].over;
    const to = i + 1 < t.length ? t[i + 1].over : Infinity;
    if (gross > from) sum += (Math.min(gross, to) - from) * t[i].sats;
  }
  return sum;
}

export function beregnTrygdeavgift(gross, r = RATES_2026) {
  if (gross <= r.trygdeFrikort) return 0;
  // Avgiften skal ikke overstige 25 % av inntekt over frikortgrensen
  return Math.min(gross * r.trygdeavgift, (gross - r.trygdeFrikort) * 0.25);
}

export function beregnSkatt(gross, r = RATES_2026) {
  const minstefradrag = Math.min(gross * r.minstefradragSats, r.minstefradragMaks);
  const grunnlag = Math.max(0, gross - minstefradrag - r.personfradrag);
  const inntektsskatt = grunnlag * r.alminnelig;
  const trygdeavgift = beregnTrygdeavgift(gross, r);
  const trinnskatt = beregnTrinnskatt(gross, r);
  const totalSkatt = Math.round(inntektsskatt + trygdeavgift + trinnskatt);
  const netto = gross - totalSkatt;
  return {
    gross,
    minstefradrag: Math.round(minstefradrag),
    grunnlag: Math.round(grunnlag),
    inntektsskatt: Math.round(inntektsskatt),
    trygdeavgift: Math.round(trygdeavgift),
    trinnskatt: Math.round(trinnskatt),
    totalSkatt,
    netto,
    nettoMnd: Math.round(netto / 12),
    skattProsent: gross > 0 ? Math.round((totalSkatt / gross) * 1000) / 10 : 0,
  };
}

// Marginalskatt: hva sitter du igjen med av neste tusenlapp?
export function marginalskatt(gross, r = RATES_2026) {
  const a = beregnSkatt(gross, r).totalSkatt;
  const b = beregnSkatt(gross + 1000, r).totalSkatt;
  return Math.round(((b - a) / 1000) * 1000) / 10;
}

export function hvilketTrinn(gross, r = RATES_2026) {
  let trinn = 0;
  r.trinnskatt.forEach((t, i) => { if (gross > t.over) trinn = i + 1; });
  return trinn;
}

export const fmt = (n) =>
  new Intl.NumberFormat('nb-NO', { maximumFractionDigits: 0 }).format(Math.round(n));

// ===================================================================
// DIZINLENEN MAAŞ SAYFALARI — az sayıda, gerçekten aranan rakamlar.
// Slug formatı eski siteyle birebir aynı (dizindeki sayfalar korunur).
// ===================================================================
const range = (a, b, s) => { const o = []; for (let v = a; v <= b; v += s) o.push(v); return o; };

export const SALARY_PAGES = [
  ...range(300000, 1000000, 50000),
  425000, 475000, 525000, 575000, 625000, 675000, 725000, 775000,
  1100000, 1200000, 1500000, 2000000,
].sort((a, b) => a - b);

export const salarySlug = (g) => `lonn-etter-skatt-${g}-nok`;
export const slugToSalary = (slug) => {
  const m = slug.match(/^lonn-etter-skatt-(\d+)-nok$/);
  return m ? parseInt(m[1], 10) : null;
};

// Gjennomsnittlig årslønn i Norge (SSB, ca. 2025-nivå) — brukes til sammenligning
export const AVG_SALARY = 695000;
