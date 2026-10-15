// Affiliate-lenker (Awin). Alle lenker merkes «Annonse» og har rel="sponsored".
// Format: https://www.awin1.com/cread.php?awinmid=<annonsør>&awinaffid=<utgiver>&clickref=<side>&ued=<mål-URL>
const AWIN_PUBLISHER_ID = 3124064;

const awin = (advertiserId, destination, clickref) =>
  `https://www.awin1.com/cread.php?awinmid=${advertiserId}&awinaffid=${AWIN_PUBLISHER_ID}` +
  `&clickref=${encodeURIComponent(clickref)}&ued=${encodeURIComponent(destination)}`;

const HELLOSAFE = 128757;

export const hellosafeNo = (clickref) => awin(HELLOSAFE, 'https://hellosafe.com/no', clickref);
export const hellosafeEn = (clickref) => awin(HELLOSAFE, 'https://hellosafe.com/travel-insurance/norway', clickref);

// Ferratum Bank (Multitude Bank p.l.c., Awin 124628) – kreditt.
// Kredittmarkedsføring krever representativt eksempel (forskrift om markedsføring av kreditt).
// Kilde: ferratum.no. Kontroller tallene mot ferratum.no ved hver endring.
const MULTITUDE = 124628;
export const ferratumNo = (clickref) => awin(MULTITUDE, 'https://www.ferratum.no/', clickref);
export const FERRATUM_EKSEMPEL =
  'Representativt eksempel Ferratum Fleksikreditt: 48,17 % effektiv rente, 25 000 kr o/12 mnd, ' +
  '39,97 % nominell rente, kostnad 5 412,27 kr. Totalt 30 412,27 kr.';
