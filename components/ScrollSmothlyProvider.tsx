"use client";

import React, { useEffect, useRef, ReactNode, useCallback } from "react";

interface SmoothScrollProviderProps {
  children: ReactNode;
  ease?: number;
  speedMultiplier?: number;
  className?: string;
  disableOnMobile?: boolean;
}

export const SmoothScrollProvider: React.FC<SmoothScrollProviderProps> = ({
  children,
  ease = 0.1,
  speedMultiplier = 1,
  className = "",
  disableOnMobile = true,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollY = useRef(0);
  const currentY = useRef(0);
  const rafId = useRef<number | null>(null);
  const resizeObserver = useRef<ResizeObserver | null>(null);
  const isMobile = useRef(false);
  const isScrolling = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      isMobile.current =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ) || window.innerWidth < 768;
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const updateHeight = useCallback(() => {
    if (!contentRef.current) return;
    const contentHeight = contentRef.current.offsetHeight;
    document.body.style.height = `${contentHeight}px`;
  }, []);

  useEffect(() => {
    if (!wrapperRef.current || !contentRef.current) return;

    const content = contentRef.current;
    const wrapper = wrapperRef.current;

    // Disable smooth scroll on mobile if flag is set
    if (disableOnMobile && isMobile.current) {
      wrapper.style.position = "static";
      wrapper.style.transform = "none";
      document.body.style.height = "";
      return;
    }

    updateHeight();

    // Use ResizeObserver for better performance than resize event
    resizeObserver.current = new ResizeObserver(() => {
      updateHeight();
    });
    resizeObserver.current.observe(content);

    const handleScroll = () => {
      scrollY.current = window.pageYOffset;

      // Optimize: Only run animation when scrolling
      if (!isScrolling.current) {
        isScrolling.current = true;
        if (!rafId.current) {
          rafId.current = requestAnimationFrame(animate);
        }
      }

      // Stop animation after scrolling ends
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      scrollTimeout.current = setTimeout(() => {
        isScrolling.current = false;
      }, 150);
    };

    const animate = () => {
      // Calculate distance to target
      const distance = scrollY.current - currentY.current;

      // Stop animation if close enough (within 0.5px)
      if (Math.abs(distance) < 0.5) {
        currentY.current = scrollY.current;
        wrapper.style.transform = `translate3d(0, -${currentY.current}px, 0)`;

        if (!isScrolling.current) {
          rafId.current = null;
          return;
        }
      }

      // Smooth lerp
      currentY.current += distance * ease;

      // Use translate3d for better performance (GPU acceleration)
      wrapper.style.transform = `translate3d(0, -${currentY.current}px, 0)`;

      rafId.current = requestAnimationFrame(animate);
    };

    // Use passive listener for better scroll performance
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Start animation loop
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (resizeObserver.current) {
        resizeObserver.current.disconnect();
      }

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }

      document.body.style.height = "";
      wrapper.style.transform = "none";
    };
  }, [ease, speedMultiplier, updateHeight, disableOnMobile]);

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
