import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ } from "@/types";
import { cn } from "@/lib/utils";

export interface Props {
  faqs: FAQ[];
  className?: string;
}

const Faqs = ({ faqs, className }: Props) => {
  return (
    <div
      className={cn(
        "text-start bg-white shadow-lg border text-black rounded-md  mt-16  w-full mx-auto",
        className
      )}
    >
      <div className="bg-slate-100 py-5">
        <h3 className=" text-center md:text-2xl text-xl font-[600] my-4">
          Frequently Asked Questions
        </h3>
      </div>
      <div className="md:px-8 px-3 md:py-4 py-4">
        <Accordion type="single" collapsible className="">
          {faqs.map((faq, i) => (
            <AccordionItem value={`item-${i + 1}`} key={i}>
              <AccordionTrigger className="md:text-[17px] font-[500] text-sm text-start">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default Faqs;
