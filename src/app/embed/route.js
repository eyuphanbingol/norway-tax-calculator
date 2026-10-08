import { RATES_2026 } from '../../lib/tax';
import { DOMAIN } from '../../lib/constants';

// Innebygd kalkulator (iframe) for andre nettsider. Egen, lett HTML uten
// sidens layout, annonser eller sporing. Satsene hentes fra samme motor.
export const dynamic = 'force-static';

export function GET() {
  const html = `<!doctype html>
<html lang="no"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex"><title>Skattekalkulator 2026</title>
<style>
*{box-sizing:border-box}body{margin:0;font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;color:#0a2836;background:#fff}
.w{padding:16px;border:1px solid #dfe8e6;border-radius:14px;max-width:480px}
h1{font-size:17px;margin:0 0 10px}label{font-size:13px;font-weight:600;display:block;margin-bottom:6px}
input{width:100%;font-size:22px;font-weight:700;padding:10px 12px;border:2px solid #dfe8e6;border-radius:10px;font-variant-numeric:tabular-nums}
input:focus{outline:none;border-color:#1e8a5a}.big{text-align:center;margin:14px 0 6px}
.big small{display:block;font-size:12px;text-transform:uppercase;letter-spacing:.04em;color:#5b7480}
.big b{font-size:34px;color:#1e8a5a;font-variant-numeric:tabular-nums}
.sub{text-align:center;font-size:13px;color:#5b7480;margin-bottom:10px}
ul{list-style:none;padding:0;margin:0;font-size:13px}li{display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid #eef3f2}
.f{margin-top:10px;font-size:12px;color:#5b7480}a{color:#1e8a5a}
</style></head><body><div class="w">
<h1>Lønn etter skatt 2026</h1>
<label for="g">Årslønn før skatt (kr)</label>
<input id="g" inputmode="numeric" autocomplete="off" value="600 000">
<div class="big"><small>Utbetalt etter skatt</small><b id="n"></b></div>
<div class="sub" id="m"></div>
<ul><li><span>Skatt på alminnelig inntekt</span><span id="a"></span></li>
<li><span>Trygdeavgift</span><span id="t"></span></li>
<li><span>Trinnskatt</span><span id="s"></span></li></ul>
<div class="f">Standard fradrag, 2026-satser. Veiledende.
<a href="${DOMAIN}/" target="_blank" rel="noopener">Full kalkulator på skattekalkulator.com</a></div>
</div>
<script>
var R=${JSON.stringify(RATES_2026)};
var f=function(x){return new Intl.NumberFormat('nb-NO',{maximumFractionDigits:0}).format(Math.round(x))};
function calc(g){var mf=Math.min(g*R.minstefradragSats,R.minstefradragMaks);
var a=Math.max(0,g-mf-R.personfradrag)*R.alminnelig;
var t=g<=R.trygdeNedreGrense?0:Math.min(g*R.trygdeavgift,(g-R.trygdeNedreGrense)*0.25);
var s=0,k=R.trinnskatt;for(var i=0;i<k.length;i++){var to=i+1<k.length?k[i+1].over:Infinity;if(g>k[i].over)s+=(Math.min(g,to)-k[i].over)*k[i].sats}
return{a:a,t:t,s:s,n:g-Math.round(a+t+s)}}
var el=document.getElementById('g');
function run(){var g=Number(el.value.replace(/\\D/g,''))||0;el.value=g?f(g):'';var r=calc(g);
document.getElementById('n').textContent=f(r.n)+' kr';
document.getElementById('m').textContent='ca. '+f(r.n/12)+' kr per måned i snitt';
document.getElementById('a').textContent=f(r.a)+' kr';document.getElementById('t').textContent=f(r.t)+' kr';
document.getElementById('s').textContent=f(r.s)+' kr'}
el.addEventListener('input',run);run();
</script></body></html>`;
  return new Response(html, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'x-robots-tag': 'noindex',
      'cache-control': 'public, max-age=3600',
    },
  });
}
