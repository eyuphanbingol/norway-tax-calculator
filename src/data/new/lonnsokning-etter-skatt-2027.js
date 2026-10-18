import { beregnSkatt, marginalskatt, fmt, pct, RATES_2026, RATES_2027_FORSLAG, MEDIAN_SALARY } from '../../lib/tax.js';

const LONNER = [500000, 600000, MEDIAN_SALARY, 750000, 900000, 1000000];
const OKNINGER = [0.03, 0.04, 0.05];

const navn = (g) => (g === MEDIAN_SALARY ? `${fmt(g)} (median)` : fmt(g));
const ny = (g, p) => Math.round(g * (1 + p));
const netto26 = (g) => beregnSkatt(g, RATES_2026).netto;
const netto27 = (g) => beregnSkatt(g, RATES_2027_FORSLAG).netto;
const gevinst = (g, p) => netto27(ny(g, p)) - netto26(g);

// Eksempel: medianlønn med 4 % lønnsøkning
const m = MEDIAN_SALARY;
const mNy = ny(m, 0.04);
const mBrutto = mNy - m;
const mNetto = gevinst(m, 0.04);
const mBareSkatt = netto27(m) - netto26(m);      // samme lønn, bare nye satser
const mFraLonn = mNetto - mBareSkatt;            // resten kommer fra lønnsøkningen

// 1 000 000 kr: trinn 4 i 2026, under trinn 4 i 2027
const t4_26 = RATES_2026.trinnskatt[3].over;
const t4_27 = RATES_2027_FORSLAG.trinnskatt[3].over;
const mill = 1000000;
const mill3 = ny(mill, 0.03);

// 750 000 kr: trinn 3 i 2026, under trinn 3 i 2027
const t3_26 = RATES_2026.trinnskatt[2].over;
const t3_27 = RATES_2027_FORSLAG.trinnskatt[2].over;

