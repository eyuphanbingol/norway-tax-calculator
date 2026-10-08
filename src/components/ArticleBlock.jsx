// Renderer for artikkelblokker (h2, p, ul, table) – brukes av norske og engelske guider
export default function ArticleBlock({ b }) {
  if (b.type === 'h2') return <h2>{b.text}</h2>;
  if (b.type === 'p') return <p>{b.text}</p>;
  if (b.type === 'ul') return <ul>{b.items.map((i) => <li key={i}>{i}</li>)}</ul>;
  if (b.type === 'table')
    return (
      <table>
        <thead><tr>{b.head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
        <tbody>{b.rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody>
      </table>
    );
  return null;
}
