import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  FileText, Map, Presentation, Loader2, Copy, Check,
  ChevronDown, ChevronRight, Sparkles
} from "lucide-react";
import { LuxuryButton } from "@/components/ui/luxury-button";

interface ArtifactGeneratorProps {
  validationResult: any;
  formData: any;
  validationId: string | null;
}

type ArtifactType = "business-plan" | "mvp-roadmap" | "pitch-deck";

const artifactConfig: Record<ArtifactType, { label: string; icon: any; description: string }> = {
  "business-plan": {
    label: "Business Plan",
    icon: FileText,
    description: "Executive summary, market analysis, strategy & projections",
  },
  "mvp-roadmap": {
    label: "MVP Roadmap",
    icon: Map,
    description: "Features, tech stack, timeline & budget",
  },
  "pitch-deck": {
    label: "Pitch Deck",
    icon: Presentation,
    description: "7-slide investor deck with talking points",
  },
};

const ArtifactGenerator = ({ validationResult, formData, validationId }: ArtifactGeneratorProps) => {
  const [artifacts, setArtifacts] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState<string | null>(null);

  const generate = async (type: ArtifactType) => {
    setLoading(prev => ({ ...prev, [type]: true }));
    try {
      const { data, error } = await supabase.functions.invoke("generate-artifact", {
        body: { artifactType: type, validationId, validationResult, formData },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setArtifacts(prev => ({ ...prev, [type]: data }));
      setExpanded(prev => ({ ...prev, [type]: true }));
      toast.success(`${artifactConfig[type].label} generated!`);
    } catch (e: any) {
      toast.error(e.message || "Failed to generate artifact");
    } finally {
      setLoading(prev => ({ ...prev, [type]: false }));
    }
  };

  const copyMarkdown = (type: ArtifactType) => {
    const md = artifacts[type]?.markdown;
    if (md) {
      navigator.clipboard.writeText(md);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
      toast.success("Copied to clipboard");
    }
  };

  const toggleExpand = (type: ArtifactType) => {
    setExpanded(prev => ({ ...prev, [type]: !prev[type] }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="premium-card rounded-2xl p-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="text-primary"><Sparkles className="w-5 h-5" /></div>
        <h3 className="text-lg font-semibold">AI Artifact Generator</h3>
        <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">PRO</span>
      </div>

      <p className="text-sm text-muted-foreground mb-6">
        Generate investor-ready documents powered by your validation data.
      </p>

      <div className="grid sm:grid-cols-3 gap-3 mb-6">
        {(Object.keys(artifactConfig) as ArtifactType[]).map(type => {
          const config = artifactConfig[type];
          const Icon = config.icon;
          const isGenerated = !!artifacts[type];
          const isLoading = loading[type];

          return (
            <button
              key={type}
              onClick={() => isGenerated ? toggleExpand(type) : generate(type)}
              disabled={isLoading}
              className={`p-4 rounded-xl border text-left transition-all ${
                isGenerated
                  ? "bg-primary/5 border-primary/20 hover:bg-primary/10"
                  : "bg-card border-border hover:border-primary/30 hover:bg-card/80"
              } disabled:opacity-50`}
            >
              <div className="flex items-center gap-2 mb-2">
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                ) : (
                  <Icon className={`w-4 h-4 ${isGenerated ? "text-primary" : "text-muted-foreground"}`} />
                )}
                <span className="text-sm font-medium">{config.label}</span>
              </div>
              <p className="text-xs text-muted-foreground">{config.description}</p>
              {isGenerated && (
                <span className="inline-flex items-center gap-1 mt-2 text-xs text-primary">
                  <Check className="w-3 h-3" /> Generated
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Rendered Artifacts */}
      <AnimatePresence>
        {(Object.keys(artifactConfig) as ArtifactType[]).map(type => {
          if (!artifacts[type] || !expanded[type]) return null;
          const config = artifactConfig[type];
          const data = artifacts[type].artifact;

          return (
            <motion.div
              key={type}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 overflow-hidden"
            >
              <div className="border border-border rounded-xl">
                <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
                  <button onClick={() => toggleExpand(type)} className="flex items-center gap-2 text-sm font-semibold">
                    {expanded[type] ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    {config.label}
                  </button>
                  <button
                    onClick={() => copyMarkdown(type)}
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    {copied === type ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copied === type ? "Copied" : "Copy Markdown"}
                  </button>
                </div>
                <div className="p-6 max-h-[600px] overflow-y-auto">
                  {type === "business-plan" && <BusinessPlanView data={data} />}
                  {type === "mvp-roadmap" && <MvpRoadmapView data={data} />}
                  {type === "pitch-deck" && <PitchDeckView data={data} />}
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
};

const SectionBlock = ({ title, content }: { title: string; content?: string }) => {
  if (!content) return null;
  return (
    <div className="mb-6">
      <h4 className="text-sm font-semibold text-foreground mb-2">{title}</h4>
      <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{content}</p>
    </div>
  );
};

const BusinessPlanView = ({ data }: { data: any }) => (
  <div>
    <SectionBlock title="Executive Summary" content={data?.executive_summary} />
    <SectionBlock title="Market Analysis" content={data?.market_analysis} />
    <SectionBlock title="Product Strategy" content={data?.product_strategy} />
    <SectionBlock title="Marketing Strategy" content={data?.marketing_strategy} />
    <SectionBlock title="Financial Projections" content={data?.financial_projections} />
    <SectionBlock title="Competitive Landscape" content={data?.competitive_landscape} />
    <SectionBlock title="Team Requirements" content={data?.team_requirements} />
  </div>
);

const MvpRoadmapView = ({ data }: { data: any }) => (
  <div>
    {data?.core_features?.length > 0 && (
      <div className="mb-6">
        <h4 className="text-sm font-semibold mb-3">Core Features</h4>
        <div className="space-y-2">
          {data.core_features.map((f: any, i: number) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
              <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                f.priority === "must-have" ? "bg-destructive/10 text-destructive" :
                f.priority === "should-have" ? "bg-primary/10 text-primary" :
                "bg-muted text-muted-foreground"
              }`}>{f.priority}</span>
              <div>
                <p className="text-sm font-medium">{f.feature}</p>
                {f.description && <p className="text-xs text-muted-foreground mt-0.5">{f.description}</p>}
              </div>
              <span className="ml-auto text-xs text-muted-foreground">{f.effort}</span>
            </div>
          ))}
        </div>
      </div>
    )}
    <SectionBlock title="Tech Stack" content={data?.tech_stack} />
    {data?.timeline?.length > 0 && (
      <div className="mb-6">
        <h4 className="text-sm font-semibold mb-3">Timeline</h4>
        <div className="space-y-3">
          {data.timeline.map((t: any, i: number) => (
            <div key={i} className="p-4 rounded-lg border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold">{t.phase}</span>
                <span className="text-xs text-muted-foreground">{t.duration}</span>
              </div>
              <p className="text-xs text-primary mb-2">🎯 {t.milestone}</p>
              <ul className="space-y-1">
                {t.deliverables?.map((d: string, j: number) => (
                  <li key={j} className="text-xs text-muted-foreground">• {d}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    )}
    <SectionBlock title="Budget Estimate" content={data?.budget_estimate} />
  </div>
);

const PitchDeckView = ({ data }: { data: any }) => (
  <div>
    {data?.elevator_pitch && (
      <div className="mb-6 p-4 bg-primary/5 border border-primary/10 rounded-xl">
        <p className="text-xs font-medium text-primary mb-1">Elevator Pitch</p>
        <p className="text-sm text-foreground italic">"{data.elevator_pitch}"</p>
      </div>
    )}
    {data?.slides?.map((slide: any, i: number) => (
      <div key={i} className="mb-4 p-4 rounded-lg border border-border">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">{i + 1}</span>
          <h4 className="text-sm font-semibold">{slide.title}</h4>
        </div>
        <p className="text-sm text-muted-foreground mb-3 whitespace-pre-line">{slide.content}</p>
        {slide.talking_points?.length > 0 && (
          <div className="pl-4 border-l-2 border-primary/20">
            <p className="text-xs font-medium text-primary mb-1">Talking Points</p>
            {slide.talking_points.map((tp: string, j: number) => (
              <p key={j} className="text-xs text-muted-foreground">• {tp}</p>
            ))}
          </div>
        )}
      </div>
    ))}
    {data?.ask && <SectionBlock title="The Ask" content={data.ask} />}
  </div>
);

export default ArtifactGenerator;
