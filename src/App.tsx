import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
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
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/input" element={<Input />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/result" element={<Result />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/methodology" element={<Methodology />} />
          <Route path="/who-this-is-not-for" element={<WhoThisIsNotFor />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
