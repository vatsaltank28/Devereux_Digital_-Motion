import type { Block } from "@/data/insights";

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/** Renders article body blocks. `flow` and `compare` are the in-article diagrams. Server component: no JS. */
export function ArticleBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.t) {
          case "p":
            return <p key={i}>{b.text}</p>;
          case "h3":
            return <h3 key={i}>{b.text}</h3>;
          case "ul":
            return (
              <ul key={i} className="art-list">
                {b.items.map((x) => <li key={x}>{x}</li>)}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="art-olist">
                {b.items.map((x) => <li key={x}>{x}</li>)}
              </ol>
            );
          case "quote":
            return <blockquote key={i} className="art-quote">{b.text}</blockquote>;
          case "callout":
            return (
              <aside key={i} className={b.tone === "warn" ? "art-callout is-warn" : "art-callout"}>
                <p className="art-callout-title">{b.title}</p>
                <p>{b.text}</p>
              </aside>
            );
          case "steps":
            return (
              <ol key={i} className="art-steps">
                {b.items.map((s, n) => (
                  <li key={s.title}>
                    <span className="art-step-n" aria-hidden="true">{String(n + 1).padStart(2, "0")}</span>
                    <span>
                      <strong>{s.title}</strong>
                      <span className="block">{s.text}</span>
                    </span>
                  </li>
                ))}
              </ol>
            );
          case "flow":
            return (
              <figure key={i} className="art-flow">
                <ol>
                  {b.items.map((x, n) => (
                    <li key={x}>
                      <span className="art-flow-node"><span className="art-flow-n" aria-hidden="true">{n + 1}</span>{x}</span>
                      {n < b.items.length - 1 && <span className="art-flow-arrow" aria-hidden="true"><Arrow /></span>}
                    </li>
                  ))}
                </ol>
                <figcaption>{b.caption}</figcaption>
              </figure>
            );
          case "compare":
            return (
              <figure key={i} className="art-compare">
                <div className="art-compare-scroll">
                  <table>
                    <thead>
                      <tr>
                        <th scope="col"><span className="sr-only">Aspect</span></th>
                        <th scope="col">{b.head[0]}</th>
                        <th scope="col">{b.head[1]}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {b.rows.map(([k, x, y]) => (
                        <tr key={k}>
                          <th scope="row">{k}</th>
                          <td>{x}</td>
                          <td>{y}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <figcaption>{b.caption}</figcaption>
              </figure>
            );
        }
      })}
    </>
  );
}
