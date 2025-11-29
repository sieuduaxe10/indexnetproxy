import Image from "next/image";
const HeroGlobeIcon = () => {
  return (
    <div className="absolute top-[62px] right-[41px] w-[71px] h-auto aspect-[0.933333] select-none 4xl:top-[180px] 4xl:left-[25%] 4xl:right-auto 4xl:translate-x-[-50%] 4xl:w-[56px] 7xl:left-[30%] 7xl:w-[56px] 7xl:translate-x-[-50%]">
      <div className="absolute inset-0">
        <Image
          src="/images/hero/hero-globe-icon.png"
          alt="netproxy globe icon"
          width={56}
          height={60}
          className="w-full h-auto"
          sizes="(min-width:1200px) 56px, (min-width:810px) 56px, 71px"
        />
      </div>
    </div>
  );
};
export default HeroGlobeIcon;
