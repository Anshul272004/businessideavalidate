import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { ArrowRight } from "lucide-react";

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
    // Store form data and navigate to loading
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
    <div className="min-h-screen bg-background py-16 md:py-24">
      <div className="max-w-2xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 fade-in">
          <p className="text-sm text-muted-foreground tracking-widest uppercase mb-4">
            Step 1 of 2
          </p>
          <h1 className="text-3xl md:text-4xl font-medium text-foreground mb-4">
            Tell us about your idea.
          </h1>
          <p className="text-muted-foreground italic">
            There are no right answers. Clarity comes from honesty.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-12 slide-up">
          {/* Idea Field */}
          <div className="space-y-3">
            <label className="luxury-label">Your business idea</label>
            <textarea
              className="luxury-textarea"
              placeholder="Describe the idea in your own words. What problem does it solve, and for whom?"
              value={formData.idea}
              onChange={(e) =>
                setFormData({ ...formData, idea: e.target.value })
              }
              required
            />
          </div>

          {/* Target Customer Field */}
          <div className="space-y-3">
            <label className="luxury-label">Who is this for?</label>
            <input
              type="text"
              className="luxury-input"
              placeholder="Be specific. Age, role, or situation."
              value={formData.targetCustomer}
              onChange={(e) =>
                setFormData({ ...formData, targetCustomer: e.target.value })
              }
              required
            />
          </div>

          {/* Price Field */}
          <div className="space-y-3">
            <label className="luxury-label">Price you plan to charge</label>
            <div className="flex items-center">
              <span className="text-muted-foreground mr-2">$</span>
              <input
                type="number"
                className="luxury-input"
                placeholder="What feels reasonable to you?"
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
            <div className="flex flex-wrap gap-6">
              {(["beginner", "intermediate", "advanced"] as const).map(
                (level) => (
                  <label
                    key={level}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <div
                      className={`w-5 h-5 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                        formData.experience === level
                          ? "border-primary"
                          : "border-muted-foreground/30 group-hover:border-muted-foreground/60"
                      }`}
                    >
                      {formData.experience === level && (
                        <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                      )}
                    </div>
                    <span
                      className={`capitalize transition-colors ${
                        formData.experience === level
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {level}
                    </span>
                    <input
                      type="radio"
                      name="experience"
                      value={level}
                      checked={formData.experience === level}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          experience: e.target.value as FormData["experience"],
                        })
                      }
                      className="sr-only"
                    />
                  </label>
                )
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-8">
            <LuxuryButton type="submit" size="lg">
              Analyze My Idea
              <ArrowRight className="ml-2 h-5 w-5" />
            </LuxuryButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Input;
