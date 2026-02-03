import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { 
  ArrowRight, 
  ArrowLeft, 
  Target,
  User,
  Briefcase,
  DollarSign,
  Clock,
  Rocket,
  Brain,
  AlertTriangle
} from "lucide-react";

interface FormData {
  // Idea
  idea: string;
  targetCustomer: string;
  price: string;
  platform: "digital" | "physical" | "hybrid";
  stage: "concept" | "validated" | "mvp" | "revenue";
  uniqueInsight: string;
  // Founder Reality
  age: "under-25" | "25-35" | "35-45" | "45-plus";
  coreSkill: "technical" | "sales" | "operations" | "content" | "generalist";
  industryYears: "0-2" | "2-5" | "5-10" | "10-plus";
  energyLevel: "side-project" | "part-time" | "full-time" | "obsessed";
  // Capital Reality
  budget: "zero" | "under-50k" | "50k-200k" | "200k-plus";
  monthlyBurn: "under-5k" | "5k-15k" | "15k-50k" | "50k-plus";
  riskTolerance: "low" | "medium" | "high";
  // Time Reality
  hoursPerDay: "1-2" | "4-6" | "8-plus" | "all-waking";
  deadline: "fast-money" | "12-months" | "long-term";
  // Outcome Intent
  goal: "lifestyle" | "agency" | "saas" | "venture" | "acquisition";
  previousBusiness: "none" | "failed" | "small-exit" | "big-exit";
  competitiveAdvantage: string;
}

