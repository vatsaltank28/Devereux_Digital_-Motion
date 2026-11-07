import Link from "next/link";

export interface Crumb {
  name: string;
  href?: string;
}

/** Visible breadcrumb trail; the last item is the current page. (JSON-LD is emitted separately via <JsonLd>.) */
export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-subtle">
        {trail.map((crumb, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={crumb.name} className="flex items-center gap-2">
              {crumb.href && !last ? (
                <Link href={crumb.href} className="link-quiet">
                  {crumb.name}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className={last ? "text-muted" : undefined}>
                  {crumb.name}
                </span>
              )}
              {!last && (
                <span aria-hidden="true" className="text-line-strong">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
