import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How is this different from just asking ChatGPT?",
    answer: "Our system uses specialized psychology and neuroscience frameworks specifically designed for business validation. We analyze cognitive biases, buying friction, and neurochemical triggers that generic AI doesn't understand. Plus, we give you a clear verdict—not wishy-washy advice.",
  },
  {
    question: "What if I get a KILL verdict?",
    answer: "That's actually the best outcome! You just saved months of building the wrong thing. The analysis includes specific insights about WHY it won't work, which often reveals a better direction. Many founders pivot to successful ideas after a KILL.",
  },
  {
    question: "How accurate is the analysis?",
    answer: "Our validation is based on proven psychology frameworks and patterns from thousands of startups. While no tool can guarantee success, understanding the psychological barriers to purchase dramatically increases your odds of building something people actually pay for.",
  },
  {
    question: "Can I validate multiple ideas?",
    answer: "Each purchase covers one validation. Many founders compare 2-3 ideas before choosing which to build. We offer bundle pricing for multiple validations.",
  },
  {
    question: "Is my idea kept confidential?",
    answer: "Absolutely. We don't store your ideas, share them, or use them for training. Your validation is processed and delivered, then the data is purged. Your idea is yours alone.",
  },
  {
    question: "What's included in the analysis?",
    answer: "You get: Demand Psychology analysis, Pain Reality Score (1-10), Buying Friction identification, Pricing Psychology recommendations, Neuroscience triggers, a GO/PIVOT/KILL verdict, and 3 immediate action steps. Plus a downloadable PDF report.",
  },
];

const FAQ = () => {
  return (
    <section className="luxury-container py-24 border-t border-border/50">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <HelpCircle className="w-4 h-4" />
            Common Questions
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Frequently <span className="font-serif italic font-normal">asked</span>
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-primary/50 transition-colors"
              >
                <AccordionTrigger className="text-left py-6 hover:no-underline">
                  <span className="font-semibold pr-4">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
