"use client";

import React, { useEffect, useRef, ReactNode, useState, useCallback } from "react";
import Lenis from "lenis";

interface SmoothScrollProviderProps {
  children: ReactNode;
  /** Lower = smoother; Lenis uses 0-1 lerp. */
  lerp?: number;
  /** Multiply speed; >1 scrolls faster. */
  speedMultiplier?: number;
  className?: string;
  /** Disable smooth scroll below 1200px (mobile/tablet). */
  disableOnMobile?: boolean;
}

export const SmoothScrollProvider: React.FC<SmoothScrollProviderProps> = ({
  children,
  lerp = 0.1,
  speedMultiplier = 1,
  className = "",
  disableOnMobile = true,
}) => {
  const lenisRef = useRef<Lenis | null>(null);
  const rafId = useRef<number | null>(null);
  const [enabled, setEnabled] = useState(false);

  const evaluateEnabled = useCallback(() => {
    if (typeof window === "undefined") return;
    const prefersReduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobileWidth = window.innerWidth < 1200;
    const nextEnabled = !prefersReduce && !(disableOnMobile && isMobileWidth);
    // Defer to next frame to avoid synchronous setState warning
    requestAnimationFrame(() => setEnabled(nextEnabled));
  }, [disableOnMobile]);

  useEffect(() => {
    evaluateEnabled();
    window.addEventListener("resize", evaluateEnabled);
    return () => window.removeEventListener("resize", evaluateEnabled);
  }, [evaluateEnabled]);

  // Initialize Lenis
  useEffect(() => {
    if (!enabled) return;

    const lenis = new Lenis({
      lerp,
      duration: 1 / Math.max(speedMultiplier, 0.1),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId.current = requestAnimationFrame(raf);
    };
    rafId.current = requestAnimationFrame(raf);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [lerp, speedMultiplier, enabled]);

  // Hash scrolling (initial + hash changes + same-page links)
  useEffect(() => {
    const scrollToHash = (hash: string, attempt = 0) => {
      if (!hash || attempt > 10) return;
      const targetId = hash.replace("#", "");
      const el = document.getElementById(targetId);
      if (!el) {
        requestAnimationFrame(() => scrollToHash(hash, attempt + 1));
        return;
      }

      const doScroll = () => {
        const lenis = lenisRef.current;
        if (lenis) {
          lenis.scrollTo(el, { offset: 0 });
        } else {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      };

      requestAnimationFrame(doScroll);
    };

    const onLoad = () => scrollToHash(window.location.hash);
    onLoad();

    const onHashChange = () => scrollToHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);

    const onClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement | null)?.closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href) return;

      const url = href.startsWith("#")
        ? new URL(window.location.href.split("#")[0] + href)
        : (() => {
            try {
              return new URL(href, window.location.href);
            } catch {
              return null;
            }
          })();
      if (!url || !url.hash) return;

      if (url.pathname === window.location.pathname) {
        event.preventDefault();
        if (history.pushState) {
          history.pushState(null, "", url.hash);
        } else {
          window.location.hash = url.hash;
        }
        scrollToHash(url.hash);
      }
    };

    window.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("click", onClick);
    };
  }, []);

  return <div className={className}>{children}</div>;
};
