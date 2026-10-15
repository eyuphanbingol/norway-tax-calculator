// Affiliate-lenker (Awin). Alle lenker merkes «Annonse» og har rel="sponsored".
// Format: https://www.awin1.com/cread.php?awinmid=<annonsør>&awinaffid=<utgiver>&clickref=<side>&ued=<mål-URL>
const AWIN_PUBLISHER_ID = 3124064;

const awin = (advertiserId, destination, clickref) =>
  `https://www.awin1.com/cread.php?awinmid=${advertiserId}&awinaffid=${AWIN_PUBLISHER_ID}` +
  `&clickref=${encodeURIComponent(clickref)}&ued=${encodeURIComponent(destination)}`;

const HELLOSAFE = 128757;

export const hellosafeNo = (clickref) => awin(HELLOSAFE, 'https://hellosafe.com/no', clickref);
export const hellosafeEn = (clickref) => awin(HELLOSAFE, 'https://hellosafe.com/travel-insurance/norway', clickref);
