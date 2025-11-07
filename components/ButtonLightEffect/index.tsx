import { Star } from "lucide-react";

interface ButtonProps {
  label?: string;
  onClick?: () => void;
}

export function ButtonLightEffect({
  label = "Most Popular",
  onClick,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="
        relative flex items-center gap-2 px-4 py-2.5 rounded-full 
        border border-[#F0C5A8] bg-[#FF781F] text-white font-semibold
        hover:opacity-90 transition-all duration-200
        overflow-hidden
      "
    >
      {/* Icon */}
      <Star className="w-4 h-4 fill-current" />

      {/* Text */}
      <span className="text-xs font-ibm-plex-mono uppercase">
        <strong>{label}</strong>
      </span>

      {/* Light effect (the white blur streak) */}
      <span
        className="
          absolute top-[-19px] bottom-[-18px] left-[-26px] w-[9px]
          bg-white mix-blend-overlay blur-[8px]
          rotate-[30deg] opacity-100
          animate-shine
        "
      />
    </button>
  );
}
