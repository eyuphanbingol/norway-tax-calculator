// Guider skrevet for 2026-satsene (vedtatt av Stortinget 22.12.2025).
// Blokktyper: h2, p, ul, table

export const articles = [
  {
    slug: 'trinnskatt-2026',
    title: 'Trinnskatt 2026: satser, innslagspunkter og hva du faktisk betaler',
    description:
      'Trinnskatten for 2026 har fem trinn fra 1,7 til 17,8 prosent. Se innslagspunktene, hvordan den beregnes trinn for trinn, og et konkret regneeksempel.',
    date: '2026-01-15',
    body: [
      { type: 'p', text: 'Trinnskatt er den progressive delen av inntektsskatten i Norge. Den beregnes av brutto personinntekt – altså lønnen din før noen fradrag – og kommer på toppen av skatten på alminnelig inntekt og trygdeavgiften. Jo mer du tjener, jo høyere sats betaler du på den øverste delen av inntekten.' },
      { type: 'h2', text: 'Satsene for 2026' },
      { type: 'table', head: ['Trinn', 'Inntekt over', 'Sats'], rows: [
        ['Trinn 1', '226 100 kr', '1,7 %'],
        ['Trinn 2', '318 300 kr', '4,0 %'],
        ['Trinn 3', '725 050 kr', '13,7 %'],
        ['Trinn 4', '980 100 kr', '16,8 %'],
        ['Trinn 5', '1 467 200 kr', '17,8 %'],
      ]},
      { type: 'p', text: 'Satsene er uendret fra 2025, men innslagspunktene er justert opp med forventet lønnsvekst. Det betyr at du ikke rykker opp et trinn bare fordi lønnen din har fulgt den generelle lønnsveksten.' },
      { type: 'h2', text: 'Slik beregnes trinnskatten – vanlig misforståelse' },
      { type: 'p', text: 'Mange tror at hele inntekten skattlegges med den høyeste satsen når man passerer et innslagspunkt. Det stemmer ikke. Du betaler kun den høyere satsen på delen av inntekten som overstiger innslagspunktet. Tjener du 320 000 kr, betaler du 4 prosent bare av de siste 1 700 kronene – ikke av hele lønnen.' },
      { type: 'h2', text: 'Regneeksempel: 600 000 kr i årslønn' },
      { type: 'ul', items: [
        'Trinn 1: (318 300 − 226 100) × 1,7 % = 1 567 kr',
        'Trinn 2: (600 000 − 318 300) × 4,0 % = 11 268 kr',
        'Sum trinnskatt: 12 835 kr – omtrent 2,1 % av bruttolønnen',
      ]},
      { type: 'p', text: 'Trinnskatten utgjør altså en beskjeden del av totalskatten for vanlige lønnsnivåer. Det er først over trinn 3 (725 050 kr) at den begynner å merkes skikkelig: der hopper satsen fra 4 til 13,7 prosent, og marginalskatten din passerer 43 prosent.' },
      { type: 'h2', text: 'Hva påvirker ikke trinnskatten?' },
      { type: 'p', text: 'Fradrag som minstefradrag, rentefradrag og pendlerfradrag reduserer ikke trinnskatten – de virker kun på alminnelig inntekt. Grunnlaget for trinnskatt er brutto personinntekt: lønn, sykepenger, pensjon og beregnet personinntekt fra næring. Kapitalinntekter som renter og aksjegevinst inngår ikke.' },
      { type: 'p', text: 'Vil du se hva trinnskatten utgjør for akkurat din lønn? Bruk kalkulatoren på forsiden – den viser trinnskatten som egen post i fordelingen.' },
    ],
  },
  {
    slug: 'feriepenger-og-skatt',
    title: 'Feriepenger og skatt: derfor er ikke juni «skattefri»',
    description:
      'Feriepenger er skattepliktige, men det trekkes ikke skatt av dem ved utbetaling. Her er hvordan ordningen faktisk fungerer, satsene, og hvorfor regningen kommer senere.',
    date: '2026-01-20',
    body: [
      { type: 'p', text: 'Hver sommer får mange en hyggelig overraskelse på lønnsslippen: feriepengene utbetales tilsynelatende uten skattetrekk. Men feriepenger er fullt skattepliktig inntekt. Det som skjer, er at skatten på dem er bakt inn i trekket resten av året.' },
      { type: 'h2', text: 'Slik fungerer ordningen' },
      { type: 'p', text: 'Skattekortet ditt er beregnet slik at det trekkes litt ekstra skatt i de vanlige månedene, slik at feriepengemåneden kan være trekkfri og desember kan ha halvt trekk. Totalregnskapet går opp ved skatteoppgjøret: Skatteetaten ser på hele årsinntekten din – inkludert feriepenger – og beregner skatten av totalen.' },
      { type: 'h2', text: 'Satsene for feriepenger' },
      { type: 'table', head: ['Situasjon', 'Sats'], rows: [
        ['Lovens minimum (4 uker + 1 dag ferie)', '10,2 %'],
        ['Tariffestet 5 ukers ferie', '12,0 %'],
        ['Over 60 år, lovens minimum', '12,5 %'],
        ['Over 60 år, 5 ukers ferie', '14,3 %'],
      ]},
      { type: 'p', text: 'Feriepengene beregnes av feriepengegrunnlaget – i praksis brutto lønn du tjente året før. Tjente du 550 000 kr i fjor og har fem ukers ferie, får du 66 000 kr i feriepenger i år.' },
      { type: 'h2', text: 'Den klassiske fellen' },
      { type: 'p', text: 'Fordi det ikke trekkes skatt ved utbetaling, føles feriepengene større enn de er. Bytter du jobb og får feriepengene utbetalt ved sluttoppgjøret, eller har du flere arbeidsgivere, kan det trekkes for lite skatt gjennom året – og resultatet blir restskatt. Sjekk skattekortet ditt på skatteetaten.no hvis inntekten din endrer seg vesentlig.' },
      { type: 'h2', text: 'Feriepenger og trinnskatt' },
      { type: 'p', text: 'Feriepenger inngår i personinntekten og øker dermed grunnlaget for både trygdeavgift og trinnskatt. For deg som ligger rett under et innslagspunkt, kan feriepengene være det som dytter deg over – men husk: kun beløpet over innslagspunktet skattlegges med den høyere satsen.' },
    ],
  },
  {
    slug: 'arbeidsfradrag-for-unge-2026',
    title: 'Arbeidsfradrag for unge 2026: «skattelotteriet» forklart',
    description:
      'I 2026 starter en forsøksordning der 100 000 tilfeldig utvalgte unge får et arbeidsfradrag på inntil 125 000 kr. Se hvem som kan bli trukket ut, og hvor mye det er verdt.',
    date: '2026-02-01',
    body: [
      { type: 'p', text: 'Fra inntektsåret 2026 innføres en av de mest uvanlige skatteordningene i norsk historie: et arbeidsfradrag for unge som tildeles ved loddtrekning. Ordningen er en femårig forsøksordning som skal måle om lavere skatt får flere unge i arbeid – og den har allerede fått kallenavnet «skattelotteriet».' },
      { type: 'h2', text: 'Hvem kan bli trukket ut?' },
      { type: 'ul', items: [
        'Du må være født mellom 1991 og 2006',
        'Rundt 100 000 personer trekkes tilfeldig ut av Skatteetaten',
        'Du kan ikke søke – uttrekket skjer automatisk',
        'Fradraget gjelder kun arbeids- og næringsinntekt, ikke trygdeytelser',
      ]},
      { type: 'h2', text: 'Hvor mye er fradraget verdt?' },
      { type: 'p', text: 'Fradraget gis i alminnelig inntekt med inntil 125 000 kr. Siden skattesatsen på alminnelig inntekt er 22 prosent, betyr det inntil 27 500 kr mindre skatt i året. Full effekt får du med en arbeidsinntekt rundt 345 000 kr.' },
      { type: 'p', text: 'Over dette nivået trappes fradraget gradvis ned, og ved en inntekt på 657 500 kr er det helt borte. Ordningen er altså mest verdt for unge med lav og middels inntekt – studenter med deltidsjobb, lærlinger og folk tidlig i karrieren.' },
      { type: 'h2', text: 'Hva bør du gjøre hvis du blir trukket ut?' },
      { type: 'p', text: 'Ingenting – fradraget legges automatisk inn i skattekortet og skattemeldingen din. Men det kan være lurt å sjekke skattekortet for 2026 hvis du er i målgruppen: blir du trukket ut, får du lavere trekk gjennom året, og da bør resten av økonomien din ta høyde for at dette er en midlertidig ordning.' },
      { type: 'h2', text: 'Hvorfor loddtrekning?' },
      { type: 'p', text: 'Formålet er forskning: ved å sammenligne de som fikk fradraget med like personer som ikke fikk det, kan myndighetene måle om skattelette faktisk øker arbeidsdeltakelsen. Resultatene vil avgjøre om ordningen utvides til alle unge – eller skrotes.' },
    ],
  },
  {
    slug: 'fradrag-du-ikke-ma-glemme-2026',
    title: 'Fradragene mange glemmer i skattemeldingen 2026',
    description:
      'Reisefradraget er kraftig utvidet i 2026, IPS-grensen er økt til 25 000 kr, og fagforeningsfradraget er 8 700 kr. Her er fradragene som faktisk monner.',
    date: '2026-02-10',
    body: [
      { type: 'p', text: 'Mange fradrag kommer ferdig utfylt i skattemeldingen, men langt fra alle. Hvert år lar nordmenn betydelige beløp ligge fordi de ikke fører opp fradragene de har krav på. For 2026 er flere av dem blitt mer verdt.' },
      { type: 'h2', text: 'Reisefradraget – stor endring i 2026' },
      { type: 'p', text: 'Pendlerfradraget er blitt vesentlig gunstigere: nedre grense (egenandelen) er redusert fra 15 250 til 12 000 kr, kilometersatsen er økt til 1,90 kr, og øvre grense er hevet til 120 000 kr. Har du 30 km hver vei til jobb og 230 arbeidsdager, blir regnestykket: 60 km × 230 dager × 1,90 kr = 26 220 kr, minus egenandelen på 12 000 kr, gir 14 220 kr i fradrag – verdt over 3 100 kr i spart skatt.' },
      { type: 'h2', text: 'Andre fradrag verdt å sjekke' },
      { type: 'table', head: ['Fradrag', 'Grense 2026', 'Maks skatteverdi'], rows: [
        ['Fagforeningskontingent', '8 700 kr', '1 914 kr'],
        ['IPS (pensjonssparing)', '25 000 kr', '5 500 kr'],
        ['BSU (skattefradrag 10 %)', '27 500 kr spart', '2 750 kr'],
        ['Foreldrefradrag, første barn', '15 000 kr', '3 300 kr'],
        ['Foreldrefradrag, per barn utover', '10 000 kr', '2 200 kr'],
      ]},
      { type: 'p', text: 'Merk at IPS-grensen er økt fra 15 000 til 25 000 kr i 2026 – en betydelig forbedring for deg som sparer til pensjon. BSU gjelder kun hvis du ikke eier bolig, og fradraget gis direkte i skatten (ikke i inntekten).' },
      { type: 'h2', text: 'Rentefradraget kommer av seg selv – men sjekk det' },
      { type: 'p', text: 'Renter på boliglån, forbrukslån og studielån er fradragsberettiget med 22 prosent skatteverdi. Bankene rapporterer dette automatisk, men deler du lån med samboer, bør dere sjekke at fordelingen i skattemeldingen stemmer med hvem som faktisk betaler.' },
      { type: 'h2', text: 'Slik fører du opp glemte fradrag' },
      { type: 'p', text: 'Alt gjøres i skattemeldingen på skatteetaten.no. Du kan også endre skattemeldinger inntil tre år tilbake i tid – har du glemt pendlerfradraget i fjor, er det altså ikke for sent.' },
    ],
  },
  {
    slug: 'minstefradrag-og-personfradrag-2026',
    title: 'Minstefradrag og personfradrag 2026: fradragene alle får',
    description:
      'Minstefradraget er inntil 95 700 kr og personfradraget 114 540 kr i 2026. Slik virker de to automatiske fradragene som bestemmer hvor mye skatt du betaler.',
    date: '2026-02-20',
    body: [
      { type: 'p', text: 'To fradrag får absolutt alle lønnsmottakere i Norge, helt automatisk: minstefradraget og personfradraget. Sammen sørger de for at en god del av inntekten din aldri blir skattlagt med 22-prosentsatsen. For 2026 er begge økt.' },
      { type: 'h2', text: 'Minstefradraget: 46 prosent, maks 95 700 kr' },
      { type: 'p', text: 'Minstefradraget er et sjablongfradrag som skal dekke vanlige jobbkostnader uten at du trenger å dokumentere noe. I 2026 utgjør det 46 prosent av lønnsinntekten, med et tak på 95 700 kr. Taket nås ved en årslønn på cirka 208 000 kr – så for de aller fleste i full jobb er minstefradraget rett og slett 95 700 kr.' },
      { type: 'p', text: 'Har du faktiske jobbutgifter som overstiger minstefradraget – for eksempel svært lang pendlervei kombinert med hjemmekontorkostnader – kan du kreve fradrag for faktiske kostnader i stedet, men det lønner seg sjelden.' },
      { type: 'h2', text: 'Personfradraget: 114 540 kr i 2026' },
      { type: 'p', text: 'Personfradraget er en ren bunnfradragsordning: de første 114 540 kronene av alminnelig inntekt er skattefrie. Fradraget ble økt fra 108 550 kr i 2025 – en økning på nesten 6 000 kr, som isolert sett gir rundt 1 300 kr lavere skatt for alle.' },
      { type: 'h2', text: 'Hva betyr dette i praksis?' },
      { type: 'p', text: 'For en lønn på 500 000 kr ser regnestykket for alminnelig inntekt slik ut: 500 000 − 95 700 (minstefradrag) − 114 540 (personfradrag) = 289 760 kr i grunnlag. Av dette betaler du 22 prosent: 63 747 kr. Uten de to fradragene ville skatten på alminnelig inntekt vært 110 000 kr – fradragene sparer deg altså for over 46 000 kr.' },
      { type: 'h2', text: 'Viktig begrensning' },
      { type: 'p', text: 'Ingen av disse fradragene reduserer trygdeavgiften (7,6 prosent) eller trinnskatten – de beregnes av bruttolønnen. Det er derfor selv lave inntekter betaler noe skatt: trygdeavgiften slår inn allerede fra rundt 100 000 kr (frikortgrensen).' },
    ],
  },
  {
    slug: 'marginalskatt-2026',
    title: 'Marginalskatt 2026: hvor mye sitter du igjen med av en lønnsøkning?',
    description:
      'Får du 20 000 kr i lønnsøkning, ser du kanskje bare halvparten på kontoen. Slik beregner du marginalskatten din i 2026 – tabell for alle inntektsnivåer.',
    date: '2026-03-01',
    body: [
      { type: 'p', text: 'Marginalskatt er skatten du betaler på den siste kronen du tjener – og dermed på hele lønnsøkningen din. Den er alltid høyere enn gjennomsnittsskatten, og det er den som avgjør hva en bonus, overtid eller et lønnshopp faktisk er verdt for deg.' },
      { type: 'h2', text: 'Slik settes marginalskatten sammen' },
      { type: 'p', text: 'For lønnsinntekt består marginalskatten av tre deler: 22 prosent skatt på alminnelig inntekt, 7,6 prosent trygdeavgift, og trinnskatten for ditt inntektsnivå. Fordi minstefradraget har nådd taket for vanlige lønninger, gir hver ekstra krone fullt utslag i alle tre.' },
      { type: 'h2', text: 'Marginalskatt per inntektsnivå i 2026' },
      { type: 'table', head: ['Årslønn', 'Trinnskattsats', 'Marginalskatt'], rows: [
        ['Under 226 100 kr', '0 %', '29,6 %'],
        ['226 100 – 318 300 kr', '1,7 %', '31,3 %'],
        ['318 300 – 725 050 kr', '4,0 %', '33,6 %'],
        ['725 050 – 980 100 kr', '13,7 %', '43,3 %'],
        ['980 100 – 1 467 200 kr', '16,8 %', '46,4 %'],
        ['Over 1 467 200 kr', '17,8 %', '47,4 %'],
      ]},
      { type: 'p', text: 'Maksimal marginalskatt på lønn i 2026 er altså 47,4 prosent. Selv på de høyeste inntektene sitter du igjen med over halvparten av en lønnsøkning – men bare så vidt.' },
      { type: 'h2', text: 'Eksempel: lønnsøkning fra 700 000 til 730 000 kr' },
      { type: 'p', text: 'Denne økningen krysser innslagspunktet for trinn 3 på 725 050 kr. De første 25 050 kronene skattlegges med 33,6 prosent marginalskatt, de siste 4 950 med 43,3 prosent. Av 30 000 kr i økning sitter du igjen med cirka 19 450 kr. Verdt å vite før lønnsforhandlingen – men aldri et argument mot høyere lønn: du taper aldri penger på å tjene mer i Norge.' },
      { type: 'h2', text: 'Overtid og bonus' },
      { type: 'p', text: 'Overtidsbetaling og bonus skattlegges som vanlig lønn, med din marginalskatt. At det ofte trekkes mye skatt av bonusutbetalinger, skyldes bare trekkreglene – ved skatteoppgjøret jevnes det ut. Bruk kalkulatoren på forsiden for å se din eksakte marginalskatt.' },
    ],
  },
];

export const getArticle = (slug) => articles.find((a) => a.slug === slug);
