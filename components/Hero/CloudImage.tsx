import Image from "next/image";

export const CloudImage = () => {
  return (
    <div className="hidden 4xl:block absolute z-0 will-change-transform opacity-100 top-[381px] left-1/2 -translate-x-1/2 translate-y-[45.6px] w-[842px] h-auto aspect-[1.31203] 4xl:top-[437px] 4xl:translate-y-[9.8px] 4xl:w-[761px] 7xl:top-[75px] 7xl:w-[924px] 7xl:translate-y-[9.8px]">
      <div className="absolute inset-0">
        <Image
          src="/images/hero/cloud-background-decor.png"
          alt="netproxy Hero background"
          width={924}
          height={704}
          className="aspect-[1.31203] object-cover object-center"
          sizes="(min-width:1200px) 924px, (min-width:810px) 761px, 842px"
        />
      </div>
    </div>
  );
};
