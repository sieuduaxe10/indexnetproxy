"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export const GlobeIcon = (props: React.ComponentProps<"button">) => {
  return (
    <Button
      variant="icon"
      size="icon"
      className="h-9 w-9 min-[800px]:h-10 min-[800px]:w-10 rounded-md border"
      aria-label="Change region"
      {...props}
    >
      <Image
        src="/images/header/globle.svg"
        alt="Proxy illustration"
        width={20}
        height={20}
      />
    </Button>
  );
};
