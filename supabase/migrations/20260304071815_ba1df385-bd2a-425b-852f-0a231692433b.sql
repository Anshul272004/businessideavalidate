ALTER TABLE public.validations ADD COLUMN IF NOT EXISTS notes text;

CREATE POLICY "Users can update own validations"
ON public.validations
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);