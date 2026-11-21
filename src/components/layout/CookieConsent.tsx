"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useState } from "react";

const KEY = "dd-cookie-consent";
export type ConsentState = { necessary: true; statistics: boolean; marketing: boolean; at: string };

function save(state: { statistics: boolean; marketing: boolean }) {
  const value: ConsentState = { necessary: true, ...state, at: new Date().toISOString() };
  try {
    localStorage.setItem(KEY, JSON.stringify(value));
  } catch {}
  (window as unknown as { __cookieConsent?: ConsentState }).__cookieConsent = value;
  window.dispatchEvent(new CustomEvent("devereux:consent", { detail: value }));
}

function Toggle({ label, desc, checked, disabled, onChange }: { label: string; desc: string; checked: boolean; disabled?: boolean; onChange?: (v: boolean) => void }) {
  const id = useId();
  return (
    <div className="ck-row">
      <div>
        <label htmlFor={id} className="ck-row-title">{label}</label>
        <p className="ck-row-desc">{desc}</p>
      </div>
      <input id={id} type="checkbox" role="switch" className="ck-switch" checked={checked} disabled={disabled} onChange={(e) => onChange?.(e.target.checked)} />
    </div>
  );
}

/**
 * Consent banner (client reference: "We value your privacy" card with Cookie settings,
 * Necessary only and Accept all). Remembered per browser; reopen with the
 * `devereux:open-consent` event (footer "Cookie settings" link).
 */
export function CookieConsent({ openSettings = false }: { openSettings?: boolean }) {
  const [show, setShow] = useState(openSettings);
  const [settings, setSettings] = useState(openSettings);
  const [stats, setStats] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const titleId = useId();

  useEffect(() => {
    let saved: ConsentState | null = null;
    try {
      const raw = localStorage.getItem(KEY);
      saved = raw && raw.startsWith("{") ? (JSON.parse(raw) as ConsentState) : null;
    } catch {}
    const open = () => {
      const current = (window as unknown as { __cookieConsent?: ConsentState }).__cookieConsent;
      setStats(Boolean(current?.statistics));
      setMarketing(Boolean(current?.marketing));
      setSettings(true);
      setShow(true);
    };
    window.addEventListener("devereux:open-consent", open);
    let t: ReturnType<typeof setTimeout> | undefined;
    if (saved) {
      (window as unknown as { __cookieConsent?: ConsentState }).__cookieConsent = saved;
    } else {
      t = setTimeout(() => setShow(true), 1200);
    }
    return () => {
      if (t) clearTimeout(t);
      window.removeEventListener("devereux:open-consent", open);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("consent-open", show);
  }, [show]);

  const finish = useCallback((s: { statistics: boolean; marketing: boolean }) => {
    save(s);
    setShow(false);
    setSettings(false);
  }, []);

  if (!show) return null;
  return (
    <section role="dialog" aria-modal="false" aria-labelledby={titleId} className="ck">
      <h2 id={titleId} className="ck-title">We value your privacy</h2>
      <p className="ck-text">
        We use technically necessary cookies to run this site. Optional statistics and marketing cookies are set only with your consent.{" "}
        <Link href="/privacy" className="ck-link">Privacy Policy</Link>
      </p>

      {settings && (
        <div className="ck-settings">
          <Toggle label="Necessary" desc="Required for the site to work. Always on." checked disabled />
          <Toggle label="Statistics" desc="Anonymous usage data that helps us improve the site." checked={stats} onChange={setStats} />
          <Toggle label="Marketing" desc="Measures our ads and shows relevant offers." checked={marketing} onChange={setMarketing} />
        </div>
      )}

      <div className="ck-actions">
        {settings ? (
          <button type="button" className="ck-btn ck-btn-ghost" onClick={() => finish({ statistics: stats, marketing })}>
            Save my choices
          </button>
        ) : (
          <button type="button" className="ck-btn-text" onClick={() => setSettings(true)}>
            Cookie settings
          </button>
        )}
        <button type="button" className="ck-btn ck-btn-ghost" onClick={() => finish({ statistics: false, marketing: false })}>
          Necessary only
        </button>
        <button type="button" className="ck-btn ck-btn-solid" onClick={() => finish({ statistics: true, marketing: true })}>
          Accept all
        </button>
      </div>
    </section>
  );
}
