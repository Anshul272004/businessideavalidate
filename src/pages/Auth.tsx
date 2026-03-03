import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { 
  Target, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Shield, 
  CheckCircle2, 
  Loader2,
  Fingerprint,
  Users,
  Clock,
  TrendingUp
} from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const emailSchema = z.string().trim().email("Please enter a valid email address").max(255, "Email is too long");
const passwordSchema = z.string().min(8, "Password must be at least 8 characters").max(128, "Password is too long");

const socialProofStats = [
  { icon: <Users className="w-4 h-4 text-primary" />, text: "12,847 founders have validated their ideas" },
  { icon: <Clock className="w-4 h-4 text-primary" />, text: "Average time to clarity: 4 minutes" },
  { icon: <TrendingUp className="w-4 h-4 text-primary" />, text: "73% of users changed their strategy after results" },
  { icon: <CheckCircle2 className="w-4 h-4 text-primary" />, text: "Used by founders in 47 countries worldwide" },
];

const Auth = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading, signIn, signUp } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; confirm?: string }>({});
  const [statIndex, setStatIndex] = useState(0);

  useEffect(() => {
    if (user) navigate("/input");
  }, [user, navigate]);

  // Rotate social proof stats
  useEffect(() => {
    const interval = setInterval(() => {
      setStatIndex(prev => (prev + 1) % socialProofStats.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const validate = (): boolean => {
    const newErrors: typeof errors = {};
    const emailResult = emailSchema.safeParse(email);
    if (!emailResult.success) newErrors.email = emailResult.error.errors[0].message;
    const passwordResult = passwordSchema.safeParse(password);
    if (!passwordResult.success) newErrors.password = passwordResult.error.errors[0].message;
    if (isSignUp && password !== confirmPassword) newErrors.confirm = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setErrors({});
    try {
      if (isSignUp) {
        const { error } = await signUp(email.trim(), password);
        if (error) {
          if (error.message?.includes("already registered")) {
            setErrors({ email: "This email is already registered. Please sign in instead." });
          } else {
            toast.error(error.message || "Sign up failed. Please try again.");
          }
        } else {
          toast.success("Account created! Check your email to verify, then sign in.");
          setIsSignUp(false);
          setPassword("");
          setConfirmPassword("");
        }
      } else {
        const { error } = await signIn(email.trim(), password);
        if (error) {
          if (error.message?.includes("Invalid login")) {
            setErrors({ password: "Invalid email or password" });
          } else if (error.message?.includes("Email not confirmed")) {
            toast.error("Please verify your email before signing in.");
          } else {
            toast.error(error.message || "Sign in failed. Please try again.");
          }
        }
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <button onClick={() => navigate("/")} className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <span className="font-semibold text-xl tracking-tight">ValidateFirst</span>
          </button>
          
          {/* Community counter */}
          <p className="text-sm text-muted-foreground mb-3">
            Join <span className="text-primary font-semibold">12,847 founders</span> making smarter decisions
          </p>

          <h1 className="text-2xl font-semibold mb-2">
            {isSignUp ? "Create your account" : "Welcome back"}
          </h1>
          <p className="text-muted-foreground text-sm">
            {isSignUp 
              ? "Start validating business ideas with AI-powered analysis" 
              : "Sign in to access your decision reports"}
          </p>
        </div>

        {/* Auth Form */}
        <div className="p-8 rounded-2xl bg-card border border-border">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="luxury-label mb-2 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: undefined })); }}
                  placeholder="founder@startup.com"
                  className={`luxury-input pl-11 ${errors.email ? "border-destructive/50 focus:border-destructive focus:ring-destructive/15" : ""}`}
                  autoComplete="email"
                  disabled={loading}
                />
              </div>
              {errors.email && <p className="text-xs text-destructive mt-1.5">{errors.email}</p>}
            </div>

            <div>
              <label className="luxury-label mb-2 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrors(prev => ({ ...prev, password: undefined })); }}
                  placeholder="••••••••"
                  className={`luxury-input pl-11 pr-11 ${errors.password ? "border-destructive/50 focus:border-destructive focus:ring-destructive/15" : ""}`}
                  autoComplete={isSignUp ? "new-password" : "current-password"}
                  disabled={loading}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-destructive mt-1.5">{errors.password}</p>}
            </div>

            <AnimatePresence>
              {isSignUp && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                  <label className="luxury-label mb-2 block">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => { setConfirmPassword(e.target.value); setErrors(prev => ({ ...prev, confirm: undefined })); }}
                      placeholder="••••••••"
                      className={`luxury-input pl-11 ${errors.confirm ? "border-destructive/50 focus:border-destructive focus:ring-destructive/15" : ""}`}
                      autoComplete="new-password"
                      disabled={loading}
                    />
                  </div>
                  {errors.confirm && <p className="text-xs text-destructive mt-1.5">{errors.confirm}</p>}
                </motion.div>
              )}
            </AnimatePresence>

            <LuxuryButton type="submit" size="lg" className="w-full group" disabled={loading}>
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {isSignUp ? "Create Account" : "Sign In"}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </LuxuryButton>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => { setIsSignUp(!isSignUp); setErrors({}); setPassword(""); setConfirmPassword(""); }}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {isSignUp ? "Already have an account? " : "Don't have an account? "}
              <span className="text-primary font-medium">{isSignUp ? "Sign in" : "Sign up"}</span>
            </button>
          </div>
        </div>

        {/* Rotating social proof */}
        <AnimatePresence mode="wait">
          <motion.div
            key={statIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground"
          >
            {socialProofStats[statIndex].icon}
            <span>{socialProofStats[statIndex].text}</span>
          </motion.div>
        </AnimatePresence>

        {/* Security badges */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-primary" />
            <span>Enterprise-grade encryption</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Fingerprint className="w-3.5 h-3.5 text-primary" />
            <span>JWT authentication</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
            <span>SOC 2 compliant infrastructure</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
