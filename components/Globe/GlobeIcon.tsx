"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export const GlobeIcon = () => {
  return (
    <Button
      variant="icon"
      size="icon"
      className="h-9 w-9 rounded-md color-"
      aria-label="Change region"
    >
      <Image
        src="/images/header/globle.svg"
        alt="Proxy illustration"
        width={20}
        height={20}
        className=""
      />
    </Button>
  );
};
