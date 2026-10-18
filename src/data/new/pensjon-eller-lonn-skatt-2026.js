import { beregnSkatt, beregnPensjonsskatt, fmt, pct } from '../../lib/tax.js';

const nivaer = [200000, 250000, 300000, 350000, 400000, 450000, 500000, 600000, 800000];
const marginNivaer = [300000, 350000, 400000, 500000, 600000];

const L = (g) => beregnSkatt(g);
const P = (g) => beregnPensjonsskatt(g);
// Effektiv marginalskatt på pensjon: skatteøkning for de neste 1 000 kronene
const margPensjon = (g) => (P(g + 1000).totalSkatt - P(g).totalSkatt) / 10;
const fmtPst = (x) => pct(Math.round(x * 10) / 10);

const l300 = L(300000);
const p300 = P(300000);
const l350 = L(350000);
const p350 = P(350000);
const l800 = L(800000);
const p800 = P(800000);
const p250 = P(250000);
const l250 = L(250000);

export default {
  slug: 'pensjon-eller-lonn-skatt-2026',
  title: 'Pensjon eller lønn: hvorfor skatten blir ulik i 2026',
  description:
    'Samme beløp, ulik skatt: Se skatten på 200 000–800 000 kr i lønn og i alderspensjon i 2026, og hvorfor marginalskatten kan nå 50 % for pensjonister.',
  date: '2026-10-18',
  sources: [
    {
      name: 'Regjeringen: Endringer i lover og regler fra 1. juli 2026 fra Finansdepartementet',
      url: 'https://www.regjeringen.no/no/aktuelt/endringer-i-lover-og-regler-fra-1.-juli-2026-fra-finansdepartementet/id3167341/',
    },
    {
      name: 'Lovdata: Stortingets skattevedtak for inntektsåret 2026',
      url: 'https://lovdata.no/dokument/STV/forskrift/2025-12-18-2747',
    },
    {
      name: 'Regjeringen: Endringer i lover og regler fra 1. januar 2026',
      url: 'https://www.regjeringen.no/no/dokument/lover_regler/endringer-i-lover-og-regler/endringer-i-lover-og-regler-fra-1.-januar-2026/id3141571/',
    },
    {
      name: 'Skatteetaten: Hvordan finne ut om jeg har fått utnyttet maksimalt skattefradrag?',
      url: 'https://www.skatteetaten.no/person/skatt/hjelp-til-riktig-skatt/arbeid-trygd-og-pensjon/pensjon-og-uforetrygd/ektefeller-med-lav-pensjon/hvordan-finne-ut-om-ektefellen-med-lav-pensjon-har-fatt-utnyttet-maksimalt-skattefradrag/',
    },
    {
      name: 'KLP: Skatt og utbetaling av pensjon i desember',
      url: 'https://www.klp.no/artikler/skatt-og-utbetaling-av-pensjon-i-desember',
    },
  ],
  body: [
    {
      type: 'p',
      text: `To personer får 300 000 kroner hver i 2026. Den ene har det som lønn, den andre som alderspensjon. Lønnstakeren betaler ${fmt(l300.totalSkatt)} kr i skatt. Pensjonisten betaler ${fmt(p300.totalSkatt)} kr. Forskjellen er ${fmt(l300.totalSkatt - p300.totalSkatt)} kr – for nøyaktig samme beløp.`,
    },
    {
      type: 'p',
      text: 'Pensjon og lønn skattlegges etter de samme grunnreglene, men med tre viktige forskjeller. Her forklarer vi hvilke, viser hva de betyr i kroner, og hvorfor enkelte pensjonister faktisk har høyere marginalskatt enn de fleste arbeidstakere.',
    },

    { type: 'h2', text: 'Tre forskjeller mellom skatt på lønn og pensjon' },
    {
      type: 'ul',
      items: [
        'Trygdeavgift: 5,1 prosent på pensjon mot 7,6 prosent på lønn i 2026.',
        'Minstefradrag: 40 prosent av pensjonen, maks 75 400 kr. For lønn er det 46 prosent, maks 95 700 kr. Her kommer pensjonisten altså dårligere ut.',
        'Skattefradrag for pensjonsinntekt: inntil 39 100 kr trekkes direkte fra skatten. Dette fradraget finnes ikke for lønn, og det er hovedgrunnen til at lave pensjoner er skattefrie.',
      ],
    },
    {
      type: 'p',
      text: 'Resten er likt: 22 prosent skatt på alminnelig inntekt, personfradrag på 114 540 kr og samme trinnskatt. Trinnskatten beregnes av brutto inntekt, enten den er lønn eller pensjon.',
    },

    { type: 'h2', text: 'Skattefradraget for pensjonsinntekt ble endret i 2026' },
    {
      type: 'p',
      text: 'I det opprinnelige statsbudsjettet for 2026 var maksimalt skattefradrag 37 100 kr. Etter behandlingen av revidert nasjonalbudsjett i juni 2026 ble fradraget økt til 39 100 kr. Samtidig ble innslagspunktene for nedtrappingen hevet, og satsen i første trinn ble økt. Endringen gjelder fra 1. januar 2026, altså for hele inntektsåret.',
    },
    {
      type: 'table',
      head: ['Skattefradrag for pensjonsinntekt 2026', 'Sats/beløp'],
      rows: [
        ['Maksimalt fradrag', '39 100 kr'],
        ['Nedtrapping trinn 1', '19,1 % av pensjon over 294 200 kr'],
        ['Nedtrapping trinn 2', '6 % av pensjon over 437 100 kr'],
      ],
    },
    {
      type: 'p',
      text: 'Fradraget kan ikke bli større enn skatten du ellers skulle betalt, og det som ikke blir brukt, går tapt. Fullt fradrag forutsetter at du har hatt full alderspensjon hele året. Har du tatt ut pensjon bare en del av året, reduseres fradraget forholdsmessig etter antall måneder. Tar du ut gradert pensjon, for eksempel 50 prosent, reduseres beløpsgrensene i forhold til pensjonsgraden.',
    },

    { type: 'h2', text: 'Samme beløp – lønn og pensjon side om side' },
    {
      type: 'p',
      text: 'Tabellen viser samlet skatt for 2026 når hele inntekten er enten lønn eller alderspensjon, med full pensjon hele året og bare standardfradrag.',
    },
    {
      type: 'table',
      head: ['Brutto per år', 'Skatt på lønn', 'Netto lønn', 'Skatt på pensjon', 'Netto pensjon', 'Forskjell i skatt'],
      rows: nivaer.map((g) => {
        const l = L(g);
        const p = P(g);
        return [
          `${fmt(g)} kr`,
          `${fmt(l.totalSkatt)} kr (${pct(l.skattProsent)} %)`,
          `${fmt(l.netto)} kr`,
          `${fmt(p.totalSkatt)} kr (${pct(p.skattProsent)} %)`,
          `${fmt(p.netto)} kr`,
          `${fmt(l.totalSkatt - p.totalSkatt)} kr`,
        ];
      }),
    },
    {
      type: 'p',
      text: `Tre ting skiller seg ut. For det første betaler en pensjonist med 250 000 kr ingen skatt, mens en arbeidstaker med samme beløp betaler ${fmt(l250.totalSkatt)} kr. Skattefradraget på ${fmt(p250.skattefradrag)} kr dekker hele skatten på pensjonen.`,
    },
    {
      type: 'p',
      text: `For det andre er forskjellen størst rundt 300 000 kr og krymper deretter raskt. Ved 350 000 kr er gapet ${fmt(l350.totalSkatt - p350.totalSkatt)} kr, fordi skattefradraget allerede er trappet ned til ${fmt(p350.skattefradrag)} kr.`,
    },
    {
      type: 'p',
      text: `For det tredje er pensjon fortsatt gunstigere ved høye beløp, selv når skattefradraget er borte. Ved 800 000 kr betaler pensjonisten ${fmt(l800.totalSkatt - p800.totalSkatt)} kr mindre. Det skyldes den lavere trygdeavgiften, som veier tyngre enn det lavere minstefradraget.`,
    },

    { type: 'h2', text: 'Regnestykket for 350 000 kr i pensjon' },
    {
      type: 'ul',
      items: [
        `Minstefradrag: 40 % av 350 000 er 140 000, men maks er ${fmt(p350.minstefradrag)} kr`,
        `Skatt på alminnelig inntekt (22 % etter minstefradrag og personfradrag): ${fmt(p350.inntektsskatt)} kr`,
        `Trygdeavgift (5,1 %): ${fmt(p350.trygdeavgift)} kr`,
        `Trinnskatt: ${fmt(p350.trinnskatt)} kr`,
        `Skattefradrag for pensjonsinntekt: 39 100 − 19,1 % × (350 000 − 294 200) = ${fmt(p350.skattefradrag)} kr`,
        `Skatt å betale: ${fmt(p350.totalSkatt)} kr, netto ${fmt(p350.netto)} kr (${fmt(p350.nettoMnd)} kr i snitt per måned)`,
      ],
    },

    { type: 'h2', text: 'Nedtrappingssonen: når pensjonisten har høyest marginalskatt' },
    {
      type: 'p',
      text: 'Gjennomsnittsskatten er lav for de fleste pensjonister. Marginalskatten – skatten på den neste kronen – kan derimot være overraskende høy. Grunnen er nedtrappingen av skattefradraget. Mellom 294 200 og 437 100 kr mister du 19,1 øre av fradraget for hver ekstra krone i pensjon. Det kommer på toppen av 22 prosent inntektsskatt, 5,1 prosent trygdeavgift og trinnskatt.',
    },
    {
      type: 'p',
      text: 'Vi har regnet ut den effektive marginalskatten ved å se hvor mye skatten øker når pensjonen øker med 1 000 kr. Til sammenligning viser tabellen marginalskatten på lønn på samme nivå, beregnet på samme måte.',
    },
    {
      type: 'table',
      head: ['Inntekt', 'Marginalskatt pensjon', 'Marginalskatt lønn'],
      rows: marginNivaer.map((g) => [
        `${fmt(g)} kr`,
        `${fmtPst(margPensjon(g))} %`,
        `${fmtPst((L(g + 1000).totalSkatt - L(g).totalSkatt) / 10)} %`,
      ]),
    },
    {
      type: 'p',
      text: `Mellom 318 300 og 437 100 kr er marginalskatten på pensjon ${fmtPst(margPensjon(350000))} prosent. Det er høyere enn den høyeste marginalskatten på lønn, som er 47,4 prosent. Over 437 100 kr faller nedtrappingssatsen til 6 prosent, og marginalskatten på pensjon synker til ${fmtPst(margPensjon(500000))} prosent. Når fradraget er helt borte, er marginalskatten 22 + 5,1 prosent pluss trinnskatt.`,
    },
    {
      type: 'p',
      text: 'Den høye marginalskatten betyr ikke at det lønner seg å ha lavere pensjon. Du beholder fortsatt rundt halvparten av hver ekstra krone. Men den er nyttig å kjenne til når du vurderer for eksempel uttak av privat pensjon eller fordeling av utbetalinger mellom år.',
    },

    { type: 'h2', text: 'Pensjon og deltidsjobb samtidig' },
    {
      type: 'p',
      text: 'Mange jobber litt ved siden av alderspensjonen. Skattefradraget for pensjonsinntekt beregnes bare ut fra pensjonsinntekten. Ifølge Skatteetaten inngår ikke arbeidsinntekt, kapitalinntekt, fradrag eller formue i grunnlaget. Lønn fra en deltidsjobb trapper altså ikke ned pensjonsfradraget.',
    },
    {
      type: 'p',
      text: 'Lønnen skattlegges likevel som lønn, med 7,6 prosent trygdeavgift. Trinnskatten beregnes av summen av lønn og pensjon, så lønnen kan skyve deg opp i et høyere trinn. Kombinasjonen gir et mer sammensatt regnestykke enn tabellene over viser, og kalkulatorene våre gir bare et anslag i slike tilfeller. Sjekk skattekortet ditt hos Skatteetaten når du begynner å jobbe ved siden av pensjonen.',
    },

    { type: 'h2', text: 'Skattekort og skattetrekk for pensjonister' },
    {
      type: 'p',
      text: 'Pensjonister får skattekort på samme måte som arbeidstakere. Skatteetaten beregner trekket, og pensjonsutbetaleren – for eksempel Nav eller en pensjonskasse som KLP – får skattekortet fra Skatteetaten. Mangler utbetaleren skattekortet, kan det bli trukket en høy standardsats. KLP bruker for eksempel 30 prosent på alderspensjon, AFP og etterlattepensjon.',
    },
    {
      type: 'p',
      text: 'Trekkmånedene er ikke de samme som for lønn. Ifølge KLP er det vanlig skattetrekk på alderspensjon, AFP og etterlattepensjon i juni, mens det ikke trekkes skatt i desember. For lønn er det normalt motsatt: ingen trekk i juni og halvt trekk i desember. Les mer om lønnstrekket i artikkelen om [halv skatt i desember](/blog/halv-skatt-i-desember-2026).',
    },
    {
      type: 'p',
      text: 'Fordi økningen i skattefradraget ble vedtatt midt i året, er det lurt å sjekke at skattekortet og trekket for 2026 stemmer med pensjonen du faktisk får. Avvik rettes uansett opp i [skatteoppgjøret](/blog/skatteoppgjor-og-restskatt-2026).',
    },

    { type: 'h2', text: 'Ofte stilte spørsmål' },
    { type: 'h3', text: 'Hvorfor betaler pensjonister mindre skatt enn arbeidstakere?' },
    {
      type: 'p',
      text: 'Først og fremst på grunn av skattefradraget for pensjonsinntekt på inntil 39 100 kr, og fordi trygdeavgiften er 5,1 prosent i stedet for 7,6 prosent. Minstefradraget er lavere for pensjon, men det veier mindre.',
    },
    { type: 'h3', text: 'Hvor stor pensjon kan jeg ha uten å betale skatt i 2026?' },
    {
      type: 'p',
      text: `Med full alderspensjon hele året og bare standardfradrag betaler du ingen skatt på 250 000 kr, men ${fmt(p300.totalSkatt)} kr på 300 000 kr. Skattefri grense ligger altså et sted mellom disse beløpene. Bruk [pensjonskalkulatoren](/pensjon-etter-skatt) for å se ditt eget tall.`,
    },
    { type: 'h3', text: 'Får jeg fullt skattefradrag hvis jeg gikk av med pensjon i år?' },
    {
      type: 'p',
      text: 'Nei. Fradraget reduseres forholdsmessig etter hvor mange måneder du har mottatt pensjon. Har du hatt lønn første del av året, blir skatten for 2026 en blanding av reglene for lønn og pensjon.',
    },

    { type: 'h2', text: 'Regn ut din egen pensjon etter skatt' },
    {
      type: 'p',
      text: 'Med [kalkulatoren for pensjon etter skatt](/pensjon-etter-skatt) ser du skatt og utbetaling per måned for alderspensjonen din. For lønn bruker du [skattekalkulatoren](/). Vil du forstå marginalskatt på lønn bedre, kan du lese [marginalskatt i 2026](/blog/marginalskatt-2026).',
    },
    {
      type: 'p',
      text: 'Metode: Tallene er beregnet med skattekalkulatoren vår med 2026-satsene og standard fradrag. Pensjonstallene forutsetter 100 prosent alderspensjon hele året og ingen annen inntekt. Marginalskatten er regnet som skatteøkningen når inntekten øker med 1 000 kr. Formue, kapitalinntekt og andre fradrag er ikke tatt med.',
    },
  ],
};
