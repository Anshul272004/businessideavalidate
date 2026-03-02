import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import PageTransition from "@/components/shared/PageTransition";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Input from "./pages/Input";
import Loading from "./pages/Loading";
import Result from "./pages/Result";
import Pricing from "./pages/Pricing";
import CaseStudies from "./pages/CaseStudies";
import Methodology from "./pages/Methodology";
import WhoThisIsNotFor from "./pages/WhoThisIsNotFor";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Landing /></PageTransition>} />
        <Route path="/auth" element={<PageTransition><Auth /></PageTransition>} />
        <Route path="/dashboard" element={
          <ProtectedRoute><PageTransition><Dashboard /></PageTransition></ProtectedRoute>
        } />
        <Route path="/input" element={
          <ProtectedRoute><PageTransition><Input /></PageTransition></ProtectedRoute>
        } />
        <Route path="/loading" element={
          <ProtectedRoute><PageTransition><Loading /></PageTransition></ProtectedRoute>
        } />
        <Route path="/result" element={
          <ProtectedRoute><PageTransition><Result /></PageTransition></ProtectedRoute>
        } />
        <Route path="/pricing" element={<PageTransition><Pricing /></PageTransition>} />
        <Route path="/case-studies" element={<PageTransition><CaseStudies /></PageTransition>} />
        <Route path="/methodology" element={<PageTransition><Methodology /></PageTransition>} />
        <Route path="/who-this-is-not-for" element={<PageTransition><WhoThisIsNotFor /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
