CREATE TABLE public.quiz_activity (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text NOT NULL,
  device_id text NOT NULL,
  unit text,
  answered integer NOT NULL DEFAULT 0,
  correct_first_try integer NOT NULL DEFAULT 0,
  wrong_attempts integer NOT NULL DEFAULT 0,
  hints_used integer NOT NULL DEFAULT 0,
  skipped integer NOT NULL DEFAULT 0,
  streak integer NOT NULL DEFAULT 0,
  best_streak integer NOT NULL DEFAULT 0,
  session_answered integer NOT NULL DEFAULT 0,
  session_first_try integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT INSERT ON public.quiz_activity TO anon, authenticated;
GRANT SELECT ON public.quiz_activity TO authenticated;
GRANT ALL ON public.quiz_activity TO service_role;

ALTER TABLE public.quiz_activity ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can log quiz activity"
ON public.quiz_activity FOR INSERT TO anon, authenticated
WITH CHECK (
  length(trim(username)) BETWEEN 1 AND 40
  AND length(device_id) BETWEEN 1 AND 64
  AND (unit IS NULL OR length(unit) <= 200)
  AND answered BETWEEN 0 AND 1000000
  AND correct_first_try BETWEEN 0 AND 1000000
  AND wrong_attempts BETWEEN 0 AND 1000000
  AND hints_used BETWEEN 0 AND 1000000
  AND skipped BETWEEN 0 AND 1000000
  AND streak BETWEEN 0 AND 100000
  AND best_streak BETWEEN 0 AND 100000
  AND session_answered BETWEEN 0 AND 1000000
  AND session_first_try BETWEEN 0 AND 1000000
);

CREATE POLICY "Admins can read quiz activity"
ON public.quiz_activity FOR SELECT TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE INDEX quiz_activity_username_idx ON public.quiz_activity (username, created_at DESC);