const Input = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isPaid = searchParams.get("paid") === "true";
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState<FormData>({
    idea: "",
    targetCustomer: "",
    price: "",
    platform: "digital",
    stage: "concept",
    uniqueInsight: "",
    age: "25-35",
    coreSkill: "technical",
    industryYears: "2-5",
    energyLevel: "full-time",
    budget: "under-50k",
    monthlyBurn: "5k-15k",
    riskTolerance: "medium",
    hoursPerDay: "8-plus",
    deadline: "12-months",
    goal: "saas",
    previousBusiness: "none",
    competitiveAdvantage: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sessionStorage.setItem("validationData", JSON.stringify(formData));
    navigate("/loading");
  };

  const isStepComplete = (step: number) => {
    if (step === 1) return formData.idea.length > 20 && formData.targetCustomer.length > 10;
    if (step === 2) return true;
    if (step === 3) return true;
    if (step === 4) return true;
    if (step === 5) return true;
    return false;
  };

  const stepTitles = ["The Idea", "Founder Reality", "Capital Reality", "Time Reality", "Outcome Intent"];
  const totalSteps = 5;

  if (!isPaid) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="luxury-container text-center max-w-md"
        >
          <Target className="w-12 h-12 text-primary mx-auto mb-6" />
          <h1 className="text-2xl font-semibold mb-4">Access Required</h1>
          <p className="text-muted-foreground mb-8">
            This evaluation requires a paid plan.
          </p>
          <LuxuryButton onClick={() => navigate("/pricing")} size="lg">
            View Pricing
            <ArrowRight className="ml-2 h-5 w-5" />
          </LuxuryButton>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="luxury-container py-8">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          
          {/* Progress */}
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`w-8 h-1 rounded-full transition-colors ${
                  step <= currentStep ? "bg-primary" : "bg-border"
                }`}
              />
            ))}
          </div>
          
          <span className="text-sm text-muted-foreground">
            {currentStep} of {totalSteps}
          </span>
        </div>
      </nav>

      <div className="luxury-container pb-24">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div 
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <p className="text-sm text-muted-foreground mb-2 uppercase tracking-wide">
              Step {currentStep}
            </p>
            <h1 className="text-3xl md:text-4xl font-semibold mb-2">
              {stepTitles[currentStep - 1]}
            </h1>
            <p className="text-muted-foreground">
              {currentStep === 1 && "Describe what you want to build and who it's for."}
              {currentStep === 2 && "Your skills and capacity determine what's viable for you."}
              {currentStep === 3 && "Capital constraints shape the path forward."}
              {currentStep === 4 && "Time availability affects execution speed."}
              {currentStep === 5 && "Your goal determines the strategy."}
            </p>
          </motion.div>

          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {/* Step 1: The Idea */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="luxury-label mb-2 block">What is your business idea?</label>
                    <textarea
                      className="luxury-textarea min-h-[140px]"
                      placeholder="Describe the problem you solve and your solution. Be specific about the value you create."
                      value={formData.idea}
                      onChange={(e) => setFormData({ ...formData, idea: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="luxury-label mb-2 block">Who is your target customer?</label>
                    <textarea
                      className="luxury-textarea min-h-[100px]"
                      placeholder="Describe your ideal customer with specifics: role, company size, pain point, current solution."
                      value={formData.targetCustomer}
                      onChange={(e) => setFormData({ ...formData, targetCustomer: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="luxury-label mb-2 block">Price Point (Monthly)</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                        <input
                          type="number"
                          className="luxury-input pl-8"
                          placeholder="99"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="luxury-label mb-2 block">Current Stage</label>
                      <select
                        className="luxury-input"
                        value={formData.stage}
                        onChange={(e) => setFormData({ ...formData, stage: e.target.value as FormData["stage"] })}
                      >
                        <option value="concept">Just a concept</option>
                        <option value="validated">Validated with customers</option>
                        <option value="mvp">Have MVP</option>
                        <option value="revenue">Generating revenue</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="luxury-label mb-2 block">What is your unique insight?</label>
                    <textarea
                      className="luxury-textarea"
                      placeholder="What do you believe about this market that most people think is wrong?"
                      value={formData.uniqueInsight}
                      onChange={(e) => setFormData({ ...formData, uniqueInsight: e.target.value })}
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 2: Founder Reality */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="luxury-label mb-2 block">Age Range</label>
                      <OptionGrid
                        options={[
                          { value: "under-25", label: "Under 25" },
                          { value: "25-35", label: "25-35" },
                          { value: "35-45", label: "35-45" },
                          { value: "45-plus", label: "45+" },
                        ]}
                        value={formData.age}
                        onChange={(v) => setFormData({ ...formData, age: v as FormData["age"] })}
                      />
                    </div>
                    <div>
                      <label className="luxury-label mb-2 block">Core Skill</label>
                      <OptionGrid
                        options={[
                          { value: "technical", label: "Technical" },
                          { value: "sales", label: "Sales" },
                          { value: "operations", label: "Operations" },
                          { value: "content", label: "Content" },
                          { value: "generalist", label: "Generalist" },
                        ]}
                        value={formData.coreSkill}
                        onChange={(v) => setFormData({ ...formData, coreSkill: v as FormData["coreSkill"] })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="luxury-label mb-2 block">Years of Industry Experience</label>
                    <OptionGrid
                      options={[
                        { value: "0-2", label: "0-2 years" },
                        { value: "2-5", label: "2-5 years" },
                        { value: "5-10", label: "5-10 years" },
                        { value: "10-plus", label: "10+ years" },
                      ]}
                      value={formData.industryYears}
                      onChange={(v) => setFormData({ ...formData, industryYears: v as FormData["industryYears"] })}
                    />
                  </div>

                  <div>
                    <label className="luxury-label mb-2 block">Energy Level / Commitment</label>
                    <OptionGrid
                      options={[
                        { value: "side-project", label: "Side Project", desc: "5-10 hrs/week" },
                        { value: "part-time", label: "Part-Time", desc: "20-30 hrs/week" },
                        { value: "full-time", label: "Full-Time", desc: "40+ hrs/week" },
                        { value: "obsessed", label: "Obsessed", desc: "All waking hours" },
                      ]}
                      value={formData.energyLevel}
                      onChange={(v) => setFormData({ ...formData, energyLevel: v as FormData["energyLevel"] })}
                    />
                  </div>

                  <div>
                    <label className="luxury-label mb-2 block">Previous Business Experience</label>
                    <OptionGrid
                      options={[
                        { value: "none", label: "First Time" },
                        { value: "failed", label: "Failed Startup" },
                        { value: "small-exit", label: "Small Exit" },
                        { value: "big-exit", label: "Major Exit" },
                      ]}
                      value={formData.previousBusiness}
                      onChange={(v) => setFormData({ ...formData, previousBusiness: v as FormData["previousBusiness"] })}
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 3: Capital Reality */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="luxury-label mb-2 block">Available Budget</label>
                    <OptionGrid
                      options={[
                        { value: "zero", label: "$0", desc: "Sweat equity only" },
                        { value: "under-50k", label: "Under $50K", desc: "Seed savings" },
                        { value: "50k-200k", label: "$50K-$200K", desc: "Serious capital" },
                        { value: "200k-plus", label: "$200K+", desc: "Well funded" },
                      ]}
                      value={formData.budget}
                      onChange={(v) => setFormData({ ...formData, budget: v as FormData["budget"] })}
                    />
                  </div>

                  <div>
                    <label className="luxury-label mb-2 block">Monthly Burn Tolerance</label>
                    <OptionGrid
                      options={[
                        { value: "under-5k", label: "Under $5K" },
                        { value: "5k-15k", label: "$5K-$15K" },
                        { value: "15k-50k", label: "$15K-$50K" },
                        { value: "50k-plus", label: "$50K+" },
                      ]}
                      value={formData.monthlyBurn}
                      onChange={(v) => setFormData({ ...formData, monthlyBurn: v as FormData["monthlyBurn"] })}
                    />
                  </div>

                  <div>
                    <label className="luxury-label mb-2 block">Personal Risk Tolerance</label>
                    <OptionGrid
                      options={[
                        { value: "low", label: "Conservative", desc: "Preserve capital" },
                        { value: "medium", label: "Moderate", desc: "Calculated risks" },
                        { value: "high", label: "Aggressive", desc: "All-in mentality" },
                      ]}
                      value={formData.riskTolerance}
                      onChange={(v) => setFormData({ ...formData, riskTolerance: v as FormData["riskTolerance"] })}
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 4: Time Reality */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="luxury-label mb-2 block">Hours Per Day Available</label>
                    <OptionGrid
                      options={[
                        { value: "1-2", label: "1-2 hours" },
                        { value: "4-6", label: "4-6 hours" },
                        { value: "8-plus", label: "8+ hours" },
                        { value: "all-waking", label: "All waking hours" },
                      ]}
                      value={formData.hoursPerDay}
                      onChange={(v) => setFormData({ ...formData, hoursPerDay: v as FormData["hoursPerDay"] })}
                    />
                  </div>

                  <div>
                    <label className="luxury-label mb-2 block">Timeline Expectation</label>
                    <OptionGrid
                      options={[
                        { value: "fast-money", label: "Fast Money", desc: "Need revenue in 3 months" },
                        { value: "12-months", label: "12 Months", desc: "Standard runway" },
                        { value: "long-term", label: "Long-Term", desc: "Building for years" },
                      ]}
                      value={formData.deadline}
                      onChange={(v) => setFormData({ ...formData, deadline: v as FormData["deadline"] })}
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 5: Outcome Intent */}
              {currentStep === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="luxury-label mb-2 block">Ultimate Goal</label>
                    <OptionGrid
                      options={[
                        { value: "lifestyle", label: "Lifestyle", desc: "Freedom & flexibility" },
                        { value: "agency", label: "Agency", desc: "Service business" },
                        { value: "saas", label: "SaaS", desc: "Recurring product" },
                        { value: "venture", label: "Venture", desc: "Scale to unicorn" },
                        { value: "acquisition", label: "Acquisition", desc: "Build to sell" },
                      ]}
                      value={formData.goal}
                      onChange={(v) => setFormData({ ...formData, goal: v as FormData["goal"] })}
                    />
                  </div>

                  <div>
                    <label className="luxury-label mb-2 block">What is your competitive advantage?</label>
                    <textarea
                      className="luxury-textarea"
                      placeholder="What makes you uniquely qualified to win? (expertise, access, technology, relationships)"
                      value={formData.competitiveAdvantage}
                      onChange={(e) => setFormData({ ...formData, competitiveAdvantage: e.target.value })}
                    />
                  </div>

                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-muted-foreground">
                        <p className="font-medium text-foreground mb-1">What happens next</p>
                        <p>Five analysis agents will evaluate your situation against 100,000+ founder patterns. You will receive a GO, PIVOT, or KILL verdict with supporting evidence.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="mt-10 flex justify-between items-center pt-6 border-t border-border">
              {currentStep > 1 ? (
                <LuxuryButton
                  type="button"
                  variant="secondary"
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </LuxuryButton>
              ) : (
                <div />
              )}

              {currentStep < totalSteps ? (
                <LuxuryButton
                  type="button"
                  onClick={() => setCurrentStep(currentStep + 1)}
                  disabled={!isStepComplete(currentStep)}
                  className="group"
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </LuxuryButton>
              ) : (
                <LuxuryButton
                  type="submit"
                  className="group"
                >
                  Begin Analysis
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </LuxuryButton>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const OptionGrid = ({ 
  options, 
  value, 
  onChange 
}: { 
  options: { value: string; label: string; desc?: string }[];
  value: string;
  onChange: (value: string) => void;
}) => (
  <div className={`grid gap-2 ${options.length <= 3 ? `grid-cols-${options.length}` : "grid-cols-2 sm:grid-cols-4"}`}>
    {options.map((option) => (
      <button
        key={option.value}
        type="button"
        onClick={() => onChange(option.value)}
        className={`p-3 rounded-lg border text-left transition-colors ${
          value === option.value
            ? "bg-primary/10 border-primary/30 text-foreground"
            : "bg-card border-border text-muted-foreground hover:border-primary/20"
        }`}
      >
        <span className="text-sm font-medium block">{option.label}</span>
        {option.desc && <span className="text-xs opacity-70">{option.desc}</span>}
      </button>
    ))}
  </div>
);

export default Input;