export default {
  slug: 'lonnsokning-etter-skatt-2027',
  title: 'Lønnsøkning i 2027: hva sitter du igjen med etter skatt?',
  description:
    'Hva er 3, 4 eller 5 prosent lønnsøkning verdt etter skatt i 2027? Utregnet med regjeringens forslag til skattesatser, med tabell for ulike lønnsnivåer og marginalskatt.',
  date: '2026-10-18',
  sources: [
    { name: 'Regjeringen: Skattesatser 2027 (forslag)', url: 'https://www.regjeringen.no/no/tema/okonomi-og-budsjett/skatter-og-avgifter/skatte-og-avgiftssatser/skattesatser-2027/id3173438/' },
    { name: 'Regjeringen: Statsbudsjettet 2027 – skatter og avgifter', url: 'https://www.regjeringen.no/no/statsbudsjett/2027/statsbudsjettet-2027-skatter-og-avgifter/id3173278/' },
    { name: 'Regjeringen: Prop. 1 LS (2026–2027)', url: 'https://www.regjeringen.no/no/dokumenter/prop.-1-ls-20262027/id3176120/' },
  ],
  body: [
    { type: 'p', text: 'Når lønnsoppgjøret er klart, er det første spørsmålet de fleste stiller: hvor mye mer får jeg faktisk på konto? Svaret avhenger av to ting i 2027. Lønnsøkningen din, og at skattereglene endres fra nyttår.' },
    { type: 'p', text: 'Regjeringen la 7. oktober 2026 fram forslag til statsbudsjett for 2027. Satsene er et forslag. Stortinget vedtar de endelige satsene i desember, og vi oppdaterer tallene her hvis de endres.' },

    { type: 'h2', text: 'Hva endres i skatten fra 2026 til 2027 (forslag)?' },
    { type: 'ul', items: [
      'Trygdeavgiften på lønn går ned fra 7,6 til 7,4 prosent.',
      'Personfradraget øker fra 114 540 til 120 180 kroner.',
      'Maksimalt minstefradrag øker fra 95 700 til 99 550 kroner.',
      `Alle innslagspunktene i trinnskatten flyttes opp. Trinn 3 starter på ${fmt(t3_27)} kroner (${fmt(t3_26)} i 2026), og trinn 4 på ${fmt(t4_27)} kroner (${fmt(t4_26)} i 2026).`,
      'Skattesatsen på alminnelig inntekt er uendret på 22 prosent.',
    ]},
    { type: 'p', text: 'Det betyr at du betaler litt mindre skatt i 2027 selv om lønnen står stille. Når du i tillegg får lønnsøkning, får du gevinsten fra begge deler. Vil du se skatten for 2027 på én bestemt lønn, bruk [skattekalkulatoren for 2027](/skattekalkulator-2027).' },

    { type: 'h2', text: 'Tabell: mer netto i 2027 med lønnsøkning' },
    { type: 'p', text: 'Tabellen viser hvor mye mer du sitter igjen med etter skatt i 2027 sammenlignet med nettolønnen din i 2026, hvis du får 3, 4 eller 5 prosent lønnsøkning fra 1. januar. Tallene er per år, med månedsbeløpet i parentes (årsbeløpet delt på 12).' },
    { type: 'table',
      head: ['Lønn 2026', 'Netto 2026', '+3 %', '+4 %', '+5 %'],
      rows: LONNER.map((g) => [
        navn(g),
        fmt(netto26(g)),
        ...OKNINGER.map((p) => `+${fmt(gevinst(g, p))} (+${fmt(gevinst(g, p) / 12)}/mnd)`),
      ]),
    },
    { type: 'p', text: 'Alle beløp i kroner. Netto 2026 er beregnet med 2026-satsene. Kolonnene for 2027 er beregnet med regjeringens forslag og ny lønn. Forskjellen inkluderer altså både lønnsøkningen og skatteendringene.' },

    { type: 'h2', text: 'Eksempel: medianlønn med 4 prosent' },
    { type: 'p', text: `Medianlønnen for heltidsansatte er ${fmt(m)} kroner i året (SSB). Med 4 prosent lønnsøkning blir lønnen ${fmt(mNy)} kroner i 2027, altså ${fmt(mBrutto)} kroner mer før skatt.` },
    { type: 'p', text: `Etter skatt sitter du igjen med ${fmt(mNetto)} kroner mer enn i 2026, eller rundt ${fmt(mNetto / 12)} kroner i måneden. Av dette skyldes ${fmt(mBareSkatt)} kroner skatteendringene alene. Det ville du fått selv uten lønnsøkning. De resterende ${fmt(mFraLonn)} kronene kommer fra selve lønnsøkningen.` },
    { type: 'p', text: `Med andre ord: av ${fmt(mBrutto)} kroner i lønnsøkning beholder du ${fmt(mFraLonn)}, eller ${pct(Math.round((mFraLonn / mBrutto) * 1000) / 10)} prosent. Resten går til skatt. Det henger sammen med marginalskatten.` },

    { type: 'h2', text: 'Marginalskatt 2026 og 2027' },
    { type: 'p', text: 'Marginalskatten er skatten på de neste kronene du tjener. Det er den som avgjør hvor mye av en lønnsøkning du beholder. Tabellen viser marginalskatten på dagens lønn med 2026-satsene, på samme lønn med 2027-forslaget og på lønnen etter 4 prosent økning med 2027-forslaget.' },
    { type: 'table',
      head: ['Lønn 2026', 'Marginalskatt 2026', '2027, samme lønn', '2027, +4 %'],
      rows: LONNER.map((g) => [
        navn(g),
        `${pct(marginalskatt(g, RATES_2026))} %`,
        `${pct(marginalskatt(g, RATES_2027_FORSLAG))} %`,
        `${pct(marginalskatt(ny(g, 0.04), RATES_2027_FORSLAG))} %`,
      ]),
    },
    { type: 'p', text: `Den lavere trygdeavgiften senker marginalskatten med 0,2 prosentpoeng for de aller fleste lønnstakere. For noen lønnsnivåer er utslaget mye større fordi innslagspunktene i trinnskatten flyttes opp.` },

    { type: 'h3', text: 'Hvorfor faller 1 000 000 kroner ut av trinn 4?' },
    { type: 'p', text: `I 2026 starter trinn 4 på ${fmt(t4_26)} kroner. En lønn på 1 000 000 kroner ligger over dette, og marginalskatten er ${pct(marginalskatt(mill, RATES_2026))} prosent. I forslaget for 2027 flyttes trinn 4 opp til ${fmt(t4_27)} kroner. Da ligger 1 000 000 kroner under, i trinn 3, og marginalskatten blir ${pct(marginalskatt(mill, RATES_2027_FORSLAG))} prosent.` },
    { type: 'p', text: `Men det gjelder bare hvis lønnen står stille. Med 3 prosent lønnsøkning blir lønnen ${fmt(mill3)} kroner, som er over det nye innslagspunktet. Da er marginalskatten tilbake på ${pct(marginalskatt(mill3, RATES_2027_FORSLAG))} prosent for de siste kronene. Det samme skjer rundt 750 000 kroner: trinn 3 flyttes fra ${fmt(t3_26)} til ${fmt(t3_27)} kroner, men 4 prosent lønnsøkning løfter lønnen over grensen igjen. Les mer om trinnene i [trinnskatt 2026](/blog/trinnskatt-2026) og [marginalskatt 2026](/blog/marginalskatt-2026).` },
    { type: 'p', text: 'Innslagspunktene justeres omtrent i takt med forventet lønnsvekst. Den som får en lønnsøkning på linje med andre, havner derfor ofte på samme trinn som før. Den som får mindre enn gjennomsnittet, kan rykke ned et trinn.' },

    { type: 'h2', text: 'Lønnsøkning gir aldri lavere netto' },
    { type: 'p', text: 'En vanlig myte er at en lønnsøkning kan «lønne seg dårlig» fordi du havner i et høyere skattetrinn. Det stemmer ikke. Trinnskatten er progressiv, så den høyere satsen gjelder bare kronene over innslagspunktet. Resten av lønnen skattes som før. Skattemessig får du alltid mer utbetalt totalt, selv om hver ekstra krone skattes hardere.' },

    { type: 'h2', text: 'Husk skattekortet og når økningen kommer' },
    { type: 'ul', items: [
      'Tabellen forutsetter at lønnsøkningen gjelder hele 2027. Mange får lønnsoppgjøret med virkning fra våren, ofte med etterbetaling. Da blir gevinsten for 2027 mindre enn i tabellen.',
      'Skattekortet for 2027 lages før lønnsoppgjøret er kjent. Med tabellkort øker trekket automatisk når lønnen går opp. Med prosentkort bør du oppdatere inntekten. Se [skattekort 2027](/blog/skattekort-2027).',
      'Får du lønnsøkning sent i 2026, sjekk at trekket i år holder. Se [unngå restskatt: sjekk trekket](/blog/unnga-restskatt-sjekk-trekket).',
      'Vil du regne på en lønn som ikke står i tabellen, bruk [skattekalkulatoren 2027](/skattekalkulator-2027) eller [månedslønn etter skatt](/manedslonn).',
    ]},

    { type: 'h2', text: 'Ofte stilte spørsmål' },
    { type: 'h3', text: 'Er satsene for 2027 bestemt?' },
    { type: 'p', text: 'Nei. Tallene bygger på regjeringens forslag i statsbudsjettet. Stortinget behandler budsjettet og vedtar skattesatsene i desember 2026. Endringer i budsjettforhandlingene kan gi andre tall.' },
    { type: 'h3', text: 'Hvorfor får jeg mer netto selv uten lønnsøkning?' },
    { type: 'p', text: 'Fordi personfradraget og minstefradraget øker, trygdeavgiften går ned og trinnskatten starter på høyere beløp. For de fleste lønnstakere betyr det noen tusen kroner mindre i skatt i året på samme lønn. Se [skattekalkulatoren 2027](/skattekalkulator-2027) for tabellen med samme lønn begge år.' },
    { type: 'h3', text: 'Holder lønnsøkningen følge med prisene?' },
    { type: 'p', text: 'Det kommer an på prisveksten. Tabellen viser kroner, ikke kjøpekraft. Er prisveksten høyere enn økningen i nettolønn, får du likevel mindre å rutte med.' },

    { type: 'p', text: 'Tallene er beregnet med skattekalkulatoren vår med 2026-satsene og regjeringens forslag til 2027-satser, og standard fradrag (minstefradrag og personfradrag). Andre fradrag og inntekter er ikke med.' },
  ],
};
