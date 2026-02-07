import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Input from "./pages/Input";
import Loading from "./pages/Loading";
import Result from "./pages/Result";
import Pricing from "./pages/Pricing";
import CaseStudies from "./pages/CaseStudies";
import Methodology from "./pages/Methodology";
import WhoThisIsNotFor from "./pages/WhoThisIsNotFor";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/input" element={
              <ProtectedRoute>
                <Input />
              </ProtectedRoute>
            } />
            <Route path="/loading" element={
              <ProtectedRoute>
                <Loading />
              </ProtectedRoute>
            } />
            <Route path="/result" element={
              <ProtectedRoute>
                <Result />
              </ProtectedRoute>
            } />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/methodology" element={<Methodology />} />
            <Route path="/who-this-is-not-for" element={<WhoThisIsNotFor />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
