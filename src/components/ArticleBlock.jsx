import Link from 'next/link';

// Gjør om [tekst](/sti) eller [tekst](https://...) i artikkeltekst til lenker
export function Rich({ text }) {
  const parts = [];
  const re = /\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  let m;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const [, label, href] = m;
    parts.push(
      href.startsWith('/')
        ? <Link key={m.index} href={href}>{label}</Link>
        : <a key={m.index} href={href} rel="nofollow noopener" target="_blank">{label}</a>
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

// Renderer for artikkelblokker (h2, h3, p, ul, table) – brukes av norske og engelske guider.
// Tekst kan inneholde lenker som [tekst](/sti).
export default function ArticleBlock({ b }) {
  if (b.type === 'h2') return <h2>{b.text}</h2>;
  if (b.type === 'h3') return <h3>{b.text}</h3>;
  if (b.type === 'p') return <p><Rich text={b.text} /></p>;
  if (b.type === 'ul') return <ul>{b.items.map((i) => <li key={i}><Rich text={i} /></li>)}</ul>;
  if (b.type === 'table')
    return (
      <table>
        <thead><tr>{b.head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
        <tbody>{b.rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{typeof c === 'string' ? <Rich text={c} /> : c}</td>)}</tr>)}</tbody>
      </table>
    );
  return null;
}

// Kildeliste nederst i en artikkel: sources = [{ name, url }]
export function Sources({ sources, lang = 'no' }) {
  if (!sources?.length) return null;
  return (
    <>
      <h2>{lang === 'en' ? 'Sources' : 'Kilder'}</h2>
      <ul>
        {sources.map((s) => (
          <li key={s.url}><a href={s.url} rel="nofollow noopener" target="_blank">{s.name}</a></li>
        ))}
      </ul>
    </>
  );
}
