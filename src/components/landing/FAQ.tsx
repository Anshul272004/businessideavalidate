import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How is this different from asking ChatGPT?",
    answer: "Generic AI gives generic answers. We use specialized analysis agents calibrated against 100,000+ founder outcomes, and we factor in your specific situation—background, capital, timeline—to give you a verdict that applies to you, not a hypothetical founder.",
  },
  {
    question: "What if I get a KILL verdict?",
    answer: "That is often the most valuable outcome. You have just saved months or years of pursuing the wrong path. The analysis includes specific reasons why, which often reveals better directions. Many founders pivot to successful ideas after a KILL.",
  },
  {
    question: "How accurate is the analysis?",
    answer: "Our verdicts are pattern-matched against real outcomes. While no analysis can guarantee success, understanding the probability distribution based on similar founders dramatically improves decision quality.",
  },
  {
    question: "What information do you need?",
    answer: "Beyond your idea, we ask about your background, capital, time constraints, and goals. This context is essential—what works for one founder may not work for another with different resources.",
  },
  {
    question: "Is my idea kept confidential?",
    answer: "Yes. We do not store, share, or use your data for training. Your evaluation is processed and delivered, then purged. Your idea remains yours.",
  },
  {
    question: "What is included in the analysis?",
    answer: "Demand psychology analysis, founder-market fit score, unit economics projection, distribution channel mapping, execution difficulty index, CEO pattern matching, probability breakdown, and a personalized action plan.",
  },
];

const FAQ = () => {
  return (
    <section className="luxury-container py-20 border-t border-border/50">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm text-muted-foreground mb-4 uppercase tracking-wide">Questions</p>
          <h2 className="text-3xl md:text-5xl font-semibold mb-4">
            Frequently <span className="font-serif italic font-normal gradient-text">asked</span>
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-primary/30 transition-colors"
              >
                <AccordionTrigger className="text-left py-5 hover:no-underline">
                  <span className="font-medium pr-4">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-muted-foreground text-sm leading-relaxed">
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
