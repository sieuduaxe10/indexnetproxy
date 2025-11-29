"use client";

import Image from "next/image";

export const MonitorImage = () => {
  return (
    <div className="absolute inset-0">
      <Image
        src="/images/hero/monitor-icon.avif"
        alt="netproxy monitor icon"
        width={153}
        height={176}
        className="h-auto"
      />
    </div>
    // </div>
  );
};
