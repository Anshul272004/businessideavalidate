-- Phase 1 deep research data model
CREATE TABLE public.research_runs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  validation_id UUID REFERENCES public.validations(id) ON DELETE CASCADE,
  mode TEXT NOT NULL DEFAULT 'deep',
  status TEXT NOT NULL DEFAULT 'pending',
  query TEXT,
  summary TEXT,
  result_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  provider_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT research_runs_mode_check CHECK (mode IN ('fast', 'deep')),
  CONSTRAINT research_runs_status_check CHECK (status IN ('pending', 'running', 'completed', 'failed'))
);

CREATE INDEX idx_research_runs_user_id ON public.research_runs(user_id);
CREATE INDEX idx_research_runs_validation_id ON public.research_runs(validation_id);
CREATE INDEX idx_research_runs_status ON public.research_runs(status);

CREATE TABLE public.research_sources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  research_run_id UUID NOT NULL REFERENCES public.research_runs(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  title TEXT,
  source_type TEXT NOT NULL DEFAULT 'web',
  snippet TEXT,
  relevance_score NUMERIC(5,2),
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT research_sources_relevance_range CHECK (relevance_score IS NULL OR (relevance_score >= 0 AND relevance_score <= 100))
);

CREATE INDEX idx_research_sources_run_id ON public.research_sources(research_run_id);
CREATE INDEX idx_research_sources_type ON public.research_sources(source_type);

CREATE TABLE public.report_artifacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  validation_id UUID REFERENCES public.validations(id) ON DELETE CASCADE,
  research_run_id UUID REFERENCES public.research_runs(id) ON DELETE SET NULL,
  artifact_type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  title TEXT,
  content_json JSONB NOT NULL DEFAULT '{}'::jsonb,
  markdown TEXT,
  version INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT report_artifacts_type_check CHECK (artifact_type IN ('market_report', 'competitor_report', 'business_plan', 'pitch_deck', 'mvp_roadmap', 'growth_strategy', 'funding_readiness')),
  CONSTRAINT report_artifacts_status_check CHECK (status IN ('draft', 'generating', 'completed', 'failed')),
  CONSTRAINT report_artifacts_version_check CHECK (version >= 1)
);

CREATE INDEX idx_report_artifacts_user_id ON public.report_artifacts(user_id);
CREATE INDEX idx_report_artifacts_validation_id ON public.report_artifacts(validation_id);
CREATE INDEX idx_report_artifacts_type ON public.report_artifacts(artifact_type);

CREATE OR REPLACE FUNCTION public.set_updated_at_timestamp()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_research_runs_updated_at
BEFORE UPDATE ON public.research_runs
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at_timestamp();

CREATE TRIGGER set_report_artifacts_updated_at
BEFORE UPDATE ON public.report_artifacts
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at_timestamp();

ALTER TABLE public.research_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.report_artifacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own research runs"
ON public.research_runs
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create own research runs"
ON public.research_runs
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own research runs"
ON public.research_runs
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own research runs"
ON public.research_runs
FOR DELETE
USING (auth.uid() = user_id);

CREATE POLICY "Users can view own research sources"
ON public.research_sources
FOR SELECT
USING (
  EXISTS (
    SELECT 1
    FROM public.research_runs rr
    WHERE rr.id = research_sources.research_run_id
      AND rr.user_id = auth.uid()
  )
);

CREATE POLICY "Users can create own research sources"
ON public.research_sources
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.research_runs rr
    WHERE rr.id = research_sources.research_run_id
      AND rr.user_id = auth.uid()
  )
);

CREATE POLICY "Users can update own research sources"
ON public.research_sources
FOR UPDATE
USING (
  EXISTS (
    SELECT 1
    FROM public.research_runs rr
    WHERE rr.id = research_sources.research_run_id
      AND rr.user_id = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.research_runs rr
    WHERE rr.id = research_sources.research_run_id
      AND rr.user_id = auth.uid()
  )
);

CREATE POLICY "Users can delete own research sources"
ON public.research_sources
FOR DELETE
USING (
  EXISTS (
    SELECT 1
    FROM public.research_runs rr
    WHERE rr.id = research_sources.research_run_id
      AND rr.user_id = auth.uid()
  )
);

CREATE POLICY "Users can view own report artifacts"
ON public.report_artifacts
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create own report artifacts"
ON public.report_artifacts
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own report artifacts"
ON public.report_artifacts
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own report artifacts"
ON public.report_artifacts
FOR DELETE
USING (auth.uid() = user_id);