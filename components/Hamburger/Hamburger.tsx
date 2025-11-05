import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Hamburger = ({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      type="button"
      aria-label="Open menu"
      className={cn(
        "relative overflow-hidden cursor-pointer aspect-square h-[57px] w-[57px] flex-none",
        className
      )}
      {...props}
    >
      {/* Top bar */}
      <div className="absolute h-[3px] w-[34px] overflow-hidden top-[17px] left-[calc(50.8772%-17px)] rounded-10 bg-hamburger-dark will-change-transform" />

      {/* Middle bar */}
      <div className="absolute h-[3px] w-[34px] overflow-hidden top-[calc(50.8772%-2px)] left-[calc(50.8772%-17px)] rounded-10 bg-hamburger-dark will-change-transform" />

      {/* Bottom bar */}
      <div className="absolute h-[3px] w-[34px] overflow-hidden bottom-4 left-[calc(50.8772%-17px)] rounded-10 bg-hamburger-dark will-change-transform" />
    </button>
  );
};
