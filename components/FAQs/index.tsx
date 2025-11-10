"use client";
import { Accordion } from "@radix-ui/react-accordion";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { useState } from "react";
import clsx from "clsx";

export const FAQs = () => {
  const [openItem, setOpenItem] = useState<string | undefined>(undefined);
  const FAQsData = [
    {
      question: "What types of proxies does NetProxy.io offer?",
      answer:
        "NetProxy.io offers a variety of proxy types, including residential proxies, datacenter proxies, and mobile proxies. Each proxy type is designed to meet different needs, such as scraping, ad verification, or managing multiple accounts.",
    },
    {
      question: "What is proxy and how does it work?",
      answer:
        "A proxy is an intermediary server between your device and the internet, helping to forward your web requests and return responses from the server. NetProxy offers continuous IP rotation proxy packages, such as 1-minute or 2-minute IP rotation plans, which help protect your identity and enhance online security.",
    },
    {
      question:
        "Is NetProxy.io suitable for large-scale tasks like web scraping?",
      answer:
        "Absolutely! NetProxy.io is ideal for large-scale tasks like web scraping. Our proxies are designed to bypass detection, ensuring stable and uninterrupted connections, which are perfect for gathering data without risking bans.",
    },
    {
      question: "How can I get started with NetProxy.io?",
      answer:
        "Getting started is simple! Just sign up on our website, choose a proxy plan that fits your needs, and follow the step-by-step setup guide. If you encounter any issues, our support team is available 24/7 to assist you.",
    },
  ];
  return (
    <section id="faqs">
      <div className="px-10 py-20">
        <div className="text-13 text-primary text-center">FAQs</div>
        <h3 className="text-2xl md:text-33 font-neue-kaine-bold text-center mb-10 text-[#2c303b] font-normal">
          All your Questions, Answered
        </h3>
        <div className="max-w-960 mx-auto p-5 pb-0! bg-[#f2f7f7] rounded-[12px]">
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
                value={faq.question}
                className={clsx("item-1 border border-[#e3ecec] rounded-xl", {
                  "border-primary border-2": openItem === faq.question,
                })}
              >
                <AccordionTrigger
                  className={clsx(
                    "p-4 font-inter text-15 hover:no-underline text-[#2c303b] cursor-pointer bg-white faq-shadow",
                    {
                      "text-primary border-b-0! shadow-none! rounded-br-none! rounded-bl-none!":
                        openItem === faq.question,
                    }
                  )}
                >
                  <div className="flex gap-2 center">
                    <div
                      style={{
                        width: "32px", // adjust size as needed
                        height: "32px",
                        border: "1px solid rgb(227, 236, 236)",
                        borderRadius: "50%", // makes it a perfect circle
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "bold",
                        color: "rgb(25, 41, 77)",
                        backgroundColor: "white", // optional
                      }}
                    >
                      {index + 1}
                    </div>{" "}
                    <strong>{faq.question}</strong>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-4 border-t border-[#e3ecec]">
                  <div className="flex flex-col gap-2 font-inter text-16 text-footer-text">
                    {faq.answer}
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
