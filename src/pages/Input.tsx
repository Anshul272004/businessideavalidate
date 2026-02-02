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
  Clock,
  User,
  Briefcase,
  GraduationCap,
  DollarSign,
  Target,
  TrendingUp,
  Building,
  Rocket,
  Crown
} from "lucide-react";

interface FormData {
  idea: string;
  targetCustomer: string;
  price: string;
  experience: "first-time" | "1-2-startups" | "serial-founder" | "corporate";
  platform: "digital" | "physical" | "hybrid";
  stage: "concept" | "validated" | "mvp" | "revenue";
  // New Founder Profile Fields
  background: string;
  education: "high-school" | "bachelors" | "masters" | "phd" | "self-taught" | "bootcamp";
  industryExperience: string;
  previousBusiness: "none" | "failed" | "small-exit" | "big-exit";
  budget: "bootstrapped" | "under-10k" | "10k-50k" | "50k-200k" | "200k-plus" | "seeking-funding";
  timeCommitment: "side-project" | "part-time" | "full-time" | "all-in";
  goal: "lifestyle" | "growth" | "unicorn" | "exit";
  brandVision: "premium" | "mass-market" | "niche" | "disruptor";
  competitiveAdvantage: string;
  uniqueInsight: string;
}

const exampleIdeas = [
  {
    title: "Enterprise AI Assistant",
    idea: "An AI-powered executive assistant that integrates with enterprise calendars, emails, and CRM to autonomously handle scheduling, follow-ups, and meeting preparation for C-suite executives.",
    target: "Fortune 500 CEOs and their executive assistants struggling with information overload",
    price: "2499",
  },
  {
    title: "Vertical SaaS for Dentists",
    idea: "Practice management software specifically for dental clinics that handles patient scheduling, insurance verification, treatment planning, and automated recall campaigns.",
    target: "Independent dental practice owners with 1-5 dentists seeking modern software",
    price: "499",
  },
  {
    title: "Creator Economy Platform",
    idea: "A membership platform that helps creators build courses, communities, and coaching programs with built-in payment processing, engagement analytics, and AI content assistance.",
    target: "Content creators with 10k-100k followers looking to monetize their audience",
    price: "79",
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
    experience: "first-time",
    platform: "digital",
    stage: "concept",
    background: "",
    education: "bachelors",
    industryExperience: "",
    previousBusiness: "none",
    budget: "bootstrapped",
    timeCommitment: "full-time",
    goal: "growth",
    brandVision: "premium",
    competitiveAdvantage: "",
    uniqueInsight: "",
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
    if (step === 1) return formData.idea.length > 20 && formData.targetCustomer.length > 10;
    if (step === 2) return formData.price.length > 0;
    if (step === 3) return formData.background.length > 5;
    if (step === 4) return true;
    return false;
  };

  const stepTitles = [
    "Your Vision",
    "Market & Economics",
    "Founder Profile",
    "Ambition & Strategy"
  ];

  if (!isPaid) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="luxury-container text-center"
        >
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mx-auto mb-8 border border-primary/30">
            <Crown className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Exclusive Access Required</h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Join the elite founders who validate before they build. Your idea deserves the same rigorous analysis used by top VCs.
          </p>
          <LuxuryButton onClick={() => navigate("/")} size="lg">
            Unlock Premium Validation
            <ArrowRight className="ml-2 h-5 w-5" />
          </LuxuryButton>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-success/5 rounded-full blur-[100px]" />
      </div>

      {/* Navigation */}
      <nav className="luxury-container py-8 relative z-10">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Return</span>
          </button>
          
          {/* Premium Progress Indicator */}
          <div className="hidden md:flex items-center gap-3">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center gap-3">
                <button
                  onClick={() => setCurrentStep(step)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    currentStep === step 
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                      : isStepComplete(step)
                      ? "bg-success/20 text-success border border-success/30"
                      : "bg-card text-muted-foreground border border-border hover:border-primary/30"
                  }`}
                >
                  {isStepComplete(step) && currentStep > step ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <span className="w-5 h-5 rounded-full bg-current/20 flex items-center justify-center text-xs">
                      {step}
                    </span>
                  )}
                  <span className="hidden lg:inline">{stepTitles[step - 1]}</span>
                </button>
                {step < 4 && (
                  <div className={`w-6 h-px ${isStepComplete(step) ? "bg-success" : "bg-border"}`} />
                )}
              </div>
            ))}
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span className="hidden sm:inline">~3 min</span>
          </div>
        </div>
      </nav>

      <div className="luxury-container pb-24 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div 
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/20">
                {currentStep === 1 && <Sparkles className="w-7 h-7 text-primary-foreground" />}
                {currentStep === 2 && <DollarSign className="w-7 h-7 text-primary-foreground" />}
                {currentStep === 3 && <User className="w-7 h-7 text-primary-foreground" />}
                {currentStep === 4 && <Rocket className="w-7 h-7 text-primary-foreground" />}
              </div>
              <div>
                <p className="text-sm text-primary font-medium">Step {currentStep} of 4</p>
                <p className="text-lg font-semibold">{stepTitles[currentStep - 1]}</p>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {currentStep === 1 && <>Describe your <span className="font-serif italic font-normal gradient-text">vision.</span></>}
              {currentStep === 2 && <>Define your <span className="font-serif italic font-normal gradient-text">economics.</span></>}
              {currentStep === 3 && <>Share your <span className="font-serif italic font-normal gradient-text">background.</span></>}
              {currentStep === 4 && <>Clarify your <span className="font-serif italic font-normal gradient-text">ambition.</span></>}
            </h1>
            <p className="text-lg text-muted-foreground">
              {currentStep === 1 && "The more specific you are, the more accurate our CEO-pattern analysis will be."}
              {currentStep === 2 && "Understanding your pricing strategy helps us model realistic unit economics."}
              {currentStep === 3 && "Your unique background determines your unfair advantages and blind spots."}
              {currentStep === 4 && "Your goals shape the roadmap we'll create for you."}
            </p>
          </motion.div>

          {/* Example Ideas Toggle (Step 1 only) */}
          {currentStep === 1 && (
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
                Need inspiration? Explore premium examples
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
                        className="text-left p-5 bg-card border border-border rounded-xl hover:border-primary/50 hover:bg-card/80 transition-all group"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-semibold">{example.title}</p>
                          <span className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                            Click to use →
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">{example.idea}</p>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Step 1: Vision */}
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="luxury-label flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-primary" />
                        What's your business idea?
                      </label>
                      <span className={`text-xs ${formData.idea.length > 50 ? "text-success" : "text-muted-foreground"}`}>
                        {formData.idea.length}/800
                      </span>
                    </div>
                    <textarea
                      className="luxury-textarea min-h-[180px]"
                      placeholder="Describe the problem you're solving, your solution, and what makes it unique. Be as specific as possible about the value you're creating..."
                      value={formData.idea}
                      onChange={(e) => setFormData({ ...formData, idea: e.target.value })}
                      maxLength={800}
                      required
                    />
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Lightbulb className="w-3 h-3" />
                      Pro tip: Include the specific pain point, your unique approach, and why now is the right time
                    </p>
                  </div>

                  <div className="space-y-3">
                    <label className="luxury-label flex items-center gap-2">
                      <Target className="w-4 h-4 text-primary" />
                      Who is your ideal customer?
                    </label>
                    <textarea
                      className="luxury-textarea min-h-[120px]"
                      placeholder="Describe your ideal customer with specifics: demographics, psychographics, current behaviors, and what they're currently using to solve this problem..."
                      value={formData.targetCustomer}
                      onChange={(e) => setFormData({ ...formData, targetCustomer: e.target.value })}
                      required
                    />
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Lightbulb className="w-3 h-3" />
                      The more specific, the better: "CFOs at mid-market SaaS companies with 100-500 employees"
                    </p>
                  </div>

                  <div className="space-y-3">
                    <label className="luxury-label flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-primary" />
                      What's your unique insight?
                    </label>
                    <textarea
                      className="luxury-textarea min-h-[100px]"
                      placeholder="What do you believe about this market that most people think is wrong? What secret have you discovered?"
                      value={formData.uniqueInsight}
                      onChange={(e) => setFormData({ ...formData, uniqueInsight: e.target.value })}
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 2: Market & Economics */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="luxury-label flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-primary" />
                        Price point (per month/unit)
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                          $
                        </span>
                        <input
                          type="number"
                          className="luxury-input pl-10 text-lg font-semibold"
                          placeholder="99"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          required
                          min="0"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="luxury-label">Delivery Model</label>
                      <div className="grid grid-cols-3 gap-2">
                        {([
                          { value: "digital", label: "Digital", icon: "💻" },
                          { value: "physical", label: "Physical", icon: "📦" },
                          { value: "hybrid", label: "Hybrid", icon: "🔄" },
                        ] as const).map((platform) => (
                          <button
                            key={platform.value}
                            type="button"
                            onClick={() => setFormData({ ...formData, platform: platform.value })}
                            className={`py-3 px-3 rounded-xl border text-center text-sm transition-all duration-200 ${
                              formData.platform === platform.value
                                ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                                : "bg-card border-border text-muted-foreground hover:border-primary/50"
                            }`}
                          >
                            <span className="block text-lg mb-1">{platform.icon}</span>
                            {platform.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="luxury-label">Current Stage</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {([
                        { value: "concept", label: "Just a Concept", icon: "💡" },
                        { value: "validated", label: "Validated", icon: "✅" },
                        { value: "mvp", label: "Have MVP", icon: "🛠️" },
                        { value: "revenue", label: "Generating Revenue", icon: "💰" },
                      ] as const).map((stage) => (
                        <button
                          key={stage.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, stage: stage.value })}
                          className={`py-4 px-4 rounded-xl border text-center transition-all duration-200 ${
                            formData.stage === stage.value
                              ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                              : "bg-card border-border text-muted-foreground hover:border-primary/50"
                          }`}
                        >
                          <span className="block text-2xl mb-2">{stage.icon}</span>
                          <span className="text-sm">{stage.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="luxury-label flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      What's your competitive advantage?
                    </label>
                    <textarea
                      className="luxury-textarea min-h-[100px]"
                      placeholder="What makes you uniquely qualified to win? (e.g., proprietary technology, unique access, domain expertise, first-mover advantage)"
                      value={formData.competitiveAdvantage}
                      onChange={(e) => setFormData({ ...formData, competitiveAdvantage: e.target.value })}
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 3: Founder Profile */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="space-y-3">
                    <label className="luxury-label flex items-center gap-2">
                      <User className="w-4 h-4 text-primary" />
                      Your professional background
                    </label>
                    <textarea
                      className="luxury-textarea min-h-[120px]"
                      placeholder="Describe your career journey, relevant experience, and expertise. What makes you the right person to build this? (e.g., '10 years in fintech, previously led product at Stripe...')"
                      value={formData.background}
                      onChange={(e) => setFormData({ ...formData, background: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="luxury-label flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-primary" />
                        Education Background
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {([
                          { value: "self-taught", label: "Self-Taught" },
                          { value: "bootcamp", label: "Bootcamp" },
                          { value: "bachelors", label: "Bachelor's" },
                          { value: "masters", label: "Master's" },
                          { value: "phd", label: "PhD" },
                          { value: "high-school", label: "High School" },
                        ] as const).map((edu) => (
                          <button
                            key={edu.value}
                            type="button"
                            onClick={() => setFormData({ ...formData, education: edu.value })}
                            className={`py-3 px-3 rounded-xl border text-center text-sm transition-all duration-200 ${
                              formData.education === edu.value
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-card border-border text-muted-foreground hover:border-primary/50"
                            }`}
                          >
                            {edu.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="luxury-label flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-primary" />
                        Previous Business Experience
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {([
                          { value: "none", label: "First Time" },
                          { value: "failed", label: "Failed Startup" },
                          { value: "small-exit", label: "Small Exit" },
                          { value: "big-exit", label: "Big Exit" },
                        ] as const).map((exp) => (
                          <button
                            key={exp.value}
                            type="button"
                            onClick={() => setFormData({ ...formData, previousBusiness: exp.value })}
                            className={`py-3 px-3 rounded-xl border text-center text-sm transition-all duration-200 ${
                              formData.previousBusiness === exp.value
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-card border-border text-muted-foreground hover:border-primary/50"
                            }`}
                          >
                            {exp.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="luxury-label flex items-center gap-2">
                      <Building className="w-4 h-4 text-primary" />
                      Industry Experience
                    </label>
                    <input
                      type="text"
                      className="luxury-input"
                      placeholder="e.g., Healthcare, Fintech, E-commerce, Enterprise SaaS, Consumer Apps..."
                      value={formData.industryExperience}
                      onChange={(e) => setFormData({ ...formData, industryExperience: e.target.value })}
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="luxury-label flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-primary" />
                      Founder Experience Level
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {([
                        { value: "first-time", label: "First-Time Founder", icon: "🌱" },
                        { value: "1-2-startups", label: "1-2 Startups", icon: "🌿" },
                        { value: "serial-founder", label: "Serial Founder", icon: "🌳" },
                        { value: "corporate", label: "Corporate Leader", icon: "🏢" },
                      ] as const).map((exp) => (
                        <button
                          key={exp.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, experience: exp.value })}
                          className={`py-4 px-3 rounded-xl border text-center transition-all duration-200 ${
                            formData.experience === exp.value
                              ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                              : "bg-card border-border text-muted-foreground hover:border-primary/50"
                          }`}
                        >
                          <span className="block text-xl mb-2">{exp.icon}</span>
                          <span className="text-xs">{exp.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Ambition & Strategy */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="space-y-3">
                    <label className="luxury-label flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-primary" />
                      Available Budget / Capital
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {([
                        { value: "bootstrapped", label: "Bootstrapped", desc: "$0 - sweat equity" },
                        { value: "under-10k", label: "Under $10K", desc: "Seed savings" },
                        { value: "10k-50k", label: "$10K - $50K", desc: "Small investment" },
                        { value: "50k-200k", label: "$50K - $200K", desc: "Serious capital" },
                        { value: "200k-plus", label: "$200K+", desc: "Well-funded" },
                        { value: "seeking-funding", label: "Seeking Funding", desc: "Looking for investors" },
                      ] as const).map((budget) => (
                        <button
                          key={budget.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, budget: budget.value })}
                          className={`py-4 px-4 rounded-xl border text-center transition-all duration-200 ${
                            formData.budget === budget.value
                              ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                              : "bg-card border-border text-muted-foreground hover:border-primary/50"
                          }`}
                        >
                          <span className="block font-semibold text-sm mb-1">{budget.label}</span>
                          <span className="text-xs opacity-70">{budget.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="luxury-label flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      Time Commitment
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {([
                        { value: "side-project", label: "Side Project", hours: "5-10 hrs/week" },
                        { value: "part-time", label: "Part-Time", hours: "20-30 hrs/week" },
                        { value: "full-time", label: "Full-Time", hours: "40-50 hrs/week" },
                        { value: "all-in", label: "All-In", hours: "60+ hrs/week" },
                      ] as const).map((time) => (
                        <button
                          key={time.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, timeCommitment: time.value })}
                          className={`py-4 px-3 rounded-xl border text-center transition-all duration-200 ${
                            formData.timeCommitment === time.value
                              ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                              : "bg-card border-border text-muted-foreground hover:border-primary/50"
                          }`}
                        >
                          <span className="block font-semibold text-sm">{time.label}</span>
                          <span className="text-xs opacity-70">{time.hours}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="luxury-label flex items-center gap-2">
                      <Rocket className="w-4 h-4 text-primary" />
                      Ultimate Goal
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {([
                        { value: "lifestyle", label: "Lifestyle Business", icon: "🏖️", desc: "Freedom & flexibility" },
                        { value: "growth", label: "Growth Business", icon: "📈", desc: "$1M-$10M ARR" },
                        { value: "unicorn", label: "Unicorn Potential", icon: "🦄", desc: "$1B+ valuation" },
                        { value: "exit", label: "Build to Exit", icon: "🎯", desc: "Acquisition target" },
                      ] as const).map((goal) => (
                        <button
                          key={goal.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, goal: goal.value })}
                          className={`py-4 px-3 rounded-xl border text-center transition-all duration-200 ${
                            formData.goal === goal.value
                              ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                              : "bg-card border-border text-muted-foreground hover:border-primary/50"
                          }`}
                        >
                          <span className="block text-2xl mb-2">{goal.icon}</span>
                          <span className="block font-semibold text-sm">{goal.label}</span>
                          <span className="text-xs opacity-70">{goal.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="luxury-label flex items-center gap-2">
                      <Crown className="w-4 h-4 text-primary" />
                      Brand Vision
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {([
                        { value: "premium", label: "Premium", icon: "👑", desc: "High-end positioning" },
                        { value: "mass-market", label: "Mass Market", icon: "🌍", desc: "Volume play" },
                        { value: "niche", label: "Niche Expert", icon: "🎯", desc: "Specific audience" },
                        { value: "disruptor", label: "Disruptor", icon: "⚡", desc: "Industry challenger" },
                      ] as const).map((brand) => (
                        <button
                          key={brand.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, brandVision: brand.value })}
                          className={`py-4 px-3 rounded-xl border text-center transition-all duration-200 ${
                            formData.brandVision === brand.value
                              ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                              : "bg-card border-border text-muted-foreground hover:border-primary/50"
                          }`}
                        >
                          <span className="block text-2xl mb-2">{brand.icon}</span>
                          <span className="block font-semibold text-sm">{brand.label}</span>
                          <span className="text-xs opacity-70">{brand.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border/50"
            >
              <div className="flex gap-3">
                {currentStep > 1 && (
                  <LuxuryButton
                    type="button"
                    variant="secondary"
                    onClick={() => setCurrentStep(currentStep - 1)}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </LuxuryButton>
                )}
              </div>

              <div className="flex items-center gap-4">
                {currentStep < 4 ? (
                  <LuxuryButton
                    type="button"
                    onClick={() => setCurrentStep(currentStep + 1)}
                    disabled={!isStepComplete(currentStep)}
                    className="group"
                  >
                    Continue
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </LuxuryButton>
                ) : (
                  <LuxuryButton 
                    type="submit" 
                    size="lg" 
                    className="group glow-box"
                    disabled={!isStepComplete(1) || !isStepComplete(2)}
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Analyze with CEO Patterns
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </LuxuryButton>
                )}
              </div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-6 text-xs text-muted-foreground pt-4"
            >
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-success" /> 
                Bank-grade encryption
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" /> 
                Results in ~45 seconds
              </span>
              <span className="flex items-center gap-2">
                <Target className="w-4 h-4 text-primary" /> 
                100,000+ CEO patterns analyzed
              </span>
            </motion.div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Input;
