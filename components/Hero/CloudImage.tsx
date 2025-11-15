import Image from "next/image";

export const CloudImage = () => {
  return (
    <div className="hidden 4xl:absolute z-0 will-change-transform opacity-100 top-[85px] left-[50%] -translate-x-1/2 w-[924px] h-[704px]">
      <div className="absolute inset-0">
        <Image
          src="/images/hero/cloud-background-decor.avif"
          alt="Hero background"
          width={924}
          height={704}
          className="aspect-[1.31203] object-cover object-center"
          priority
        />
      </div>
    </div>
  );
};
