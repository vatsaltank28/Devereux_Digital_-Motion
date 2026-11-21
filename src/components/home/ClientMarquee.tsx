/* eslint-disable @next/next/no-img-element */
const CLIENTS = [
  { name: "Bellroy", src: "/clients/bellroy.png" },
  { name: "Fly Away Travel", src: "/clients/flyaway.png" },
  { name: "Cole Buxton", src: "/clients/cole-buxton.png" },
  { name: "Chamberlain Coffee", src: "/clients/chamberlain-coffee.png" },
  { name: "Oatly", src: "/clients/oatly.png" },
  { name: "Reclaim.ai", src: "/clients/reclaim.png" },
  { name: "Readwise", src: "/clients/readwise.png" },
];

function Row({ reverse, offset }: { reverse?: boolean; offset: number }) {
  const list = [...CLIENTS.slice(offset), ...CLIENTS.slice(0, offset)];
  return (
    <div className={`client-row${reverse ? " is-reverse" : ""}`} aria-hidden="true">
      {/* Two copies so the -50% translate loops seamlessly. */}
      {[0, 1].map((copy) => (
        <ul key={copy} className="client-track">
          {list.map((c) => (
            <li key={c.name} className="client-logo">
              <img src={c.src} alt="" loading="lazy" decoding="async" width={160} height={64} />
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

/** "Trusted by" logo marquee: pure CSS transform animation (compositor only, no JS). */
export function ClientMarquee() {
  return (
    <section aria-labelledby="clients-heading" className="client-marquee border-t border-line">
      <p id="clients-heading" className="client-heading">Trusted by brands and teams at</p>
      <p className="sr-only">{CLIENTS.map((c) => c.name).join(", ")}</p>
      <Row offset={0} />
      <Row reverse offset={3} />
    </section>
  );
}
