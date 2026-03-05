import { useState, useMemo, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { 
  ArrowRight, 
  ArrowLeft, 
  Target,
  User,
  DollarSign,
  Clock,
  Rocket,
  Globe,
  Users,
  Network,
  Shield,
  CheckCircle2,
  MapPin,
  Sparkles
} from "lucide-react";
import { 
  countries, 
  cityTiers, 
  marketMaturityOptions,
  customerLocationOptions,
  paymentMaturityOptions,
  trustCultureOptions,
  investorAccessOptions,
  customerAccessOptions,
  regulatoryEnvironmentOptions,
  infrastructureOptions
} from "@/data/countries";

interface FormData {
  // Step 1: The Idea
  idea: string;
  problem: string;
  solution: string;
  targetCustomer: string;
  targetSegment: string;
  industry: string;
  revenueModel: string;
  price: string;
  platform: "digital" | "physical" | "hybrid";
  stage: "concept" | "validated" | "mvp" | "revenue";
  uniqueInsight: string;
  // Step 2: Location Reality
  country: string;
  state: string;
  cityTier: "metro" | "tier-1" | "tier-2" | "tier-3" | "rural";
  marketMaturity: "nascent" | "emerging" | "developed" | "saturated";
  // Step 3: Market Culture
  customerLocation: "local" | "national" | "global";
  paymentMaturity: "cash-heavy" | "digital-emerging" | "digital-first";
  trustCulture: "relationship" | "transaction" | "hybrid";
  regulatoryEnvironment: "light" | "moderate" | "heavy" | "uncertain";
  infrastructure: "excellent" | "good" | "developing" | "challenging";
  // Step 4: Founder Reality
  age: "under-25" | "25-35" | "35-45" | "45-plus";
  coreSkill: "technical" | "sales" | "operations" | "content" | "generalist";
  industryYears: "0-2" | "2-5" | "5-10" | "10-plus";
  energyLevel: "side-project" | "part-time" | "full-time" | "obsessed";
  previousBusiness: "none" | "failed" | "small-exit" | "big-exit";
  // Step 5: Capital Reality
  budget: "zero" | "under-50k" | "50k-200k" | "200k-plus";
  monthlyBurn: "under-5k" | "5k-15k" | "15k-50k" | "50k-plus";
  riskTolerance: "low" | "medium" | "high";
  // Step 6: Network & Time
  hoursPerDay: "1-2" | "4-6" | "8-plus" | "all-waking";
  deadline: "fast-money" | "12-months" | "long-term";
  investorAccess: "none" | "angels" | "vcs" | "institutional";
  customerAccess: "cold" | "warm" | "hot" | "existing";
  // Step 7: Outcome Intent
  goal: "lifestyle" | "agency" | "saas" | "venture" | "acquisition";
  competitiveAdvantage: string;
}

const timeEstimates = ["~3 min", "~3 min", "~2 min", "~2 min", "~1 min", "~1 min", "< 1 min"];

const Input = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    idea: "",
    problem: "",
    solution: "",
    targetCustomer: "",
    targetSegment: "",
    industry: "",
    revenueModel: "subscription",
    price: "",
    platform: "digital",
    stage: "concept",
    uniqueInsight: "",
    country: "",
    state: "",
    cityTier: "metro",
    marketMaturity: "emerging",
    customerLocation: "national",
    paymentMaturity: "digital-emerging",
    trustCulture: "hybrid",
    regulatoryEnvironment: "moderate",
    infrastructure: "good",
    age: "25-35",
    coreSkill: "technical",
    industryYears: "2-5",
    energyLevel: "full-time",
    previousBusiness: "none",
    budget: "under-50k",
    monthlyBurn: "5k-15k",
    riskTolerance: "medium",
    hoursPerDay: "8-plus",
    deadline: "12-months",
    investorAccess: "none",
    customerAccess: "cold",
    goal: "saas",
    competitiveAdvantage: "",
  });

  const selectedCountry = useMemo(() => 
    countries.find(c => c.code === formData.country), 
    [formData.country]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfetti(true);
    sessionStorage.setItem("validationData", JSON.stringify(formData));
    setTimeout(() => navigate("/loading"), 1200);
  };

  const isStepComplete = (step: number) => {
    if (step === 1) {
      return (
        formData.idea.length > 20 &&
        formData.problem.length > 20 &&
        formData.solution.length > 20 &&
        formData.targetCustomer.length > 10 &&
        formData.industry.trim().length > 1
      );
    }
    if (step === 2) return formData.country !== "";
    return true;
  };

  const stepConfig = [
    { title: "The Idea", icon: <Target className="w-4 h-4" />, desc: "Describe what you want to build" },
    { title: "Location Reality", icon: <Globe className="w-4 h-4" />, desc: "Where will you operate?" },
    { title: "Market Culture", icon: <Users className="w-4 h-4" />, desc: "How customers behave locally" },
    { title: "Founder Reality", icon: <User className="w-4 h-4" />, desc: "Your skills and experience" },
    { title: "Capital Reality", icon: <DollarSign className="w-4 h-4" />, desc: "Budget and risk tolerance" },
    { title: "Network & Time", icon: <Network className="w-4 h-4" />, desc: "Connections and commitment" },
    { title: "Outcome Intent", icon: <Rocket className="w-4 h-4" />, desc: "Your ultimate goal" },
  ];
  const totalSteps = 7;
  const progressPercent = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="min-h-screen bg-background">
      {/* Confetti Celebration */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] pointer-events-none overflow-hidden"
          >
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: -20,
                  rotate: 0,
                  scale: Math.random() * 0.5 + 0.5,
                }}
                animate={{
                  y: window.innerHeight + 20,
                  rotate: Math.random() * 720 - 360,
                  x: Math.random() * window.innerWidth,
                }}
                transition={{
                  duration: Math.random() * 1.5 + 1,
                  delay: Math.random() * 0.3,
                  ease: "easeIn",
                }}
                className="absolute w-3 h-3 rounded-sm"
                style={{
                  backgroundColor: [
                    "hsl(42 78% 50%)", "hsl(155 65% 38%)", "hsl(200 80% 55%)",
                    "hsl(0 72% 51%)", "hsl(280 60% 50%)", "hsl(38 92% 50%)",
                  ][i % 6],
                }}
              />
            ))}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="text-center">
                <Sparkles className="w-12 h-12 text-primary mx-auto mb-3" />
                <p className="text-2xl font-bold gradient-text">Analysis Starting!</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-ice/3 rounded-full blur-[120px]" />
      </div>

      {/* Navigation */}
      <nav className="luxury-container py-6 relative z-10">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          
          <div className="flex items-center gap-4">
            {/* Time estimate */}
            <span className="text-xs text-muted-foreground flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {timeEstimates[currentStep - 1]} remaining
            </span>
            {/* Progress Circle */}
            <div className="relative w-12 h-12">
              <svg className="w-12 h-12 -rotate-90">
                <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="3" fill="none" className="text-border" />
                <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="3" fill="none" strokeDasharray={`${progressPercent * 1.26} 126`} className="text-primary transition-all duration-300" />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold">
                {progressPercent}%
              </span>
            </div>
            <span className="text-sm text-muted-foreground hidden sm:block">
              Step {currentStep} of {totalSteps}
            </span>
          </div>
        </div>
      </nav>

      {/* Step Indicators */}
      <div className="luxury-container relative z-10 mb-8">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {stepConfig.map((step, i) => (
            <button
              key={i}
              onClick={() => i + 1 <= currentStep && setCurrentStep(i + 1)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs whitespace-nowrap transition-all ${
                i + 1 === currentStep
                  ? "bg-primary/10 text-primary border border-primary/30"
                  : i + 1 < currentStep
                  ? "bg-success/10 text-success border border-success/20"
                  : "bg-muted/30 text-muted-foreground border border-transparent"
              }`}
            >
              {i + 1 < currentStep ? (
                <CheckCircle2 className="w-3.5 h-3.5" />
              ) : (
                step.icon
              )}
              <span className="hidden sm:inline">{step.title}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="luxury-container pb-24 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div 
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                {stepConfig[currentStep - 1].icon}
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest">
                  Step {currentStep}
                </p>
                <h1 className="text-2xl md:text-3xl font-semibold">
                  {stepConfig[currentStep - 1].title}
                </h1>
              </div>
            </div>
            <p className="text-muted-foreground ml-[52px]">
              {stepConfig[currentStep - 1].desc}
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
                    <div className="flex items-center justify-between mb-1">
                      <label className="luxury-label block">What is the startup idea?</label>
                      <span className={`text-[10px] font-medium ${
                        formData.idea.length < 30 ? "text-destructive" : formData.idea.length < 100 ? "text-primary" : "text-success"
                      }`}>
                        {formData.idea.length < 30 ? "Too short" : formData.idea.length < 100 ? "Good" : "Detailed"} ({formData.idea.length})
                      </span>
                    </div>
                    <textarea
                      className="luxury-textarea min-h-[120px]"
                      placeholder="Describe the business in one crisp paragraph: what it is, who it serves, and why now."
                      value={formData.idea}
                      onChange={(e) => setFormData({ ...formData, idea: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="luxury-label mb-3 block">Industry</label>
                      <input
                        type="text"
                        className="luxury-input"
                        placeholder="AI tools, fintech, healthtech, edtech..."
                        value={formData.industry}
                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="luxury-label mb-3 block">Target Segment</label>
                      <input
                        type="text"
                        className="luxury-input"
                        placeholder="Students, SMB founders, recruiters, clinics..."
                        value={formData.targetSegment}
                        onChange={(e) => setFormData({ ...formData, targetSegment: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="luxury-label mb-3 block">Revenue Model</label>
                      <select
                        className="luxury-input"
                        value={formData.revenueModel}
                        onChange={(e) => setFormData({ ...formData, revenueModel: e.target.value })}
                      >
                        <option value="subscription">Subscription</option>
                        <option value="freemium">Freemium</option>
                        <option value="marketplace">Marketplace</option>
                        <option value="one-time">One-time purchase</option>
                        <option value="enterprise-sales">Enterprise sales</option>
                        <option value="advertising">Advertising</option>
                        <option value="usage-based">Usage-based</option>
                      </select>
                    </div>
                    <div>
                      <label className="luxury-label mb-3 block">Current Stage</label>
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
                    <div className="flex items-center justify-between mb-1">
                      <label className="luxury-label block">What painful problem exists?</label>
                      <span className={`text-[10px] font-medium ${
                        formData.problem.length < 30 ? "text-destructive" : formData.problem.length < 100 ? "text-primary" : "text-success"
                      }`}>
                        {formData.problem.length < 30 ? "Too short" : formData.problem.length < 100 ? "Good" : "Detailed"} ({formData.problem.length})
                      </span>
                    </div>
                    <textarea
                      className="luxury-textarea min-h-[100px]"
                      placeholder="Describe the pain, the current frustration, and why it matters enough for people to pay attention."
                      value={formData.problem}
                      onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="luxury-label block">How does your solution solve it?</label>
                      <span className={`text-[10px] font-medium ${
                        formData.solution.length < 30 ? "text-destructive" : formData.solution.length < 100 ? "text-primary" : "text-success"
                      }`}>
                        {formData.solution.length < 30 ? "Too short" : formData.solution.length < 100 ? "Good" : "Detailed"} ({formData.solution.length})
                      </span>
                    </div>
                    <textarea
                      className="luxury-textarea min-h-[100px]"
                      placeholder="Explain the product, the workflow, and the transformation users get after adopting it."
                      value={formData.solution}
                      onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="luxury-label block">Who is your target customer?</label>
                      <span className={`text-[10px] font-medium ${
                        formData.targetCustomer.length < 20 ? "text-destructive" : formData.targetCustomer.length < 60 ? "text-primary" : "text-success"
                      }`}>
                        {formData.targetCustomer.length < 20 ? "Too short" : formData.targetCustomer.length < 60 ? "Good" : "Detailed"} ({formData.targetCustomer.length})
                      </span>
                    </div>
                    <textarea
                      className="luxury-textarea min-h-[100px]"
                      placeholder="Describe your ideal customer with specifics: role, company size, buying trigger, and current workaround."
                      value={formData.targetCustomer}
                      onChange={(e) => setFormData({ ...formData, targetCustomer: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="luxury-label mb-3 block">Price Point</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                        <input
                          type="text"
                          className="luxury-input pl-8"
                          placeholder="99 / month"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="luxury-label mb-3 block">Product Type</label>
                      <select
                        className="luxury-input"
                        value={formData.platform}
                        onChange={(e) => setFormData({ ...formData, platform: e.target.value as FormData["platform"] })}
                      >
                        <option value="digital">Digital</option>
                        <option value="physical">Physical</option>
                        <option value="hybrid">Hybrid</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="luxury-label mb-3 block">What is your unique insight?</label>
                    <textarea
                      className="luxury-textarea"
                      placeholder="What do you believe about this market that most people miss or underestimate?"
                      value={formData.uniqueInsight}
                      onChange={(e) => setFormData({ ...formData, uniqueInsight: e.target.value })}
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 2: Location Reality */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="luxury-label mb-3 block">
                      <MapPin className="w-3.5 h-3.5 inline mr-1" />
                      Country
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {countries.map((country) => (
                        <button
                          key={country.code}
                          type="button"
                          onClick={() => setFormData({ ...formData, country: country.code, state: "" })}
                          className={`option-card haptic-click ${formData.country === country.code ? "selected" : ""}`}
                        >
                          <span className="text-xl mb-1 block">{country.flag}</span>
                          <span className="text-sm font-medium">{country.name}</span>
                          {country.startupHub && (
                            <span className="text-[10px] text-primary mt-1 block">Startup Hub</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {selectedCountry?.states && selectedCountry.states.length > 0 && (
                    <div>
                      <label className="luxury-label mb-3 block">State / Region</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {selectedCountry.states.map((state) => (
                          <button
                            key={state.code}
                            type="button"
                            onClick={() => setFormData({ ...formData, state: state.code })}
                            className={`option-card haptic-click ${formData.state === state.code ? "selected" : ""}`}
                          >
                            <span className="text-sm font-medium">{state.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="luxury-label mb-3 block">City Tier</label>
                    <OptionGrid
                      options={cityTiers}
                      value={formData.cityTier}
                      onChange={(v) => setFormData({ ...formData, cityTier: v as FormData["cityTier"] })}
                    />
                  </div>

                  <div>
                    <label className="luxury-label mb-3 block">Market Maturity</label>
                    <OptionGrid
                      options={marketMaturityOptions}
                      value={formData.marketMaturity}
                      onChange={(v) => setFormData({ ...formData, marketMaturity: v as FormData["marketMaturity"] })}
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 3: Market Culture */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="luxury-label mb-3 block">Where are your customers located?</label>
                    <OptionGrid
                      options={customerLocationOptions}
                      value={formData.customerLocation}
                      onChange={(v) => setFormData({ ...formData, customerLocation: v as FormData["customerLocation"] })}
                    />
                  </div>

                  <div>
                    <label className="luxury-label mb-3 block">Payment Infrastructure</label>
                    <OptionGrid
                      options={paymentMaturityOptions}
                      value={formData.paymentMaturity}
                      onChange={(v) => setFormData({ ...formData, paymentMaturity: v as FormData["paymentMaturity"] })}
                    />
                  </div>

                  <div>
                    <label className="luxury-label mb-3 block">Trust Culture</label>
                    <OptionGrid
                      options={trustCultureOptions}
                      value={formData.trustCulture}
                      onChange={(v) => setFormData({ ...formData, trustCulture: v as FormData["trustCulture"] })}
                    />
                  </div>

                  <div>
                    <label className="luxury-label mb-3 block">Regulatory Environment</label>
                    <OptionGrid
                      options={regulatoryEnvironmentOptions}
                      value={formData.regulatoryEnvironment}
                      onChange={(v) => setFormData({ ...formData, regulatoryEnvironment: v as FormData["regulatoryEnvironment"] })}
                    />
                  </div>

                  <div>
                    <label className="luxury-label mb-3 block">Infrastructure Quality</label>
                    <OptionGrid
                      options={infrastructureOptions}
                      value={formData.infrastructure}
                      onChange={(v) => setFormData({ ...formData, infrastructure: v as FormData["infrastructure"] })}
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 4: Founder Reality */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="luxury-label mb-3 block">Age Range</label>
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
                      <label className="luxury-label mb-3 block">Core Skill</label>
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
                    <label className="luxury-label mb-3 block">Years of Industry Experience</label>
                    <OptionGrid
                      options={[
                        { value: "0-2", label: "0-2 years", desc: "New to industry" },
                        { value: "2-5", label: "2-5 years", desc: "Building expertise" },
                        { value: "5-10", label: "5-10 years", desc: "Deep experience" },
                        { value: "10-plus", label: "10+ years", desc: "Industry veteran" },
                      ]}
                      value={formData.industryYears}
                      onChange={(v) => setFormData({ ...formData, industryYears: v as FormData["industryYears"] })}
                    />
                  </div>

                  <div>
                    <label className="luxury-label mb-3 block">Energy Level / Commitment</label>
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
                    <label className="luxury-label mb-3 block">Previous Business Experience</label>
                    <OptionGrid
                      options={[
                        { value: "none", label: "First Time", desc: "No prior businesses" },
                        { value: "failed", label: "Failed Startup", desc: "Learned from failure" },
                        { value: "small-exit", label: "Small Exit", desc: "Sold for <$1M" },
                        { value: "big-exit", label: "Major Exit", desc: "Sold for >$1M" },
                      ]}
                      value={formData.previousBusiness}
                      onChange={(v) => setFormData({ ...formData, previousBusiness: v as FormData["previousBusiness"] })}
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 5: Capital Reality */}
              {currentStep === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="luxury-label mb-3 block">Available Budget</label>
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
                    <label className="luxury-label mb-3 block">Monthly Burn Tolerance</label>
                    <OptionGrid
                      options={[
                        { value: "under-5k", label: "Under $5K", desc: "Lean operation" },
                        { value: "5k-15k", label: "$5K-$15K", desc: "Small team" },
                        { value: "15k-50k", label: "$15K-$50K", desc: "Growth mode" },
                        { value: "50k-plus", label: "$50K+", desc: "Scale ready" },
                      ]}
                      value={formData.monthlyBurn}
                      onChange={(v) => setFormData({ ...formData, monthlyBurn: v as FormData["monthlyBurn"] })}
                    />
                  </div>

                  <div>
                    <label className="luxury-label mb-3 block">Personal Risk Tolerance</label>
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

              {/* Step 6: Network & Time */}
              {currentStep === 6 && (
                <motion.div
                  key="step6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="luxury-label mb-3 block">Hours Per Day Available</label>
                    <OptionGrid
                      options={[
                        { value: "1-2", label: "1-2 hours", desc: "Very limited" },
                        { value: "4-6", label: "4-6 hours", desc: "Part-time focus" },
                        { value: "8-plus", label: "8+ hours", desc: "Full-time focus" },
                        { value: "all-waking", label: "All waking hours", desc: "Complete dedication" },
                      ]}
                      value={formData.hoursPerDay}
                      onChange={(v) => setFormData({ ...formData, hoursPerDay: v as FormData["hoursPerDay"] })}
                    />
                  </div>

                  <div>
                    <label className="luxury-label mb-3 block">Timeline Expectation</label>
                    <OptionGrid
                      options={[
                        { value: "fast-money", label: "Fast Money", desc: "Revenue in 3 months" },
                        { value: "12-months", label: "12 Months", desc: "Standard runway" },
                        { value: "long-term", label: "Long-Term", desc: "Building for years" },
                      ]}
                      value={formData.deadline}
                      onChange={(v) => setFormData({ ...formData, deadline: v as FormData["deadline"] })}
                    />
                  </div>

                  <div>
                    <label className="luxury-label mb-3 block">Investor Access</label>
                    <OptionGrid
                      options={investorAccessOptions}
                      value={formData.investorAccess}
                      onChange={(v) => setFormData({ ...formData, investorAccess: v as FormData["investorAccess"] })}
                    />
                  </div>

                  <div>
                    <label className="luxury-label mb-3 block">Customer Access</label>
                    <OptionGrid
                      options={customerAccessOptions}
                      value={formData.customerAccess}
                      onChange={(v) => setFormData({ ...formData, customerAccess: v as FormData["customerAccess"] })}
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 7: Outcome Intent */}
              {currentStep === 7 && (
                <motion.div
                  key="step7"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="luxury-label mb-3 block">Ultimate Goal</label>
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
                    <label className="luxury-label mb-3 block">What is your competitive advantage?</label>
                    <textarea
                      className="luxury-textarea"
                      placeholder="What makes you uniquely qualified to win? (expertise, access, technology, relationships)"
                      value={formData.competitiveAdvantage}
                      onChange={(e) => setFormData({ ...formData, competitiveAdvantage: e.target.value })}
                    />
                  </div>

                  <div className="p-5 rounded-2xl bg-primary/5 border border-primary/20">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Shield className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium mb-1">What happens next</p>
                        <p className="text-sm text-muted-foreground">
                          Your idea goes through a fast multi-agent verdict first, then unlocks optional deep research
                          with market intelligence, competitor analysis, strategy recommendations, and startup artifacts.
                        </p>
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
                  className="group animate-breathing-glow"
                  size="lg"
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
  <div className={`grid gap-3 ${options.length <= 3 ? `grid-cols-${options.length}` : "grid-cols-2 sm:grid-cols-4"}`}>
    {options.map((option) => (
      <button
        key={option.value}
        type="button"
        onClick={() => onChange(option.value)}
        className={`option-card haptic-click ${value === option.value ? "selected" : ""}`}
      >
        <span className="text-sm font-medium block">{option.label}</span>
        {option.desc && <span className="text-xs opacity-60 mt-0.5 block">{option.desc}</span>}
      </button>
    ))}
  </div>
);

export default Input;
