import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { ArrowRight, ArrowLeft, Sparkles } from "lucide-react";

interface FormData {
  idea: string;
  targetCustomer: string;
  price: string;
  experience: "beginner" | "intermediate" | "advanced";
}

const Input = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isPaid = searchParams.get("paid") === "true";

  const [formData, setFormData] = useState<FormData>({
    idea: "",
    targetCustomer: "",
    price: "",
    experience: "beginner",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sessionStorage.setItem("validationData", JSON.stringify(formData));
    navigate("/loading");
  };

  if (!isPaid) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="luxury-container text-center">
          <p className="text-muted-foreground mb-6">
            Please complete payment to access the validator.
          </p>
          <LuxuryButton onClick={() => navigate("/")}>
            Go to Payment
          </LuxuryButton>
        </div>
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
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </nav>

      <div className="luxury-container pb-24 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-16 animate-fade-up">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Step 1 of 2</p>
                <p className="font-medium">Describe your idea</p>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Tell us about your
              <span className="font-serif italic font-normal"> idea.</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Be honest. The more specific you are, the better the analysis.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-10 animate-fade-up-delay">
            {/* Idea Field */}
            <div className="space-y-3">
              <label className="luxury-label">What's your business idea?</label>
              <textarea
                className="luxury-textarea"
                placeholder="Describe what you want to build, the problem it solves, and how it works..."
                value={formData.idea}
                onChange={(e) =>
                  setFormData({ ...formData, idea: e.target.value })
                }
                required
              />
            </div>

            {/* Target Customer Field */}
            <div className="space-y-3">
              <label className="luxury-label">Who's your target customer?</label>
              <input
                type="text"
                className="luxury-input"
                placeholder="e.g., Freelance designers aged 25-40 struggling with invoicing"
                value={formData.targetCustomer}
                onChange={(e) =>
                  setFormData({ ...formData, targetCustomer: e.target.value })
                }
                required
              />
            </div>

            {/* Price Field */}
            <div className="space-y-3">
              <label className="luxury-label">
                What price do you plan to charge?
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
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  required
                  min="0"
                />
              </div>
            </div>

            {/* Experience Level */}
            <div className="space-y-4">
              <label className="luxury-label">Your experience level</label>
              <div className="grid grid-cols-3 gap-3">
                {(["beginner", "intermediate", "advanced"] as const).map(
                  (level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, experience: level })
                      }
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

            {/* Submit Button */}
            <div className="pt-6">
              <LuxuryButton type="submit" size="lg" className="w-full sm:w-auto group">
                Analyze My Idea
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </LuxuryButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Input;
