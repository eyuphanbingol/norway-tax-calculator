import { beregnSkatt, marginalskatt, fmt, pct } from '../../lib/tax.js';

// Netto av en bonus = nettolønn med bonus minus nettolønn uten bonus (2026-satser)
const nettoBonus = (lonn, bonus) => beregnSkatt(lonn + bonus).netto - beregnSkatt(lonn).netto;
const skattProsentBonus = (lonn, bonus) =>
  pct(Math.round((1 - nettoBonus(lonn, bonus) / bonus) * 1000) / 10);

const LONNER = [400000, 500000, 600000, 700000, 800000, 1000000];
const BONUSER = [10000, 25000, 50000, 100000];

const grid = LONNER.map((l) => [
  `${fmt(l)} kr`,
  ...BONUSER.map((b) => `${fmt(nettoBonus(l, b))} kr`),
]);

const andelGrid = LONNER.map((l) => [
  `${fmt(l)} kr`,
  `${pct(marginalskatt(l))} %`,
  ...BONUSER.map((b) => `${skattProsentBonus(l, b)} %`),
]);

// Eksempel: 600 000 kr i lønn + 50 000 kr i bonus
const e600 = beregnSkatt(600000);
const e600b = beregnSkatt(650000);
const netto600 = nettoBonus(600000, 50000);

// Eksempel: krysser trinn 3 (725 050 kr)
const k0 = beregnSkatt(700000);
const k1 = beregnSkatt(750000);
const nettoKryss = nettoBonus(700000, 50000);
const underTrinn = 725050 - 700000; // del av bonusen under innslagspunktet
const overTrinn = 50000 - underTrinn;

// Illustrasjon: prosenttrekk med gjennomsnittsskatten som sats
const snittSats = e600.skattProsent; // gjennomsnittlig skatt på 600 000 kr
const trekkSnitt = Math.round(50000 * (snittSats / 100));
const faktiskSkatt = e600b.totalSkatt - e600.totalSkatt;
const mangler = faktiskSkatt - trekkSnitt;

