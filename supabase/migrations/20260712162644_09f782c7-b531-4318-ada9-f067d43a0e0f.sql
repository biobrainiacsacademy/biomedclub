
CREATE TABLE public.qa_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  likes integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.qa_questions TO anon, authenticated;
GRANT ALL ON public.qa_questions TO service_role;

ALTER TABLE public.qa_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view questions"
  ON public.qa_questions FOR SELECT
  USING (true);

CREATE POLICY "Anyone can submit questions"
  ON public.qa_questions FOR INSERT
  WITH CHECK (
    length(trim(question)) BETWEEN 3 AND 500
  );

CREATE POLICY "Admins can delete questions"
  ON public.qa_questions FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.like_qa_question(_id uuid)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_likes integer;
BEGIN
  UPDATE public.qa_questions
    SET likes = likes + 1
    WHERE id = _id
    RETURNING likes INTO new_likes;
  RETURN new_likes;
END;
$$;

GRANT EXECUTE ON FUNCTION public.like_qa_question(uuid) TO anon, authenticated;
