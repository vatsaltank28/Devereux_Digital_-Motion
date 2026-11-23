import { getService } from "./services";
import { serviceGroups, workLinks } from "./nav";

export interface DesktopNavData {
  groups: { title: string; items: { slug: string; title: string; desc: string }[] }[];
  work: { id: string; label: string; desc: string; count: number; href: string; glyph: string | null }[];
}

/** Built on the server so the header does not ship the full service and portfolio data to the browser. */
export const desktopNavData: DesktopNavData = {
  groups: serviceGroups.map((g) => ({
    title: g.title,
    items: g.slugs.flatMap((slug) => {
      const s = getService(slug);
      return s ? [{ slug, title: s.title, desc: s.bestFor ?? s.shortDescription }] : [];
    }),
  })),
  work: workLinks,
};
