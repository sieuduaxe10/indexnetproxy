import Image from "next/image";

const Logo = () => (
  <div style={{ display: "flex", alignItems: "center" }}>
    <Image
      src="/images/logo/Logo.avif" // Place your logo image in the public folder
      alt="Netproxy Logo"
      width={134}
      height={34}
      priority
    />
  </div>
);

export default Logo;
