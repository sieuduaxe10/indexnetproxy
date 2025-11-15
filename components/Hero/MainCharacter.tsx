import { useResponsive } from "@/hooks/useResponsive";
import Image from "next/image";

export const MainCharacter = () => {
  const { isDesktop } = useResponsive();
  return (
    <div className="absolute top-[57%] left-[70%] 7xl:left-[64%] translate-x-[-50%] translate-y-[-50%] aspect-[0.950745] h-auto w-[400px]">
      <div className="absolute">
        <Image
          src="/images/hero/goose.png"
          alt="netproxy goose character"
          width={isDesktop ? 400 : 363}
          height={isDesktop ? 421 : 382}
          className=""
        />
      </div>
    </div>
  );
};
