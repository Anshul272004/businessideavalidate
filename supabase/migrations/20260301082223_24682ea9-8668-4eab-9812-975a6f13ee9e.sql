
CREATE TABLE public.validations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  idea_summary text NOT NULL,
  target_customer text,
  verdict text NOT NULL CHECK (verdict IN ('GO', 'PIVOT', 'KILL')),
  confidence_score integer,
  result_data jsonb NOT NULL,
  form_data jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.validations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own validations"
  ON public.validations FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own validations"
  ON public.validations FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);
