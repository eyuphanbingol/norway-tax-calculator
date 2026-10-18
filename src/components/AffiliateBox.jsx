// Tydelig merket annonseboks for affiliate-lenker (markedsføringsloven § 3: reklame skal fremgå tydelig)
export default function AffiliateBox({ title, text, cta, href, label = 'Annonse', lang = 'no', disclosure }) {
  return (
    <aside className="my-8 border border-mist bg-white rounded-2xl p-5 not-prose" lang={lang}>
      <p className="text-sm font-bold uppercase tracking-wide text-fjord mb-2">
        {label}
        <span className="normal-case font-normal tracking-normal text-fjord/75">
          {' · '}{lang === 'en' ? 'We earn a commission if you buy via this link.' : 'Vi får provisjon hvis du kjøper via lenken.'}
        </span>
      </p>
      <p className="display font-bold text-lg mb-1">{title}</p>
      <p className="text-sm text-fjord/80 leading-relaxed mb-4">{text}</p>
      {disclosure && (
        <p className="text-sm font-semibold text-fjord bg-mist/50 rounded-lg p-3 mb-4">{disclosure}</p>
      )}
      <a
        href={href}
        target="_blank"
        rel="sponsored nofollow noopener"
        className="inline-block bg-fjord text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:opacity-90"
      >
        {cta}
      </a>
    </aside>
  );
}
