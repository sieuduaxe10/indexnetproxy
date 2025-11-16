import Image from "next/image";

export const MainCharacter = () => {
  return (
    <div className="absolute top-[39%] 4xl:top-[51%] 7xl:top-[57%] left-[56%] 4xl:left-[67%] 7xl:left-[64%] translate-x-[-50%] translate-y-[-50%] aspect-[0.950745] w-[363px] h-[382px] 7xl:w-[400px] 7xl:h-[421px]">
      <div className="absolute">
        <Image
          src="/images/hero/goose.png"
          alt="netproxy goose character"
          width={400}
          height={421}
          className="w-[363px] h-[382px] 7xl:w-[400px] 7xl:h-[421px]"
          priority
        />
      </div>
    </div>
  );
};
