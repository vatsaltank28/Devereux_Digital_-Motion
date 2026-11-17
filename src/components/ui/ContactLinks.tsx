import type { ReactNode } from "react";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

/**
 * Contact channels with brand icons. Each item renders only when its value is configured (see .env.example),
 * so nothing unapproved is ever published. Used on /contact (as cards) and in the footer (as icon buttons).
 */
type Channel = { key: string; label: string; value: string; href: string; icon: ReactNode; external?: boolean };

const svg = (path: ReactNode, fill = false) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
    fill={fill ? "currentColor" : "none"}
    stroke={fill ? "none" : "currentColor"}
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {path}
  </svg>
);

const ICONS: Record<string, ReactNode> = {
  email: svg(<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>),
  phone: svg(<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />),
  whatsapp: svg(
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2.1 1-2.4c.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .6l-.4.6-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.2.5.1.6-.1l.9-1c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.5.3.1.2.1.7-.1 1.3Z" />,
    true,
  ),
  discord: svg(
    <path d="M19.6 5.3A16.5 16.5 0 0 0 15.5 4l-.5 1a15.3 15.3 0 0 0-6 0l-.5-1a16.4 16.4 0 0 0-4.1 1.3C1.8 9.2 1.1 13 1.5 16.7a16.6 16.6 0 0 0 5 2.5l1.1-1.7a10.7 10.7 0 0 1-1.7-.8l.4-.3a11.8 11.8 0 0 0 11.4 0l.4.3-1.7.8 1.1 1.7a16.5 16.5 0 0 0 5-2.5c.5-4.3-.7-8-2.9-11.4ZM8.7 14.4c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Zm6.6 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Z" />,
    true,
  ),
  facebook: svg(<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H8v4h2v8h4v-8h3l1-4h-4V8.5c0-.3.2-.5.5-.5Z" />, true),
  tiktok: svg(<path d="M16.5 3c.4 2.2 1.8 3.6 4 3.9v3.4a8 8 0 0 1-4-1.3v6.3A6.2 6.2 0 1 1 10.3 9v3.5a2.8 2.8 0 1 0 2.8 2.8V3h3.4Z" />, true),
  linkedin: svg(<><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" /></>),
  instagram: svg(<><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5v.01" /></>),
  x: svg(<path d="M4 4l16 16M20 4 4 20" />),
  behance: svg(<path d="M3 6h5a3 3 0 0 1 0 6H3V6Zm0 6h5.5a3 3 0 0 1 0 6H3v-6ZM15 8h5M14 14h7a3.5 3.5 0 1 0-1 2.5" />),
};

export function getChannels(): Channel[] {
  const out: Channel[] = [];
  const c = site.contact;
  if (c.email) out.push({ key: "email", label: "Email", value: c.email, href: `mailto:${c.email}`, icon: ICONS.email });
  if (c.phone) out.push({ key: "phone", label: "Phone", value: c.phone, href: `tel:${c.phone.replace(/\s+/g, "")}`, icon: ICONS.phone });
  if (c.whatsapp) out.push({ key: "whatsapp", label: "WhatsApp", value: "Message us", href: c.whatsapp, icon: ICONS.whatsapp, external: true });
  if (c.discord) out.push({ key: "discord", label: "Discord", value: "Chat with us", href: c.discord, icon: ICONS.discord, external: true });
  for (const s of site.social) {
    const key = s.label.toLowerCase();
    out.push({ key, label: s.label, value: "Follow us", href: s.href, icon: ICONS[key] ?? ICONS.email, external: true });
  }
  return out;
}

/** Large cards with icon, label and value — for the contact page. */
export function ContactCards({ className }: { className?: string }) {
  const channels = getChannels();
  if (!channels.length) return null;
  return (
    <ul className={cn("grid gap-3 sm:grid-cols-2", className)}>
      {channels.map((ch) => (
        <li key={ch.key}>
          <a
            href={ch.href}
            {...(ch.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="group flex items-center gap-4 rounded-[var(--radius-card-sm)] border border-line bg-surface p-4 transition-colors hover:border-line-strong"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-accent/12 text-accent transition-colors group-hover:bg-accent group-hover:text-[var(--color-on-accent)]">
              {ch.icon}
            </span>
            <span className="min-w-0">
              <span className="block text-sm text-muted">{ch.label}</span>
              <span className="block truncate font-medium">{ch.value}</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

/** Row of round icon buttons — for the footer. */
export function ContactIcons({ className }: { className?: string }) {
  const channels = getChannels();
  if (!channels.length) return null;
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {channels.map((ch) => (
        <li key={ch.key}>
          <a
            href={ch.href}
            aria-label={`${ch.label}${ch.key === "email" || ch.key === "phone" ? `: ${ch.value}` : ""}`}
            title={ch.label}
            {...(ch.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="grid size-11 place-items-center rounded-full border border-line-strong text-muted transition-colors hover:border-accent hover:bg-accent hover:text-[var(--color-on-accent)]"
          >
            {ch.icon}
          </a>
        </li>
      ))}
    </ul>
  );
}
