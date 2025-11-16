import Image from "next/image";
const HeroGlobeIcon = () => {
  return (
    <div className="absolute top-[180px] left-[30%] translate-x-[-50%] aspect-[0.933333] h-auto flex-none w-14 select-none">
      <div className="absolute">
        <Image
          src="/images/hero/hero-globe-icon.avif"
          alt="netproxy globe icon"
          width={56}
          height={60}
          priority
        />
      </div>
    </div>
  );
};
export default HeroGlobeIcon;
