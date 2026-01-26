import { motion } from "framer-motion";
import { Check, X, Minus } from "lucide-react";

type FeatureValue = boolean | "partial";

interface Feature {
  name: string;
  us: FeatureValue;
  chatgpt: FeatureValue;
  consultant: FeatureValue;
}

const features: Feature[] = [
  { name: "Psychology-based analysis", us: true, chatgpt: false, consultant: true },
  { name: "Neuroscience triggers", us: true, chatgpt: false, consultant: "partial" },
  { name: "Clear GO/PIVOT/KILL verdict", us: true, chatgpt: false, consultant: "partial" },
  { name: "Pricing psychology", us: true, chatgpt: false, consultant: true },
  { name: "Action steps included", us: true, chatgpt: false, consultant: true },
  { name: "Under 5 minutes", us: true, chatgpt: true, consultant: false },
  { name: "No scheduling needed", us: true, chatgpt: true, consultant: false },
  { name: "Brutally honest", us: true, chatgpt: false, consultant: "partial" },
];

const renderCheck = (value: boolean | "partial") => {
  if (value === true) return <Check className="w-5 h-5 text-success" />;
  if (value === false) return <X className="w-5 h-5 text-destructive/50" />;
  return <Minus className="w-5 h-5 text-muted-foreground" />;
};

const ComparisonTable = () => {
  return (
    <section className="luxury-container py-24 border-t border-border/50">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Why choose <span className="font-serif italic font-normal">this?</span>
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Compare your options honestly
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto overflow-x-auto"
      >
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-6 px-4 font-normal text-muted-foreground">Feature</th>
              <th className="text-center py-6 px-4">
                <div className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold">
                  Validator
                </div>
              </th>
              <th className="text-center py-6 px-4 font-normal text-muted-foreground">ChatGPT</th>
              <th className="text-center py-6 px-4 font-normal text-muted-foreground">Consultant</th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature, index) => (
              <tr key={index} className="border-b border-border/50">
                <td className="py-5 px-4 text-foreground">{feature.name}</td>
                <td className="py-5 px-4">
                  <div className="flex justify-center">{renderCheck(feature.us)}</div>
                </td>
                <td className="py-5 px-4">
                  <div className="flex justify-center">{renderCheck(feature.chatgpt)}</div>
                </td>
                <td className="py-5 px-4">
                  <div className="flex justify-center">{renderCheck(feature.consultant)}</div>
                </td>
              </tr>
            ))}
            <tr className="bg-card/50">
              <td className="py-5 px-4 font-semibold">Price</td>
              <td className="py-5 px-4 text-center">
                <span className="text-2xl font-bold text-primary">$49</span>
              </td>
              <td className="py-5 px-4 text-center text-muted-foreground">$20/mo</td>
              <td className="py-5 px-4 text-center text-muted-foreground">$300-500+</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
    </section>
  );
};

export default ComparisonTable;