export default {
  slug: 'julebonus-og-bonus-skatt',
  title: 'Skatt på bonus og julebonus 2026: hva får du utbetalt?',
  description:
    'Hvorfor trekket på bonusen ofte ser høyt ut, og hva den endelige skatten blir. Tabell med netto bonus for lønn fra 400 000 til 1 million kroner i 2026.',
  date: '2026-10-18',
  sources: [
    {
      name: 'Skatteetaten: Tabelltrekk eller prosenttrekk i skattekortet',
      url: 'https://www.skatteetaten.no/person/skatt/skattekort/tabelltrekk-for-skattekort/',
    },
    {
      name: 'Skatteetaten: Skattebetalingshåndboken (tabellkort og prosentsats)',
      url: 'https://oppslag.rettskilder.skatteetaten.no/rettskilder2/type/handboker/skattebetalingshandboken/gjeldende/SKTB_ID-5-0.001',
    },
    {
      name: 'Skatteetaten: Forskuddsutskrivingen 2026',
      url: 'https://www.skatteetaten.no/en/rettskilder/type/uttalelser/uttalelser/forskuddsutskrivingen-2026/',
    },
    {
      name: 'Lovdata: Ferieloven § 10 (feriepengegrunnlaget)',
      url: 'https://lovdata.no/lov/1988-04-29-21/%C2%A710',
    },
  ],
  body: [
    {
      type: 'p',
      text: `Mange blir skuffet når julebonusen eller overtiden kommer på lønnsslippen. En bonus på 50 000 kroner kan se ut til å forsvinne nesten halvveis i skatt. Det er sjelden den endelige skatten. Det du ser på lønnsslippen er forskuddstrekket, og det kan bli både for høyt og for lavt. Den endelige skatten på bonusen bestemmes av marginalskatten din, og den regnes ut i [skatteoppgjøret](/blog/skatteoppgjor-og-restskatt-2026) året etter.`,
    },
    {
      type: 'p',
      text: `Kortversjonen: Bonus og overtid skattlegges som vanlig lønn. Det finnes ingen egen bonusskatt. Tjener du mellom omtrent 320 000 og 725 000 kroner, blir skatten på en bonus ${pct(marginalskatt(600000))} prosent i 2026. Over 725 050 kroner stiger den.`,
    },
    { type: 'h2', text: 'Hvorfor trekket på bonusen ser så høyt ut' },
    {
      type: 'p',
      text: `De fleste har tabellkort. Skattetabellen er laget for faste månedslønner: den antar at det du får utbetalt denne måneden, er omtrent det du tjener hver måned. Legger arbeidsgiveren bonusen oppå vanlig lønn og trekker etter tabellen, ser det ut som om du har en mye høyere lønn hele året. Da trekkes det etter et høyere skattenivå, inkludert trinnskatt du kanskje ikke kommer opp i. Les mer om hvordan tabellene virker i [skattetabell og tabelltrekk 2026](/blog/skattetabell-2026-tabelltrekk).`,
    },
    {
      type: 'p',
      text: 'Tabellkortet har også en prosentsats. Ifølge Skatteetaten viser tabellkortet både hvilken tabell arbeidsgiveren skal bruke, og hvilken prosentsats som gjelder for utbetalinger det ikke kan trekkes etter tabell i. Mange lønnssystemer lar arbeidsgiveren trekke prosent på enkelte lønnsarter, for eksempel bonus. Hvilken metode din arbeidsgiver bruker, ser du på lønnsslippen.',
    },
    {
      type: 'p',
      text: `Prosenttrekk kan bomme den andre veien. Prosentsatsen er ett fast tall, og den tar ikke hensyn til at de siste kronene du tjener, skattlegges hardere enn snittet. Ligger satsen nær gjennomsnittsskatten din, blir trekket på en bonus for lavt. Et eksempel: Med 600 000 kroner i lønn er gjennomsnittsskatten ${pct(snittSats)} prosent. Trekkes bonusen på 50 000 kroner med ${pct(snittSats)} prosent, blir trekket ${fmt(trekkSnitt)} kroner. Den faktiske skatten på bonusen er ${fmt(faktiskSkatt)} kroner. Da mangler ${fmt(mangler)} kroner, og de kommer som [restskatt](/blog/unnga-restskatt-sjekk-trekket) hvis resten av trekket ikke dekker dem. Satsen på ditt eget skattekort kan være en annen, så bruk dette bare som en illustrasjon.`,
    },
    { type: 'h2', text: 'Den egentlige skatten: marginalskatten' },
    {
      type: 'p',
      text: `Bonusen legges til resten av årsinntekten. Skatten på bonusen er forskjellen mellom skatten med og uten bonus. Med 600 000 kroner i årslønn er samlet skatt ${fmt(e600.totalSkatt)} kroner. Med 650 000 kroner blir den ${fmt(e600b.totalSkatt)} kroner. Bonusen på 50 000 kroner koster altså ${fmt(faktiskSkatt)} kroner i skatt, og du sitter igjen med ${fmt(netto600)} kroner.`,
    },
    {
      type: 'p',
      text: `Det tilsvarer ${pct(marginalskatt(600000))} prosent: 22 prosent skatt på alminnelig inntekt, 7,6 prosent trygdeavgift og 4 prosent trinnskatt i trinn 2. Minstefradraget gir ingen hjelp her, fordi det allerede er fullt utnyttet ved denne lønnen. Se [marginalskatt 2026](/blog/marginalskatt-2026) for hele oversikten.`,
    },
    { type: 'h2', text: 'Tabell: netto bonus etter skatt i 2026' },
    {
      type: 'p',
      text: 'Tabellen viser hva du sitter igjen med av bonusen etter den endelige skatten, når du ellers bare har vanlig lønn og standard fradrag.',
    },
    {
      type: 'table',
      head: ['Årslønn uten bonus', 'Bonus 10 000', 'Bonus 25 000', 'Bonus 50 000', 'Bonus 100 000'],
      rows: grid,
    },
    {
      type: 'p',
      text: 'Den neste tabellen viser samme tall som skatteandel av bonusen, sammen med marginalskatten på lønnen før bonus.',
    },
    {
      type: 'table',
      head: ['Årslønn uten bonus', 'Marginalskatt', '10 000', '25 000', '50 000', '100 000'],
      rows: andelGrid,
    },
    {
      type: 'p',
      text: `For lønner fra 400 000 til 600 000 kroner er skatten på bonusen den samme, ${pct(marginalskatt(500000))} prosent, uansett bonusstørrelse. Ved 800 000 kroner er du i trinn 3, og bonusen skattlegges med ${pct(marginalskatt(800000))} prosent. Ved 1 million kroner er du i trinn 4 og betaler ${pct(marginalskatt(1000000))} prosent.`,
    },
    { type: 'h2', text: 'Når bonusen krysser 725 050 kroner' },
    {
      type: 'p',
      text: `Trinnskatten hopper fra 4 til 13,7 prosent ved 725 050 kroner i 2026. Har du 700 000 kroner i lønn og får 50 000 kroner i bonus, havner de første ${fmt(underTrinn)} kronene under grensen og de siste ${fmt(overTrinn)} kronene over. Bare den delen som ligger over grensen, får den høyere satsen.`,
    },
    {
      type: 'table',
      head: ['', '700 000 kr', '750 000 kr', 'Forskjell'],
      rows: [
        ['Skatt på alminnelig inntekt', `${fmt(k0.inntektsskatt)} kr`, `${fmt(k1.inntektsskatt)} kr`, `${fmt(k1.inntektsskatt - k0.inntektsskatt)} kr`],
        ['Trygdeavgift', `${fmt(k0.trygdeavgift)} kr`, `${fmt(k1.trygdeavgift)} kr`, `${fmt(k1.trygdeavgift - k0.trygdeavgift)} kr`],
        ['Trinnskatt', `${fmt(k0.trinnskatt)} kr`, `${fmt(k1.trinnskatt)} kr`, `${fmt(k1.trinnskatt - k0.trinnskatt)} kr`],
        ['Samlet skatt', `${fmt(k0.totalSkatt)} kr`, `${fmt(k1.totalSkatt)} kr`, `${fmt(k1.totalSkatt - k0.totalSkatt)} kr`],
      ],
    },
    {
      type: 'p',
      text: `Av bonusen på 50 000 kroner sitter du igjen med ${fmt(nettoKryss)} kroner. Skatten på bonusen blir ${skattProsentBonus(700000, 50000)} prosent i snitt, en blanding av ${pct(marginalskatt(700000))} prosent under grensen og ${pct(marginalskatt(730000))} prosent over. Det lønner seg likevel alltid å ta imot bonusen: du får aldri mindre utbetalt totalt fordi du passerer et trinn. Les mer i [trinnskatt 2026](/blog/trinnskatt-2026).`,
    },
    { type: 'h2', text: 'Overtid i desember og halv skatt' },
    {
      type: 'p',
      text: 'Overtidsbetaling er lønn og skattlegges akkurat som bonus, med marginalskatten din. Mange jobber ekstra før jul og ser at desemberlønnen blir høy fordi det er «halv skatt». Halvt trekk i desember er ikke en skattefordel. Skatten for året er den samme; du har bare betalt mer i trekk resten av året. Skatteetaten kaller det selv en myte at bonus bør utbetales i desember fordi det er halv skatt.',
    },
    {
      type: 'p',
      text: `Det motsatte kan også skje: Blir overtid eller bonus trukket lavt, mangler det trekk når året gjøres opp. Les mer i [halv skatt i desember](/blog/halv-skatt-i-desember-2026).`,
    },
    { type: 'h2', text: 'Får du tilbake for mye trukket skatt?' },
    {
      type: 'p',
      text: 'Ja. Forskuddstrekket er bare en forskuddsbetaling. I skatteoppgjøret regner Skatteetaten ut den endelige skatten på hele årsinntekten, inkludert bonus og overtid, og sammenligner med alt som er trukket. Er det trukket for mye, får du pengene tilbake. Er det trukket for lite, får du restskatt. Det er altså ikke slik at et høyt trekk på bonusen er tapt.',
    },
    {
      type: 'p',
      text: 'Venter du en stor bonus, og har trekket på vanlig lønn ellers vært riktig, kan det være lurt å sjekke skattekortet. Oppgi forventet bonus i inntekten på skatteetaten.no, så blir trekket justert for resten av året. Endrer du skattekortet etter utgangen av mai, gjøres et tabellkort om til prosentkort.',
    },
    { type: 'h2', text: 'Bonus og feriepenger' },
    {
      type: 'p',
      text: 'Feriepenger beregnes av arbeidsvederlag utbetalt i opptjeningsåret (ferieloven § 10). Hovedregelen er at bonus knyttet til arbeidsinnsatsen din regnes som arbeidsvederlag og inngår i feriepengegrunnlaget. Bonus som ikke har sammenheng med innsatsen din, for eksempel ren overskuddsdeling, holdes normalt utenfor. Bonusavtalen og eventuell tariffavtale kan ha betydning, så spør arbeidsgiveren hvis du er usikker.',
    },
    {
      type: 'p',
      text: `Feriepengene av en bonus utbetales året etter, sammen med de andre feriepengene. Se [feriepenger og skatt](/blog/feriepenger-og-skatt) og [feriepengekalkulatoren](/feriepenger-kalkulator).`,
    },
    { type: 'h2', text: 'Ofte stilte spørsmål' },
    { type: 'h3', text: 'Er det lurt å få bonusen i januar i stedet for desember?' },
    {
      type: 'p',
      text: 'Lønn og bonus skattlegges i det året de utbetales. Å flytte bonusen til januar hjelper bare hvis inntekten din neste år blir lavere, slik at bonusen havner i et lavere trinn. For de fleste blir forskjellen liten. Skattesatsene for 2027 er bare et forslag til Stortinget vedtar budsjettet i desember 2026.',
    },
    { type: 'h3', text: 'Kan jeg spare skatt ved å sette bonusen inn i pensjon?' },
    {
      type: 'p',
      text: 'Noen arbeidsgivere tilbyr å gjøre om bonus til innskudd i pensjonsordningen. Om det er mulig, avhenger av ordningen hos arbeidsgiveren. Du kan selv spare i IPS med fradrag på inntil 25 000 kroner i året, men da må du binde pengene til pensjonsalder.',
    },
    { type: 'h3', text: 'Hvordan regner jeg ut min egen bonus?' },
    {
      type: 'p',
      text: `Regn ut nettolønnen med og uten bonus i [skattekalkulatoren](/), og trekk den ene fra den andre. Forskjellen er det du sitter igjen med.`,
    },
    {
      type: 'p',
      text: 'Om tallene: Tallene er beregnet med skattekalkulatoren vår med 2026-satsene og standard fradrag (minstefradrag og personfradrag) for en lønnstaker uten andre inntekter eller fradrag. Din egen skatt kan avvike hvis du har for eksempel rentefradrag eller andre inntekter.',
    },
  ],
};
