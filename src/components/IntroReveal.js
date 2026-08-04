import React, { useEffect, useState } from "react";

function getInitialPhase() {
  if (typeof window === "undefined") {
    return "done";
  }
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const alreadyShown = sessionStorage.getItem("introShown");
  return reducedMotion || alreadyShown ? "done" : "showing";
}

export default function IntroReveal() {
  const [phase, setPhase] = useState(getInitialPhase);

  // Deliberately runs once on mount only -- if this depended on `phase`,
  // the effect would re-run (and its cleanup would fire) the moment the
  // wipe timer flips the phase, cancelling the not-yet-fired done timer
  // and leaving an invisible, click-blocking overlay stuck forever.
  useEffect(() => {
    if (phase !== "showing") {
      return;
    }
    sessionStorage.setItem("introShown", "1");
    const wipeTimer = setTimeout(() => setPhase("wiping"), 650);
    const doneTimer = setTimeout(() => setPhase("done"), 1050);
    return () => {
      clearTimeout(wipeTimer);
      clearTimeout(doneTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (phase === "done") {
    return null;
  }

  return (
    <div className={`intro-reveal ${phase === "wiping" ? "is-wiping" : ""}`} aria-hidden="true">
      <div className="intro-reveal__mark" />
    </div>
  );
}
