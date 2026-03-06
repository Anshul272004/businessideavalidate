import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const ARTIFACT_TOOLS: Record<string, any> = {
  "business-plan": {
    name: "generate_business_plan",
    description: "Generate a comprehensive startup business plan.",
    parameters: {
      type: "object",
      properties: {
        executive_summary: { type: "string", description: "2-3 paragraph executive summary" },
        market_analysis: { type: "string", description: "Market size, trends, opportunity analysis" },
        product_strategy: { type: "string", description: "Product vision, features, differentiation" },
        marketing_strategy: { type: "string", description: "Go-to-market, channels, customer acquisition" },
        financial_projections: { type: "string", description: "Revenue model, Year 1/3/5 projections, unit economics" },
        competitive_landscape: { type: "string", description: "Key competitors, positioning, moats" },
        team_requirements: { type: "string", description: "Key hires, roles, org structure needed" },
      },
      required: ["executive_summary", "market_analysis", "product_strategy", "marketing_strategy", "financial_projections"],
      additionalProperties: false,
    },
  },
  "mvp-roadmap": {
    name: "generate_mvp_roadmap",
    description: "Generate an MVP development roadmap.",
    parameters: {
      type: "object",
      properties: {
        core_features: {
          type: "array",
          items: {
            type: "object",
            properties: {
              feature: { type: "string" },
              priority: { type: "string", enum: ["must-have", "should-have", "nice-to-have"] },
              effort: { type: "string", enum: ["small", "medium", "large"] },
              description: { type: "string" },
            },
            required: ["feature", "priority", "effort"],
            additionalProperties: false,
          },
        },
        tech_stack: { type: "string", description: "Recommended technology stack with reasoning" },
        timeline: {
          type: "array",
          items: {
            type: "object",
            properties: {
              phase: { type: "string" },
              duration: { type: "string" },
              deliverables: { type: "array", items: { type: "string" } },
              milestone: { type: "string" },
            },
            required: ["phase", "duration", "deliverables", "milestone"],
            additionalProperties: false,
          },
        },
        budget_estimate: { type: "string", description: "Estimated budget breakdown" },
        launch_checklist: { type: "array", items: { type: "string" }, description: "Pre-launch checklist items" },
      },
      required: ["core_features", "tech_stack", "timeline", "budget_estimate"],
      additionalProperties: false,
    },
  },
  "pitch-deck": {
    name: "generate_pitch_deck",
    description: "Generate a startup pitch deck with slide-by-slide content.",
    parameters: {
      type: "object",
      properties: {
        slides: {
          type: "array",
          items: {
            type: "object",
            properties: {
              title: { type: "string" },
              content: { type: "string", description: "Main content for the slide" },
              talking_points: { type: "array", items: { type: "string" } },
              visual_suggestion: { type: "string", description: "Suggested visual/chart for the slide" },
            },
            required: ["title", "content", "talking_points"],
            additionalProperties: false,
          },
        },
        elevator_pitch: { type: "string", description: "30-second elevator pitch" },
        ask: { type: "string", description: "The funding ask with use of funds breakdown" },
      },
      required: ["slides", "elevator_pitch"],
      additionalProperties: false,
    },
  },
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const userId = claimsData.claims.sub;

    const { artifactType, validationId, validationResult, formData } = await req.json();

    if (!artifactType || !ARTIFACT_TOOLS[artifactType]) {
      return new Response(JSON.stringify({ error: "Invalid artifact type" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "AI service not configured" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const toolDef = ARTIFACT_TOOLS[artifactType];

    const typeLabels: Record<string, string> = {
      "business-plan": "Business Plan",
      "mvp-roadmap": "MVP Roadmap",
      "pitch-deck": "Investor Pitch Deck",
    };

    const systemPrompt = `You are an elite startup strategist and McKinsey-level consultant. Generate a comprehensive, actionable ${typeLabels[artifactType]} based on the startup validation data provided. Be specific with numbers, timelines, and strategies. Write for a smart founder audience.`;

    const userPrompt = `Generate a ${typeLabels[artifactType]} for this startup:

IDEA: ${formData?.idea || validationResult?.startup_brief?.idea || "N/A"}
PROBLEM: ${formData?.problem || validationResult?.startup_brief?.problem || "N/A"}
SOLUTION: ${formData?.solution || validationResult?.startup_brief?.solution || "N/A"}
TARGET CUSTOMER: ${formData?.targetCustomer || validationResult?.startup_brief?.target_customer || "N/A"}
INDUSTRY: ${formData?.industry || validationResult?.startup_brief?.industry || "N/A"}
REVENUE MODEL: ${formData?.revenueModel || validationResult?.revenue_model || "N/A"}
STAGE: ${formData?.stage || "concept"}

VALIDATION DATA:
- Verdict: ${validationResult?.verdict || "N/A"}
- Confidence: ${validationResult?.confidence_score || "N/A"}%
- Pain Score: ${validationResult?.pain_realism?.score || "N/A"}/10
- TAM: ${validationResult?.market_analysis?.tam_estimate || "N/A"}
- Competitors: ${validationResult?.market_analysis?.competitors?.map((c: any) => c.name).join(", ") || "N/A"}
- Unit Economics: CAC ${validationResult?.unit_economics?.estimated_cac || "TBD"}, LTV ${validationResult?.unit_economics?.estimated_ltv || "TBD"}
- Key Risks: ${validationResult?.execution_risks?.tech_challenges?.join(", ") || "N/A"}
- Distribution: ${validationResult?.distribution_channels?.map((d: any) => d.channel).join(", ") || "N/A"}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        tools: [{
          type: "function",
          function: toolDef,
        }],
        tool_choice: { type: "function", function: { name: toolDef.name } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errText = await response.text();
      console.error("AI gateway error:", response.status, errText);
      return new Response(JSON.stringify({ error: "Failed to generate artifact" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const aiResult = await response.json();
    const toolCall = aiResult.choices?.[0]?.message?.tool_calls?.[0];

    let artifactContent: any = {};
    if (toolCall?.function?.arguments) {
      try {
        artifactContent = JSON.parse(toolCall.function.arguments);
      } catch {
        artifactContent = { raw: toolCall.function.arguments };
      }
    }

    // Generate markdown summary
    const markdown = generateMarkdown(artifactType, artifactContent);

    // Persist to report_artifacts
    const { data: artifact, error: insertError } = await supabase
      .from("report_artifacts")
      .insert({
        user_id: userId,
        validation_id: validationId || null,
        artifact_type: artifactType,
        content_json: artifactContent,
        markdown,
        title: `${typeLabels[artifactType]} — ${formData?.idea?.slice(0, 50) || "Startup"}`,
        status: "completed",
      })
      .select()
      .single();

    if (insertError) {
      console.error("Insert error:", insertError);
    }

    return new Response(JSON.stringify({
      artifact: artifactContent,
      markdown,
      artifactId: artifact?.id,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (e) {
    console.error("generate-artifact error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

function generateMarkdown(type: string, content: any): string {
  if (type === "business-plan") {
    return [
      "# Business Plan\n",
      "## Executive Summary\n", content.executive_summary || "",
      "\n## Market Analysis\n", content.market_analysis || "",
      "\n## Product Strategy\n", content.product_strategy || "",
      "\n## Marketing Strategy\n", content.marketing_strategy || "",
      "\n## Financial Projections\n", content.financial_projections || "",
      content.competitive_landscape ? "\n## Competitive Landscape\n" + content.competitive_landscape : "",
      content.team_requirements ? "\n## Team Requirements\n" + content.team_requirements : "",
    ].join("\n");
  }

  if (type === "mvp-roadmap") {
    let md = "# MVP Roadmap\n\n";
    md += "## Core Features\n\n";
    (content.core_features || []).forEach((f: any) => {
      md += `- **${f.feature}** [${f.priority}] (${f.effort}) — ${f.description || ""}\n`;
    });
    md += `\n## Tech Stack\n\n${content.tech_stack || ""}\n`;
    md += "\n## Timeline\n\n";
    (content.timeline || []).forEach((t: any) => {
      md += `### ${t.phase} (${t.duration})\n`;
      md += `Milestone: ${t.milestone}\n`;
      (t.deliverables || []).forEach((d: string) => { md += `- ${d}\n`; });
      md += "\n";
    });
    md += `## Budget Estimate\n\n${content.budget_estimate || ""}\n`;
    if (content.launch_checklist?.length) {
      md += "\n## Launch Checklist\n\n";
      content.launch_checklist.forEach((item: string) => { md += `- [ ] ${item}\n`; });
    }
    return md;
  }

  if (type === "pitch-deck") {
    let md = "# Pitch Deck\n\n";
    if (content.elevator_pitch) md += `> ${content.elevator_pitch}\n\n`;
    (content.slides || []).forEach((s: any, i: number) => {
      md += `## Slide ${i + 1}: ${s.title}\n\n${s.content}\n\n`;
      if (s.talking_points?.length) {
        md += "**Talking Points:**\n";
        s.talking_points.forEach((tp: string) => { md += `- ${tp}\n`; });
      }
      md += "\n";
    });
    if (content.ask) md += `## The Ask\n\n${content.ask}\n`;
    return md;
  }

  return JSON.stringify(content, null, 2);
}
