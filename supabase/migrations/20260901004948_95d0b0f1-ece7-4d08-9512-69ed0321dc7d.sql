ALTER TABLE public.quiz_activity ADD COLUMN IF NOT EXISTS share_stats boolean NOT NULL DEFAULT false;

CREATE OR REPLACE FUNCTION public.get_quiz_leaderboard()
RETURNS TABLE (
  username text,
  answered integer,
  correct_first_try integer,
  best_streak integer,
  last_active timestamp with time zone
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    qa.username,
    MAX(qa.answered)::integer AS answered,
    MAX(qa.correct_first_try)::integer AS correct_first_try,
    MAX(qa.best_streak)::integer AS best_streak,
    MAX(qa.created_at) AS last_active
  FROM public.quiz_activity qa
  WHERE qa.share_stats = true
  GROUP BY qa.username
  ORDER BY MAX(qa.answered) DESC
  LIMIT 100
$$;

GRANT EXECUTE ON FUNCTION public.get_quiz_leaderboard() TO anon, authenticated;