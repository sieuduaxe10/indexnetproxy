import Image from "next/image";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const logoSrc = apiBaseUrl
  ? `${apiBaseUrl}/public/logos/logo`
  : "/images/logo/Logo.webp";

const Logo = () => (
  <div className="flex items-center">
    <Image
      src={logoSrc}
      alt="Netproxy Logo"
      width={174}
      height={44}
      sizes="(min-width: 810px) 134.5px, 174px"
      className="w-[174px] h-[43.98px] 4xl:w-[134.5px] 4xl:h-[34px]"
      unoptimized={!!apiBaseUrl}
    />
  </div>
);

export default Logo;
