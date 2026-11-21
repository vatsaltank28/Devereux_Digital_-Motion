"use client";

/** Reopens the consent banner in settings mode. */
export function CookieSettingsLink() {
  return (
    <button type="button" className="link-quiet" onClick={() => window.dispatchEvent(new Event("devereux:open-consent"))}>
      Cookie settings
    </button>
  );
}
