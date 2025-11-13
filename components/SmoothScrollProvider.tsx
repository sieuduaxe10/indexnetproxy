"use client";

import React, { useEffect, useRef, ReactNode } from "react";

interface SmoothScrollProviderProps {
  children: ReactNode;
  ease?: number;
  speedMultiplier?: number;
  className?: string;
}

export const SmoothScrollProvider: React.FC<SmoothScrollProviderProps> = ({
  children,
  ease = 0.1,
  speedMultiplier = 1,
  className = "",
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollY = useRef(0);
  const currentY = useRef(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (!wrapperRef.current || !contentRef.current) return;

    const content = contentRef.current;
    const wrapper = wrapperRef.current;

    // Set body height for scrollbar - KHÔNG nhân với speedMultiplier
    const updateHeight = () => {
      const contentHeight = content.offsetHeight;
      document.body.style.height = `${contentHeight}px`;
    };
    updateHeight();

    const handleScroll = () => {
      // Lấy scroll position thực tế, KHÔNG nhân với speedMultiplier
      scrollY.current = window.pageYOffset;
    };

    const animate = () => {
      // Lerp
      currentY.current += (scrollY.current - currentY.current) * ease;
      currentY.current = Math.round(currentY.current * 100) / 100;

      // Apply transform
      if (wrapper) {
        wrapper.style.transform = `translateY(-${currentY.current}px)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateHeight);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateHeight);
      document.body.style.height = "";
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [ease, speedMultiplier]);

  return (
    <div
      ref={wrapperRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        willChange: "transform",
      }}
      className={className}
    >
      <div ref={contentRef}>{children}</div>
    </div>
  );
};
