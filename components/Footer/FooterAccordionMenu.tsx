"use client";

import { Link } from "@/i18n/routing";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

type FooterAccordionSection = {
  title: string;
  items: Array<{
    label: string;
    href?: string;
    external?: boolean;
  }>;
};

interface FooterAccordionMenuProps {
  sections: FooterAccordionSection[];
}

export function FooterAccordionMenu({ sections }: FooterAccordionMenuProps) {
  return (
    <div className="4xl:hidden flex flex-col gap-4">
      {sections.map((section, index) => (
        <Accordion
          key={`${section.title}-${index}`}
          type="single"
          collapsible
          defaultValue="item-1"
          className="border p-4 border-[#e3ecec] rounded-xl"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-ibm-plex-mono text-21 text-primary p-0! hover:no-underline">
              {section.title}
            </AccordionTrigger>
            <AccordionContent className="pb-0! mt-2">
              <div className="flex flex-col gap-2 font-ibm-plex-mono text-xs text-footer-text">
                {section.items.map((item) =>
                  item.href ? (
                    <Link
                      key={`${section.title}-${item.label}`}
                      href={item.href}
                      className="text-primary underline"
                      {...(item.external && { target: "_blank", rel: "noreferrer" })}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <div key={`${section.title}-${item.label}`}>
                      {item.label}
                    </div>
                  )
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
}
