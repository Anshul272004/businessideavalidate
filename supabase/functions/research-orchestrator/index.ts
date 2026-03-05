import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const VALID_SECTIONS = ["Market", "Competitors", "Pricing", "Regional", "Execution"] as const;
type ResearchSection = (typeof VALID_SECTIONS)[number];

const sectionArtifactMap: Record<ResearchSection, string> = {
  Market: "Market Report",
  Competitors: "Competitor Strategy Snapshot",
  Pricing: "Monetization Brief",
  Regional: "Regional Expansion Notes",
  Execution: "MVP Roadmap Brief",
};

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(key: string, max = 8) {
  const now = Date.now();
  const entry = rateLimitMap.get(key);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + 60 * 60 * 1000 });
    return true;
  }
  if (entry.count >= max) return false;
  entry.count += 1;
  return true;
}

function sanitizeInput(input: string, maxLength: number) {
  if (!input || typeof input !== "string") return "";
  return input.replace(/<[^>]*>/g, "").trim().slice(0, maxLength);
}

function isResearchSection(value: string): value is ResearchSection {
  return VALID_SECTIONS.includes(value as ResearchSection);
}

function safeJsonParse<T>(value: string, fallback: T): T {
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function getDomainLabel(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

async function fetchGroundedResearch(query: string, apiKey: string) {
  const response = await fetch("https://api.perplexity.ai/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "sonar-pro",
      temperature: 0.1,
      messages: [
        {
          role: "system",
          content: "You are a startup research analyst. Provide concise, evidence-first research grounded in recent web results.",
        },
        {
          role: "user",
          content: query,
        },
      ],
    }),
  });

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(`Perplexity research failed [${response.status}]: ${JSON.stringify(payload)}`);
  }

  return {
    summary: payload?.choices?.[0]?.message?.content || "",
    citations: Array.isArray(payload?.citations) ? payload.citations : [],
  };
}

async function scrapeSource(url: string, apiKey: string) {
  const response = await fetch("https://api.firecrawl.dev/v1/scrape", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url,
      formats: ["summary"],
      onlyMainContent: true,
    }),
  });

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(`Firecrawl scrape failed [${response.status}]: ${JSON.stringify(payload)}`);
  }

  const data = payload?.data || payload;
  return {
    url,
    title: data?.metadata?.title || getDomainLabel(url),
    snippet: data?.summary || "",
    source_type: "web",
  };
}

