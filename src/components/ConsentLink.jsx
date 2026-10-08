'use client';

// Åpner Googles samtykkevindu (AdSense Personvern og meldinger) på nytt,
// slik at besøkende kan endre eller trekke tilbake samtykket sitt.
export default function ConsentLink({ className }) {
  const open = () => {
    window.googlefc = window.googlefc || {};
    window.googlefc.callbackQueue = window.googlefc.callbackQueue || [];
    window.googlefc.callbackQueue.push(() => window.googlefc.showRevocationMessage());
  };
  return (
    <button type="button" onClick={open} className={className}>
      Personvern- og cookie-innstillinger
    </button>
  );
}
