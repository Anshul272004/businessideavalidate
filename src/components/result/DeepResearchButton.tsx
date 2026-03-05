import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Loader2,
  ChevronDown,
  ChevronUp,
  FlaskConical,
  Link2,
  Sparkles,
  ShieldCheck,
  FileText,
  TriangleAlert,
  ExternalLink,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface DeepResearchButtonProps {
  section: string;
  originalIdea: string;
  validationResult: any;
  formData?: Record<string, any> | null;
  validationId?: string | null;
}

interface ResearchResponse {
  runId: string | null;
  packet: {
    summary: string;
    conviction: string;
    opportunityScore: number;
    keyFindings: Array<{
      title: string;
      insight: string;
      implication: string;
    }>;
    experiments: Array<{
      title: string;
      why: string;
      how: string;
    }>;
    risks: string[];
    artifactPreview?: {
      title: string;
      bullets: string[];
    } | null;
  };
  sources: Array<{
    url: string;
    title: string;
    snippet?: string;
    source_type?: string;
  }>;
  connectors: {
    liveResearch: boolean;
    perplexity: boolean;
    firecrawl: boolean;
  };
}

const sectionPrompts: Record<string, string> = {
  Market: "Deep-dive the market with TAM/SAM/SOM logic, demand signals, adoption drivers, barriers, and what would most likely make this market expand or stall.",
  Competitors: "Map direct and indirect competitors, their pricing and moats, where they are weak, and what wedge gives this startup the best entry point.",
  Pricing: "Analyze monetization in depth with pricing structure, packaging, willingness-to-pay, expansion levers, and the highest-leverage pricing experiments.",
  Regional: "Break down local market conditions, cultural adoption patterns, trust requirements, regulations, and what needs to change to win in this geography.",
  Execution: "Create an execution blueprint covering MVP scope, hiring needs, technical complexity, timeline, risks, and the fastest path to customer proof.",
};

const DeepResearchButton = ({
  section,
  originalIdea,
  validationResult,
  formData,
  validationId,
}: DeepResearchButtonProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [research, setResearch] = useState<ResearchResponse | null>(null);

  const handleDeepResearch = async () => {
    if (research) {
      setIsExpanded(!isExpanded);
      return;
    }

    setIsExpanded(true);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("research-orchestrator", {
        body: {
          section,
          prompt: sectionPrompts[section] || `Go deeper on the ${section} dimension of this startup.`,
          originalIdea,
          validationResult,
          formData,
          validationId,
        },
      });

      if (error) throw error;
      setResearch(data as ResearchResponse);
    } catch (e: any) {
      const message = e?.message || "Failed to generate deep research";
      if (message.includes("429")) toast.error("Deep research is rate limited right now. Try again in a moment.");
      else if (message.includes("402")) toast.error("Research credits are exhausted right now.");
      else toast.error(message);
      setIsExpanded(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={handleDeepResearch}
        className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-2 text-xs font-medium text-primary transition-colors hover:bg-primary/10"
      >
        <Search className="h-3.5 w-3.5" />
        {research ? (isExpanded ? "Hide Deep Research" : "Show Deep Research") : `Run Deep Research: ${section}`}
        {research ? (isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />) : null}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-3 rounded-2xl border border-primary/15 bg-card p-5">
              {isLoading ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Building the research packet...
                </div>
              ) : research ? (
                <div className="space-y-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-medium text-primary">
                      <FlaskConical className="h-3.5 w-3.5" />
                      Opportunity score {research.packet.opportunityScore}/100
                    </span>
                    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-medium ${
                      research.connectors.liveResearch
                        ? "bg-success/10 text-success"
                        : "bg-secondary text-secondary-foreground"
                    }`}>
                      {research.connectors.liveResearch ? <ShieldCheck className="h-3.5 w-3.5" /> : <Sparkles className="h-3.5 w-3.5" />}
                      {research.connectors.liveResearch ? "Grounded with live sources" : "AI synthesis mode"}
                    </span>
                  </div>

                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Conviction</p>
                    <p className="mb-3 text-sm font-medium text-foreground">{research.packet.conviction}</p>
                    <p className="text-sm leading-relaxed text-muted-foreground">{research.packet.summary}</p>
                  </div>

                  <div className="grid gap-3 md:grid-cols-2">
                    {research.packet.keyFindings.map((finding) => (
                      <div key={finding.title} className="rounded-xl border border-border bg-secondary/40 p-4">
                        <p className="mb-2 text-sm font-semibold text-foreground">{finding.title}</p>
                        <p className="mb-2 text-sm text-muted-foreground">{finding.insight}</p>
                        <p className="text-xs uppercase tracking-[0.16em] text-primary">{finding.implication}</p>
                      </div>
                    ))}
                  </div>

                  {research.packet.experiments.length > 0 && (
                    <div>
                      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Recommended experiments</p>
                      <div className="space-y-3">
                        {research.packet.experiments.map((experiment) => (
                          <div key={experiment.title} className="rounded-xl border border-border p-4">
                            <p className="mb-1 text-sm font-semibold text-foreground">{experiment.title}</p>
                            <p className="mb-1 text-sm text-muted-foreground">{experiment.why}</p>
                            <p className="text-sm text-primary">{experiment.how}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {research.packet.artifactPreview && (
                    <div className="rounded-xl border border-primary/15 bg-primary/5 p-4">
                      <div className="mb-2 flex items-center gap-2 text-primary">
                        <FileText className="h-4 w-4" />
                        <p className="text-sm font-semibold">{research.packet.artifactPreview.title}</p>
                      </div>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {research.packet.artifactPreview.bullets.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {research.packet.risks.length > 0 && (
                    <div>
                      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Research risks</p>
                      <div className="space-y-2">
                        {research.packet.risks.map((risk) => (
                          <div key={risk} className="flex items-start gap-2 rounded-xl bg-destructive/5 p-3 text-sm text-muted-foreground">
                            <TriangleAlert className="mt-0.5 h-4 w-4 text-destructive" />
                            <span>{risk}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <Link2 className="h-4 w-4 text-primary" />
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Sources</p>
                    </div>
                    {research.sources.length > 0 ? (
                      <div className="space-y-3">
                        {research.sources.map((source) => (
                          <a
                            key={`${source.url}-${source.title}`}
                            href={source.url}
                            target="_blank"
                            rel="noreferrer"
                            className="block rounded-xl border border-border p-4 transition-colors hover:border-primary/30 hover:bg-secondary/40"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <p className="text-sm font-medium text-foreground">{source.title}</p>
                                {source.snippet ? (
                                  <p className="mt-1 text-sm text-muted-foreground">{source.snippet}</p>
                                ) : null}
                              </div>
                              <ExternalLink className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
                            </div>
                          </a>
                        ))}
                      </div>
                    ) : (
                      <div className="rounded-xl border border-dashed border-border p-4 text-sm text-muted-foreground">
                        No live citations yet — connect Perplexity and Firecrawl to ground this section with external evidence.
                      </div>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DeepResearchButton;
