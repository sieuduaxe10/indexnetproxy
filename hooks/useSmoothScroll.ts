import { useEffect, useRef } from "react";

interface SmoothScrollOptions {
  ease?: number;
  speedMultiplier?: number;
  enabled?: boolean;
}

export const useSmoothScroll = (options: SmoothScrollOptions = {}) => {
  const { ease = 0.1, speedMultiplier = 1, enabled = true } = options;

  const scrollY = useRef(0);
  const currentY = useRef(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const handleScroll = () => {
      scrollY.current = window.pageYOffset;
    };

    const animate = () => {
      // Lerp (Linear Interpolation)
      currentY.current += (scrollY.current - currentY.current) * ease;

      // Round to prevent sub-pixel rendering
      currentY.current = Math.round(currentY.current * 100) / 100;

      // Continue animation
      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [ease, speedMultiplier, enabled]);

  return currentY;
};
