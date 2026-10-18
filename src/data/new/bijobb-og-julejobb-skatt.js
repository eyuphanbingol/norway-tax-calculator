import { beregnSkatt, marginalskatt, fmt, pct } from '../../lib/tax.js';

const HOVED = 500000;
const hoved = beregnSkatt(HOVED);
const sats = hoved.skattProsent; // gjennomsnittsskatt på hovedjobben, brukt som eksempel-sats

// Ekstra skatt av en bijobb = skatt med bijobb minus skatt uten
const eksempel = (bi) => {
  const ekstra = beregnSkatt(HOVED + bi).totalSkatt - hoved.totalSkatt;
  const trekk = Math.round(bi * (sats / 100));
  const alene = beregnSkatt(bi).totalSkatt; // skatt hvis bijobben var eneste inntekt
  return { bi, ekstra, trekk, mangler: ekstra - trekk, alene, manglerAlene: ekstra - alene };
};
const e50 = eksempel(50000);
const e100 = eksempel(100000);

const marg = marginalskatt(HOVED);

// Frikort-eksempler
const f100 = beregnSkatt(100000);
const f130 = beregnSkatt(130000);

export default {
  slug: 'bijobb-og-julejobb-skatt',
  title: 'Skatt på bijobb og julejobb: slik unngår du restskatt',
  description:
    'Hovedarbeidsgiver, prosenttrekk og frikort: hvorfor ekstrajobb ofte gir restskatt, med utregnede eksempler for 2026 og hvordan du endrer skattekortet.',
  date: '2026-10-18',
  sources: [
    {
      name: 'Skatteetaten: Tabelltrekk eller prosenttrekk i skattekortet',
      url: 'https://www.skatteetaten.no/person/skatt/skattekort/tabelltrekk-for-skattekort/',
    },
    {
      name: 'Skatteetaten: Forskuddsutskrivingen 2026 (bl.a. frikortgrensen)',
      url: 'https://www.skatteetaten.no/en/rettskilder/type/uttalelser/uttalelser/forskuddsutskrivingen-2026/',
    },
    {
      name: 'Skatteetaten: Se hvilke arbeidsgivere som har hentet skattekortet ditt',
      url: 'https://www.skatteetaten.no/person/til-fra-norge/til/jobbe/skattekort/hentet/',
    },
    {
      name: 'Store norske leksikon: Prosenttrekk',
      url: 'https://snl.no/prosenttrekk',
    },
  ],
  body: [
    {
      type: 'p',
      text: 'Mange tar en ekstra jobb i jule- og høstsesongen: i butikk, på lager, i servering eller som vikar. Selve skatten er enkel: lønn fra bijobben legges sammen med all annen lønn og skattlegges likt. Problemet er trekket. Med to arbeidsgivere er det lett å bli trukket for lite gjennom året, og da kommer regningen som restskatt i skatteoppgjøret.',
    },
    {
      type: 'p',
      text: 'Denne artikkelen forklarer hvordan skattekortet fungerer med flere arbeidsgivere, viser med konkrete tall hvor mye som kan mangle, og hva du kan gjøre for å få riktig trekk.',
    },
    { type: 'h2', text: 'Hovedarbeidsgiver og biarbeidsgiver' },
    {
      type: 'p',
      text: 'Har du tabellkort, skal bare én arbeidsgiver trekke etter tabellen. Skatteetatens anbefaling er at det er arbeidsgiveren der du har høyest inntekt, altså hovedarbeidsgiveren. Alle andre arbeidsgivere skal trekke med prosentsatsen som står på skattekortet ditt. Det gjelder også når den ekstra inntekten er en julejobb på noen uker.',
    },
    {
      type: 'p',
      text: `Grunnen er at tabellen tar hensyn til fradragene dine. Minstefradraget og personfradraget skal bare brukes én gang. Trekker to arbeidsgivere hver sin tabell, får du i praksis fradragene to ganger, og trekket blir for lavt. Les mer i [skattetabell og tabelltrekk 2026](/blog/skattetabell-2026-tabelltrekk).`,
    },
    {
      type: 'p',
      text: 'Er det vanskelig å si hvem som er hovedarbeidsgiver, for eksempel fordi du har to deltidsstillinger av lik størrelse, kan du endre til prosentkort. Da trekker alle arbeidsgiverne samme prosent.',
    },
    { type: 'h2', text: 'Hvorfor to jobber ofte gir restskatt' },
    {
      type: 'p',
      text: `Den ekstra lønnen havner på toppen av inntekten din. Den skattlegges derfor med marginalskatten, ikke gjennomsnittsskatten. Med ${fmt(HOVED)} kroner i hovedjobb er marginalskatten ${pct(marg)} prosent i 2026, mens gjennomsnittsskatten er ${pct(sats)} prosent.`,
    },
    {
      type: 'p',
      text: `Prosentsatsen på skattekortet er ett fast tall for alle kronene. Er satsen beregnet ut fra at hovedjobben er den eneste inntekten din, vil den ligge nær gjennomsnittsskatten og være for lav for de ekstra kronene. Tabellen under bruker gjennomsnittsskatten på hovedjobben, ${pct(sats)} prosent, som eksempel på en slik sats. Satsen på ditt skattekort kan være en annen.`,
    },
    {
      type: 'table',
      head: ['', 'Bijobb 50 000 kr', 'Bijobb 100 000 kr'],
      rows: [
        ['Samlet lønn', `${fmt(HOVED + e50.bi)} kr`, `${fmt(HOVED + e100.bi)} kr`],
        ['Ekstra skatt på bijobben', `${fmt(e50.ekstra)} kr`, `${fmt(e100.ekstra)} kr`],
        [`Trekk med ${pct(sats)} %`, `${fmt(e50.trekk)} kr`, `${fmt(e100.trekk)} kr`],
        ['Mangler (restskatt)', `${fmt(e50.mangler)} kr`, `${fmt(e100.mangler)} kr`],
      ],
    },
    {
      type: 'p',
      text: `En bijobb på 50 000 kroner gir ${fmt(e50.ekstra)} kroner i ekstra skatt. Trekkes den med ${pct(sats)} prosent, mangler ${fmt(e50.mangler)} kroner. Med 100 000 kroner i bijobb mangler ${fmt(e100.mangler)} kroner.`,
    },
    { type: 'h3', text: 'Det verste tilfellet: tabelltrekk hos begge' },
    {
      type: 'p',
      text: `Hvis biarbeidsgiveren også trekker etter tabell, behandles bijobben som om den var din eneste inntekt. En lav inntekt gir lite eller ingen skatt i tabellen. Regnet som eneste inntekt gir 50 000 kroner ${fmt(e50.alene)} kroner i skatt, og 100 000 kroner gir ${fmt(e100.alene)} kroner. Da kan nesten hele den ekstra skatten på ${fmt(e50.ekstra)} eller ${fmt(e100.ekstra)} kroner komme som restskatt. Det faktiske trekket avhenger av tabellnummeret og hvordan lønnen fordeles over månedene, men retningen er den samme.`,
    },
    { type: 'h2', text: 'Slik oppdaterer du skattekortet' },
    {
      type: 'ul',
      items: [
        'Logg inn på skatteetaten.no og gå til skattekortet ditt.',
        'Legg inn forventet lønn fra både hovedjobben og bijobben for hele året.',
        'Sjekk at hovedarbeidsgiveren trekker etter tabell og at de andre trekker prosent. På skatteetaten.no kan du se hvilke arbeidsgivere som har hentet skattekortet ditt.',
        'Arbeidsgiverne henter det nye skattekortet selv. Du trenger ikke sende det til dem.',
      ],
    },
    {
      type: 'p',
      text: 'Endrer du skattekortet etter utgangen av mai, gjøres et tabellkort om til prosentkort. Den nye prosentsatsen er beregnet for resten av året og tar hensyn til det som allerede er trukket, så den kan bli høyere enn du er vant til.',
    },
    {
      type: 'p',
      text: `Vil du ikke endre skattekortet, kan du sette av penger selv. En tommelfingerregel er å sette av forskjellen mellom marginalskatten og trekket. Med en sats på ${pct(sats)} prosent og ${pct(marg)} prosent marginalskatt blir det rundt ${pct(Math.round((marg - sats) * 10) / 10)} prosent av bijobblønnen. Se også [slik unngår du restskatt](/blog/unnga-restskatt-sjekk-trekket).`,
    },
    { type: 'h2', text: 'Frikort for studenter og unge' },
    {
      type: 'p',
      text: `Tjener du lite i løpet av året, kan du ha frikort. Grensen er 100 000 kroner for 2026, samme som i 2025. Grensen gjelder samlet inntekt fra alle arbeidsgivere. Med frikort trekker arbeidsgiveren ikke skatt før du har passert grensen. Med 100 000 kroner i lønn og ingen andre inntekter blir skatten etter våre beregninger ${fmt(f100.totalSkatt)} kroner, fordi fradragene dekker nesten alt.`,
    },
    {
      type: 'ul',
      items: [
        'Hadde du frikort i 2025, fikk du automatisk frikort for 2026.',
        'Har du flere jobber, er det summen som teller. Tre småjobber på 40 000 kroner hver gir 120 000 kroner og er over grensen.',
        'Tjener du mer enn 100 000 kroner og ikke har skattekort, skal arbeidsgiveren trekke 50 prosent av det du tjener over grensen. Bestill skattekort før du passerer grensen.',
        'Frikortet styrer bare trekket. Den endelige skatten regnes ut i skatteoppgjøret.',
      ],
    },
    {
      type: 'p',
      text: `Passerer du grensen, blir skatten fortsatt lav. Med 130 000 kroner i samlet lønn blir den endelige skatten ${fmt(f130.totalSkatt)} kroner. Det er altså ingen grunn til å takke nei til jobb for å holde deg under grensen; poenget er bare å bytte til vanlig skattekort i tide.`,
    },
    { type: 'h2', text: 'Ofte stilte spørsmål' },
    { type: 'h3', text: 'Er det en egen skattesats for bijobb?' },
    {
      type: 'p',
      text: `Nei. All lønn legges sammen, og det er samlet årsinntekt som avgjør skatten. Bijobben blir bare dyrere fordi den kommer på toppen, der marginalskatten gjelder. Se [marginalskatt 2026](/blog/marginalskatt-2026).`,
    },
    { type: 'h3', text: 'Får jeg tilbake hvis det er trukket for mye?' },
    {
      type: 'p',
      text: `Ja. I [skatteoppgjøret](/blog/skatteoppgjor-og-restskatt-2026) sammenlignes all skatt som er trukket, med den endelige skatten. Har du betalt for mye, får du pengene tilbake.`,
    },
    { type: 'h3', text: 'Hva hvis bijobben gjør at jeg passerer et trinn?' },
    {
      type: 'p',
      text: `Da får bare den delen av lønnen som ligger over innslagspunktet den høyere satsen. Ved 725 050 kroner stiger trinnskatten fra 4 til 13,7 prosent, og marginalskatten blir ${pct(marginalskatt(730000))} prosent. Les mer i [trinnskatt 2026](/blog/trinnskatt-2026), eller regn ut samlet lønn i [skattekalkulatoren](/).`,
    },
    {
      type: 'p',
      text: 'Om tallene: Tallene er beregnet med skattekalkulatoren vår med 2026-satsene og standard fradrag (minstefradrag og personfradrag) for en lønnstaker uten andre inntekter eller fradrag. Trekket i eksemplene er forenklet; ditt faktiske trekk avhenger av skattekortet ditt.',
    },
  ],
};
