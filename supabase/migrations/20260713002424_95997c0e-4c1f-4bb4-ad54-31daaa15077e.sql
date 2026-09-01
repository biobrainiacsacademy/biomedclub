CREATE OR REPLACE FUNCTION public.unlike_qa_question(_id uuid)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
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