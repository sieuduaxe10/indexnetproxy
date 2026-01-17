"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import { useBranding } from "@/lib/branding/context";

export const Resellers = () => {
  const t = useTranslations("resellers");
  const { storefrontUrl, businessName } = useBranding();

  return (
    <section className="relative px-5 py-[60px] md:px-10 md:py-20">
      <div className="container relative z-10">
        <div className="relative z-10 bg-primary border-[6px] border-[#f5c4a3] rounded-3xl p-10 max-w-960 mx-auto flex flex-col gap-5">
          <h3 className="text-center font-neue-kaine-bold text-2xl md:text-40 text-white max-w-[768px] mx-auto">
            {t("title", { business_name: businessName || "NetProxy.io" })}
          </h3>
          {storefrontUrl && (
            <Link href={storefrontUrl} className="center">
              <Button
                className="mx-auto! text-primary uppercase font-semibold px-8 h-10 center"
                variant={"secondary"}
              >
                {t("button")}
              </Button>
            </Link>
          )}
          <p className="text-center text-[#fdfdfd] mx-auto max-w-600 opacity-80">
            {t("description")}
          </p>
        </div>
      </div>

      <div className="bg-[#f2f7f7] h-[278px] absolute bottom-0 left-0 right-0 overflow-hidden"></div>
    </section>
  );
};