async function generateResearchPacket({
  apiKey,
  section,
  prompt,
  originalIdea,
  validationResult,
  formData,
  externalResearch,
}: {
  apiKey: string;
  section: ResearchSection;
  prompt: string;
  originalIdea: string;
  validationResult: any;
  formData: Record<string, any> | null;
  externalResearch: string;
}) {
  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-3-flash-preview",
      temperature: 0.35,
      messages: [
        {
          role: "system",
          content:
            "You are an elite startup deep-research copilot. Turn startup analysis into tight, decision-ready research packets. Prioritize signal over fluff.",
        },
        {
          role: "user",
          content: `SECTION: ${section}\n\nREQUEST: ${prompt}\n\nORIGINAL IDEA:\n${originalIdea}\n\nSTRUCTURED INPUT:\n${JSON.stringify(formData || {}, null, 2)}\n\nFAST VALIDATION RESULT:\n${JSON.stringify(validationResult || {}, null, 2)}\n\nEXTERNAL RESEARCH (may be empty if no connector is linked):\n${externalResearch || "No live external research available. Use the startup context and fast-analysis output."}`,
        },
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "return_research_packet",
            description: "Return a deep research packet for one startup dimension.",
            parameters: {
              type: "object",
              properties: {
                summary: { type: "string" },
                conviction: { type: "string" },
                opportunityScore: { type: "number" },
                keyFindings: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      title: { type: "string" },
                      insight: { type: "string" },
                      implication: { type: "string" },
                    },
                    required: ["title", "insight", "implication"],
                    additionalProperties: false,
                  },
                },
                experiments: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      title: { type: "string" },
                      why: { type: "string" },
                      how: { type: "string" },
                    },
                    required: ["title", "why", "how"],
                    additionalProperties: false,
                  },
                },
                risks: {
                  type: "array",
                  items: { type: "string" },
                },
                artifactPreview: {
                  type: "object",
                  properties: {
                    title: { type: "string" },
                    bullets: {
                      type: "array",
                      items: { type: "string" },
                    },
                  },
                  required: ["title", "bullets"],
                  additionalProperties: false,
                },
              },
              required: ["summary", "conviction", "opportunityScore", "keyFindings", "experiments", "risks", "artifactPreview"],
              additionalProperties: false,
            },
          },
        },
      ],
      tool_choice: {
        type: "function",
        function: { name: "return_research_packet" },
      },
    }),
  });

  if (!response.ok) {
    if (response.status === 429) throw new Error("429");
    if (response.status === 402) throw new Error("402");
    const text = await response.text();
    throw new Error(`AI gateway error [${response.status}]: ${text}`);
  }

  const payload = await response.json();
  const toolArgs = payload?.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;

  return safeJsonParse(toolArgs, {
    summary: "Deep research is temporarily unavailable.",
    conviction: "Re-run after a moment.",
    opportunityScore: 50,
    keyFindings: [],
    experiments: [],
    risks: [],
    artifactPreview: {
      title: sectionArtifactMap[section],
      bullets: [],
    },
  });
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  let supabaseClient: ReturnType<typeof createClient> | null = null;
  let researchRunId: string | null = null;

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Authentication required. Please sign in." }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    supabaseClient = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: authHeader } },
    });

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await supabaseClient.auth.getClaims(token);
    if (claimsError || !claimsData?.claims?.sub) {
      return new Response(JSON.stringify({ error: "Invalid or expired session. Please sign in again." }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userId = claimsData.claims.sub as string;
    const clientIP = req.headers.get("x-forwarded-for") || req.headers.get("cf-connecting-ip") || "unknown";

    if (!checkRateLimit(userId) || !checkRateLimit(clientIP)) {
      return new Response(JSON.stringify({ error: "Too many research requests. Please try again later." }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const section = sanitizeInput(body.section, 40);
    const prompt = sanitizeInput(body.prompt, 800);
    const originalIdea = sanitizeInput(body.originalIdea, 2500);
    const validationId = sanitizeInput(body.validationId, 80) || null;
    const validationResult = body.validationResult || {};
    const formData = body.formData || null;

    if (!isResearchSection(section)) {
      return new Response(JSON.stringify({ error: "Invalid research section." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const { data: runRow, error: runError } = await supabaseClient
      .from("research_runs")
      .insert({
        user_id: userId,
        validation_id: validationId,
        mode: "deep",
        status: "running",
        query: `${section}: ${prompt || originalIdea}`,
      } as any)
      .select("id")
      .single();

    if (runError) {
      throw new Error(runError.message);
    }

    researchRunId = runRow?.id ?? null;

    const PERPLEXITY_API_KEY = Deno.env.get("PERPLEXITY_API_KEY");
    const FIRECRAWL_API_KEY = Deno.env.get("FIRECRAWL_API_KEY");

    let externalResearchSummary = "";
    let sourceDrafts: Array<{ url: string; title: string; snippet?: string; source_type?: string }> = [];
    const citations: string[] = [];

    if (PERPLEXITY_API_KEY) {
      const grounded = await fetchGroundedResearch(
        `Deep research for startup section ${section}. ${prompt}\n\nIdea: ${originalIdea}\nIndustry: ${formData?.industry || validationResult?.startup_brief?.industry || "unknown"}`,
        PERPLEXITY_API_KEY,
      );

      externalResearchSummary = grounded.summary;
      citations.push(...grounded.citations.slice(0, 5));

      if (citations.length > 0 && FIRECRAWL_API_KEY) {
        sourceDrafts = await Promise.all(citations.slice(0, 3).map((url) => scrapeSource(url, FIRECRAWL_API_KEY)));
      } else {
        sourceDrafts = citations.slice(0, 5).map((url) => ({
          url,
          title: getDomainLabel(url),
          source_type: "web",
        }));
      }
    }

    const packet = await generateResearchPacket({
      apiKey: LOVABLE_API_KEY,
      section,
      prompt,
      originalIdea,
      validationResult,
      formData,
      externalResearch: externalResearchSummary,
    });

    if (sourceDrafts.length > 0 && researchRunId) {
      const { error: sourceError } = await supabaseClient.from("research_sources").insert(
        sourceDrafts.map((source) => ({
          research_run_id: researchRunId,
          url: source.url,
          title: source.title,
          snippet: source.snippet || null,
          source_type: source.source_type || "web",
          relevance_score: packet.opportunityScore,
          metadata: {},
        })) as any,
      );

      if (sourceError) {
        console.error("Failed to persist research sources:", sourceError);
      }
    }

    if (researchRunId) {
      const { error: updateError } = await supabaseClient
        .from("research_runs")
        .update({
          status: "completed",
          summary: packet.summary,
          result_data: { packet, sources: sourceDrafts },
          provider_data: {
            connectors: {
              perplexity: Boolean(PERPLEXITY_API_KEY),
              firecrawl: Boolean(FIRECRAWL_API_KEY),
              liveResearch: sourceDrafts.length > 0,
            },
            citations,
            grounded_summary: externalResearchSummary,
          },
          completed_at: new Date().toISOString(),
        } as any)
        .eq("id", researchRunId);

      if (updateError) {
        console.error("Failed to update research run:", updateError);
      }
    }

    return new Response(
      JSON.stringify({
        runId: researchRunId,
        packet,
        sources: sourceDrafts,
        connectors: {
          perplexity: Boolean(PERPLEXITY_API_KEY),
          firecrawl: Boolean(FIRECRAWL_API_KEY),
          liveResearch: sourceDrafts.length > 0,
        },
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("research-orchestrator error:", error);

    if (supabaseClient && researchRunId) {
      await supabaseClient
        .from("research_runs")
        .update({
          status: "failed",
          completed_at: new Date().toISOString(),
        } as any)
        .eq("id", researchRunId);
    }

    if (error instanceof Error && error.message === "429") {
      return new Response(JSON.stringify({ error: "Too many requests. Please try again later." }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (error instanceof Error && error.message === "402") {
      return new Response(JSON.stringify({ error: "Service credits exhausted." }), {
        status: 402,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Something went wrong." }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
