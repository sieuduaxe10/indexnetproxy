"use client";
import { useEffect, useRef } from "react";

export const ScrollSmoothlyProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const sectionsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      sectionsRef.current.forEach((section) => {
        if (!section) return;

        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Simple fade in when section enters viewport
        if (rect.top < windowHeight * 0.7) {
          section.style.opacity = "1";
          section.style.transform = "translateY(0)";
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //   const addToRefs = (el) => {
  //     if (el && !sectionsRef.current.includes(el)) {
  //       sectionsRef.current.push(el);
  //     }
  //   };
  return <div>{children}</div>;
};
