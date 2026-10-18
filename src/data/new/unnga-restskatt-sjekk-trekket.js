import { beregnSkatt, fmt, pct, RATES_2026 } from '../../lib/tax.js';

// Eksempel: lønnsøkning fra 550 000 til 650 000 fra 1. juli, prosentkort beregnet for 550 000.
const kort = beregnSkatt(550000, RATES_2026);      // det skattekortet ble laget for
const faktisk = beregnSkatt(600000, RATES_2026);   // faktisk årslønn: 6 mnd à 550k/12 + 6 mnd à 650k/12
const prosent = kort.totalSkatt / 550000;          // trekkprosenten kortet tilsvarer
const prosentVist = Math.round(prosent * 1000) / 10;
const trukketAar = Math.round(prosent * 600000);   // trekk når prosenten brukes på all lønn i året
const mangler = faktisk.totalSkatt - trukketAar;
const perMnd2 = Math.round(mangler / 2);
const perMnd3 = Math.round(mangler / 3);

// Effekten av IPS og BSU (22 % av IPS-innskudd, 10 % av BSU-innskudd)
const ipsEffekt = Math.round(25000 * 0.22);
const bsuEffekt = Math.round(27500 * 0.1);

export default {
  slug: 'unnga-restskatt-sjekk-trekket',
  title: 'Unngå restskatt: sjekk skattetrekket før nyttår',
  description:
    'Slik sjekker du om det er trukket nok skatt i år: regn ut forventet skatt, sammenlign med «trukket hittil i år» og rett opp før 15. desember. Med regneeksempel.',
  date: '2026-10-18',
  sources: [
    { name: 'Skatteetaten: Skattekort – bestille, se eller endre', url: 'https://www.skatteetaten.no/person/skatt/skattekort/endre/' },
    { name: 'Skatteetaten: Tabell- eller prosenttrekk i skattekortet', url: 'https://www.skatteetaten.no/no/Person/Skattekort-og-forskuddsskatt/Tabelltrekk-for-skattekort/' },
    { name: 'Skatteetaten: Slik trekkjer du rett skatt (arbeidsgiver)', url: 'https://www.skatteetaten.no/nn/bedrift-og-organisasjon/arbeidsgiver/skattekort-og-skattetrekk/slik-trekkjer-du-rett-skatt/' },
    { name: 'Skatteetaten: Maksimalt årlig fradrag for innbetaling til individuell pensjonsordning', url: 'https://www.skatteetaten.no/satser/maksimalt-arlig-fradrag-for-innbetaling-til-individuell-pensjonsordning/' },
    { name: 'Skatteetaten: Skattebetalingshåndboken § 11-5 (rentetillegg)', url: 'https://www.skatteetaten.no/rettskilder/type/handboker/skattebetalingshandboken/gjeldende/kapittel-11.-renter/ID-11-5.001/' },
  ],
  body: [
    { type: 'p', text: 'Restskatt kommer sjelden som lyn fra klar himmel. Som regel har det vært trukket for lite gjennom året fordi lønnen, jobben eller fradragene endret seg uten at skattekortet fulgte med. Den gode nyheten er at du kan sjekke dette selv på ti minutter, og at det fortsatt er tid til å rette det opp før året er omme.' },
    { type: 'p', text: 'Her går vi gjennom hvordan du regner ut hvor mye skatt du faktisk skal betale for 2026, hvordan du sammenligner med det som er trukket, og hva du kan gjøre hvis det mangler.' },

    { type: 'h2', text: 'Steg 1: Regn ut forventet skatt for hele året' },
    { type: 'p', text: 'Start med hva du tror du tjener i 2026 totalt. Ta med fast lønn, overtid, bonus, tillegg og feriepenger som utbetales i år. Har du byttet jobb, må begge arbeidsgiverne med. Legg tallet inn i [skattekalkulatoren](/), så får du en anslått årsskatt med 2026-satsene og standard fradrag (minstefradrag og personfradrag).' },
    { type: 'p', text: 'Har du store fradrag utover standardfradragene, for eksempel renter på boliglån eller [reisefradrag](/reisefradrag-kalkulator), blir den faktiske skatten lavere enn kalkulatoren viser. Har du inntekt uten trekk, som utleie eller aksjegevinster, blir den høyere. Juster tallet i hodet, eller bruk Skatteetatens skattekalkulator hvis du har mye av dette.' },

    { type: 'h2', text: 'Steg 2: Finn «trukket hittil i år» på lønnsslippen' },
    { type: 'p', text: 'Nederst på lønnsslippen står vanligvis en oppsummering med hittil-i-år-tall: brutto lønn, forskuddstrekk og eventuelt feriepengegrunnlag. Forskuddstrekket hittil i år er det du har betalt i skatt så langt. Har du hatt flere arbeidsgivere eller NAV-ytelser, må du legge sammen trekket fra alle.' },
    { type: 'p', text: 'Deretter anslår du trekket for resten av året. Med tabellkort er det viktig å huske at desember normalt har halvt trekk, og at juni ofte har lite eller ikke noe trekk fordi feriepengene utbetales da. Se [halv skatt i desember](/blog/halv-skatt-i-desember-2026) og [tabelltrekk for 2026](/blog/skattetabell-2026-tabelltrekk) for hvordan det fungerer. Med prosentkort trekkes samme prosent av all lønn, også i desember.' },
    { type: 'p', text: 'Sammenlign så: forventet årsskatt minus (trukket hittil + forventet trekk resten av året). Er svaret større enn null, ligger du an til restskatt.' },

    { type: 'h2', text: 'Regneeksempel: lønnsøkning midt i året' },
    { type: 'p', text: `Kari tjente 550 000 kroner i året fram til 1. juli. Da fikk hun ny stilling med 650 000 kroner i årslønn. Hun har prosentkort, og prosenten ble beregnet ut fra en inntekt på 550 000 kroner. Det gir en skatt på ${fmt(kort.totalSkatt)} kroner, altså et trekk på rundt ${pct(prosentVist)} prosent.` },
    { type: 'p', text: `Halvt år på gammel lønn og halvt år på ny lønn gir en faktisk årsinntekt på 600 000 kroner. Skatten på det er ${fmt(faktisk.totalSkatt)} kroner. Men prosenten hennes er for lav for den nye inntekten, fordi en større del av lønnen havner i høyere trinn og ingen fradrag øker tilsvarende. Brukt på 600 000 kroner gir ${pct(prosentVist)} prosent et trekk på ${fmt(trukketAar)} kroner.` },
    { type: 'table', head: ['', 'Beløp'], rows: [
      ['Skatt på 550 000 kr (det kortet er laget for)', `${fmt(kort.totalSkatt)} kr`],
      ['Trekkprosent i kortet', `ca. ${pct(prosentVist)} %`],
      ['Faktisk årsinntekt 2026', '600 000 kr'],
      ['Riktig skatt på 600 000 kr', `${fmt(faktisk.totalSkatt)} kr`],
      ['Trukket med gammel prosent på 600 000 kr', `${fmt(trukketAar)} kr`],
      ['Mangler (forventet restskatt)', `${fmt(mangler)} kr`],
      ['Ekstra trekk per måned, november og desember', `${fmt(perMnd2)} kr`],
      ['Ekstra trekk per måned, oktober–desember', `${fmt(perMnd3)} kr`],
    ]},
    { type: 'p', text: `Retter Kari opp nå, holder det å trekke ${fmt(perMnd2)} kroner ekstra i hver av de to siste lønningene. Venter hun til skatteoppgjøret, får hun en regning på rundt ${fmt(mangler)} kroner pluss rentetillegg neste år.` },
    { type: 'p', text: `Merk at forskjellen hadde vært mye større hvis trekket hadde stått fast i kroner. Skatten på 600 000 kroner er ${fmt(faktisk.totalSkatt - kort.totalSkatt)} kroner høyere enn på 550 000 kroner. Prosentkortet tar igjen det meste av dette fordi prosenten brukes på den høyere lønnen, men ikke alt.` },
    { type: 'p', text: 'Hadde Kari hatt tabellkort, ville trekket økt automatisk da lønnen gikk opp, fordi tabellen ser på lønnen i hver lønnsperiode. Da er risikoen for restskatt ved en vanlig lønnsøkning lav. Prosentkort, bijobb, flere arbeidsgivere og inntekt uten trekk er de vanligste fellene.' },

    { type: 'h2', text: 'Hva gjør du hvis det er trukket for lite?' },
    { type: 'h3', text: '1. Endre skattekortet' },
    { type: 'p', text: 'Logg inn på skatteetaten.no og oppdater inntekt og fradrag for 2026. Du får et nytt skattekort som tar høyde for det som allerede er trukket, og arbeidsgiveren henter det automatisk. Du trenger ikke gi beskjed selv. Ifølge Skatteetaten kan du endre skattekortet så mange ganger du vil fram til 15. desember. Etter det må du kontakte Skatteetaten.' },
    { type: 'h3', text: '2. Be arbeidsgiver om tilleggstrekk' },
    { type: 'p', text: 'Du kan også be arbeidsgiveren om å trekke et fast beløp ekstra per måned. Skatteetaten skriver at arbeidsgiveren har plikt til å trekke mer når den ansatte ber om det i god tid før lønnskjøringen, og at dette skal legges inn som et tilleggstrekk. Det passer når du vet omtrent hva som mangler, slik som i eksempelet over. For NAV-ytelser kan du legge inn frivillig skattetrekk hos NAV.' },
    { type: 'h3', text: '3. Betal inn selv før 31. mai' },
    { type: 'p', text: 'Er det for sent å endre trekket, kan du betale inn tilleggsforskudd på skatteetaten.no. Betaler du det du skylder innen 31. mai året etter, og før skatteoppgjøret ditt er ferdig, slipper du rentetillegget på restskatten. Husk å bruke KID-nummeret for tilleggsforskudd for riktig inntektsår.' },

    { type: 'h2', text: 'Fradrag du bør sjekke før 31. desember' },
    { type: 'p', text: 'Noen fradrag krever at pengene er betalt inn innen årets utgang. De gir ikke lavere trekk i år, men lavere skatt i oppgjøret.' },
    { type: 'ul', items: [
      `IPS (individuell pensjonssparing): Fradrag for innskudd på inntil 25 000 kroner i året. Fradraget gis i alminnelig inntekt, så det reduserer skatten med 22 prosent av innskuddet, opptil ${fmt(ipsEffekt)} kroner. Innbetalingen må være gjort innen utløpet av inntektsåret, og mange banker har frist noen dager før nyttår. Pengene er bundet til pensjonsalder, og uttakene skattes senere.`,
      `BSU: Kan du spare i BSU til og med året du fyller 33 år, og eier du ikke bolig, kan du spare inntil 27 500 kroner i året og få 10 prosent i skattefradrag, altså inntil ${fmt(bsuEffekt)} kroner. Eier du bolig helt eller delvis per 31. desember, får du ikke fradraget for det året. Sjekk aldersgrense og bankens innskuddsfrist før du setter inn.`,
      'Fagforeningskontingent: Fradraget er inntil 8 700 kroner for 2026. Det fylles vanligvis inn automatisk, men sjekk at det stemmer.',
      'Gaver til frivillige organisasjoner: Gaver til godkjente organisasjoner kan gi fradrag. Sjekk beløpsgrensene hos Skatteetaten.',
    ]},
    { type: 'p', text: 'Flere fradrag finner du i [fradrag du ikke må glemme](/blog/fradrag-du-ikke-ma-glemme-2026).' },

    { type: 'h2', text: 'Sjekkliste før nyttår' },
    { type: 'ul', items: [
      'Har lønnen endret seg i år? Sjekk om du har prosentkort eller tabellkort.',
      'Har du hatt mer enn én arbeidsgiver, bijobb eller NAV-ytelser? Legg sammen all inntekt og alt trekk.',
      'Har du fått bonus eller [julebonus](/blog/julebonus-og-bonus-skatt)? Bonus kan gi for lite trekk, særlig med prosentkort.',
      'Har du inntekt uten trekk, som utleie, frilans eller aksjegevinst? Legg den inn i skattekortet.',
      'Har boliglånsrenten endret seg mye? Rentene påvirker fradraget.',
      'Regn ut forventet årsskatt og sammenlign med trukket hittil i år.',
      'Mangler det? Endre skattekortet før 15. desember eller be om tilleggstrekk.',
      'Vurder IPS og BSU før bankens frist i desember.',
    ]},

    { type: 'h2', text: 'Ofte stilte spørsmål' },
    { type: 'h3', text: 'Er det lurt å få litt tilbake på skatten i stedet?' },
    { type: 'p', text: 'Litt overtrekk er en trygg buffer, men penger du får tilbake har du i praksis lånt staten rentefritt store deler av året. Målet bør være et trekk som ligger nær riktig skatt.' },
    { type: 'h3', text: 'Hva skjer hvis jeg ikke gjør noe?' },
    { type: 'p', text: 'Da kommer differansen som restskatt i [skatteoppgjøret](/blog/skatteoppgjor-og-restskatt-2026) neste år, med rentetillegg. Restskatt på 1 000 kroner eller mer deles i to terminer.' },
    { type: 'h3', text: 'Gjelder dette også for neste år?' },
    { type: 'p', text: 'Ja. Skattekortet for 2027 bygger på opplysninger Skatteetaten har om deg. Har du fått ny lønn, bør du sjekke at det nye kortet stemmer. Les mer om [skattekortet for 2027](/blog/skattekort-2027).' },

    { type: 'p', text: 'Tallene er beregnet med skattekalkulatoren vår med 2026-satsene og standard fradrag. Eksempelet forutsetter at all lønn i året trekkes med samme prosent, og tar ikke med andre fradrag eller inntekter.' },
  ],
};
