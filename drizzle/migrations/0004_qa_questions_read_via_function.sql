DROP POLICY IF EXISTS "Anyone can view questions" ON public.qa_questions;
REVOKE SELECT ON public.qa_questions FROM anon, authenticated;
CREATE OR REPLACE FUNCTION public.get_qa_questions()
RETURNS TABLE(id uuid, question text, likes integer, created_at timestamptz)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT q.id, q.question, q.likes, q.created_at FROM public.qa_questions q
  ORDER BY q.likes DESC, q.created_at ASC LIMIT 200
$$;
REVOKE ALL ON FUNCTION public.get_qa_questions() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_qa_questions() TO anon, authenticated;