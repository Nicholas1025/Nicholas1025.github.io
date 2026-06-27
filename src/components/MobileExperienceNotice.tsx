import { useEffect, useState } from "react";

const STORAGE_KEY = "ntay-mobile-experience-notice-dismissed";

function isMobileViewport() {
  if (typeof window === "undefined") return false;

  return window.matchMedia("(max-width: 780px), (pointer: coarse)").matches;
}

export default function MobileExperienceNotice() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isMobileViewport()) return;
    if (window.localStorage.getItem(STORAGE_KEY) === "true") return;

    const timer = window.setTimeout(() => setIsVisible(true), 900);
    return () => window.clearTimeout(timer);
  }, []);

  function dismiss() {
    window.localStorage.setItem(STORAGE_KEY, "true");
    setIsVisible(false);
  }

  if (!isVisible) return null;

  return (
    <aside className="mobile-experience-notice" role="status" aria-live="polite">
      <div>
        <p className="mobile-experience-notice__kicker">$ detect mobile_route</p>
        <p className="mobile-experience-notice__title">Desktop route recommended.</p>
        <p className="mobile-experience-notice__copy">
          This site has richer motion, spacing, and trail details on a computer.
        </p>
      </div>
      <button type="button" onClick={dismiss} aria-label="Dismiss desktop experience notice">
        continue anyway
      </button>
    </aside>
  );
}
