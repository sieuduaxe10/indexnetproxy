import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Hamburger = ({
  className,
  menuOpen,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { menuOpen: boolean }) => {
  return (
    <button
      type="button"
      aria-label="Open menu"
      className={cn(
        "relative overflow-hidden cursor-pointer aspect-square h-[57px] w-[57px] flex-none",
        className
      )}
      style={{ transform: "none", transformOrigin: "50% 50% 0px" }}
      {...props}
    >
      {/* Top bar  */}
      <div
        className={cn(
          "absolute h-[3px] w-[34px] overflow-hidden top-[17px] left-[calc(50.8772%-17px)] rounded-10 bg-hamburger-dark will-change-transform",
          menuOpen &&
            "rounded-[29.4118%/333.333%] -rotate-45 top-[calc(49.1228%-1.5px)]"
        )}
        style={{ transform: "none", transformOrigin: "50% 50% 0px" }}
      />

      {/* Middle bar */}
      <div
        className={cn(
          "absolute h-[3px] w-[34px] overflow-hidden top-[calc(50.8772%-1.5px)] left-[calc(50.8772%-17px)] rounded-10 bg-hamburger-dark will-change-transform opacity-100",
          menuOpen && "opacity-0 rounded-10"
        )}
        style={{ transform: "none", transformOrigin: "50% 50% 0px" }}
      />

      {/* Bottom bar */}
      <div
        className={cn(
          "absolute h-[3px] w-[34px] overflow-hidden bottom-4 left-[calc(50.8772%-17px)] rounded-10 bg-hamburger-dark will-change-transform",
          menuOpen &&
            "rounded-[29.4118%/333.333%] rotate-45 top-[calc(49.1228%-1.5px)]"
        )}
        style={{ transform: "none", transformOrigin: "50% 50% 0px" }}
      />
    </button>
  );
};
