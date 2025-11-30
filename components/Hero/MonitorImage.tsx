"use client";

import Image from "next/image";

export const MonitorImage = () => {
  return (
    <div className="absolute inset-0">
      <Image
        src="/images/hero/monitor-icon.webp"
        alt="netproxy monitor icon"
        width={153}
        height={176}
        sizes="(min-width:1200px) 153px, (min-width:810px) 139px, 144px"
        className="w-full h-auto"
      />
    </div>
    // </div>
  );
};
