import Image from "next/image";

export const MainCharacter = () => {
  return (
    <div className="absolute top-[67%] left-[63%] translate-x-[-50%] translate-y-[-50%] aspect-[0.950745] w-[374px] h-auto 4xl:top-auto 4xl:bottom-0 4xl:left-auto 4xl:right-[100px] 4xl:translate-x-0 4xl:translate-y-0 4xl:w-[363px] 4xl:h-auto 7xl:top-[57%] 7xl:left-[64%] 7xl:translate-x-[-50%] 7xl:translate-y-[-50%] 7xl:w-[400px] 7xl:h-auto">
      <div className="absolute inset-0">
        <Image
          src="/images/hero/goose.webp"
          alt="netproxy goose character"
          width={400}
          height={421}
          sizes="(min-width:1200px) 400px, (min-width:810px) 363px, 374px"
          className="w-full h-auto"
        />
      </div>
    </div>
  );
};
