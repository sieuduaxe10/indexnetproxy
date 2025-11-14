import Image from "next/image";

const Logo = () => (
  <div className="flex items-center">
    <Image
      src="/images/logo/Logo.avif"
      alt="Netproxy Logo"
      width={174} // intrinsic size (largest case)
      height={43.98}
      priority
      quality={100}
      sizes="(min-width: 810px) 134.5px, 174px"
      className="w-[174px] h-[43.98px] 4xl:w-[134.5px] 4xl:h-[34px]"
    />
  </div>
);

export default Logo;
