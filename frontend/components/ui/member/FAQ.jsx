import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faq } from "@/lib/data/data";



const FAQ = () => {
  return (

    <div className="my-10 px-4 md:px-12">
        <h1 className="text-center my-5 font-medium text-2xl">Frequently Asked <span className="underline decoration-red-200"> Questions </span></h1>
      {faq.map((item) => (
        <div key={item.id}>
          <Accordion type="single" collapsible >
            <AccordionItem value={`item-${item.id}`} className="bg-red-100 mb-4  px-4 rounded-xl  drop-shadow-md py-1" >
              <AccordionTrigger className="text-lg font-medium">{item.question}</AccordionTrigger>
              <AccordionContent className="px-2 " >{item.answer}</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
