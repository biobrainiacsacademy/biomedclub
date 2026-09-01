CREATE OR REPLACE FUNCTION public.like_qa_question(_id uuid)
RETURNS integer
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = 'public'
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

CREATE OR REPLACE FUNCTION public.unlike_qa_question(_id uuid)
RETURNS integer
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = 'public'
AS $$
DECLARE
  new_likes integer;
BEGIN
  UPDATE public.qa_questions
    SET likes = GREATEST(likes - 1, 0)
    WHERE id = _id
    RETURNING likes INTO new_likes;
  RETURN new_likes;
END;
$$;

GRANT UPDATE (likes) ON public.qa_questions TO public;

CREATE POLICY "Anyone can update likes"
ON public.qa_questions
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);