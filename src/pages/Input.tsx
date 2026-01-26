import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Lightbulb, 
  ChevronDown,
  CheckCircle2,
  Shield,
  Clock
} from "lucide-react";

interface FormData {
  idea: string;
  targetCustomer: string;
  price: string;
  experience: "beginner" | "intermediate" | "advanced";
  platform: "online" | "offline" | "both";
  stage: "idea" | "mvp" | "revenue";
}

const exampleIdeas = [
  {
    title: "SaaS Template",
    idea: "A marketplace for premium, production-ready SaaS templates that developers can customize and deploy. Includes authentication, payments, and analytics out of the box.",
    target: "Solo developers and small startups looking to launch faster",
    price: "299",
  },
  {
    title: "Wellness App",
    idea: "An AI-powered mental wellness app that provides personalized daily exercises based on mood tracking and behavioral patterns.",
    target: "Working professionals aged 25-45 dealing with stress and anxiety",
    price: "12",
  },
  {
    title: "E-commerce Tool",
    idea: "A Shopify app that uses AI to automatically write and A/B test product descriptions for better conversions.",
    target: "Shopify store owners with 100+ products struggling with SEO",
    price: "49",
  },
];

const Input = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isPaid = searchParams.get("paid") === "true";
  const [showExamples, setShowExamples] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState<FormData>({
    idea: "",
    targetCustomer: "",
    price: "",
    experience: "beginner",
    platform: "online",
    stage: "idea",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sessionStorage.setItem("validationData", JSON.stringify(formData));
    navigate("/loading");
  };

  const fillExample = (example: typeof exampleIdeas[0]) => {
    setFormData({
      ...formData,
      idea: example.idea,
      targetCustomer: example.target,
      price: example.price,
    });
    setShowExamples(false);
  };

  const isStepComplete = (step: number) => {
    if (step === 1) return formData.idea.length > 20;
    if (step === 2) return formData.targetCustomer.length > 10 && formData.price.length > 0;
    if (step === 3) return true;
    return false;
  };

  if (!isPaid) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="luxury-container text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Access Required</h1>
          <p className="text-muted-foreground mb-6">
            Please complete payment to access the validator.
          </p>
          <LuxuryButton onClick={() => navigate("/")}>
            Go to Payment
          </LuxuryButton>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      {/* Navigation */}
      <nav className="luxury-container py-8 relative z-10">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          
          {/* Progress Indicator */}
          <div className="hidden sm:flex items-center gap-2">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                  currentStep === step 
                    ? "bg-primary text-primary-foreground" 
                    : isStepComplete(step)
                    ? "bg-success/20 text-success"
                    : "bg-muted text-muted-foreground"
                }`}>
                  {isStepComplete(step) && currentStep > step ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    step
                  )}
                </div>
                {step < 3 && (
                  <div className={`w-8 h-px ${isStepComplete(step) ? "bg-success" : "bg-border"}`} />
                )}
              </div>
            ))}
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            ~2 min
          </div>
        </div>
      </nav>

      <div className="luxury-container pb-24 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Step {currentStep} of 3</p>
                <p className="font-medium">
                  {currentStep === 1 ? "Your Idea" : currentStep === 2 ? "Market Details" : "Your Background"}
                </p>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Tell us about your
              <span className="font-serif italic font-normal"> idea.</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Be honest and specific. The more detail you provide, the better the analysis.
            </p>
          </motion.div>

          {/* Example Ideas Toggle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <button
              onClick={() => setShowExamples(!showExamples)}
              className="flex items-center gap-2 text-primary text-sm font-medium hover:underline"
            >
              <Lightbulb className="w-4 h-4" />
              Need inspiration? See example ideas
              <ChevronDown className={`w-4 h-4 transition-transform ${showExamples ? "rotate-180" : ""}`} />
            </button>
            
            <AnimatePresence>
              {showExamples && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 grid gap-3"
                >
                  {exampleIdeas.map((example, index) => (
                    <button
                      key={index}
                      onClick={() => fillExample(example)}
                      className="text-left p-4 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors"
                    >
                      <p className="font-medium mb-1">{example.title}</p>
                      <p className="text-sm text-muted-foreground line-clamp-2">{example.idea}</p>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Step 1: Idea */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-3"
            >
              <div className="flex items-center justify-between">
                <label className="luxury-label">What's your business idea?</label>
                <span className={`text-xs ${formData.idea.length > 20 ? "text-success" : "text-muted-foreground"}`}>
                  {formData.idea.length}/500
                </span>
              </div>
              <textarea
                className="luxury-textarea"
                placeholder="Describe what you want to build, the problem it solves, and how it works..."
                value={formData.idea}
                onChange={(e) => {
                  setFormData({ ...formData, idea: e.target.value });
                  if (e.target.value.length > 20) setCurrentStep(Math.max(currentStep, 1));
                }}
                maxLength={500}
                required
              />
              <p className="text-xs text-muted-foreground">
                💡 Tip: Include what problem it solves and why existing solutions fail
              </p>
            </motion.div>

            {/* Step 2: Market Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <div className="space-y-3">
                <label className="luxury-label">Who's your target customer?</label>
                <input
                  type="text"
                  className="luxury-input"
                  placeholder="e.g., Freelance designers aged 25-40 struggling with invoicing"
                  value={formData.targetCustomer}
                  onChange={(e) => {
                    setFormData({ ...formData, targetCustomer: e.target.value });
                    if (e.target.value.length > 10) setCurrentStep(Math.max(currentStep, 2));
                  }}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  💡 Tip: Be specific about demographics, pain points, and behaviors
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="luxury-label">
                    Price you plan to charge
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                      $
                    </span>
                    <input
                      type="number"
                      className="luxury-input pl-8"
                      placeholder="49"
                      value={formData.price}
                      onChange={(e) => {
                        setFormData({ ...formData, price: e.target.value });
                        setCurrentStep(Math.max(currentStep, 2));
                      }}
                      required
                      min="0"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="luxury-label">Platform</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["online", "offline", "both"] as const).map((platform) => (
                      <button
                        key={platform}
                        type="button"
                        onClick={() => setFormData({ ...formData, platform })}
                        className={`py-3 px-3 rounded-xl border text-center capitalize text-sm transition-all duration-200 ${
                          formData.platform === platform
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-card border-border text-muted-foreground hover:border-primary/50"
                        }`}
                      >
                        {platform}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Step 3: Background */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              <div className="space-y-3">
                <label className="luxury-label">Your experience level</label>
                <div className="grid grid-cols-3 gap-3">
                  {(["beginner", "intermediate", "advanced"] as const).map(
                    (level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, experience: level });
                          setCurrentStep(3);
                        }}
                        className={`py-4 px-4 rounded-xl border text-center capitalize transition-all duration-200 ${
                          formData.experience === level
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-card border-border text-muted-foreground hover:border-primary/50"
                        }`}
                      >
                        {level}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <label className="luxury-label">Current stage</label>
                <div className="grid grid-cols-3 gap-3">
                  {([
                    { value: "idea", label: "Just an Idea" },
                    { value: "mvp", label: "Have MVP" },
                    { value: "revenue", label: "Has Revenue" },
                  ] as const).map((stage) => (
                    <button
                      key={stage.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, stage: stage.value })}
                      className={`py-4 px-4 rounded-xl border text-center transition-all duration-200 ${
                        formData.stage === stage.value
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card border-border text-muted-foreground hover:border-primary/50"
                      }`}
                    >
                      {stage.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="pt-6 space-y-4"
            >
              <LuxuryButton 
                type="submit" 
                size="lg" 
                className="w-full sm:w-auto group"
                disabled={!isStepComplete(1) || !isStepComplete(2)}
              >
                Analyze My Idea
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </LuxuryButton>
              
              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Shield className="w-3 h-3 text-success" /> 100% confidential
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-primary" /> Results in ~30 seconds
                </span>
              </div>
            </motion.div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Input;
