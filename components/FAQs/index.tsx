"use client";
import { Accordion } from "@radix-ui/react-accordion";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { useState } from "react";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useBranding } from "@/lib/branding/context";

export const FAQs = () => {
  const t = useTranslations("faqs");
  const { businessName } = useBranding();
  const [openItem, setOpenItem] = useState<string | undefined>(undefined);
  const interpolationValues = { business_name: businessName || "NetProxy.io" };

  const FAQsData = [
    {
      questionKey: "questions.q1.question",
      answerKey: "questions.q1.answer",
    },
    {
      questionKey: "questions.q2.question",
      answerKey: "questions.q2.answer",
    },
    {
      questionKey: "questions.q3.question",
      answerKey: "questions.q3.answer",
    },
    {
      questionKey: "questions.q4.question",
      answerKey: "questions.q4.answer",
    },
  ];

  return (
    <section id="faqs">
      <div className="px-5 py-10 4xl:px-10 4xl:py-20">
        <div className="text-13 text-primary text-center">{t("tag")}</div>
        <h3 className="text-2xl 4xl:text-28 7xl:text-33 font-neue-kaine-bold text-center mb-10 text-[#2c303b] font-normal">
          {t("title")}
        </h3>
        <div className="max-w-960 mx-auto p-5 pb-0! bg-[#f2f7f7]  rounded-[12px]">
          <Accordion
            type="single"
            collapsible
            value={openItem}
            onValueChange={setOpenItem}
            className="flex flex-col gap-3"
          >
            {FAQsData.map((faq, index) => (
              <AccordionItem
                key={index}
                value={faq.questionKey}
                className={clsx(
                  "item-1 border border-[#e3ecec] rounded-lg overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.12)]",
                  {
                    "border-primary border-2": openItem === faq.questionKey,
                  }
                )}
              >
                <AccordionTrigger
                  className={clsx(
                    "p-4 font-inter text-15 hover:no-underline text-[#2c303b] cursor-pointer hover:bg-[#fdf4e4] bg-white faq-shadow",
                    {
                      "text-primary border-b-0! shadow-none! rounded-br-none! rounded-bl-none!":
                        openItem === faq.questionKey,
                    }
                  )}
                >
                  <div className="flex gap-2 center">
                    <div
                      style={{
                        minWidth: "32px",
                        minHeight: "32px",
                        width: "32px",
                        height: "32px",
                        border: "1px solid rgb(227, 236, 236)",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "bold",
                        color: "rgb(25, 41, 77)",
                        backgroundColor: "white",
                      }}
                    >
                      {index + 1}
                    </div>{" "}
                    <strong>{t(faq.questionKey, interpolationValues)}</strong>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-4 border-t border-[#e3ecec] bg-white">
                  <div className="flex flex-col gap-2 font-inter text-16 text-footer-text">
                    {t(faq.answerKey, interpolationValues)}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
            <div className="pb-5"></div>
          </Accordion>
        </div>
      </div>
    </section>
  );
};
