import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Brain } from "lucide-react";

const loadingMessages = [
  "Scanning human behavior patterns...",
  "Analyzing market psychology...",
  "Evaluating buying friction...",
  "Mapping cognitive triggers...",
  "Processing neuroscience signals...",
  "Generating honest assessment...",
];

const Loading = () => {
  const navigate = useNavigate();
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const formData = sessionStorage.getItem("validationData");
    if (!formData) {
      navigate("/");
      return;
    }

    // Cycle through messages
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 1500);

    // Progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    }, 100);

    // Navigate to results after 5 seconds
    const timeout = setTimeout(() => {
      // Generate mock result for now (will be replaced with AI call)
      const mockResult = generateMockResult(JSON.parse(formData));
      sessionStorage.setItem("validationResult", JSON.stringify(mockResult));
      navigate("/result");
    }, 5000);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
      clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="luxury-container text-center">
        {/* Brain Animation */}
        <div className="relative mb-12">
          <div className="w-24 h-24 mx-auto relative">
            <Brain className="w-24 h-24 text-primary animate-pulse" />
            <div className="absolute inset-0 rounded-full animate-pulse-ring bg-primary/20" />
          </div>
        </div>

        {/* Loading Message */}
        <p className="text-xl text-muted-foreground mb-8 h-8 transition-opacity duration-300 fade-in">
          {loadingMessages[messageIndex]}
        </p>

        {/* Progress Bar */}
        <div className="max-w-md mx-auto">
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground/50 mt-4">
            {progress}% complete
          </p>
        </div>
      </div>
    </div>
  );
};

// Mock result generator (will be replaced with actual AI call)
function generateMockResult(formData: any) {
  const painScore = Math.floor(Math.random() * 4) + 6; // 6-10
  const verdicts = ["GO", "PIVOT", "KILL"] as const;
  const verdict = verdicts[Math.floor(Math.random() * 2)]; // Mostly GO or PIVOT for demo

  return {
    demand_psychology: `The problem you're solving addresses a genuine pain point in the ${formData.targetCustomer} market. There's evidence of emotional investment in finding solutions, particularly around daily frustrations that create strong motivation to pay.`,
    pain_realism: {
      score: painScore,
      urgency: painScore >= 8 ? "high" : painScore >= 5 ? "medium" : "low",
    },
    buying_friction: [
      "Price sensitivity may exist if not properly positioned",
      "Trust building needed for first-time buyers",
      "Clear value demonstration required upfront",
    ],
    pricing_psychology: {
      fair: true,
      suggested: `$${Math.floor(Number(formData.price) * 0.8)}-$${Math.floor(Number(formData.price) * 1.5)}`,
      reason: `Based on market positioning and perceived value, anchoring at ${Number(formData.price) > 50 ? "premium" : "accessible"} tier would be optimal.`,
    },
    neuroscience: {
      value_triggers: ["Relief from pain point", "Time savings", "Status elevation"],
      risk: formData.experience === "beginner" ? "medium" : "low",
      trust_difficulty: "medium",
    },
    verdict: verdict,
    immediate_plan: [
      "Day 1: Create a simple landing page",
      "Day 3: Share with 10 potential customers",
      "Week 1: Collect 5 pre-orders or commitments",
    ],
  };
}

export default Loading;
